import { useState } from 'react';
import { Heart, Bookmark, Share2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ShayariCard({ shayari, poetName, poetId, showRoman = true }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 200) + 50);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setBookmarked(!bookmarked);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `${shayari.title} — ${poetName}`,
        text: shayari.roman || shayari.text,
      });
    }
  };

  return (
    <div className="card shayari-card">
      <p className="shayari-text">{shayari.text}</p>
      
      {showRoman && shayari.roman && (
        <p className="shayari-roman">{shayari.roman}</p>
      )}

      <div className="shayari-meta">
        <Link
          to={`/poets/${poetId}`}
          className="shayari-poet"
          onClick={(e) => e.stopPropagation()}
        >
          — {poetName}
        </Link>
        <div className="shayari-tags">
          {shayari.tags && shayari.tags.slice(0, 2).map(tag => (
            <span key={tag} className="tag" style={{ cursor: 'default' }}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="shayari-actions">
        <button
          className={`shayari-action-btn ${liked ? 'liked' : ''}`}
          onClick={handleLike}
          aria-label="Like"
        >
          <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
          <span>{likeCount}</span>
        </button>
        <button
          className={`shayari-action-btn ${bookmarked ? 'bookmarked' : ''}`}
          onClick={handleBookmark}
          aria-label="Bookmark"
        >
          <Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
        <button className="shayari-action-btn" onClick={handleShare} aria-label="Share">
          <Share2 size={16} />
        </button>
        <div style={{ flex: 1 }} />
        <span className="tag" style={{ fontSize: '0.7rem', cursor: 'default' }}>{shayari.type}</span>
      </div>
    </div>
  );
}
