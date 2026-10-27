import React from 'react';
import {
  X,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Landmark,
  CheckCircle2,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export default function TempleModal({
  temple,
  onClose,
  allSculptures,
  onSelectSculpture
}) {
  if (!temple) return null;

  // Filter sculptures affiliated with this temple
  const affiliatedSculptures = (allSculptures || []).filter(
    s => s.templeId === temple.id || s.templeName.toLowerCase().includes(temple.name.toLowerCase().split(' ')[0])
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '960px', padding: 0 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Hero Image Header */}
        <div style={{ position: 'relative', height: '320px', width: '100%', overflow: 'hidden' }}>
          <img
            src={temple.image}
            alt={temple.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='100%25' height='100%25' fill='%23BC8A5F'/%3E%3C/svg%3E";
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(18, 11, 8, 0.2) 0%, rgba(18, 11, 8, 0.85) 100%)'
            }}
          />

          <div style={{ position: 'absolute', bottom: '1.75rem', left: '2rem', right: '2rem', color: '#FFFDF9' }}>
            <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-gold">{temple.architecturalStyle}</span>
              {temple.heritageStatus && (
                <span className="badge" style={{ backgroundColor: 'var(--color-gold)', color: '#120B08', fontWeight: 800 }}>
                  UNESCO WORLD HERITAGE
                </span>
              )}
            </div>

            {temple.sanskritName && (
              <div style={{ fontSize: '1rem', color: 'var(--color-gold-bright)', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
                {temple.sanskritName}
              </div>
            )}

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.1rem', color: '#FFFDF9', margin: 0 }}>
              {temple.name}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '2.25rem' }}>
          
          {/* Metadata Cards Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              marginBottom: '2rem',
              fontSize: '0.9rem'
            }}
          >
            <div>
              <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                Geographic Location
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                <MapPin size={15} color="var(--color-bronze)" />
                <span>{temple.location}</span>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                Period & Dynastic Patron
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                <Calendar size={15} color="var(--color-gold)" />
                <span>{temple.period} • {temple.dynasty}</span>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                Presiding Sanctum Deity
              </span>
              <div style={{ color: 'var(--color-gold)', fontWeight: 700 }}>
                {temple.presidingDeity || 'Supreme Divinity'}
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              Architectural & Historical Significance
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {temple.description}
            </p>
          </div>

          {/* Notable Sculptures Highlights */}
          {temple.notableSculptures && temple.notableSculptures.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--color-bronze)', marginBottom: '1rem' }}>
                Notable Sculptural Collections in Sanctum & Mandapas
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                {temple.notableSculptures.map((sculpDesc, sIdx) => (
                  <div
                    key={sIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.65rem',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-secondary)',
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <CheckCircle2 size={16} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{sculpDesc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Affiliated Sculptures Catalogued in Application */}
          {affiliatedSculptures.length > 0 && (
            <div style={{ marginBottom: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                Affiliated Sculptures Catalogued in Application ({affiliatedSculptures.length})
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {affiliatedSculptures.map((sculp) => (
                  <div
                    key={sculp.id}
                    onClick={() => {
                      onClose();
                      onSelectSculpture(sculp);
                    }}
                    style={{
                      display: 'flex',
                      gap: '0.85rem',
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-gold)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                  >
                    <img
                      src={sculp.primaryImage}
                      alt={sculp.name}
                      style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <span className="badge badge-stone" style={{ fontSize: '0.65rem', alignSelf: 'flex-start', marginBottom: '0.2rem' }}>
                        {sculp.category}
                      </span>
                      <strong style={{ fontSize: '0.9rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
                        {sculp.name}
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-bronze)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                        Inspect Masterwork <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Epigraphical & Institutional Sources */}
          <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              <BookOpen size={15} />
              <span>Epigraphical & Institutional Sources</span>
            </div>
            <p style={{ margin: 0, lineHeight: 1.55 }}>
              {temple.historicalReferences || 'Recorded under Archaeological Survey of India (ASI) protected heritage monuments list.'}
            </p>
            {temple.visitingInfo && (
              <div style={{ marginTop: '0.5rem', color: 'var(--color-bronze)' }}>
                <strong>Visiting Protocols:</strong> {temple.visitingInfo}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
