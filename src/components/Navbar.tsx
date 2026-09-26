import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { label: 'Home', target: 'hero' },
    { label: 'About', target: 'about' },
    { label: 'Skills', target: 'skills' },
    { label: 'Projects', target: 'projects' },
    { label: 'Experience', target: 'experience' },
    { label: 'Contact', target: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scroll Spy to highlight active nav link
      const scrollPosition = window.scrollY + 180;
      for (const item of [...navItems].reverse()) {
        const el = document.getElementById(item.target);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(item.target);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (targetId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(targetId);
    }
  };

  return (
    <>
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <a
          className="logo"
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
        >
          Abdullah<span>.</span>
        </a>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.target}>
              <a
                href={`#${item.target}`}
                className={activeSection === item.target ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.target);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            className="btn-primary nav-hire"
            onClick={() => scrollToSection('contact')}
          >
            <span>Hire Me</span>
            <ArrowUpRight size={14} />
          </button>

          <button
            className="hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open Navigation Menu"
          >
            <Menu size={22} color="var(--text-primary)" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <button
          className="mobile-close"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close Menu"
        >
          <X size={28} />
        </button>
        {navItems.map((item) => (
          <a
            key={item.target}
            href={`#${item.target}`}
            className={activeSection === item.target ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(item.target);
            }}
          >
            {item.label}
          </a>
        ))}
        <button
          className="btn-primary"
          style={{ marginTop: '20px' }}
          onClick={() => scrollToSection('contact')}
        >
          <span>Hire Me</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </>
  );
};
