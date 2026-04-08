import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer-grid">
          <div className="site-footer-brand">
            <p className="site-footer-kicker">Solace</p>
            <h3>Poetry, arranged like a product people want to return to.</h3>
            <p>
              Discover timeless Urdu writing, keep your own notes, and move between the canon and the
              community without friction.
            </p>
            <Link to="/explore" className="site-footer-link">
              Explore the archive
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="site-footer-column">
            <h4>Browse</h4>
            <Link to="/explore">All works</Link>
            <Link to="/poets">Poet profiles</Link>
            <Link to="/dictionary">Dictionary</Link>
          </div>

          <div className="site-footer-column">
            <h4>Participate</h4>
            <Link to="/community">Community</Link>
            <Link to="/saved">Saved works</Link>
            <Link to="/notebook">Notebook</Link>
          </div>

          <div className="site-footer-column">
            <h4>Atmosphere</h4>
            <span>Daily featured work</span>
            <span>Editorial discovery</span>
            <span>Archive-first reading</span>
          </div>
        </div>

        <div className="site-footer-bottom">
          <span>
            Copyright 2026 Solace. Made with <Heart size={14} /> for poetry lovers.
          </span>
          <span>Inspired by the archive tradition Rekhta made beloved.</span>
        </div>
      </div>
    </footer>
  );
}
