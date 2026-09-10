import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { ArrowLeft, ArrowUpRight, Newspaper, LinkedinLogo, Butterfly, GithubLogo } from '@phosphor-icons/react';
import styles from './Contact.module.css';

const channels = [
  { name: 'LinkedIn', description: 'Connect and get in touch', href: 'https://www.linkedin.com/in/seanbetts/', Icon: LinkedinLogo },
  { name: 'The Blueprint', description: 'Occasional thought leadership and opinions', href: 'https://www.the-blueprint.ai/', Icon: Newspaper },
  { name: 'GitHub', description: 'Code, projects and experiments', href: 'https://github.com/seanbetts', Icon: GithubLogo },
  { name: 'Bluesky', description: 'Mostly Aston Villa thoughts and updates', href: 'https://bsky.app/profile/seanbetts.com', Icon: Butterfly },
];

export default function Contact() {
  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Sean Betts',
    description: 'Connect with Sean Betts to discuss AI, speaking and collaboration.',
    url: 'https://www.seanbetts.com/contact',
    mainEntity: {
      '@type': 'Person', name: 'Sean Betts',
      sameAs: channels.filter(channel => channel.name !== 'The Blueprint').map(channel => channel.href),
    },
  };

  return <div className={styles.contact}>
    <Seo
      title="Contact Sean Betts | Writing, Socials and Collaboration"
      description="Connect with Sean Betts on LinkedIn to discuss AI, speaking and collaboration, or explore The Blueprint, GitHub and Bluesky."
      keywords={['contact Sean Betts', 'The Blueprint', 'LinkedIn', 'GitHub', 'Bluesky', 'AI collaboration']}
      canonicalPath="/contact" imagePath="/images/sean-betts-profile.png" ogType="website" jsonLd={contactPageSchema}
    />
    <Link to="/" className={styles.back}><ArrowLeft size={17} aria-hidden="true" />Home</Link>
    <div className={styles.cover}>
      <div className={styles.copy}>
        <div className={styles.upright}>
          <h1>Contact<span>.</span></h1>
          <p className={styles.intro}>For conversations about AI, speaking and collaboration.</p>
          <nav className={styles.channels} aria-label="Connect with Sean">
            {channels.map(({ name, description, href, Icon }) => <a key={name} href={href} target="_blank" rel="noopener noreferrer" className={styles.channel}>
              <Icon className={styles.icon} size={36} aria-hidden="true" />
              <span className={styles.channelCopy}><span className={styles.name}>{name}</span><span className={styles.description}>{description}</span></span>
              <ArrowUpRight className={styles.arrow} size={22} aria-hidden="true" />
            </a>)}
          </nav>
        </div>
      </div>
      <div className={styles.art}><img src="/images/game/contact/phone-box-v1.webp" alt="Illustrated red London telephone box in warm evening light" width="1024" height="1536" decoding="async" /></div>
    </div>
  </div>;
}
