import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ArrowRight,
  Download,
  Sparkles,
  Check,
  Copy
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';
import { MagicRings, ShinyText, StarBorder } from './react-bits';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  return (
    <footer
      className="site-footer"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#252A34',
        borderTop: '1px solid rgba(106, 112, 124, 0.28)'
      }}
    >
      {/* Interactive MagicRings Hero Banner in Footer */}
      <div
        className="footer-magic-stage"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '380px',
          borderBottom: '1px solid rgba(106, 112, 124, 0.2)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Background Magic Rings Three.js Shader */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.9 }}>
          <MagicRings
            color="#C99327"
            colorTwo="#E5B83B"
            ringCount={7}
            speed={1.1}
            attenuation={8.5}
            lineThickness={1.8}
            baseRadius={0.32}
            radiusStep={0.09}
            scaleRate={0.12}
            opacity={0.9}
            blur={0}
            noiseAmount={0.08}
            rotation={-10}
            ringGap={1.45}
            fadeIn={0.65}
            fadeOut={0.5}
            followMouse={true}
            mouseInfluence={0.25}
            hoverScale={1.18}
            parallax={0.05}
            clickBurst={true}
            alphaMode="luminance"
          />
        </div>

        {/* Foreground Call-To-Action Floating Content */}
        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            padding: '50px 20px',
            pointerEvents: 'none'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(45, 49, 58, 0.9)',
              border: '1px solid rgba(201, 147, 39, 0.35)',
              backdropFilter: 'blur(10px)',
              marginBottom: '16px',
              boxShadow: '0 0 20px rgba(201, 147, 39, 0.15)'
            }}
          >
            <Sparkles size={14} color="#E5B83B" />
            <span
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--gold-bright)',
                letterSpacing: '0.1em'
              }}
            >
              INTERACTIVE THREE.JS SHADER · CLICK TO BURST
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 800,
              color: '#ffffff',
              margin: '0 auto 14px auto',
              maxWidth: '700px',
              lineHeight: 1.2
            }}
          >
            Let's Engineer Something{' '}
            <ShinyText text="Remarkable" speed={3} color="#C99327" shineColor="#FFF8DC" /> Together
          </h2>

          <p
            style={{
              maxWidth: '520px',
              margin: '0 auto 24px auto',
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '0.95rem'
            }}
          >
            Open for full-stack contracts, MERN enterprise systems, and remote engineering opportunities.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '14px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              pointerEvents: 'auto'
            }}
          >
            <button
              className="btn-primary"
              style={{ borderRadius: '100px', padding: '12px 24px' }}
              onClick={() => scrollToSection('contact')}
            >
              <span>Start a Conversation</span>
              <ArrowRight size={14} />
            </button>
            <button className="btn-outline" onClick={copyEmail} title="Copy email address">
              {copied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
              <span>{copied ? 'Email Copied!' : 'Copy Direct Email'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information Grid */}
      <div className="container" style={{ padding: '60px 20px 40px 20px', position: 'relative', zIndex: 2 }}>
        <div className="footer-links-grid">
          {/* Column 1: Brand & Bio */}
          <div>
            <Link
              className="logo"
              to="/"
              style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', textDecoration: 'none' }}
            >
              Abdullah<span style={{ color: 'var(--gold-bright)' }}>.</span>
            </Link>
            <p style={{ marginTop: '14px', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Frontend & MERN Stack Software Developer building production REST APIs, enterprise POS/ERP systems, and high-performance web applications.
            </p>
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="status-dot" style={{ position: 'static' }} />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {PERSONAL_INFO.status}
              </span>
            </div>
            <div
              style={{
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text-muted)',
                fontSize: '0.8rem'
              }}
            >
              <MapPin size={13} color="var(--gold-bright)" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--gold-bright)',
                letterSpacing: '0.08em',
                marginBottom: '16px',
                textTransform: 'uppercase'
              }}
            >
              Navigation
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <li>
                <a
                  href="#hero"
                  onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem' }}
                >
                  Home (Overview)
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem' }}
                >
                  About & Why Work With Me
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem' }}
                >
                  Core Skills & Domains
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem' }}
                >
                  Production Projects
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }}
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem' }}
                >
                  Work Experience
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem' }}
                >
                  Contact & Hire
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Production Systems */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--gold-bright)',
                letterSpacing: '0.08em',
                marginBottom: '16px',
                textTransform: 'uppercase'
              }}
            >
              Featured Systems
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              {PROJECTS.map((p) => (
                <li key={p.id}>
                  <a
                    href="#projects"
                    onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.86rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>{p.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect & Resume */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--gold-bright)',
                letterSpacing: '0.08em',
                marginBottom: '16px',
                textTransform: 'uppercase'
              }}
            >
              Connect & Assets
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '0.86rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Github size={15} color="var(--gold-bright)" />
                <span>GitHub (lets-abdullah)</span>
                <ExternalLink size={11} style={{ marginLeft: 'auto', opacity: 0.6 }} />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '0.86rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Linkedin size={15} color="var(--gold-bright)" />
                <span>LinkedIn Profile</span>
                <ExternalLink size={11} style={{ marginLeft: 'auto', opacity: 0.6 }} />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '0.86rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Mail size={15} color="var(--gold-bright)" />
                <span>Email Muhammad</span>
              </a>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '0.86rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Phone size={15} color="var(--gold-bright)" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              <div style={{ marginTop: '10px' }}>
                <a
                  className="btn-outline"
                  href={PERSONAL_INFO.resumeUrl}
                  download="Muhammad_Abdullah_Resume.pdf"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem', padding: '8px 12px' }}
                >
                  <Download size={13} />
                  <span>Download Resume (PDF)</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} <strong>{PERSONAL_INFO.name}</strong>. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Multan, Pakistan · UTC+5
            </span>
            <button
              onClick={scrollToTop}
              className="filter-tab"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', fontSize: '0.78rem' }}
              title="Scroll to top of page"
            >
              <span>Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
