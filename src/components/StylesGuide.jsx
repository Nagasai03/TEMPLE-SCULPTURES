import React, { useState } from 'react';
import { Layers, CheckCircle2, Landmark, HelpCircle, ArrowRight } from 'lucide-react';

export default function StylesGuide({ styles, onSelectTempleByName }) {
  const [activeTab, setActiveTab] = useState('architectural');
  const [selectedStyleId, setSelectedStyleId] = useState('dravidian');

  if (!styles || styles.length === 0) return null;

  const architecturalStyles = styles.filter(s => s.categoryType.includes('Architectural'));
  const dynasticTraditions = styles.filter(s => s.categoryType.includes('Dynastic'));

  const currentList = activeTab === 'architectural' ? architecturalStyles : dynasticTraditions;
  const currentStyle = styles.find(s => s.id === selectedStyleId) || currentList[0] || styles[0];

  return (
    <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Architectural Taxonomy</span>
          <h2 className="section-title">Temple Architecture Styles & Dynastic Traditions</h2>
          <p className="section-subtitle">
            Ancient treatises (Silpa Sastras) classify temple orders by spatial geometry and sanctum profiles, while imperial dynasties developed signature metallurgical and stone idioms.
          </p>
        </div>

        {/* Tab Toggle: Architectural Orders vs Dynastic Traditions */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2.5rem'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              padding: '0.35rem',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <button
              onClick={() => {
                setActiveTab('architectural');
                setSelectedStyleId(architecturalStyles[0]?.id || 'dravidian');
              }}
              style={{
                padding: '0.65rem 1.6rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.9rem',
                backgroundColor: activeTab === 'architectural' ? 'var(--color-gold)' : 'transparent',
                color: activeTab === 'architectural' ? '#120B08' : 'var(--text-secondary)',
                transition: 'all var(--transition-fast)'
              }}
            >
              Architectural Orders (Nagara, Dravidian, Vesara...)
            </button>

            <button
              onClick={() => {
                setActiveTab('dynastic');
                setSelectedStyleId(dynasticTraditions[0]?.id || 'pallava');
              }}
              style={{
                padding: '0.65rem 1.6rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.9rem',
                backgroundColor: activeTab === 'dynastic' ? 'var(--color-gold)' : 'transparent',
                color: activeTab === 'dynastic' ? '#120B08' : 'var(--text-secondary)',
                transition: 'all var(--transition-fast)'
              }}
            >
              Dynastic Traditions (Chola, Pallava, Vijayanagara...)
            </button>
          </div>
        </div>

        {/* Important Distinction Notice Alert */}
        <div
          style={{
            maxWidth: '850px',
            margin: '0 auto 2.5rem auto',
            padding: '1.25rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-card)',
            borderLeft: '4px solid var(--color-gold)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <HelpCircle size={22} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            <strong style={{ color: 'var(--text-primary)' }}>Critical Scholarly Distinction:</strong> Architectural styles (such as Dravidian, Nagara, and Vesara) define formal geometric blueprints, sanctum superstructures (Vimana vs. Shikhara), and elevation canons. Dynastic traditions (such as Chola, Pallava, Hoysala, and Vijayanagara) represent sovereign patronage, local geology (e.g. soapstone vs. granite), and metallurgical schools across historical centuries.
          </div>
        </div>

        {/* Style Selector Chips */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3rem'
          }}
        >
          {currentList.map((st) => {
            const isSelected = st.id === selectedStyleId;
            return (
              <button
                key={st.id}
                onClick={() => setSelectedStyleId(st.id)}
                style={{
                  padding: '0.65rem 1.4rem',
                  borderRadius: 'var(--radius-lg)',
                  border: isSelected ? '1px solid var(--color-gold)' : '1px solid var(--border-color)',
                  backgroundColor: isSelected ? 'var(--color-gold)' : 'var(--bg-card)',
                  color: isSelected ? '#120B08' : 'var(--text-primary)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.92rem',
                  boxShadow: isSelected ? 'var(--shadow-gold)' : 'none',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {st.name}
              </button>
            );
          })}
        </div>

        {/* Deep Dive Card for Selected Style */}
        {currentStyle && (
          <div
            className="card"
            style={{
              padding: '2.5rem',
              backgroundColor: 'var(--bg-card)',
              borderTop: '5px solid var(--color-bronze)'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
              
              {/* Left Column: Visual & Overview */}
              <div>
                <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '260px', marginBottom: '1.5rem' }}>
                  <img
                    src={currentStyle.image}
                    alt={currentStyle.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(18, 11, 8, 0.8) 100%)'
                    }}
                  />
                  <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', color: '#FFFDF9' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-gold-bright)', fontWeight: 600, fontFamily: 'var(--font-serif)' }}>
                      {currentStyle.sanskritTerm}
                    </div>
                    <div style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
                      {currentStyle.name}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                  <div>
                    <strong style={{ color: 'var(--color-bronze)' }}>Historical Span:</strong>{' '}
                    <span style={{ color: 'var(--text-primary)' }}>{currentStyle.historicalSpan}</span>
                  </div>

                  <div>
                    <strong style={{ color: 'var(--color-bronze)' }}>Primary Geography:</strong>{' '}
                    <span style={{ color: 'var(--text-primary)' }}>{currentStyle.primaryRegion}</span>
                  </div>

                  <div>
                    <strong style={{ color: 'var(--color-bronze)' }}>Predominant Materials:</strong>{' '}
                    <span style={{ color: 'var(--text-primary)' }}>{currentStyle.primaryMaterials}</span>
                  </div>
                </div>

                {/* Dynastic Distinction Analysis Box */}
                <div
                  style={{
                    marginTop: '1.5rem',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-gold)', marginBottom: '0.4rem' }}>
                    Classification Context & Dynastic Nexus
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                    {currentStyle.dynasticDistinction}
                  </p>
                </div>
              </div>

              {/* Right Column: Core Architectural Features & Canonical Monuments */}
              <div>
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    color: 'var(--text-primary)',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Layers size={18} color="var(--color-gold)" />
                  Architectural & Structural Hallmarks
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem' }}>
                  {currentStyle.coreFeatures.map((feat, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={16} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: '1.75rem' }}>
                  <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--color-bronze)', marginBottom: '0.4rem' }}>
                    Sculptural Characteristics
                  </h5>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {currentStyle.sculpturalHallmarks}
                  </p>
                </div>

                <div>
                  <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--color-bronze)', marginBottom: '0.75rem' }}>
                    Canonical Monument Examples
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {currentStyle.canonicalMonuments.map((mon, j) => (
                      <div
                        key={j}
                        style={{
                          padding: '0.65rem 1rem',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--bg-secondary)',
                          fontSize: '0.88rem',
                          color: 'var(--text-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <Landmark size={15} color="var(--color-gold)" />
                        <span>{mon}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
