import { useState } from 'react';
import { Heart, Bookmark, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCleanText } from '../utils/text';
import InteractivePoetryText from './InteractivePoetryText';

export default function ShayariCard({ shayari, poetName, poetId, showRoman = true, onSaveWork }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(shayari.likes ?? 0);
  const [saveMessage, setSaveMessage] = useState('');
  const secondaryText = showRoman ? getCleanText(shayari.roman) : '';
  const shareTitle = `${shayari.title} - ${poetName}`;
  const shareText = getCleanText(shayari.roman, shayari.text);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    if (onSaveWork) {
      const result = onSaveWork({
        ...shayari,
        poetId,
        poetName,
      });
      setBookmarked(true);
      setSaveMessage(
        result?.added
          ? `Saved to ${result.collectionName}`
          : `Already in ${result.collectionName}`
      );
      window.setTimeout(() => setSaveMessage(''), 2200);
      return;
    }

    setBookmarked(!bookmarked);
  };

  const handleShare = async (e) => {
    e.stopPropagation();

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
        });
        return;
      } catch {
        // Ignore cancelled shares and fall back to the clipboard path below.
      }
    }

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(`${shareTitle}\n\n${shareText}`);
    }
  };

  return (
    <div className="card shayari-card">
      <InteractivePoetryText text={shayari.text} className="shayari-text" />

      {secondaryText && (
        <p className="shayari-roman">{secondaryText}</p>
      )}

      <div className="shayari-meta">
        <Link
          to={`/poets/${poetId}`}
          className="shayari-poet"
          onClick={(e) => e.stopPropagation()}
        >
          - {poetName}
        </Link>
        <div className="shayari-tags">
          {shayari.tags && shayari.tags.slice(0, 2).map((tag) => (
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
          aria-label="Save to saved works"
          title="Save to saved works"
        >
          <Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
        <button className="shayari-action-btn" onClick={handleShare} aria-label="Share">
          <Share2 size={16} />
        </button>
        <div style={{ flex: 1 }} />
        <span className="tag" style={{ fontSize: '0.7rem', cursor: 'default' }}>{shayari.type}</span>
      </div>

      {saveMessage && (
        <p className="shayari-save-message">{saveMessage}</p>
      )}
    </div>
  );
}
