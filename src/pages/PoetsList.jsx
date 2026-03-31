import PoetCard from '../components/PoetCard';
import { poets } from '../data/poets';

export default function PoetsList() {
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
      </div>
    </div>
  );
}
