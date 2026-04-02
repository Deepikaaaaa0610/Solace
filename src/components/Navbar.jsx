import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

export default function Navbar({ searchQuery, setSearchQuery }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  const links = [
    { path: '/', label: 'Home' },
    { path: '/explore', label: 'Explore' },
    { path: '/dictionary', label: 'Dictionary' },
    { path: '/poets', label: 'Poets' },
    { path: '/community', label: 'Community' },
    { path: '/saved', label: 'Saved' },
    { path: '/notebook', label: 'Notebook' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="url(#solace-grad)"/>
              <path d="M12 6c-1.1 0-2 .9-2 2v4l3.5 3.5 1.06-1.06L12 11.88V8c0-.55-.45-1-1-1h-1z" fill="url(#solace-grad)" opacity="0.6"/>
              <path d="M7 12.5c.83 1.72 2.63 3 4.75 3 1.07 0 2.06-.33 2.88-.88" stroke="url(#solace-grad)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
              <defs>
                <linearGradient id="solace-grad" x1="2" y1="2" x2="22" y2="22">
                  <stop stopColor="#d8a48f"/>
                  <stop offset="1" stopColor="#bb8588"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="navbar-logo-text">Solace</span>
          </Link>

          <div className="navbar-links">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar-actions">
            <div className="navbar-search">
              <Search size={16} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Search poets, shayaris..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile nav overlay */}
      <div
        className={`mobile-nav-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span className="navbar-logo-text" style={{ fontSize: '1.3rem' }}>Solace</span>
          <button onClick={() => setMobileOpen(false)} className="btn-icon">
            <X size={20} />
          </button>
        </div>
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
