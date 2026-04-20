import AuthorCard from '../components/AuthorCard';
import PoetCard from '../components/PoetCard';
import { useWhatsappFeature } from '../context/WhatsappFeatureContext';
import { poets } from '../data/poets';

export default function PoetsList() {
  const { authors } = useWhatsappFeature();
  const communityAuthors = authors.filter((author) => author.publishedCount > 0);

  return (
    <div>
      <div className="page-header">
        <h1>Legendary Poets</h1>
        <p>Masters of the written word whose legacy lives forever</p>
      </div>

      <div className="container section" style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="poets-grid">
          {poets.map((poet, i) => (
            <div key={poet.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <PoetCard poet={poet} />
            </div>
          ))}
        </div>

        <div className="section-header" style={{ marginTop: 'var(--space-4xl)' }}>
          <h2 className="section-title">WhatsApp Voices</h2>
        </div>
        <div className="poets-grid">
          {communityAuthors.map((author, index) => (
            <div key={author.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.08}s` }}>
              <AuthorCard author={author} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
