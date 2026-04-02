import { useState } from 'react';
import { X, Send, Feather } from 'lucide-react';

const tagOptions = ['Love', 'Pain', 'Philosophy', 'Life', 'Nature', 'Longing', 'Motivation', 'Modern', 'Revolution', 'Solitude'];

export default function CreatePost({ isOpen, onClose, onSubmit }) {
  const [displayName, setDisplayName] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [errors, setErrors] = useState({});

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : prev.length < 3
          ? [...prev, tag]
          : prev
    );
  };

  const validate = () => {
    const errs = {};
    if (!displayName.trim()) errs.displayName = 'Please enter your name';
    if (!text.trim()) errs.text = 'Please write something';
    if (text.trim().length < 10) errs.text = 'Your poetry should be at least 10 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const newPost = {
      id: `cp-${Date.now()}`,
      username: displayName.replace(/\s+/g, ''),
      displayName: displayName.trim(),
      avatar: displayName.trim().charAt(0).toUpperCase(),
      title: title.trim() || 'Untitled',
      text: text.trim(),
      tags: selectedTags,
      likes: 0,
      comments: 0,
      timestamp: Date.now(),
      liked: false,
      bookmarked: false,
    };

    onSubmit(newPost);
    setDisplayName('');
    setTitle('');
    setText('');
    setSelectedTags([]);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <Feather size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle', color: 'var(--gold)' }} />
            Share Your Poetry
          </h2>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="post-name">Your Name *</label>
            <input
              id="post-name"
              type="text"
              placeholder="e.g. Ruhaani Qalam"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            {errors.displayName && (
              <span style={{ fontSize: '0.75rem', color: 'var(--rose)', marginTop: '4px', display: 'block' }}>
                {errors.displayName}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="post-title">Title (optional)</label>
            <input
              id="post-title"
              type="text"
              placeholder="Give your poetry a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="post-text">Your Poetry *</label>
            <textarea
              id="post-text"
              placeholder="Write your shayari, ghazal, nazm or any form of poetry here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {errors.text && (
              <span style={{ fontSize: '0.75rem', color: 'var(--rose)', marginTop: '4px', display: 'block' }}>
                {errors.text}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Tags (select up to 3)</label>
            <div className="tag-selector">
              {tagOptions.map(tag => (
                <button
                  key={tag}
                  className={`tag ${selectedTags.includes(tag) ? 'active' : ''}`}
                  onClick={() => toggleTag(tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            <Send size={16} />
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
