import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>Solace</h3>
            <p>
              Where timeless poetry meets emerging voices. Discover the beauty of Urdu
              literature - from the golden age to the words being written today.
            </p>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <Link to="/explore">All Shayaris</Link>
            <Link to="/poets">Legendary Poets</Link>
            <Link to="/community">Community</Link>
          </div>

          <div className="footer-col">
            <h4>Categories</h4>
            <Link to="/explore">Love & Romance</Link>
            <Link to="/explore">Pain & Sorrow</Link>
            <Link to="/explore">Philosophy</Link>
            <Link to="/explore">Revolution</Link>
          </div>

          <div className="footer-col">
            <h4>About</h4>
            <a href="#">About Solace</a>
            <a href="#">Contact Us</a>
            <a href="#">Contribute</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © 2026 Solace. Made with{' '}
            <Heart size={14} style={{ display: 'inline', color: 'var(--rose)', verticalAlign: 'middle' }} />{' '}
            for poetry lovers.
          </span>
          <span>Inspired by the legacy of Rekhta</span>
        </div>
      </div>
    </footer>
  );
}
