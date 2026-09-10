const projectArtwork = {
  sidebar: { background: '/images/game/backgrounds/river-sunset.webp' },
  pointilism: { background: '/images/game/backgrounds/radiohead-mural.webp' },
  'llm-search-analysis': { background: '/images/game/backgrounds/daytime-rooftop.webp' },
  'genai-explorer': { background: '/images/game/backgrounds/daytime-rooftop.webp' },
  plotter: { background: '/images/game/backgrounds/river-sunset.webp' },
  nanimals: { background: '/images/game/backgrounds/radiohead-mural.webp' },
  mems: { background: '/images/game/backgrounds/daytime-rooftop.webp' },
  mihndbot: { background: '/images/game/backgrounds/river-sunset.webp' },
  'steam-hardware-watch': { background: '/images/game/backgrounds/daytime-arcade.webp' },
  'apple-hig-mirror': { background: '/images/game/backgrounds/industrial-yard.webp' },
  'pixel-loader-lab': { background: '/images/game/backgrounds/radiohead-mural.webp' },
  'cains-jawbone': { background: '/images/game/backgrounds/daytime-rooftop.webp' },
  'youtube-sdg-analysis': { background: '/images/game/backgrounds/river-sunset.webp' },
  'ai-brand-detection': { background: '/images/game/backgrounds/daytime-arcade.webp' },
  'genai-timeline': { background: '/images/game/backgrounds/daytime-rooftop.webp' },
  'genai-marketing-benchmarks': { background: '/images/game/backgrounds/industrial-yard.webp' },
  'ai-chat-experience': { background: '/images/game/backgrounds/river-sunset.webp' }
};

export function artworkForProject(id) {
  return projectArtwork[id] || { background: '/images/game/backgrounds/daytime-rooftop.webp' };
}
