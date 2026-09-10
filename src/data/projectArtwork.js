const projectArtwork = {
  sidebar: { background: '/images/game/backgrounds/river-sunset.webp' },
  pointilism: { background: '/images/game/backgrounds/daytime-rooftop.webp' },
  'llm-search-analysis': { scene: 'writing' },
  'genai-explorer': { background: '/images/game/backgrounds/daytime-arcade.webp' },
  'steam-hardware-watch': { background: '/images/game/backgrounds/daytime-arcade.webp' },
  'apple-hig-mirror': { scene: 'writing' },
  'pixel-loader-lab': { background: '/images/game/backgrounds/radiohead-mural.webp' },
  'cains-jawbone': { scene: 'writing' },
  'youtube-sdg-analysis': { background: '/images/game/backgrounds/industrial-yard.webp' },
  'ai-brand-detection': { background: '/images/game/backgrounds/daytime-arcade.webp' },
  'genai-timeline': { scene: 'about' }
};

export function artworkForProject(id) {
  return projectArtwork[id] || { scene: 'building' };
}
