import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

export default function RegionExplorer({ onSelectState, sculptures }) {
  const regions = [
    {
      state: 'Tamil Nadu',
      region: 'South India',
      highlights: 'Imperial Chola lost-wax bronzes, Mamallapuram granite open-air bas-reliefs, soaring Brihadisvara Vimanas.',
      stoneType: 'Hard Granite & Panchaloha Bronze',
      dynasties: 'Pallava, Chola, Pandya, Nayaka'
    },
    {
      state: 'Karnataka',
      region: 'South India',
      highlights: 'Hoysala micro-undercut soapstone filigree (Belur), monolithic musical Yali pillars at Hampi, early Vesara at Pattadakal.',
      stoneType: 'Chlorite Schist (Soapstone) & Grey Granite',
      dynasties: 'Badami Chalukya, Rashtrakuta, Hoysala, Vijayanagara'
    },
    {
      state: 'Telangana',
      region: 'South India',
      highlights: 'Mirror-polished jet-black dolerite bracket Madanikas and earthquake-resistant lightweight floating bricks at Ramappa.',
      stoneType: 'Black Basalt / Dolerite & Sandbox plinth',
      dynasties: 'Kakatiya Dynasty'
    },
    {
      state: 'Andhra Pradesh',
      region: 'South India',
      highlights: 'Colossal monolithic Nandi bull colossus and multifaceted hanging pillar architecture at Lepakshi.',
      stoneType: 'Monolithic Granite',
      dynasties: 'Vijayanagara & Nayaka'
    },
    {
      state: 'Odisha',
      region: 'East India',
      highlights: 'Monumental 24-wheel astronomical solar chariot, musician maidens, and lustrous green chlorite Surya at Konark.',
      stoneType: 'Chlorite, Khondalite & Laterite',
      dynasties: 'Eastern Ganga & Somavamsi'
    },
    {
      state: 'Madhya Pradesh',
      region: 'Central India',
      highlights: 'Kandariya Mahadeva Nagara shikharas with sensuous Surasundari carvings; classical Gupta Varaha colossus at Udayagiri.',
      stoneType: 'Buff Sandstone & Rock-cut Sandstone',
      dynasties: 'Gupta Empire & Chandela Dynasty'
    },
    {
      state: 'Maharashtra',
      region: 'West India',
      highlights: 'Monolithic top-down excavation of the entire Kailasa mountain temple at Ellora; Elephanta Trimurti basalt bust.',
      stoneType: 'Deccan Trap Basalt Monolith',
      dynasties: 'Vakataka & Rashtrakuta'
    }
  ];

  const getCount = (stateName) => {
    return sculptures?.filter(s => s.state === stateName).length || 0;
  };

  return (
    <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">Geographic Heritage</span>
          <h2 className="section-title">Explore Sculptures by Region & State</h2>
          <p className="section-subtitle">
            Distinct geological stones—from the hard crystalline granites of the South to the pliable chlorite schists of Karnataka and the warm buff sandstones of Central India—shaped each region's sculptural expression.
          </p>
        </div>

        {/* Regions Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.85rem'
          }}
        >
          {regions.map((item, idx) => {
            const count = getCount(item.state);

            return (
              <div
                key={idx}
                className="card"
                onClick={() => onSelectState(item.state)}
                style={{
                  padding: '1.8rem',
                  cursor: 'pointer',
                  position: 'relative',
                  borderTop: '4px solid var(--color-gold)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <MapPin size={18} color="var(--color-bronze)" />
                    <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
                      {item.state}
                    </h3>
                  </div>
                  <span className="badge badge-stone" style={{ fontSize: '0.75rem' }}>
                    {item.region}
                  </span>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                  {item.highlights}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
                  <div>
                    <strong style={{ color: 'var(--color-gold)' }}>Predominant Medium:</strong>{' '}
                    <span style={{ color: 'var(--text-secondary)' }}>{item.stoneType}</span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--color-gold)' }}>Patron Dynasties:</strong>{' '}
                    <span style={{ color: 'var(--text-secondary)' }}>{item.dynasties}</span>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-color)',
                    fontSize: '0.84rem'
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--color-bronze)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    Explore State Collection <ArrowRight size={14} />
                  </span>
                  <span className="badge badge-gold">
                    {count} {count === 1 ? 'Sculpture' : 'Sculptures'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
