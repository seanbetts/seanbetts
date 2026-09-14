const projectArtwork = {
  'local-web-server': { background: '/images/game/backgrounds/electronics-workshop-v1-colour.png' },
  sidebar: { background: '/images/game/backgrounds/canalside-workspace-v1-colour.png' },
  pointilism: { background: '/images/game/backgrounds/radiohead-mural-v2-colour.png' },
  'llm-search-analysis': { background: '/images/game/backgrounds/daytime-rooftop-v2-colour.png' },
  'genai-explorer': { background: '/images/game/backgrounds/electronics-workshop-v1-colour.png' },
  plotter: { background: '/images/game/backgrounds/canalside-workspace-v1-colour.png' },
  nanimals: { background: '/images/game/backgrounds/radiohead-mural-v2-colour.png' },
  mems: { background: '/images/game/backgrounds/record-shop-v1-colour.png' },
  mihndbot: { background: '/images/game/backgrounds/river-sunset.webp' },
  'steam-hardware-watch': { background: '/images/game/backgrounds/electronics-workshop-v1-colour.png' },
  'apple-hig-mirror': { background: '/images/game/backgrounds/print-design-studio-v1-colour.png' },
  'pixel-loader-lab': { background: '/images/game/backgrounds/print-design-studio-v1-colour.png' },
  'cains-jawbone': { background: '/images/game/backgrounds/daytime-rooftop-v2-colour.png' },
  'youtube-sdg-analysis': { background: '/images/game/backgrounds/river-sunset.webp' },
  'ai-brand-detection': { background: '/images/game/backgrounds/daytime-arcade-v2-colour.png' },
  'genai-timeline': { background: '/images/game/backgrounds/daytime-rooftop-v2-colour.png' },
  'genai-marketing-benchmarks': { background: '/images/game/backgrounds/industrial-yard-v2-colour.png' },
  'ai-chat-experience': { background: '/images/game/backgrounds/river-sunset.webp' }
};

export function artworkForProject(id) {
  return projectArtwork[id] || { background: '/images/game/backgrounds/daytime-rooftop-v2-colour.png' };
}
