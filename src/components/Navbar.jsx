import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, Search, X } from 'lucide-react';

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
      <nav className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="site-nav-inner">
          <Link to="/" className="site-brand">
            <span className="site-brand-mark">S</span>
            <span className="site-brand-copy">
              <span className="site-brand-name">Solace</span>
              <span className="site-brand-tag">Urdu poetry, curated well</span>
            </span>
          </Link>

          <div className="site-nav-links">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`site-nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="site-nav-actions">
            <label className="site-search">
              <Search size={16} color="currentColor" />
              <input
                type="text"
                placeholder="Search poets, ghazals, moods"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </label>

            <Link to="/community" className="site-nav-cta">
              Share a verse
              <ArrowRight size={14} />
            </Link>

            <button
              className="site-menu-btn"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
              type="button"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`site-drawer-backdrop ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside className={`site-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="site-drawer-header">
          <div>
            <div className="site-drawer-title">Solace</div>
            <p className="site-drawer-copy">A calmer way to browse poets, poems, and shared writing.</p>
          </div>
          <button className="site-menu-btn" onClick={() => setMobileOpen(false)} type="button">
            <X size={20} />
          </button>
        </div>

        <label className="site-search site-search-drawer">
          <Search size={16} color="currentColor" />
          <input
            type="text"
            placeholder="Search the archive"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </label>

        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`site-drawer-link ${isActive(link.path) ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}

        <Link to="/community" className="site-nav-cta site-drawer-cta">
          Start writing
          <ArrowRight size={14} />
        </Link>
      </aside>
    </>
  );
}
