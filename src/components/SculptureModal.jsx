import React, { useState } from 'react';
import {
  X,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Share2,
  Check,
  ZoomIn,
  BookOpen,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

export default function SculptureModal({
  sculpture,
  onClose,
  onSelectSculpture,
  onSelectTemple,
  allSculptures,
  allTemples
}) {
  const [selectedImage, setSelectedImage] = useState(sculpture?.primaryImage);
  const [isZoomed, setIsZoomed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!sculpture) return null;

  const gallery = sculpture.galleryImages && sculpture.galleryImages.length > 0
    ? sculpture.galleryImages
    : [sculpture.primaryImage];

  // Find related sculptures (same style or same dynasty or same temple)
  const relatedSculptures = (allSculptures || [])
    .filter(s => s.id !== sculpture.id && (s.templeId === sculpture.templeId || s.architecturalStyle === sculpture.architecturalStyle || s.category === sculpture.category))
    .slice(0, 3);

  // Associated temple
  const associatedTemple = (allTemples || []).find(t => t.id === sculpture.templeId);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '1050px', padding: 0 }}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Body */}
        <div style={{ padding: '2.5rem' }}>
          
          {/* Breadcrumb Navigation */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              marginBottom: '1.5rem',
              flexWrap: 'wrap'
            }}
          >
            <span>Temple Sculptures</span>
            <ChevronRight size={14} />
            <span>{sculpture.state}</span>
            <ChevronRight size={14} />
            <span>{sculpture.category}</span>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--color-gold)', fontWeight: 600 }}>{sculpture.name}</span>
          </nav>

          {/* Top Title & Actions Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1rem',
              marginBottom: '2rem'
            }}
          >
            <div>
              {sculpture.sanskritName && (
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.1rem',
                    color: 'var(--color-gold)',
                    fontWeight: 700,
                    marginBottom: '0.35rem'
                  }}
                >
                  {sculpture.sanskritName}
                </div>
              )}
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  color: 'var(--text-primary)',
                  lineHeight: 1.2
                }}
              >
                {sculpture.name}
              </h2>
            </div>

            {/* Share / Copy link button */}
            <button
              onClick={handleCopyLink}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}
            >
              {copiedLink ? <Check size={16} color="var(--color-gold)" /> : <Share2 size={16} />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Sculpture'}</span>
            </button>
          </div>

          {/* Main Visual & Key Metadata Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              marginBottom: '3rem'
            }}
          >
            {/* Left: Gallery & Zoomable Image */}
            <div>
              <div
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  height: '380px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-md)',
                  marginBottom: '1rem',
                  cursor: isZoomed ? 'zoom-out' : 'zoom-in'
                }}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={selectedImage || sculpture.primaryImage}
                  alt={sculpture.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: isZoomed ? 'contain' : 'cover',
                    transition: 'transform var(--transition-normal)',
                    transform: isZoomed ? 'scale(1.2)' : 'scale(1)'
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Crect width='100%25' height='100%25' fill='%23D4A373'/%3E%3Ctext x='50%25' y='50%25' fill='%23FFFDF9' font-size='24' font-family='Georgia' text-anchor='middle' dominant-baseline='middle'%3E" + encodeURIComponent(sculpture.name) + "%3C/text%3E%3C/svg%3E";
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    bottom: '0.85rem',
                    right: '0.85rem',
                    padding: '0.35rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(20, 14, 10, 0.75)',
                    backdropFilter: 'blur(4px)',
                    color: '#FFFDF9',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <ZoomIn size={14} />
                  <span>{isZoomed ? 'Click to reset' : 'Click to zoom'}</span>
                </div>
              </div>

              {/* Thumbnails row */}
              {gallery.length > 1 && (
                <div style={{ display: 'flex', gap: '0.65rem', overflowX: 'auto', paddingBottom: '0.4rem' }}>
                  {gallery.map((imgUrl, i) => (
                    <img
                      key={i}
                      src={imgUrl}
                      alt={`View ${i + 1}`}
                      onClick={() => setSelectedImage(imgUrl)}
                      style={{
                        width: '70px',
                        height: '70px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        border: selectedImage === imgUrl ? '2px solid var(--color-gold)' : '1px solid var(--border-color)',
                        opacity: selectedImage === imgUrl ? 1 : 0.65,
                        transition: 'all var(--transition-fast)'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right: Key Curatorial Metadata & Affiliations */}
            <div>
              <div
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  fontSize: '0.92rem',
                  marginBottom: '1.5rem'
                }}
              >
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                    Preserving Temple
                  </span>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.05rem', fontFamily: 'var(--font-serif)' }}>
                    {sculpture.templeName}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                    <MapPin size={14} color="var(--color-bronze)" />
                    <span>{sculpture.location} ({sculpture.state})</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.76rem', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                      Historical Period
                    </span>
                    <strong style={{ color: 'var(--text-primary)' }}>{sculpture.period}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{sculpture.dynasty}</div>
                  </div>

                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.76rem', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                      Architectural Style
                    </span>
                    <strong style={{ color: 'var(--color-gold)' }}>{sculpture.architecturalStyle}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{sculpture.category}</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.76rem', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                      Sculptural Medium
                    </span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{sculpture.material}</span>
                  </div>

                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.76rem', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                      Dimensions
                    </span>
                    <span style={{ color: 'var(--text-primary)' }}>{sculpture.dimensions || 'Canonical Talamana'}</span>
                  </div>
                </div>
              </div>

              {/* Associated Temple Quick Navigation */}
              {associatedTemple && (
                <div
                  onClick={() => {
                    onClose();
                    onSelectTemple(associatedTemple);
                  }}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-gold-border)',
                    backgroundColor: 'var(--color-gold-soft)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'transform var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div>
                    <div style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-gold)', letterSpacing: '0.05em' }}>
                      Explore Home Sanctuary
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {associatedTemple.name}
                    </div>
                  </div>
                  <ArrowRight size={18} color="var(--color-gold)" />
                </div>
              )}
            </div>
          </div>

          {/* Iconography & Sacred Symbolism Box */}
          {sculpture.iconography && (
            <div
              style={{
                marginBottom: '2.5rem',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-secondary)',
                borderLeft: '5px solid var(--color-gold)'
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.35rem',
                  color: 'var(--text-primary)',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Sparkles size={20} color="var(--color-gold)" />
                Iconography & Sacred Symbolism (Silpa Sastras)
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                {Object.entries(sculpture.iconography).map(([key, val]) => (
                  <div key={key}>
                    <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-bronze)', display: 'block', marginBottom: '0.25rem' }}>
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                      {val}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description & Artistic Significance */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                Sculptural Description
              </h4>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {sculpture.description}
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                Artistic & Technical Significance
              </h4>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {sculpture.artisticSignificance}
              </p>
            </div>
          </div>

          {/* Historical Background & Preservation Notes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
            {sculpture.historicalBackground && (
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
                  Historical Background & Dynastic Patronage
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {sculpture.historicalBackground}
                </p>
              </div>
            )}

            {sculpture.preservationNotes && (
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={18} color="var(--color-gold)" />
                  Preservation & Conservation Status
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {sculpture.preservationNotes}
                </p>
              </div>
            )}
          </div>

          {/* Academic Citations & Institutional Sources */}
          {sculpture.citations && sculpture.citations.length > 0 && (
            <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', marginBottom: '2.5rem' }}>
              <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <BookOpen size={16} />
                Verified Scholarly References & Citations
              </h5>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {sculpture.citations.map((cite, cIdx) => (
                  <li key={cIdx}>{cite}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Sculptures */}
          {relatedSculptures.length > 0 && (
            <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
                Related Temple Masterworks
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                {relatedSculptures.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectSculpture(rel);
                      setSelectedImage(rel.primaryImage);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      display: 'flex',
                      gap: '0.85rem',
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-gold)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                  >
                    <img
                      src={rel.primaryImage}
                      alt={rel.name}
                      style={{ width: '65px', height: '65px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', flexShrink: 0 }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <span className="badge badge-stone" style={{ fontSize: '0.66rem', alignSelf: 'flex-start', marginBottom: '0.2rem' }}>
                        {rel.material}
                      </span>
                      <strong style={{ fontSize: '0.88rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
                        {rel.name}
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{rel.templeName}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
