import React, { useState } from 'react';
import { Compass, Landmark, Search, Sparkles, ArrowRight } from 'lucide-react';

export default function Hero({ onExploreClick, onTemplesClick, onSearchSubmit, stats, onOpenAI }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchSubmit(searchInput.trim());
    } else {
      onExploreClick();
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 1.5rem 4rem 1.5rem',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)'
      }}
    >
      {/* Decorative Warm Sandstone & Radial Glow Background */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '600px',
          background: 'radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1020px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Heritage Trust Badge */}
        <div
          className="badge badge-gold"
          style={{
            marginBottom: '1.5rem',
            padding: '0.45rem 1.1rem',
            fontSize: '0.82rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <Sparkles size={15} color="var(--color-gold)" />
          <span>Verified Archaeological Survey Documentation & Silpa Sastras</span>
        </div>

        {/* Main Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.3rem, 5.2vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.18,
            marginBottom: '1.4rem',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            maxWidth: '920px'
          }}
        >
          Discover the Timeless Beauty of{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, var(--color-bronze) 0%, var(--color-gold) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}
          >
            Indian Temple Sculptures
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '800px',
            lineHeight: 1.65,
            marginBottom: '2.5rem',
            fontFamily: 'var(--font-sans)',
            fontWeight: 400
          }}
        >
          Explore centuries of artistic excellence, sacred symbolism, architectural mastery, and India's rich cultural heritage.
        </p>

        {/* Quick Search Form */}
        <form
          onSubmit={handleSearch}
          style={{
            width: '100%',
            maxWidth: '680px',
            backgroundColor: 'var(--bg-card)',
            border: '2px solid var(--border-color)',
            borderRadius: 'var(--radius-xl)',
            padding: '0.45rem 0.5rem 0.45rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '2.5rem',
            transition: 'border-color var(--transition-fast)'
          }}
        >
          <Search size={22} color="var(--color-gold)" />
          <input
            type="text"
            placeholder="Search by deity, temple (e.g. Belur, Konark), material, dynasty..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              fontSize: '1rem',
              color: 'var(--text-primary)'
            }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: '0.7rem 1.4rem', borderRadius: 'var(--radius-lg)' }}
          >
            Search
          </button>
        </form>

        {/* Primary CTA Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '4rem'
          }}
        >
          <button
            onClick={onExploreClick}
            className="btn btn-primary"
            style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}
          >
            <Compass size={18} />
            <span>Explore Sculptures</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={onTemplesClick}
            className="btn btn-secondary"
            style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}
          >
            <Landmark size={18} color="var(--color-gold)" />
            <span>Discover Temples</span>
          </button>

          <button
            onClick={onOpenAI}
            className="btn btn-gold"
            style={{ padding: '0.9rem 1.6rem', fontSize: '1rem' }}
          >
            <Sparkles size={18} />
            <span>Ask Shilpa AI</span>
          </button>
        </div>

        {/* Live Metrics Counter Bar */}
        <div
          className="glass"
          style={{
            width: '100%',
            maxWidth: '920px',
            borderRadius: 'var(--radius-xl)',
            padding: '1.6rem 2rem',
            boxShadow: 'var(--shadow-md)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem',
            textAlign: 'center'
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.1rem',
                fontWeight: 800,
                color: 'var(--color-bronze)',
                lineHeight: 1
              }}
            >
              {stats?.totalSculptures || 12}+
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
              Masterwork Sculptures
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.1rem',
                fontWeight: 800,
                color: 'var(--color-gold)',
                lineHeight: 1
              }}
            >
              {stats?.totalTemples || 8}+
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
              Monumental Temples
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.1rem',
                fontWeight: 800,
                color: 'var(--color-bronze)',
                lineHeight: 1
              }}
            >
              {stats?.totalDynasties || 7}+
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
              Imperial Dynasties
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.1rem',
                fontWeight: 800,
                color: 'var(--color-gold)',
                lineHeight: 1
              }}
            >
              2,000+
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
              Years of Living Heritage
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
