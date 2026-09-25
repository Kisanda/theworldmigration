import { useState, useEffect, useCallback } from 'react';
import logo from '../assets/logo.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    const onKey = (e) => { if (e.key === 'Escape' && isOpen) close(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close]);

  return (
    <header className={`site-header${isOpen ? ' is-open' : ''}${isScrolled ? ' is-scrolled' : ''}`}>
      <div className="wrap header-row">
        <a href="#top" className="brand-link" aria-label="The Migration Firm International Home">
          <img
            src={logo}
            alt="The Migration Firm International"
            className="brand-logo"
          />
        </a>

        <div className="menu-group" id="menu-group">
          <nav className="main-nav" id="main-nav" aria-label="Main Navigation">
            <a href="#destinations" onClick={close}>Destinations</a>
            <a href="#services" onClick={close}>Services</a>
            <a href="#process" onClick={close}>How It Works</a>
            <a href="#about" onClick={close}>About Us</a>
            <a href="#stories" onClick={close}>Success Stories</a>
            <a href="#offices" onClick={close}>Offices</a>
          </nav>
          <a href="#contact" className="btn-header" onClick={close}>
            <span className="btn-header-dot">●</span> Free Visa Assessment
          </a>
        </div>

        <button
          className="nav-toggle"
          id="navToggle"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="menu-group"
          onClick={() => setIsOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
