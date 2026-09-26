import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  MapPin,
  Copy,
  Check,
  CheckCircle2,
  Database,
  Layers,
  Layout,
  Send
} from 'lucide-react';
import {
  PERSONAL_INFO,
  PROJECTS,
  EXPERIENCES,
  TECH_MARQUEE_ROW_1,
  TECH_MARQUEE_ROW_2
} from '../data/portfolioData';
import {
  ShinyText,
  BlurText,
  StarBorder
} from '../components/react-bits';

export const Home: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Contact form state
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    projectType: 'MERN Stack Web Application',
    message: ''
  });

  const phrases = [
    'Frontend & MERN Stack Web Developer',
    'Full-Stack JavaScript & TypeScript Engineer',
    'Web Developer @ HAT Tech Media',
    'Enterprise POS & ERP Systems Developer'
  ];

  // Typewriter effect
  useEffect(() => {
    const currentPhrase = phrases[phraseIdx];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentPhrase.substring(0, charIdx + 1));
        if (charIdx + 1 === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        } else {
          setCharIdx(charIdx + 1);
        }
      } else {
        setTypedText(currentPhrase.substring(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setIsDeleting(false);
          setPhraseIdx((phraseIdx + 1) % phrases.length);
          setCharIdx(0);
        } else {
          setCharIdx(charIdx - 1);
        }
      }
    }, isDeleting ? 30 : 70);

    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, phraseIdx]);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        projectType: 'MERN Stack Web Application',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section id="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="hero-mesh" />
        <div className="grid-overlay" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-grid">
            {/* Left Column */}
            <div className="hero-left">
              <div className="status-badge">
                <span className="status-dot" />
                <span>Web Developer @ {PERSONAL_INFO.company}</span>
              </div>

              <h1 className="hero-title" style={{ lineHeight: 1.1 }}>
                <BlurText text="Architecting" delay={70} animateBy="letters" />{' '}
                <ShinyText text="Full-Stack MERN" speed={3} color="#E5B83B" shineColor="#FFF0C4" />{' '}
                & Web Applications
              </h1>

              <div className="hero-subtitle">
                {typedText}
                <span style={{ animation: 'blink 1s infinite', color: '#E5B83B' }}>|</span>
              </div>

              <p className="hero-desc">
                Full-Stack Software Engineer building production REST APIs, POS/ERP management systems, and modern web applications with React.js, Node.js, Express, and MongoDB.
              </p>

              <div className="hero-actions" style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="btn-primary"
                  style={{ borderRadius: '100px' }}
                >
                  <span>Let's Talk</span>
                  <ArrowRight size={15} />
                </button>
                <a
                  href={PERSONAL_INFO.resumeUrl}
                  download="Muhammad_Abdullah_Resume.pdf"
                  className="btn-outline"
                  style={{ borderRadius: '100px' }}
                >
                  <span>Download Resume</span>
                  <ArrowRight size={15} />
                </a>
              </div>

              {/* Quick Stats Row */}
              <div className="quick-stats-strip" style={{ marginTop: '40px' }}>
                <div className="quick-stat-box">
                  <div className="quick-stat-num">MERN</div>
                  <div className="quick-stat-lbl">Full-Stack Dev</div>
                </div>
                <div className="quick-stat-box">
                  <div className="quick-stat-num">4+</div>
                  <div className="quick-stat-lbl">Major Systems</div>
                </div>
                <div className="quick-stat-box">
                  <div className="quick-stat-num">100%</div>
                  <div className="quick-stat-lbl">Milestone Delivery</div>
                </div>
              </div>
            </div>

            {/* Right Column: Photo with Grid Overlay */}
            <div className="hero-photo-col">
              <div className="hero-photo-frame">
                <img
                  src="/screenshots/abdullah-hero.jpg"
                  alt="Muhammad Abdullah — Full-Stack Engineer"
                />
                <div className="hero-photo-grid" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DUAL TECH MARQUEES */}
      <section id="tech-marquees">
        <div className="marquee-wrapper">
          <div className="marquee-row left">
            {TECH_MARQUEE_ROW_1.map((item, idx) => (
              <span key={`m1-${idx}`} className="tech-badge">
                {item}
              </span>
            ))}
          </div>
          <div className="marquee-row right">
            {TECH_MARQUEE_ROW_2.map((item, idx) => (
              <span key={`m2-${idx}`} className="tech-badge">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT / WHY WORK WITH ME — Bento Grid */}
      <section className="section-inner" id="about">
        <div className="container">
          <div style={{ maxWidth: '580px' }}>
            <div className="section-label">Why Partner With Me</div>
            <h2 style={{ marginTop: '4px', lineHeight: 1.1 }}>
              Why Work With Me Today And Always?
            </h2>
          </div>

          <div className="bento-grid">
            {/* Card 1: Left Top — Production-Grade Code */}
            <div className="bento-card">
              <div className="bento-card-visual">
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '20px',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}>
                  {['React.js', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'REST APIs', 'JWT Auth', 'Vite'].map((t) => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      padding: '5px 11px',
                      borderRadius: '6px',
                      background: 'rgba(201, 147, 39, 0.12)',
                      border: '1px solid rgba(201, 147, 39, 0.25)',
                      color: 'rgba(229, 184, 59, 0.9)'
                    }}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="bento-card-body">
                <h3>Production-Grade Code</h3>
                <p>Clean, maintainable source code with decoupled MVC architecture and full type safety built in.</p>
              </div>
            </div>

            {/* Card 2: Right — Tall Performance & Strategy */}
            <div className="bento-card bento-tall">
              <div className="bento-card-visual bento-card-visual-tall"
                style={{
                  background: 'linear-gradient(135deg, rgba(45, 49, 58, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-end',
                  padding: '24px'
                }}
              >
                <svg width="100%" height="60" viewBox="0 0 300 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 30 C20 10, 40 50, 60 30 S100 10, 120 30 S160 50, 180 30 S220 10, 240 30 S280 50, 300 30"
                    stroke="rgba(201, 147, 39, 0.5)" strokeWidth="1.5" fill="none" />
                  <circle cx="180" cy="30" r="4" fill="#C99327" />
                </svg>
              </div>
              <div className="bento-card-body">
                <h3>Performance-First Development</h3>
                <p>Ultra-fast rendering, lightweight asset footprints, and sub-40ms edge response times.</p>
              </div>
              <div className="bento-card-body" style={{ paddingTop: 0 }}>
                <h3 style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.07)' }}>Business-Driven Solutions</h3>
                <p>Clear technical communication and direct alignment on delivering measurable operational value.</p>
              </div>
            </div>

            {/* Card 3: Left Bottom — Scalable Systems */}
            <div className="bento-card">
              <div className="bento-card-visual">
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                  padding: '20px',
                  width: '100%'
                }}>
                  {['POS System', 'Hotel ERP', 'Pharmacy ERP', 'Gym Portal', 'Mandi POS', 'REST APIs'].map((s) => (
                    <div key={s} style={{
                      background: 'rgba(20, 20, 20, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      padding: '8px',
                      textAlign: 'center',
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'rgba(255, 255, 255, 0.55)'
                    }}>{s}</div>
                  ))}
                </div>
              </div>
              <div className="bento-card-body">
                <h3>Scalable Enterprise Systems</h3>
                <p>Real-world ERP, POS, and inventory management platforms built to handle business complexity.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE SKILLS & DOMAINS */}
      <section id="skills" className="section-inner" style={{ background: 'rgba(30, 34, 42, 0.6)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Engineering Focus</div>
            <h2 style={{ marginTop: '8px' }}>Core Development Domains</h2>
            <p style={{ maxWidth: '540px', margin: '14px auto 0 auto', color: 'rgba(255, 255, 255, 0.45)', fontSize: '0.96rem', lineHeight: 1.65 }}>
              Specialized expertise across modern full-stack development, scalable backend architectures, and mission-critical enterprise systems.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="domains-grid">
            {/* Domain 01 — MERN Full-Stack */}
            <div style={{
              background: 'rgba(45, 49, 58, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.07)',
              borderRadius: '18px',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
              transition: 'border-color 0.25s ease'
            }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201, 147, 39, 0.35)'}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255, 255, 255, 0.07)'}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <span className="card-step-badge">DOMAIN 01</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Database size={14} color="#E5B83B" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', fontWeight: 600, color: '#E5B83B' }}>MERN FULL-STACK</span>
                  </div>
                </div>
                <h3 style={{ fontSize: '1.2rem', lineHeight: 1.25, marginBottom: '10px' }}>Full-Stack Web Applications & REST APIs</h3>
                <p style={{ fontSize: '0.86rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.5)', margin: 0 }}>
                  Scalable web platforms built with React.js frontends, Node & Express REST API backends, and MongoDB document databases.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'TypeScript'].map(t => (
                  <span key={t} className="project-tag" style={{ fontSize: '0.68rem' }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Domain 02 — Enterprise Systems */}
            <div style={{
              background: 'rgba(45, 49, 58, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.07)',
              borderRadius: '18px',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
              transition: 'border-color 0.25s ease'
            }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201, 147, 39, 0.35)'}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255, 255, 255, 0.07)'}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <span className="card-step-badge">DOMAIN 02</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Layers size={14} color="#E5B83B" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', fontWeight: 600, color: '#E5B83B' }}>ENTERPRISE SYSTEMS</span>
                  </div>
                </div>
                <h3 style={{ fontSize: '1.2rem', lineHeight: 1.25, marginBottom: '10px' }}>POS & ERP Software Solutions</h3>
                <p style={{ fontSize: '0.86rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.5)', margin: 0 }}>
                  High-volume inventory management, room reservations, agricultural trade workflows, and business administrative dashboards.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                {['POS Systems', 'ERP Dashboards', 'Inventory Analytics', 'Financial Ledgers'].map(t => (
                  <span key={t} className="project-tag" style={{ fontSize: '0.68rem' }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Domain 03 — Frontend Architecture */}
            <div style={{
              background: 'rgba(45, 49, 58, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.07)',
              borderRadius: '18px',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
              transition: 'border-color 0.25s ease'
            }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201, 147, 39, 0.35)'}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255, 255, 255, 0.07)'}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <span className="card-step-badge">DOMAIN 03</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Layout size={14} color="#E5B83B" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', fontWeight: 600, color: '#E5B83B' }}>FRONTEND ARCHITECTURE</span>
                  </div>
                </div>
                <h3 style={{ fontSize: '1.2rem', lineHeight: 1.25, marginBottom: '10px' }}>Responsive UIs & API Integrations</h3>
                <p style={{ fontSize: '0.86rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.5)', margin: 0 }}>
                  Fluid, responsive web interfaces with modern aesthetics, interactive components, and production deployment pipelines.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                {['HTML5 / CSS3', 'TypeScript', 'Vite / React', 'Git / GitHub'].map(t => (
                  <span key={t} className="project-tag" style={{ fontSize: '0.68rem' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTION SYSTEMS */}
      <section id="projects" className="section-inner">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Featured Production Systems</div>
            <h2 style={{ marginTop: '8px' }}>Full-Stack Projects in Motion</h2>
            <p style={{ maxWidth: '560px', margin: '14px auto 0 auto', color: 'rgba(255, 255, 255, 0.45)', fontSize: '0.96rem', lineHeight: 1.65 }}>
              Enterprise ERPs, inventory management systems, and client interfaces — built, shipped, and running in production.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
            className="projects-showcase-grid"
          >
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                style={{
                  background: 'rgba(45, 49, 58, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.25s ease, transform 0.25s ease',
                  cursor: 'default'
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201, 147, 39, 0.35)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255, 255, 255, 0.07)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                }}
              >
                {/* Project Image */}
                <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden', background: '#080808' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                  />
                  {/* Status Badge */}
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    fontSize: '0.66rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    color: project.featured ? '#10B981' : '#E5B83B',
                    background: 'rgba(0, 0, 0, 0.75)',
                    border: `1px solid ${project.featured ? '#10B98155' : '#E5B83B55'}`,
                    padding: '3px 9px',
                    borderRadius: '4px',
                    backdropFilter: 'blur(8px)',
                    letterSpacing: '0.05em'
                  }}>
                    {project.featured ? 'LIVE PRODUCTION' : 'FULL-STACK MERN'}
                  </span>
                </div>

                {/* Card Body */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#E5B83B', fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.04em' }}>
                    {project.tags[0] || 'Web System'}
                  </span>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', lineHeight: 1.25, margin: 0 }}>
                    {project.title}
                  </h3>

                  <p style={{ fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.5)', lineHeight: 1.6, margin: 0, flex: 1 }}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                    {project.tags.map(tag => (
                      <span key={tag} className="project-tag" style={{ fontSize: '0.66rem', padding: '2px 7px' }}>{tag}</span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ flex: 1, justifyContent: 'center', padding: '8px 12px', fontSize: '0.78rem', borderRadius: '8px' }}
                      >
                        <span>Live Demo</span>
                        <ExternalLink size={11} />
                      </a>
                    ) : (
                      <button
                        onClick={() => scrollToSection('contact')}
                        className="btn-primary"
                        style={{ flex: 1, justifyContent: 'center', padding: '8px 12px', fontSize: '0.78rem', borderRadius: '8px' }}
                      >
                        <span>Live Demo</span>
                        <ArrowRight size={11} />
                      </button>
                    )}
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                      style={{ padding: '8px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      title="View GitHub Repository"
                    >
                      <Github size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROFESSIONAL WORK EXPERIENCE */}
      <section id="experience" className="section-inner" style={{ background: 'rgba(30, 34, 42, 0.6)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Engineering Track Record</div>
            <h2 style={{ marginTop: '8px' }}>Professional Experience & Deliveries</h2>
            <p style={{ maxWidth: '580px', margin: '14px auto 0 auto', color: 'rgba(255, 255, 255, 0.45)', fontSize: '0.96rem', lineHeight: 1.65 }}>
              Chronological engineering milestones covering active industry work at {PERSONAL_INFO.company} and independent software contracts.
            </p>
          </div>

          {/* Chronological Timeline with Traveling Pulse Beam */}
          <div className="timeline-track-container" style={{ marginTop: '32px' }}>
            <div className="timeline-spine">
              <div className="timeline-beam" />
            </div>

            {EXPERIENCES.map((exp) => {
              const nodeNumber = exp.id === 'hat-tech-media' ? '01' : '02';

              return (
                <div key={exp.id} className="timeline-step-row">
                  {/* Left: Glowing Beacon Node */}
                  <div className="timeline-node-beacon">
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.9rem', color: 'var(--gold-bright)' }}>
                      {nodeNumber}
                    </span>
                  </div>

                  {/* Right: Content Card */}
                  <div>
                    {exp.isCurrent ? (
                      <StarBorder
                        as="div"
                        color="#E5B83B"
                        speed="4s"
                        thickness={1.5}
                        backgroundColor="var(--bg-card)"
                        borderColor="rgba(201, 147, 39, 0.45)"
                        className="w-full"
                      >
                        <div style={{ textAlign: 'left', padding: '12px 6px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span className="card-step-badge">{exp.period}</span>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                {exp.type}
                              </span>
                            </div>
                            <span className="status-badge" style={{ marginBottom: 0 }}>
                              <span className="status-dot" />
                              <span>ACTIVE INDUSTRY ROLE</span>
                            </span>
                          </div>

                          <h3 style={{ fontSize: '1.35rem', marginBottom: '6px' }}>
                            {exp.role} — <span style={{ color: 'var(--gold-bright)' }}>{exp.company}</span>
                          </h3>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-bright)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '16px' }}>
                            <MapPin size={13} />
                            <span>{exp.location}</span>
                          </div>

                          {/* Direct Key Bullets */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
                            {exp.bullets?.map((b, idx) => (
                              <div key={idx} style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                <CheckCircle2 size={15} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '3px' }} />
                                <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{b}</span>
                              </div>
                            ))}
                          </div>

                          {/* Tech Tags */}
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {exp.tags.map((tag) => (
                              <span key={tag} className="project-tag" style={{ fontSize: '0.74rem' }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </StarBorder>
                    ) : (
                      <div className="stacking-card" style={{ marginTop: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span className="card-step-badge">{exp.period}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              {exp.type}
                            </span>
                          </div>
                          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold-bright)', fontSize: '0.78rem', background: 'rgba(201, 147, 39, 0.1)', padding: '4px 12px', borderRadius: '100px', border: '1px solid rgba(201, 147, 39, 0.3)' }}>
                            CLIENT ENTERPRISE CONTRACTS
                          </span>
                        </div>

                        <h3 style={{ fontSize: '1.35rem', marginBottom: '6px' }}>
                          {exp.role} — <span style={{ color: 'var(--gold-bright)' }}>{exp.company}</span>
                        </h3>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-bright)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '16px' }}>
                          <MapPin size={13} />
                          <span>{exp.location}</span>
                        </div>

                        {/* Direct Key Bullets */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
                          {exp.bullets?.map((b, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                              <CheckCircle2 size={15} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '3px' }} />
                              <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{b}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Tags */}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {exp.tags.map((tag) => (
                            <span key={tag} className="project-tag" style={{ fontSize: '0.74rem' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. CONTACT / HIRE ME SECTION */}
      <section id="contact" className="section-inner" style={{ position: 'relative' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Initiate Contact</div>
            <h2 style={{ marginTop: '8px' }}>
              Let's Build Something <ShinyText text="Exceptional" speed={3} color="#C99327" shineColor="#FFF0C4" />
            </h2>
            <p style={{ maxWidth: '560px', margin: '14px auto 0 auto', color: 'rgba(255, 255, 255, 0.45)', fontSize: '0.96rem', lineHeight: 1.65 }}>
              Available for full-stack engineering contracts, MERN enterprise architectures, and developer opportunities.
            </p>
          </div>

          <div className="contact-grid">
            {/* Left Column: Direct Channels */}
            <div>
              <div className="contact-card-info stacking-card" style={{ marginTop: 0 }}>
                {/* Email Copy Card */}
                <div
                  className="contact-item-row"
                  onClick={copyEmail}
                  style={{ cursor: 'pointer' }}
                  title="Click to copy email address"
                >
                  <div className="contact-icon">@</div>
                  <div style={{ flex: 1 }}>
                    <span style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--gold-bright)' }}>
                      {copied ? '✓ COPIED TO CLIPBOARD' : 'CLICK TO COPY EMAIL'}
                    </span>
                    <strong style={{ fontSize: '0.9rem' }}>{PERSONAL_INFO.email}</strong>
                  </div>
                  {copied ? <Check size={16} color="var(--accent-emerald)" /> : <Copy size={16} color="var(--text-muted)" />}
                </div>

                {/* Phone */}
                <a className="contact-item-row" href={`tel:${PERSONAL_INFO.phone}`}>
                  <div className="contact-icon">PH</div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      PHONE / WHATSAPP
                    </span>
                    <strong style={{ fontSize: '0.9rem' }}>{PERSONAL_INFO.phone}</strong>
                  </div>
                </a>

                {/* GitHub */}
                <a className="contact-item-row" href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer">
                  <div className="contact-icon">GIT</div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      GITHUB PROFILE
                    </span>
                    <strong style={{ fontSize: '0.9rem' }}>github.com/lets-abdullah</strong>
                  </div>
                </a>

                {/* LinkedIn */}
                <a className="contact-item-row" href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer">
                  <div className="contact-icon">IN</div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      LINKEDIN NETWORK
                    </span>
                    <strong style={{ fontSize: '0.9rem' }}>linkedin.com/in/muhammad-abdullah</strong>
                  </div>
                </a>

                {/* Location */}
                <div className="contact-item-row">
                  <div className="contact-icon">LOC</div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      LOCATION
                    </span>
                    <strong style={{ fontSize: '0.9rem' }}>{PERSONAL_INFO.location}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div>
              <div className="stacking-card contact-form" style={{ marginTop: 0 }}>
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <CheckCircle2 size={48} color="var(--accent-emerald)" style={{ margin: '0 auto 16px auto' }} />
                    <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>Message Transmitted!</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                      Thank you for reaching out. Abdullah will review your message and reply promptly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div className="form-group">
                        <label>FIRST NAME</label>
                        <input
                          type="text"
                          required
                          placeholder="Your name"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>LAST NAME</label>
                        <input
                          type="text"
                          required
                          placeholder="Last name"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>WORK EMAIL</label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>INQUIRY TYPE</label>
                      <input
                        type="text"
                        placeholder="e.g. MERN Full-Stack, POS/ERP, Contract Role"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>PROJECT SCOPE & MESSAGE</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Tell me about your system, timeline, or engineering opportunity..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ width: '100%', justifyContent: 'center', padding: '14px', borderRadius: '10px' }}
                    >
                      <Send size={15} />
                      <span>Send Direct Message</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
