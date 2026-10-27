import React, { useState } from 'react';
import { Clock, Landmark, Layers, Sparkles, ArrowRight } from 'lucide-react';

export default function TimelineSection({ timeline, onSelectSculpture }) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!timeline || timeline.length === 0) return null;

  const currentEra = timeline[selectedIdx];

  return (
    <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Historical Evolution</span>
          <h2 className="section-title">Timeline of Indian Temple Sculptural Traditions</h2>
          <p className="section-subtitle">
            Trace over a millennium of stylistic development—from classical Gupta rock-cut relief foundations through the heights of Chola bronzes and Hoysala chlorite schist filigree.
          </p>
        </div>

        {/* Timeline Era Nav Scroller */}
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '0.85rem',
            paddingBottom: '1.25rem',
            marginBottom: '2.5rem',
            scrollbarWidth: 'thin'
          }}
        >
          {timeline.map((era, idx) => {
            const isSelected = idx === selectedIdx;
            return (
              <button
                key={era.id}
                onClick={() => setSelectedIdx(idx)}
                style={{
                  flexShrink: 0,
                  padding: '0.9rem 1.4rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: isSelected ? 'var(--color-gold)' : 'var(--bg-card)',
                  color: isSelected ? '#120B08' : 'var(--text-primary)',
                  border: isSelected ? '1px solid var(--color-gold)' : '1px solid var(--border-color)',
                  boxShadow: isSelected ? 'var(--shadow-gold)' : 'var(--shadow-sm)',
                  textAlign: 'left',
                  transition: 'all var(--transition-normal)',
                  minWidth: '220px'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', opacity: isSelected ? 0.9 : 0.65 }}>
                  {era.timeSpan}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    marginTop: '0.3rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {era.era.split('(')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Era Detail Showcase */}
        {currentEra && (
          <div
            className="card"
            style={{
              padding: '2.5rem',
              borderTop: '5px solid var(--color-gold)',
              backgroundColor: 'var(--bg-card)'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
              
              {/* Left Column: Historical Analysis */}
              <div>
                <div className="badge badge-gold" style={{ marginBottom: '0.85rem' }}>
                  {currentEra.timeSpan}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.75rem',
                    color: 'var(--text-primary)',
                    marginBottom: '1rem'
                  }}
                >
                  {currentEra.era}
                </h3>

                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  {currentEra.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.92rem' }}>
                  <div>
                    <strong style={{ color: 'var(--color-bronze)' }}>Patron Dynasties:</strong>{' '}
                    <span style={{ color: 'var(--text-primary)' }}>{currentEra.dynasties}</span>
                  </div>

                  <div>
                    <strong style={{ color: 'var(--color-bronze)' }}>Primary Medium:</strong>{' '}
                    <span style={{ color: 'var(--text-primary)' }}>{currentEra.primaryMaterial}</span>
                  </div>

                  <div>
                    <strong style={{ color: 'var(--color-bronze)' }}>Key Canonical Monuments:</strong>{' '}
                    <span style={{ color: 'var(--text-primary)' }}>{currentEra.keyMonuments}</span>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '1.75rem',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-secondary)',
                    borderLeft: '4px solid var(--color-gold)'
                  }}
                >
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-gold)', marginBottom: '0.35rem' }}>
                    Sculptural Technique & Hallmarks
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {currentEra.sculpturalTechnique}
                  </div>
                </div>
              </div>

              {/* Right Column: Linked Sculptures from this Era */}
              <div>
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.2rem',
                    color: 'var(--text-primary)',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Sparkles size={18} color="var(--color-gold)" />
                  Documented Era Sculptures
                </h4>

                {currentEra.sculptureDetails && currentEra.sculptureDetails.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {currentEra.sculptureDetails.map((sculp) => (
                      <div
                        key={sculp.id}
                        onClick={() => onSelectSculpture(sculp)}
                        style={{
                          display: 'flex',
                          gap: '1.25rem',
                          padding: '1rem',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--color-gold)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border-color)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <img
                          src={sculp.primaryImage}
                          alt={sculp.name}
                          style={{
                            width: '90px',
                            height: '90px',
                            objectFit: 'cover',
                            borderRadius: 'var(--radius-sm)'
                          }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <span className="badge badge-gold" style={{ fontSize: '0.68rem', alignSelf: 'flex-start', marginBottom: '0.3rem' }}>
                            {sculp.material}
                          </span>
                          <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                            {sculp.name}
                          </div>
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                            {sculp.templeName}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--color-bronze)', fontWeight: 600, marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            View Iconography <ArrowRight size={12} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      padding: '2rem',
                      textAlign: 'center',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-muted)'
                    }}
                  >
                    Select an era to review affiliated monumental pieces.
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
