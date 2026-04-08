import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="rekhta-footer">
      <div className="rekhta-footer-top">
        <div className="rekhta-footer-brand">
          <span className="rekhta-footer-logo">solace</span>
          <p>Discover timeless Urdu writing, keep your own notes, and explore the archive with ease.</p>
        </div>

        <div className="rekhta-footer-col">
          <h4>Browse</h4>
          <Link to="/explore">All Works</Link>
          <Link to="/poets">Poet Profiles</Link>
          <Link to="/dictionary">Dictionary</Link>
        </div>

        <div className="rekhta-footer-col">
          <h4>Participate</h4>
          <Link to="/community">Community</Link>
          <Link to="/saved">Saved Works</Link>
          <Link to="/notebook">Notebook</Link>
        </div>

        <div className="rekhta-footer-col">
          <h4>About</h4>
          <span>Inspired by Rekhta</span>
          <span>Built for poetry lovers</span>
          <span>Archive-first reading</span>
        </div>
      </div>

      <div className="rekhta-footer-bottom">
        <span>
          © 2026 Solace. Made with <Heart size={14} fill="currentColor" /> for poetry lovers.
        </span>
        <span>Open-source licenses</span>
      </div>
    </footer>
  );
}
