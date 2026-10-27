import React from 'react';
import { ShieldCheck, BookOpen, Sparkles, Feather, HeartHandshake, Eye } from 'lucide-react';

export default function CulturalPreservation({ onOpenEducation }) {
  const preservationPillars = [
    {
      title: 'Scientific Conservation',
      tag: 'ASI Science Branch Protocol',
      icon: ShieldCheck,
      desc: 'Archaeological Survey of India employs neutral pH biocide washes, ultrasonic cleaning, and stone consolidation to combat biogrowth, acid rain, and salt weathering on granite, sandstone, and chlorite monuments.'
    },
    {
      title: 'Silpa Sastra Canons',
      tag: 'Iconometry & Talamana',
      icon: BookOpen,
      desc: 'Canonical treatises (Manasara, Mayamata, Citrasutra) govern the exact proportions (Talamana) where the face, torso, and limbs follow sacred mathematical fractions ensuring cosmic harmony and aesthetic Rasa.'
    },
    {
      title: 'Metallurgical Heritage',
      tag: 'Madhuchishtavidhana',
      icon: Sparkles,
      desc: 'The ancient lost-wax process (cire-perdue) enabled Chola artisans to cast solid Panchaloha bronzes with dynamic weight distribution, creating living deities (Utsava Murti) for temple festivities.'
    },
    {
      title: 'Antiquity Protection',
      tag: 'National Antiquities Law',
      icon: HeartHandshake,
      desc: 'Combating illicit antiquity looting through modern photogrammetric 3D documentation, provenance tracking, and international repatriation treaties under UNESCO 1970 conventions.'
    }
  ];

  return (
    <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Sacred Meaning & Stewardship</span>
          <h2 className="section-title">Cultural Significance & Sculpture Preservation</h2>
          <p className="section-subtitle">
            Indian temple sculptures are spiritual visual treatises embodying the highest achievements of art, mathematics, and philosophy. Preserving them requires modern science and traditional knowledge.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}
        >
          {preservationPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="card"
                style={{
                  padding: '2rem',
                  backgroundColor: 'var(--bg-card)',
                  borderTop: '4px solid var(--color-bronze)'
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-gold-soft)',
                    border: '1px solid var(--color-gold-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-gold)',
                    marginBottom: '1.25rem'
                  }}
                >
                  <Icon size={24} />
                </div>

                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem', display: 'block' }}>
                  {pillar.tag}
                </span>

                <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  {pillar.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Callout Banner */}
        <div
          className="glass"
          style={{
            padding: '2.5rem',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-gold-border)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Deepen Your Understanding of Sacred Iconography
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
              Browse our verified glossary of Sanskrit sculptural terms (Mudra, Tribhanga, Yali, Apasmara), historical treatises, and premier national museum archives.
            </p>
          </div>

          <button
            onClick={onOpenEducation}
            className="btn btn-primary"
            style={{ padding: '0.8rem 1.6rem', fontSize: '0.95rem' }}
          >
            <BookOpen size={17} />
            <span>View Sanskrit Glossary & Resources</span>
          </button>
        </div>

      </div>
    </section>
  );
}
