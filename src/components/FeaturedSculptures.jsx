import React from 'react';
import { Eye, MapPin, Calendar, Layers, ArrowRight } from 'lucide-react';

export default function FeaturedSculptures({ sculptures, onSelectSculpture, onExploreAll }) {
  const featuredList = sculptures?.filter(s => s.featured) || sculptures?.slice(0, 6) || [];

  return (
    <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Curated Masterworks</span>
          <h2 className="section-title">Featured Temple Sculptures</h2>
          <p className="section-subtitle">
            Celebrated works exhibiting classical iconography, extraordinary metallurgical or stone carving techniques, and deep spiritual significance.
          </p>
        </div>

        {/* Sculptures Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem'
          }}
        >
          {featuredList.map((sculpture) => (
            <div
              key={sculpture.id}
              className="card"
              style={{ cursor: 'pointer' }}
              onClick={() => onSelectSculpture(sculpture)}
            >
              <div className="card-img-wrapper" style={{ height: '260px' }}>
                <img
                  src={sculpture.primaryImage}
                  alt={sculpture.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Crect width='100%25' height='100%25' fill='%23D4A373'/%3E%3Ctext x='50%25' y='50%25' fill='%23FFFDF9' font-size='24' font-family='Georgia' text-anchor='middle' dominant-baseline='middle'%3E" + encodeURIComponent(sculpture.name) + "%3C/text%3E%3C/svg%3E";
                  }}
                />
                
                {/* Floating Category Badge */}
                <span
                  className="badge badge-gold"
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backdropFilter: 'blur(8px)',
                    backgroundColor: 'rgba(30, 20, 14, 0.75)',
                    color: '#FFFDF9',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  {sculpture.category}
                </span>

                {/* Material Pill */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(30, 20, 14, 0.8)',
                    color: 'var(--color-gold)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  {sculpture.material}
                </span>
              </div>

              <div className="card-body">
                {sculpture.sanskritName && (
                  <span
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--color-gold)',
                      fontWeight: 600,
                      marginBottom: '0.25rem',
                      fontFamily: 'var(--font-serif)'
                    }}
                  >
                    {sculpture.sanskritName}
                  </span>
                )}
                
                <h3
                  style={{
                    fontSize: '1.25rem',
                    marginBottom: '0.65rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-serif)'
                  }}
                >
                  {sculpture.name}
                </h3>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '1.25rem',
                    lineHeight: 1.55,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {sculpture.shortDescription || sculpture.description}
                </p>

                {/* Metadata List */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.45rem',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--border-color)',
                    fontSize: '0.84rem',
                    color: 'var(--text-muted)',
                    marginTop: 'auto'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <MapPin size={15} color="var(--color-bronze)" />
                    <span style={{ color: 'var(--text-secondary)' }}>{sculpture.templeName}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Calendar size={15} color="var(--color-gold)" />
                    <span>{sculpture.period} ({sculpture.dynasty})</span>
                  </div>
                </div>

                {/* View Details Action */}
                <div
                  style={{
                    marginTop: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: 'var(--color-bronze)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    Inspect Iconography <ArrowRight size={15} />
                  </span>
                  <span className="badge badge-stone" style={{ fontSize: '0.72rem' }}>
                    {sculpture.architecturalStyle}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onExploreAll}
            className="btn btn-secondary"
            style={{ padding: '0.85rem 2.2rem', fontSize: '0.98rem' }}
          >
            <span>Explore All Sculptures Database</span>
            <ArrowRight size={17} />
          </button>
        </div>

      </div>
    </section>
  );
}
