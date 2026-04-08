import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getCleanText } from '../utils/text';
import InteractivePoetryText from './InteractivePoetryText';

export default function HeroSection({
  featuredWork,
  featuredPoet,
  poetryOfDayWorks = [],
  archiveStats = [],
  featuredMoods = [],
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Build slides from poets and featured work
  const slides = poetryOfDayWorks.slice(0, 5).map((work) => ({
    id: work.id,
    title: work.title,
    text: getCleanText(work.roman, work.text),
    poetName: work.poetName,
    poetId: work.poetId,
    type: work.type,
    likes: work.likes,
  }));

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  if (!slides.length) return null;

  const active = slides[currentSlide];

  return (
    <section className="rekhta-hero">
      {/* Full-width banner carousel */}
      <div className="rekhta-banner">
        <div className="rekhta-banner-content">
          <div className="rekhta-banner-left">
            <h1 className="rekhta-banner-title">
              TODAY'S<br />
              FEATURED<br />
              POETRY
            </h1>
            <p className="rekhta-banner-sub">
              Curated daily from the archive of {archiveStats[0]?.value || '8+'} legendary poets
            </p>
          </div>
          <div className="rekhta-banner-right">
            <div className="rekhta-banner-badge">solace <span>PLUS</span></div>
            <p className="rekhta-banner-date">
              {new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit' }).toUpperCase()}
            </p>
            <p className="rekhta-banner-time">CURATED DAILY</p>
            <Link to="/explore" className="rekhta-banner-cta">EXPLORE NOW</Link>
          </div>
        </div>

        {/* Carousel arrows */}
        <button className="rekhta-banner-arrow left" onClick={prevSlide} aria-label="Previous">
          <ChevronLeft size={24} />
        </button>
        <button className="rekhta-banner-arrow right" onClick={nextSlide} aria-label="Next">
          <ChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="rekhta-banner-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`rekhta-dot ${i === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Today's top shayari —  carousel below the banner */}
      <div className="rekhta-top-section">
        <h2 className="rekhta-top-title">TODAY'S TOP 5 URDU SHAYARI</h2>

        <div className="rekhta-top-shayari">
          <div className="rekhta-top-poem">
            <InteractivePoetryText text={active.text} className="rekhta-top-text" />
            <div className="rekhta-top-meta">
              <Link to={`/poets/${active.poetId}`} className="rekhta-top-poet">— {active.poetName}</Link>
              <span className="rekhta-top-type">{active.type}</span>
            </div>
          </div>

          <div className="rekhta-top-nav">
            <button onClick={prevSlide} aria-label="Previous poem"><ChevronLeft size={20} /></button>
            <span>{currentSlide + 1} / {totalSlides}</span>
            <button onClick={nextSlide} aria-label="Next poem"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
