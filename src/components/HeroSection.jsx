import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { featuredShayaris } from '../data/shayaris';

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % featuredShayaris.length);
        setFade(true);
      }, 500);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = featuredShayaris[currentIndex];

  return (
    <section className="hero">
      <div className="hero-bg" />
      
      {/* Floating particles */}
      <div className="hero-particles">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${15 + i * 15}%`,
            animationDelay: `${i * 1.2}s`,
            animationDuration: `${8 + i * 2}s`,
          }} />
        ))}
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <Sparkles size={14} />
          <span>Poetry Lives Here</span>
        </div>

        <h1 className="hero-title">
          Find Your <span className="gold">Solace</span> in Words
        </h1>

        <div className="hero-ornament" />

        <p
          className="hero-shayari"
          style={{
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.5s ease',
            animation: 'none'
          }}
        >
          {current.roman}
        </p>

        <p
          className="hero-shayari-poet"
          style={{
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.5s ease',
            animation: 'none'
          }}
        >
          — {current.poet}
        </p>

        <div className="hero-actions" style={{ animation: 'none', opacity: 1 }}>
          <Link to="/explore" className="btn btn-primary">
            <BookOpen size={18} />
            Explore Poetry
          </Link>
          <Link to="/community" className="btn btn-outline">
            Share Your Words
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Dots indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '2rem'
        }}>
          {featuredShayaris.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setFade(false);
                setTimeout(() => { setCurrentIndex(i); setFade(true); }, 300);
              }}
              style={{
                width: i === currentIndex ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === currentIndex ? 'var(--gold)' : 'rgba(212,168,83,0.3)',
                border: 'none',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                padding: 0,
              }}
              aria-label={`Show shayari ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
