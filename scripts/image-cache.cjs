// Published content-addressed exports are an optional cache, never a build dependency.
const fs = require('node:fs/promises');
const sharp = require('sharp');
const { randomUUID } = require('node:crypto');
const maxBytes = 10 * 1024 * 1024;

function createImageCache({ origin, fetchImpl = fetch, timeoutMs = 5000 }) {
  let disabled = !origin;
  const cache = {
    restored: 0,
    async restore(candidates) {
      if (disabled) return;
      let next = 0;
      await Promise.all(Array.from({ length: Math.min(4, candidates.length) }, async () => {
        while (!disabled && next < candidates.length) {
          const candidate = candidates[next++];
          if (await fs.access(candidate.output).then(() => true, () => false)) continue;
          const temporary = `${candidate.output}.${randomUUID()}.tmp`;
          try {
            const response = await fetchImpl(`${origin}/images/responsive/${candidate.name}`, {
              redirect: 'error', signal: AbortSignal.timeout(timeoutMs),
            });
            if (response.status === 404) {
              await response.body?.cancel();
              continue;
            }
            if (!response.ok || response.headers.get('content-type')?.split(';')[0] !== `image/${candidate.format}` ||
                Number(response.headers.get('content-length')) > maxBytes) {
              await response.body?.cancel();
              throw new Error(`invalid cache response: HTTP ${response.status}, ${response.headers.get('content-type') || 'no content type'}`);
            }
            const chunks = [];
            let size = 0;
            for await (const chunk of response.body) {
              size += chunk.length;
              if (size > maxBytes) throw new Error('cache image exceeds size limit');
              chunks.push(chunk);
            }
            const buffer = Buffer.concat(chunks);
            const metadata = await sharp(buffer).metadata();
            const validFormat = candidate.format === 'avif' ? metadata.format === 'heif' && metadata.compression === 'av1' : metadata.format === 'webp';
            // JPEG shrink-on-load can round height one pixel differently from the source ratio.
            if (!validFormat || metadata.width !== candidate.width || Math.abs(metadata.height - candidate.height) > 1 || (metadata.pages || 1) !== 1) {
              throw new Error('cache image has unexpected dimensions or format');
            }
            // Decode as well as reading metadata: truncated payloads can still have valid headers.
            await sharp(buffer).stats();
            await fs.writeFile(temporary, buffer, { flag: 'wx' });
            await fs.rename(temporary, candidate.output);
            cache.restored++;
          } catch (error) {
            if (!disabled) console.warn(`Image cache unavailable (${error.message}); encoding missing exports locally.`);
            disabled = true;
          } finally {
            await fs.rm(temporary, { force: true });
          }
        }
      }));
    },
  };
  return cache;
}
module.exports = { createImageCache };
