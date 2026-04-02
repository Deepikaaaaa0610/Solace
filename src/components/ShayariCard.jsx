import { useMemo, useState } from 'react';
import {
  Bookmark,
  CircleHelp,
  Languages,
  PlaySquare,
  Share2,
  Volume2,
  WholeWord,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { findDictionaryEntry, normalizeDictionaryKey } from '../utils/dictionary';
import { getCleanText, repairMojibake } from '../utils/text';
import InteractivePoetryText from './InteractivePoetryText';

export default function ShayariCard({ shayari, poetName, poetId, showRoman = true, onSaveWork }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [showAlternateScript, setShowAlternateScript] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const repairedRoman = showRoman ? repairMojibake(shayari.roman || '') : '';
  const alternateScript =
    repairedRoman.trim() && repairedRoman.trim() !== shayari.text.trim() ? repairedRoman : '';
  const displayedPoem = showAlternateScript && alternateScript ? alternateScript : shayari.text;
  const secondaryText = showAlternateScript ? shayari.text : alternateScript;
  const shareTitle = `${shayari.title} - ${poetName}`;
  const shareText = getCleanText(repairedRoman, shayari.text);

  const glossaryEntries = useMemo(() => {
    const seen = new Set();

    return (shayari.text.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) || [])
      .map((token) => {
        const entry = findDictionaryEntry(token);
        const normalized = normalizeDictionaryKey(token);

        if (!entry || !normalized || seen.has(entry.id)) {
          return null;
        }

        seen.add(entry.id);
        return entry;
      })
      .filter(Boolean)
      .slice(0, 8);
  }, [shayari.text]);

  const handleBookmark = (event) => {
    event.stopPropagation();
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

  const handleListen = (event) => {
    event.stopPropagation();
    if (!('speechSynthesis' in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(displayedPoem);
    utterance.lang = showAlternateScript ? 'hi-IN' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const handleWatch = (event) => {
    event.stopPropagation();
    const query = encodeURIComponent(`${shayari.title} ${poetName} poetry recitation`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async (event) => {
    event.stopPropagation();

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
      <div className="shayari-toolbar">
        <div className="shayari-toolbar-group">
          <button
            className="shayari-toolbar-btn"
            onClick={handleListen}
            aria-label="Listen to poem"
            title="Listen"
          >
            <Volume2 size={16} />
          </button>
          <button
            className="shayari-toolbar-btn"
            onClick={handleWatch}
            aria-label="Open recitation search"
            title="Watch recitation"
          >
            <PlaySquare size={16} />
          </button>
        </div>

        <div className="shayari-toolbar-group">
          <button
            className={`shayari-toolbar-btn ${showAlternateScript ? 'active' : ''}`}
            onClick={() => setShowAlternateScript((prev) => !prev)}
            aria-label="Toggle script"
            title={alternateScript ? 'Toggle script' : 'Alternate script unavailable'}
            disabled={!alternateScript}
          >
            <WholeWord size={16} />
          </button>
          <button
            className={`shayari-toolbar-btn ${showGlossary ? 'active' : ''}`}
            onClick={() => setShowGlossary((prev) => !prev)}
            aria-label="Toggle meanings"
            title="Show meanings"
          >
            <Languages size={16} />
          </button>
          <button
            className={`shayari-toolbar-btn ${showInfo ? 'active' : ''}`}
            onClick={() => setShowInfo(true)}
            aria-label="Poem information"
            title="Poem info"
          >
            <CircleHelp size={16} />
          </button>
          <button
            className="shayari-toolbar-btn"
            onClick={handleShare}
            aria-label="Share"
            title="Share"
          >
            <Share2 size={16} />
          </button>
          <button
            className={`shayari-toolbar-btn ${bookmarked ? 'active saved' : ''}`}
            onClick={handleBookmark}
            aria-label="Save to saved works"
            title="Save to saved works"
          >
            <Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      <InteractivePoetryText text={displayedPoem} className="shayari-text" />

      {secondaryText && (
        <p className="shayari-roman">
          {showAlternateScript ? 'Roman view: ' : 'Alternate script: '}
          {secondaryText}
        </p>
      )}

      {showGlossary && (
        <div className="shayari-glossary">
          <div className="shayari-glossary-header">
            <span>Quick Meanings</span>
            <span>{glossaryEntries.length} words</span>
          </div>
          {glossaryEntries.length === 0 ? (
            <p className="shayari-glossary-empty">No dictionary words matched this poem yet.</p>
          ) : (
            <div className="shayari-glossary-list">
              {glossaryEntries.map((entry) => (
                <div key={entry.id} className="shayari-glossary-item">
                  <strong>{entry.word}</strong>
                  <p>{entry.englishMeaning}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="shayari-meta">
        <Link
          to={`/poets/${poetId}`}
          className="shayari-poet"
          onClick={(event) => event.stopPropagation()}
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
        <span className="shayari-action-stat">{shayari.likes ?? 0} likes</span>
        <div style={{ flex: 1 }} />
        <span className="tag" style={{ fontSize: '0.7rem', cursor: 'default' }}>{shayari.type}</span>
      </div>

      {saveMessage && (
        <p className="shayari-save-message">{saveMessage}</p>
      )}

      {showInfo && (
        <div className="modal-overlay" onClick={() => setShowInfo(false)}>
          <div className="modal-content poem-info-modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h2>{shayari.title}</h2>
              <button className="btn-icon" onClick={() => setShowInfo(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="poem-info-grid">
                <div className="poem-info-item">
                  <span>Poet</span>
                  <p>{poetName}</p>
                </div>
                <div className="poem-info-item">
                  <span>Type</span>
                  <p>{shayari.type}</p>
                </div>
                <div className="poem-info-item">
                  <span>Likes</span>
                  <p>{shayari.likes ?? 0}</p>
                </div>
                <div className="poem-info-item">
                  <span>Tags</span>
                  <p>{shayari.tags?.join(', ') || 'None'}</p>
                </div>
              </div>

              <div className="poem-info-preview">
                <span>Preview</span>
                <p>{shayari.text}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
