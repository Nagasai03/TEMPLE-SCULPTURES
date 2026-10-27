import React, { useState } from 'react';
import { Landmark, MapPin, Calendar, Layers, Search, ArrowRight } from 'lucide-react';

export default function PopularTemples({
  temples,
  onSelectTemple,
  isFullDirectory = false,
  onSelectSculptureById
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [selectedState, setSelectedState] = useState('All');

  let filtered = [...(temples || [])];

  if (searchTerm.trim()) {
    const q = searchTerm.toLowerCase();
    filtered = filtered.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.location.toLowerCase().includes(q) ||
      t.dynasty.toLowerCase().includes(q) ||
      t.architecturalStyle.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
    );
  }

  if (selectedStyle !== 'All') {
    filtered = filtered.filter(t => t.architecturalStyle.toLowerCase().includes(selectedStyle.toLowerCase()));
  }

  if (selectedState !== 'All') {
    filtered = filtered.filter(t => t.state === selectedState);
  }

  const styles = ['All', 'Dravidian', 'Nagara', 'Vesara', 'Hoysala', 'Kalinga', 'Pallava', 'Vijayanagara'];
  const states = ['All', 'Tamil Nadu', 'Karnataka', 'Telangana', 'Andhra Pradesh', 'Odisha', 'Madhya Pradesh', 'Maharashtra'];

  return (
    <section style={{ padding: isFullDirectory ? '3rem 0 6rem 0' : '6rem 0', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Sanctuaries of Stone</span>
          <h2 className="section-title">
            {isFullDirectory ? 'Temples & Architectural Sanctuaries Directory' : 'Celebrated Temple Sanctuaries'}
          </h2>
          <p className="section-subtitle">
            Explore the monuments that house India's greatest sculptural achievements—from granite monoliths on the ocean shore to colossal rock-cut mountain sanctuaries.
          </p>
        </div>

        {/* Directory Controls when in Full Directory Mode */}
        {isFullDirectory && (
          <div
            className="card"
            style={{
              padding: '1.5rem',
              marginBottom: '2.5rem',
              backgroundColor: 'var(--bg-card)'
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem',
                alignItems: 'center'
              }}
            >
              {/* Search */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.6rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)'
                }}
              >
                <Search size={18} color="var(--color-gold)" />
                <input
                  type="text"
                  placeholder="Search temples by name, dynasty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    fontSize: '0.92rem',
                    color: 'var(--text-primary)',
                    width: '100%'
                  }}
                />
              </div>

              {/* Style Filter */}
              <div>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.92rem'
                  }}
                >
                  <option value="All">All Architectural Styles</option>
                  {styles.filter(s => s !== 'All').map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* State Filter */}
              <div>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.92rem'
                  }}
                >
                  <option value="All">All Indian States</option>
                  {states.filter(s => s !== 'All').map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span>Found <strong>{filtered.length}</strong> temple sanctuaries</span>
              {(searchTerm || selectedStyle !== 'All' || selectedState !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedStyle('All');
                    setSelectedState('All');
                  }}
                  style={{ color: 'var(--color-bronze)', fontWeight: 600 }}
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Temples Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '2rem'
          }}
        >
          {filtered.map((temple) => (
            <div
              key={temple.id}
              className="card"
              style={{ cursor: 'pointer' }}
              onClick={() => onSelectTemple(temple)}
            >
              <div className="card-img-wrapper" style={{ height: '230px' }}>
                <img
                  src={temple.image}
                  alt={temple.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Crect width='100%25' height='100%25' fill='%23C67D34'/%3E%3Ctext x='50%25' y='50%25' fill='%23FFFDF9' font-size='24' font-family='Georgia' text-anchor='middle' dominant-baseline='middle'%3E" + encodeURIComponent(temple.name) + "%3C/text%3E%3C/svg%3E";
                  }}
                />

                <span
                  className="badge badge-gold"
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(30, 20, 14, 0.75)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFFDF9'
                  }}
                >
                  {temple.architecturalStyle}
                </span>

                {temple.heritageStatus && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      right: '1rem',
                      backgroundColor: 'rgba(201, 151, 46, 0.9)',
                      color: '#120B08',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    UNESCO HERITAGE
                  </span>
                )}
              </div>

              <div className="card-body">
                {temple.sanskritName && (
                  <span style={{ fontSize: '0.84rem', color: 'var(--color-gold)', fontWeight: 600, fontFamily: 'var(--font-serif)', marginBottom: '0.25rem' }}>
                    {temple.sanskritName}
                  </span>
                )}

                <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', marginBottom: '0.65rem', color: 'var(--text-primary)' }}>
                  {temple.name}
                </h3>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                    marginBottom: '1.25rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {temple.shortDescription || temple.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.84rem', color: 'var(--text-muted)', paddingTop: '0.85rem', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <MapPin size={15} color="var(--color-bronze)" />
                    <span style={{ color: 'var(--text-secondary)' }}>{temple.location}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Calendar size={15} color="var(--color-gold)" />
                    <span>{temple.period} • {temple.dynasty}</span>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-bronze)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    View Temple & Sculptures <ArrowRight size={15} />
                  </span>
                  <span className="badge badge-stone" style={{ fontSize: '0.74rem' }}>
                    {temple.sculpturesCount || temple.affiliations?.length || 0} Catalogued
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
