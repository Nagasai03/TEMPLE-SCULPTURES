import React from 'react';
import {
  Sparkles,
  Flame,
  Music,
  Flower2,
  Shield,
  Cat,
  Columns,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export default function CategoryExplorer({ onSelectCategory, sculptures }) {
  const categories = [
    {
      title: 'Deities and Divine Figures',
      sanskrit: 'देवता मूर्ति',
      description: 'Cosmic forms of Shiva, Vishnu, Devi, and celestial deities carved with canonical iconometric proportions (Talamana).',
      icon: Sparkles,
      color: 'var(--color-bronze)'
    },
    {
      title: 'Mythological Scenes',
      sanskrit: 'पौराणिक आख्यान',
      description: 'Epic episodes including the Churning of the Ocean (Samudra Manthan), Ravana shaking Kailasa, and Kaliya Mardana.',
      icon: Flame,
      color: 'var(--color-terracotta)'
    },
    {
      title: 'Dancing Figures and Musicians',
      sanskrit: 'नृत्य व वाद्य शिल्प',
      description: 'Madanikas, Salabhanjikas, and Apsaras frozen in classical Natya Sastra Karanas with intricate jewelry and instruments.',
      icon: Music,
      color: 'var(--color-gold)'
    },
    {
      title: 'Floral and Geometric Motifs',
      sanskrit: 'लता व ज्यामितीय विन्यास',
      description: 'Lush lotus rosettes, scrolling creeper foliage (Patralata), and sacred geometric mandalas adorning ceilings and borders.',
      icon: Flower2,
      color: 'var(--color-sandstone-dark)'
    },
    {
      title: 'Guardian Figures',
      sanskrit: 'द्वारपाल व रक्षक',
      description: 'Colossal threshold protectors (Dvarapalas) and directional guardians (Dikpalas) armed with sacred ayudhas.',
      icon: Shield,
      color: 'var(--color-bronze)'
    },
    {
      title: 'Animal Sculptures',
      sanskrit: 'पशु व वाहन शिल्प',
      description: 'Monolithic Nandi bulls, caparisoned solar horses, royal elephant friezes, and celestial vahanas.',
      icon: Cat,
      color: 'var(--color-terracotta)'
    },
    {
      title: 'Pillar and Wall Carvings',
      sanskrit: 'स्तम्भ व भित्ति शिल्प',
      description: 'Dynamic rearing composite Yali beasts, faceted colonnettes, and acoustic musical stone pillars.',
      icon: Columns,
      color: 'var(--color-gold)'
    },
    {
      title: 'Narrative Reliefs',
      sanskrit: 'कथा फलक',
      description: 'Continuous storytelling panels depicting the Ramayana, Mahabharata, and the miraculous descent of the river Ganga.',
      icon: BookOpen,
      color: 'var(--color-sandstone-dark)'
    }
  ];

  const getCount = (catTitle) => {
    return sculptures?.filter(s => s.category === catTitle).length || 0;
  };

  return (
    <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">Iconographic Genres</span>
          <h2 className="section-title">Explore by Sculpture Category</h2>
          <p className="section-subtitle">
            Indian temple carvings span sacred hierarchies—from supreme divinities in the inner sanctum to secular narrative friezes along the outer plinths.
          </p>
        </div>

        {/* Categories Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const count = getCount(cat.title);

            return (
              <div
                key={idx}
                className="card"
                onClick={() => onSelectCategory(cat.title)}
                style={{
                  padding: '1.75rem',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Icon Circle */}
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-gold-soft)',
                    border: '1px solid var(--color-gold-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                    color: cat.color
                  }}
                >
                  <Icon size={26} />
                </div>

                {/* Sanskrit subtitle */}
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-gold)',
                    fontWeight: 600,
                    marginBottom: '0.35rem',
                    fontFamily: 'var(--font-serif)'
                  }}
                >
                  {cat.sanskrit}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '1.18rem',
                    marginBottom: '0.65rem',
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--text-primary)'
                  }}
                >
                  {cat.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                    marginBottom: '1.5rem'
                  }}
                >
                  {cat.description}
                </p>

                {/* Bottom link & count */}
                <div
                  style={{
                    marginTop: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-color)',
                    fontSize: '0.82rem'
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--color-bronze)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    View Works <ArrowRight size={14} />
                  </span>
                  <span className="badge badge-stone">
                    {count} {count === 1 ? 'item' : 'items'}
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
