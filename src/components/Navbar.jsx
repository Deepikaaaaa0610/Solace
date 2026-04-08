import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';

export default function Navbar({ searchQuery, setSearchQuery }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  const links = [
    { path: '/poets', label: 'POETS' },
    { path: '/explore', label: 'SHER' },
    { path: '/dictionary', label: 'DICTIONARY' },
    { path: '/community', label: 'COMMUNITY' },
    { path: '/saved', label: 'SAVED' },
    { path: '/notebook', label: 'NOTEBOOK' },
  ];

  return (
    <>
      <nav className={`rekhta-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="rekhta-nav-inner">
          <Link to="/" className="rekhta-logo">
            <span className="rekhta-logo-text">solace</span>
          </Link>

          <div className="rekhta-nav-links">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`rekhta-nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="rekhta-nav-right">
            <div className="rekhta-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Link to="/community" className="rekhta-nav-btn rekhta-nav-btn-lang">ENG</Link>
            <Link to="/notebook" className="rekhta-nav-btn">LOG IN</Link>

            <button
              className="rekhta-mobile-btn"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
              type="button"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`rekhta-drawer-bg ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />
      <aside className={`rekhta-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="rekhta-drawer-head">
          <span className="rekhta-logo-text" style={{ fontSize: '1.6rem' }}>solace</span>
          <button onClick={() => setMobileOpen(false)} type="button">
            <X size={20} />
          </button>
        </div>

        <div className="rekhta-search" style={{ width: '100%' }}>
          <Search size={16} />
          <input
            type="text"
            placeholder="Search poets, ghazals, moods"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`rekhta-drawer-link ${isActive(link.path) ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </aside>
    </>
  );
}
