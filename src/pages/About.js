import ResponsiveImage from '../components/ResponsiveImage';
import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, LinkedinLogo, GithubLogo, EnvelopeSimple } from "@phosphor-icons/react";
import InternalLink from '../components/InternalLink';
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

      <InternalLink to="/" className={styles.back}><ArrowLeft size={17} weight="bold" aria-hidden="true" /> Home</InternalLink>
      <div className={styles.panels}>
      <header className={styles.hero}>
        <div className={styles.portrait}>
          <div className={styles.imageWindow}><ResponsiveImage src="/images/game/portrait-sean-london-candidate-v1.png" alt="Illustrated portrait of Sean Betts" width="1024" height="1536" fetchpriority="high" /></div>
        </div>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>AI leader · Researcher · Builder</span>
          <h1>About<span>.</span></h1>
          <section className={styles.intro}>
            <p>
              I’m an AI leader, researcher and builder working at the intersection of AI, product innovation and business transformation.
            </p>
            <p>
              Alongside my role as Chief AI & Innovation Officer at Omnicom Media UK, I design and build independent AI products, benchmarks
              and applied systems to better understand how emerging technologies are reshaping products, knowledge work and consumer experiences.
            </p>
            <p>
              My work combines strategic leadership with hands-on technical exploration, from AI strategy and organisational transformation to
              prototyping, evaluation and product development. I’m particularly interested in turning complex advances in AI into practical tools,
              capabilities and ideas that create real value for people and organisations.
            </p>
          </section>
          <nav className={styles.chapters} aria-label="About chapters">
            <a href="#professional"><span>Professional Experience</span><ArrowRight size={17} weight="bold" aria-hidden="true" /></a>
            <a href="#research"><span>AI Research &amp; Development</span><ArrowRight size={17} weight="bold" aria-hidden="true" /></a>
            <a href="#advocacy"><span>Speaking &amp; Advocacy</span><ArrowRight size={17} weight="bold" aria-hidden="true" /></a>
          </nav>
        </div>
      </header>

      <section id="professional" className={styles.chapter} aria-labelledby="professional-heading" tabIndex={-1}>
        <div className={styles.chapterArt} aria-hidden="true"><div className={styles.imageWindow}><ResponsiveImage className={styles.chapterImage} src="/images/game/about-studies/professional-discussion-v1.webp" alt="" width="941" height="1672" loading="lazy" /></div><span>01 / Strategy into practice</span></div>
        <div className={styles.chapterCopy}>
          <div className={styles.sectionHeader}>
            <div><h2 id="professional-heading">Professional<br />experience<span>.</span></h2></div>
            <a href="https://linkedin.com/in/seanbetts/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn Profile">
              <LinkedinLogo size={36} weight="bold" aria-hidden="true" />
            </a>
          </div>
          <h3>Chief AI &amp; Innovation Officer <span>Omnicom Media UK</span></h3>
          <p>
            At Omnicom Media UK, I lead AI strategy, innovation and transformation across the business, helping shape how our agencies, teams
            and clients respond to the rapid evolution of artificial intelligence.
          </p>
          <p>
            My role spans AI strategy and governance, client consultancy, capability building, product innovation and organisational change. I lead
            our AI Centre of Excellence, sit on the OM UK board and work closely with agency leadership, to identify where emerging AI capabilities
            can create real operational and commercial value.
          </p>
          <p>
            A key part of my role is translating fast-moving technical change into practical action. That includes advising client boards and internal
            teams on AI adoption, developing new use cases and solutions, building AI readiness across the organisation, and helping position OM UK
            for a future increasingly shaped by AI.
          </p>
          <p>
            Areas of focus:
          </p>
          <ul>
            <li>Leading AI strategy and transformation across OM UK.</li>
            <li>Advising agencies and client boards on practical AI adoption and use cases.</li>
            <li>Building AI capability, readiness and learning programmes.</li>
            <li>Identifying emerging technologies and their commercial implications.</li>
            <li>Shaping board-level thinking on AI, innovation and business change.</li>
            <li>Supporting product and solution development across internal and client contexts.</li>
          </ul>
          <InternalLink to="/thought-leadership" className={styles.action}>Thought leadership for global brands <ArrowUpRight size={20} weight="bold" aria-hidden="true" /></InternalLink>
        </div>
      </section>

      <section id="research" className={`${styles.chapter} ${styles.reverse}`} aria-labelledby="research-heading" tabIndex={-1}>
        <div className={styles.chapterArt} aria-hidden="true"><div className={styles.imageWindow}><ResponsiveImage className={`${styles.chapterImage} ${styles.researchImage}`} src="/images/game/about-studies/research-mac-sidebar-v2.webp" alt="" width="1122" height="1402" loading="lazy" /></div><span>02 / Learn by building</span></div>
        <div className={styles.chapterCopy}>
          <div className={styles.sectionHeader}>
            <div><h2 id="research-heading">AI research<br />&amp; development<span>.</span></h2></div>
            <a href="https://github.com/seanbetts/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub Profile">
              <GithubLogo size={36} weight="bold" aria-hidden="true" />
            </a>
          </div>
          <p>
            As an independent AI researcher and developer, I build practical AI products, benchmarks and experiments to better understand the capabilities
            and limitations of emerging technologies.
          </p>
          <p>
            My work includes building <InternalLink to="/building/sidebar" state={{ fromLabel: 'About', fromPath: '/about' }}>sideBar</InternalLink>, a cross-platform AI assistant that explores personal knowledge, memory and
            tool use; creating a <InternalLink to="/building/genai-marketing-benchmarks" state={{ fromLabel: 'About', fromPath: '/about' }}>benchmarking framework</InternalLink> with 2,800+ questions across 20 marketing
            disciplines to assess LLM performance; and developing applied AI workflows spanning <InternalLink to="/building/ai-brand-detection" state={{ fromLabel: 'About', fromPath: '/about' }}>OCR</InternalLink>,
            transcription, automated classification and <InternalLink to="/building/youtube-sdg-analysis" state={{ fromLabel: 'About', fromPath: '/about' }}>large-scale content analysis</InternalLink>.
          </p>
          <p>
            I also write <a href="https://www.the-blueprint.ai" target="_blank" rel="noopener noreferrer">The Blueprint</a>, where I share occasional thought leadership and opinions on AI
            and its broader implications, and contribute to industry discussions on the future of generative AI and its responsible use.
          </p>
          <InternalLink to="/building" className={styles.action}>Explore what I’m building <ArrowUpRight size={20} weight="bold" aria-hidden="true" /></InternalLink>
        </div>
      </section>

      <section id="advocacy" className={styles.chapter} aria-labelledby="advocacy-heading" tabIndex={-1}>
        <div className={styles.chapterArt} aria-hidden="true"><div className={styles.imageWindow}><ResponsiveImage className={styles.chapterImage} src="/images/game/about-studies/advocacy-conversation-v1.webp" alt="" width="1122" height="1402" loading="lazy" /></div><span>03 / A personal perspective</span></div>
        <div className={styles.chapterCopy}>
          <div className={styles.sectionHeader}>
            <div><h2 id="advocacy-heading">Speaking<br />&amp; advocacy<span>.</span></h2></div>
            <InternalLink to="/contact" className={styles.socialLink} aria-label="Email">
              <EnvelopeSimple size={36} weight="bold" aria-hidden="true" />
            </InternalLink>
          </div>
          <p>
            As an advocate for neurodiversity and mental health awareness, I frequently speak about these topics.
            My late-life autism diagnosis has given me a unique perspective on problem-solving and innovation in the AI space.
          </p>
          <p>
            Since experiencing burnout followed by depression and anxiety in 2017, I've been openly sharing my
            mental health experiences. I believe that by speaking about mental health and neurodiversity, we
            encourage others to share their stories, which is the best way to break down stigma.
          </p>
          <p>
            My autism diagnosis in 2022 has further enriched my advocacy work, allowing me to share insights
            on both mental health and autistic experiences.
          </p>
          <InternalLink to="/speaking" className={styles.action}>Keynote Presentations <ArrowUpRight size={20} weight="bold" aria-hidden="true" /></InternalLink>
        </div>
      </section>
      </div>
    </div>
  );
};

export default About;
