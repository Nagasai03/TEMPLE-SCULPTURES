import React from 'react';
import { Landmark, Heart, ShieldCheck, ExternalLink, Sparkles, Compass } from 'lucide-react';

export default function Footer({ onNavClick, onOpenAdmin }) {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: '5rem 0 3rem 0',
        marginTop: 'auto'
      }}
    >
      <div className="container">
        
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}
        >
          {/* Col 1: Brand & Heritage Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, var(--color-bronze) 0%, var(--color-gold) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFDF9'
                }}
              >
                <Landmark size={20} />
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', display: 'block' }}>
                  TEMPLE SCULPTURES
                </span>
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700 }}>
                  Sacred Indian Art
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              An academic digital repository dedicated to documenting verified Indian temple sculptures, architectural styles, Silpa Sastra canons, and conservation protocols.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={16} color="var(--color-gold)" />
              <span>Based on Archaeological Survey of India (ASI) records</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.2rem' }}>
              Project Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <button onClick={() => onNavClick('home')} style={{ textAlign: 'left', color: 'inherit' }}>Home Overview</button>
              <button onClick={() => onNavClick('explore')} style={{ textAlign: 'left', color: 'inherit' }}>Explore Sculptures Database</button>
              <button onClick={() => onNavClick('temples')} style={{ textAlign: 'left', color: 'inherit' }}>Temples & Sanctuaries Directory</button>
              <button onClick={() => onNavClick('styles')} style={{ textAlign: 'left', color: 'inherit' }}>Architectural Styles & Dynasties</button>
              <button onClick={() => onNavClick('timeline')} style={{ textAlign: 'left', color: 'inherit' }}>Historical Evolution Timeline</button>
              <button onClick={() => onNavClick('education')} style={{ textAlign: 'left', color: 'inherit' }}>About & Sanskrit Glossary</button>
              <button onClick={() => onNavClick('contact')} style={{ textAlign: 'left', color: 'inherit' }}>Contact & Contributions</button>
            </div>
          </div>

          {/* Col 3: Key Monument Traditions */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.2rem' }}>
              Classical Traditions
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <div>• <strong>Imperial Chola Bronzes</strong> (Thanjavur, Tamil Nadu)</div>
              <div>• <strong>Hoysala Soapstone Filigree</strong> (Belur & Halebidu, Karnataka)</div>
              <div>• <strong>Chandela Nagara Shikharas</strong> (Khajuraho, Madhya Pradesh)</div>
              <div>• <strong>Kalinga Solar Chariots</strong> (Konark, Odisha)</div>
              <div>• <strong>Pallava Granite Rock Reliefs</strong> (Mamallapuram, Tamil Nadu)</div>
              <div>• <strong>Rashtrakuta Monoliths</strong> (Kailasa Ellora, Maharashtra)</div>
              <div>• <strong>Kakatiya Dolerite Bracket Dancers</strong> (Ramappa, Telangana)</div>
            </div>
          </div>

          {/* Col 4: Institutional Links & Admin */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.2rem' }}>
              Academic Institutions
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              <a href="https://asi.nic.in" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span>Archaeological Survey of India</span> <ExternalLink size={13} />
              </a>
              <a href="https://nationalmuseumindia.gov.in" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span>National Museum, New Delhi</span> <ExternalLink size={13} />
              </a>
              <a href="https://ignca.gov.in" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span>Indira Gandhi National Centre (IGNCA)</span> <ExternalLink size={13} />
              </a>
            </div>

            <button
              onClick={onOpenAdmin}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
            >
              Curator Admin Access
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.84rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} Temple Sculptures Project. In service of Indian art history and cultural preservation.
          </div>
          <div>
            Images curated from Public Domain archives, UNESCO records, and Wikimedia Commons under educational fair use.
          </div>
        </div>

      </div>
    </footer>
  );
}
