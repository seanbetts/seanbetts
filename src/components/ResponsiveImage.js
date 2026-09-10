import images from '../generated/images.json';

// Unknown, remote, vector and animated sources retain their existing behaviour.
export default function ResponsiveImage({ src, alt, sizes = '(max-width: 700px) 100vw, 60vw', width, height, ...props }) {
  const image = images[src];
  if (!image) return <img alt={alt} src={src} width={width} height={height} {...props} />;
  const fallback = image.variants.find(variant => variant.width >= 1200) || image.variants[image.variants.length - 1];
  const element = <img alt={alt} {...props} src={fallback.src}
    srcSet={image.variants.map(variant => `${variant.src} ${variant.width}w`).join(', ')}
    sizes={sizes} width={width || image.width} height={height || image.height} />;
  return image.avif?.length && !image.preferWebp ? <picture style={{ display: 'contents' }}>
    <source type="image/avif" srcSet={image.avif.map(variant => `${variant.src} ${variant.width}w`).join(', ')} sizes={sizes} />
    {element}
  </picture> : element;
}

export function responsiveBackground(src) {
  const image = images[src];
  if (!image) return `url("${src}")`;
  const choose = width => image.variants.find(variant => variant.width >= width) || image.variants[image.variants.length - 1];
  const small = choose(800), large = choose(1600);
  return small.src === large.src ? `url("${small.src}")` : `image-set(url("${small.src}") 1x, url("${large.src}") 2x)`;
}
