import { SOCIAL_URLS } from '../data/siteIdentity';
import ResponsiveImage from '../components/ResponsiveImage';
import { Link } from 'react-router';
import Seo from '../components/Seo';
import { ArrowLeft, ArrowUpRight, Newspaper, LinkedinLogo, Butterfly, GithubLogo } from '@phosphor-icons/react';
import styles from './Contact.module.css';

const channels = [
  { name: 'LinkedIn', description: 'Speaking, AI and collaboration enquiries', href: SOCIAL_URLS.linkedin, Icon: LinkedinLogo },
  { name: 'The Blueprint', description: 'Occasional thought leadership and opinions', href: SOCIAL_URLS.blueprint + '/', Icon: Newspaper },
  { name: 'GitHub', description: 'Code, projects and experiments', href: SOCIAL_URLS.github, Icon: GithubLogo },
  { name: 'Bluesky', description: 'Mostly Aston Villa thoughts and updates', href: SOCIAL_URLS.bluesky, Icon: Butterfly },
];

export default function Contact() {

  return <div className={styles.contact}>
    <Seo
      title="Contact Sean Betts | Writing, Socials and Collaboration"
      description="Connect with Sean Betts on LinkedIn to discuss AI, speaking and collaboration, or explore The Blueprint, GitHub and Bluesky."
      keywords={['contact Sean Betts', 'The Blueprint', 'LinkedIn', 'GitHub', 'Bluesky', 'AI collaboration']}
      canonicalPath="/contact" imagePath="/images/sean-betts-profile.png" ogType="website"
    />
    <Link to="/" className={styles.back}><ArrowLeft size={17} aria-hidden="true" />Home</Link>
    <div className={styles.cover}>
      <div className={styles.copy}>
        <div className={styles.upright}>
          <h1>Contact<span>.</span></h1>
          <p className={styles.intro}>For speaking, AI and collaboration enquiries, contact me on LinkedIn.</p>
          <nav className={styles.channels} aria-label="Connect with Sean">
            {channels.map(({ name, description, href, Icon }) => <a key={name} href={href} target="_blank" rel="noopener noreferrer" className={styles.channel}>
              <Icon className={styles.icon} size={36} aria-hidden="true" />
              <span className={styles.channelCopy}><span className={styles.name}>{name}</span><span className={styles.description}>{description}</span></span>
              <ArrowUpRight className={styles.arrow} size={22} aria-hidden="true" />
            </a>)}
          </nav>
        </div>
      </div>
      <div className={styles.art}><ResponsiveImage src="/images/game/contact/phone-box-v2-colour.png" alt="Illustrated red London telephone box in colourful afternoon sunlight" width="1024" height="1536" decoding="async" /></div>
    </div>
  </div>;
}
