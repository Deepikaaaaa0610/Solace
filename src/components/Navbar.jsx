import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, X, LogOut, User, ShieldCheck, MessageCircleMore } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWhatsappFeature } from '../context/WhatsappFeatureContext';

export default function Navbar({ searchQuery, setSearchQuery }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const { currentAuthor } = useWhatsappFeature();
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  const links = [
    { path: '/poets', label: 'POETS' },
    { path: '/explore', label: 'SHER' },
    { path: '/submissions', label: 'WHATSAPP' },
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

            {isAuthenticated ? (
              <div className="nav-profile-wrapper" ref={profileRef}>
                <button
                  className="nav-profile-btn"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  aria-label="User profile"
                >
                  <span className="nav-avatar">{user.initials}</span>
                </button>

                {profileOpen && (
                  <div className="nav-profile-dropdown animate-fade-in">
                    <div className="nav-profile-header">
                      <span className="nav-avatar nav-avatar-lg">{user.initials}</span>
                      <div>
                        <strong>{user.name}</strong>
                        <p>{user.contact}</p>
                      </div>
                    </div>
                    <div className="nav-profile-divider" />
                    <Link to="/notebook" className="nav-profile-item" onClick={() => setProfileOpen(false)}>
                      <User size={16} />
                      My Notebook
                    </Link>
                    <Link to="/saved" className="nav-profile-item" onClick={() => setProfileOpen(false)}>
                      <User size={16} />
                      Saved Works
                    </Link>
                    <Link to="/submissions" className="nav-profile-item" onClick={() => setProfileOpen(false)}>
                      <MessageCircleMore size={16} />
                      WhatsApp Hub
                    </Link>
                    {currentAuthor && (
                      <Link to={`/authors/${currentAuthor.slug}`} className="nav-profile-item" onClick={() => setProfileOpen(false)}>
                        <User size={16} />
                        Author Page
                      </Link>
                    )}
                    {user?.isAdmin && (
                      <Link to="/admin/moderation" className="nav-profile-item" onClick={() => setProfileOpen(false)}>
                        <ShieldCheck size={16} />
                        Moderation
                      </Link>
                    )}
                    <div className="nav-profile-divider" />
                    <button className="nav-profile-item nav-profile-logout" onClick={logout}>
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="rekhta-nav-btn" onClick={() => openAuthModal()}>
                LOG IN
              </button>
            )}

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

        {isAuthenticated && (
          <div className="rekhta-drawer-user">
            <span className="nav-avatar">{user.initials}</span>
            <div>
              <strong>{user.name}</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user.contact}</p>
            </div>
          </div>
        )}

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

        {isAuthenticated ? (
          <button className="rekhta-drawer-link" onClick={logout} style={{ marginTop: 'auto' }}>
            Sign Out
          </button>
        ) : (
          <button
            className="btn btn-primary"
            style={{ margin: 'var(--space-md) 0', width: '100%' }}
            onClick={() => { setMobileOpen(false); openAuthModal(); }}
          >
            LOG IN
          </button>
        )}
      </aside>
    </>
  );
}
