import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Volume2, X } from 'lucide-react';

export default function WordMeaningModal({ entry, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!entry) {
    return null;
  }

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(entry.transliteration || entry.word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="word-meaning-overlay" onClick={onClose}>
      <div className="word-meaning-modal" onClick={(event) => event.stopPropagation()}>
        <div className="word-meaning-header">
          <div>
            <h3>{entry.word}</h3>
            <p className="word-meaning-transliteration">{entry.transliteration}</p>
          </div>

          <div className="word-meaning-actions">
            <button
              type="button"
              className="btn-icon word-meaning-icon"
              onClick={handleSpeak}
              aria-label={`Listen to ${entry.word}`}
              title="Listen"
            >
              <Volume2 size={18} />
            </button>
            <button
              type="button"
              className="btn-icon word-meaning-icon"
              onClick={onClose}
              aria-label="Close word meaning"
              title="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="word-meaning-body">
          <div className="word-meaning-block">
            <span>English</span>
            <p>{entry.englishMeaning}</p>
          </div>

          <div className="word-meaning-block">
            <span>Hindi</span>
            <p>{entry.hindiMeaning}</p>
          </div>

          <div className="word-meaning-block">
            <span>Simple Explanation</span>
            <p>{entry.simpleExplanation}</p>
          </div>
        </div>

        <div className="word-meaning-footer">
          <Link
            to={`/dictionary?query=${encodeURIComponent(entry.transliteration || entry.word)}`}
            className="word-meaning-link"
          >
            Learn more in Dictionary
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
