import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, BookOpen, Quote, FileText } from 'lucide-react';
import ShayariCard from '../components/ShayariCard';
import { getPoetById, poets } from '../data/poets';

export default function PoetProfile() {
  const { id } = useParams();
  const poet = getPoetById(id);
  const [activeTab, setActiveTab] = useState('works');

  if (!poet) {
    return (
      <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
        <div className="empty-state">
          <div className="empty-state-icon">😕</div>
          <h3>Poet not found</h3>
          <p style={{ marginBottom: '1.5rem' }}>The poet you're looking for doesn't exist in our collection.</p>
          <Link to="/poets" className="btn btn-primary">
            <ArrowLeft size={16} /> Back to Poets
          </Link>
        </div>
      </div>
    );
  }

  const ghazals = poet.works.filter(w => w.type === 'Ghazal');
  const nazms = poet.works.filter(w => w.type === 'Nazm');
  const shers = poet.works.filter(w => w.type === 'Sher');

  const tabs = [
    { id: 'works', label: 'All Works', icon: BookOpen, count: poet.works.length },
    { id: 'ghazals', label: 'Ghazals', icon: FileText, count: ghazals.length },
    { id: 'nazms', label: 'Nazms', icon: FileText, count: nazms.length },
    { id: 'shers', label: 'Shers', icon: Quote, count: shers.length },
    { id: 'bio', label: 'Biography', icon: BookOpen, count: null },
  ];

  const getActiveWorks = () => {
    switch (activeTab) {
      case 'ghazals': return ghazals;
      case 'nazms': return nazms;
      case 'shers': return shers;
      default: return poet.works;
    }
  };

  return (
    <div style={{ paddingTop: '70px' }}>
      <div className="container">
        {/* Back link */}
        <Link
          to="/poets"
          className="btn btn-ghost"
          style={{ marginTop: 'var(--space-lg)', display: 'inline-flex' }}
        >
          <ArrowLeft size={16} /> All Poets
        </Link>

        {/* Hero */}
        <div className="poet-profile-hero animate-fade-in-up">
          <div className="poet-profile-avatar">
            {poet.image ? (
              <img src={poet.image} alt={poet.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              poet.avatar
            )}
          </div>
          <div className="poet-profile-info">
            <h1>{poet.name}</h1>
            <p style={{ fontFamily: 'var(--font-urdu)', fontSize: '1.4rem', color: 'var(--gold)', opacity: 0.6, marginBottom: '0.5rem' }}>
              {poet.nameUrdu}
            </p>
            <div className="poet-profile-era">
              <Calendar size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
              {poet.era}
              <span style={{ margin: '0 12px', color: 'var(--border-hover)' }}>|</span>
              <MapPin size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
              {poet.birthPlace}
            </div>
            <p className="poet-profile-bio">{poet.shortBio}</p>

            <div className="poet-profile-stats">
              <div className="poet-stat">
                <div className="poet-stat-value">{poet.works.length}</div>
                <div className="poet-stat-label">Works</div>
              </div>
              <div className="poet-stat">
                <div className="poet-stat-value">{ghazals.length}</div>
                <div className="poet-stat-label">Ghazals</div>
              </div>
              <div className="poet-stat">
                <div className="poet-stat-value">{nazms.length}</div>
                <div className="poet-stat-label">Nazms</div>
              </div>
              <div className="poet-stat">
                <div className="poet-stat-value">{shers.length}</div>
                <div className="poet-stat-label">Shers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="poet-profile-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`poet-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {tab.count !== null && (
                <span style={{
                  marginLeft: '6px',
                  fontSize: '0.75rem',
                  opacity: 0.6,
                  background: 'rgba(255,255,255,0.05)',
                  padding: '2px 8px',
                  borderRadius: '12px',
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="section" style={{ paddingTop: 'var(--space-lg)' }}>
          {activeTab === 'bio' ? (
            <div className="animate-fade-in" style={{ maxWidth: '700px' }}>
              <div className="card" style={{ padding: 'var(--space-2xl)' }}>
                <h2 style={{ marginBottom: 'var(--space-lg)', fontSize: '1.5rem' }}>
                  About {poet.name}
                </h2>
                {poet.fullBio.split('\n\n').map((para, i) => (
                  <p
                    key={i}
                    style={{
                      color: 'var(--text-secondary)',
                      lineHeight: 1.9,
                      marginBottom: 'var(--space-lg)',
                      fontSize: '1rem',
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <div className="shayari-grid">
              {getActiveWorks().map((work, i) => (
                <div key={work.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                  <ShayariCard shayari={work} poetName={poet.name} poetId={poet.id} />
                </div>
              ))}
              {getActiveWorks().length === 0 && (
                <div className="empty-state">
                  <div className="empty-state-icon">📜</div>
                  <h3>No {activeTab} in our collection yet</h3>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
