import { SOCIAL_URLS } from '../data/siteIdentity';
import ResponsiveImage from '../components/ResponsiveImage';
import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, LinkedinLogo, GithubLogo, ChatsCircle } from "@phosphor-icons/react";
import { Link } from 'react-router';
import Seo from '../components/Seo';
import styles from './About.module.css';

const About = () => {

  return (
    <div className={styles.about}>
      <Seo
        title="About Sean Betts | Chief AI & Innovation Officer, Researcher and Builder"
        description="Learn about Sean Betts, Chief AI & Innovation Officer at Omnicom Media UK, independent AI researcher and builder focused on AI strategy, product innovation and business transformation."
        keywords={[
          'Sean Betts',
          'AI strategy',
          'generative AI',
          'AI innovation',
          'product innovation',
          'business transformation',
          'Omnicom Media UK'
        ]}
        canonicalPath="/about"
        imagePath="/images/sean-betts-profile.png"
        ogType="profile"
      />

      <Link to="/" className={styles.back}><ArrowLeft size={17} weight="bold" aria-hidden="true" /> Home</Link>
      <div className={styles.panels}>
      <header className={styles.hero}>
        <div className={styles.portrait}>
          <div className={styles.imageWindow}><ResponsiveImage src="/images/game/portrait-sean-london-v2-colour.png" alt="Illustrated portrait of Sean Betts" width="1024" height="1536" fetchpriority="high" /></div>
        </div>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>AI strategy · Product innovation · Technology leadership</span>
          <h1>About<span>.</span></h1>
          <section className={styles.intro}>
            <p>
              I’m Sean, an AI, product and technology leader. I’ve spent more than 20 years developing products and building teams.
            </p>
            <p>
              I’m currently Chief AI &amp; Innovation Officer at Omnicom Media UK. Previously, as Chief Product &amp; Technology Officer,
              I built and led a 150-person organisation spanning product, engineering, data and analytics.
            </p>
            <p>
              I also build AI products myself. Working directly with the technology helps me judge what it’s useful for and where it falls short.
            </p>
          </section>
          <nav className={styles.chapters} aria-label="About chapters">
            <a href="#professional"><span>Professional Experience</span><ArrowRight size={17} weight="bold" aria-hidden="true" /></a>
            <a href="#research"><span>Applied AI &amp; Building</span><ArrowRight size={17} weight="bold" aria-hidden="true" /></a>
            <a href="#advocacy"><span>Neurodiversity &amp; Mental Health</span><ArrowRight size={17} weight="bold" aria-hidden="true" /></a>
          </nav>
        </div>
      </header>

      <section id="professional" className={styles.chapter} aria-labelledby="professional-heading" tabIndex={-1}>
        <div className={styles.chapterArt} aria-hidden="true"><div className={styles.imageWindow}><ResponsiveImage className={styles.chapterImage} src="/images/game/about-studies/professional-discussion-v2-colour.png" alt="" width="941" height="1672" loading="lazy" /></div><span>01 / Strategy into practice</span></div>
        <div className={styles.chapterCopy}>
          <div className={styles.sectionHeader}>
            <div><h2 id="professional-heading">Professional<br />experience<span>.</span></h2></div>
            <a href="https://linkedin.com/in/seanbetts/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn Profile">
              <LinkedinLogo size={36} weight="bold" aria-hidden="true" />
            </a>
          </div>
          <h3>Chief AI &amp; Innovation Officer <span>Omnicom Media UK</span></h3>
          <p>
            At Omnicom Media UK, I lead AI strategy and innovation, chair our AI Centre of Excellence and advise boards and leadership teams on how
            emerging technology could change their businesses.
          </p>
          <p>
            I’ve helped develop AI Optix and Humanics, and put in place the training and governance teams need to use AI responsibly.
          </p>
          <p>
            Previously, as Chief Product &amp; Technology Officer at OMG UK, I:
          </p>
          <ul>
            <li>Grew the product and technology function from 20 to 150 people.</li>
            <li>Delivered nearly 500% growth in product and technology revenue.</li>
            <li>Led the development of proprietary platforms including SearchKit, Availability Engine and Multi Screen Optimiser.</li>
          </ul>
          <p>
            I’ve served on the UK leadership board since 2017.
          </p>
          <Link to="/thought-leadership/" className={styles.action}>Explore my AI thought leadership <ArrowUpRight size={20} weight="bold" aria-hidden="true" /></Link>
        </div>
      </section>

      <section id="research" className={`${styles.chapter} ${styles.reverse}`} aria-labelledby="research-heading" tabIndex={-1}>
        <div className={styles.chapterArt} aria-hidden="true"><div className={styles.imageWindow}><ResponsiveImage className={`${styles.chapterImage} ${styles.researchImage}`} src="/images/game/about-studies/research-mac-sidebar-v3-colour.png" alt="" width="1122" height="1402" loading="lazy" /></div><span>02 / Learn by building</span></div>
        <div className={styles.chapterCopy}>
          <div className={styles.sectionHeader}>
            <div><h2 id="research-heading">Applied AI<br />&amp; building<span>.</span></h2></div>
            <a href={SOCIAL_URLS.github + '/'} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub Profile">
              <GithubLogo size={36} weight="bold" aria-hidden="true" />
            </a>
          </div>
          <p>
            My independent work focuses on personal AI assistants and testing how well AI performs on specific tasks.
          </p>
          <p>
            <Link to="/building/sidebar/" state={{ fromLabel: 'About', fromPath: '/about/' }}>sideBar</Link> brings notes, tasks, files and web content
            into a personal AI assistant for iPhone, iPad, Mac and web. I’m building it to explore how an assistant can use memory and tools to be more useful over time.
          </p>
          <p>
            <Link to="/building/genai-marketing-benchmarks/" state={{ fromLabel: 'About', fromPath: '/about/' }}>GenAI Marketing Benchmarks</Link> tests
            how well language models understand specialist marketing knowledge, using more than 2,800 questions across 20 disciplines.
          </p>
          <p>
            Other projects explore <Link to="/building/ai-brand-detection/" state={{ fromLabel: 'About', fromPath: '/about/' }}>brand detection in video</Link> and{' '}
            <Link to="/building/youtube-sdg-analysis/" state={{ fromLabel: 'About', fromPath: '/about/' }}>large-scale content analysis</Link>.
          </p>
          <p>
            I write <a href={SOCIAL_URLS.blueprint} target="_blank" rel="noopener noreferrer">The Blueprint</a>, covering
            AI, emerging technology and what they mean for people and businesses.
          </p>
          <Link to="/building/" className={styles.action}>Explore what I’m building <ArrowUpRight size={20} weight="bold" aria-hidden="true" /></Link>
        </div>
      </section>

      <section id="advocacy" className={styles.chapter} aria-labelledby="advocacy-heading" tabIndex={-1}>
        <div className={styles.chapterArt} aria-hidden="true"><div className={styles.imageWindow}><ResponsiveImage className={styles.chapterImage} src="/images/game/about-studies/advocacy-conversation-v2-colour.png" alt="" width="1122" height="1402" loading="lazy" /></div><span>03 / A personal perspective</span></div>
        <div className={styles.chapterCopy}>
          <div className={styles.sectionHeader}>
            <div><h2 id="advocacy-heading">Neurodiversity<br />&amp; mental health<span>.</span></h2></div>
            <Link to="/contact/" className={styles.socialLink} aria-label="Contact Sean">
              <ChatsCircle size={36} weight="bold" aria-hidden="true" />
            </Link>
          </div>
          <p>
            I’m autistic, diagnosed in 2022, and I speak openly about neurodiversity and mental health.
          </p>
          <p>
            After experiencing burnout, depression and anxiety in 2017, I began sharing my experiences publicly. Since my diagnosis, I’ve also spoken
            about being autistic and how workplaces can better support autistic people.
          </p>
          <p>
            I hope that talking openly makes it easier for other people to share their own experiences and ask for support.
          </p>
          <Link to="/speaking/" className={styles.action}>Explore my speaking <ArrowUpRight size={20} weight="bold" aria-hidden="true" /></Link>
        </div>
      </section>
      </div>
    </div>
  );
};

export default About;
