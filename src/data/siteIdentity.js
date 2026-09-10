export const SITE_URL = 'https://www.seanbetts.com';
export const SOCIAL_URLS = {
  linkedin: 'https://www.linkedin.com/in/seanbetts/',
  github: 'https://github.com/seanbetts',
  bluesky: 'https://bsky.app/profile/seanbetts.com',
  blueprint: 'https://www.the-blueprint.ai',
};
export const PERSON_ID = `${SITE_URL}/#sean-betts`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const personSchema = {
  '@context': 'https://schema.org', '@type': 'Person', '@id': PERSON_ID,
  name: 'Sean Betts', url: `${SITE_URL}/about`,
  jobTitle: 'Chief AI & Innovation Officer',
  description: 'AI leader, researcher and builder; neurodiversity and mental health speaker.',
  image: `${SITE_URL}/images/sean-betts-profile.png`,
  worksFor: { '@type': 'Organization', name: 'Omnicom Media UK' },
  sameAs: Object.values(SOCIAL_URLS),
};
export const websiteSchema = {
  '@context': 'https://schema.org', '@type': 'WebSite', '@id': WEBSITE_ID,
  name: 'Sean Betts', url: `${SITE_URL}/`, publisher: { '@id': PERSON_ID },
};
