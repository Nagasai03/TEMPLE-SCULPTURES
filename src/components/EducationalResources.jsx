import React, { useState } from 'react';
import { BookOpen, Search, ExternalLink, Landmark, Scroll, ShieldCheck } from 'lucide-react';

export default function EducationalResources({ glossaryData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const terms = glossaryData?.glossary || [];
  const institutions = glossaryData?.educationalInstitutions || [];
  const treatises = glossaryData?.canonicalTreatises || [];

  const categories = ['All', ...Array.from(new Set(terms.map(t => t.category)))];

  const filteredTerms = terms.filter(item => {
    const matchQuery =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sanskrit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchQuery && matchCategory;
  });

  return (
    <section style={{ padding: '3.5rem 0 6rem 0', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <span className="section-tag">Scholarly Foundations</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            About the Project & Educational Reference Library
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '850px', lineHeight: 1.65 }}>
            The Temple Sculptures project is dedicated to providing students, researchers, historians, and heritage lovers with verified, non-invented documentation of India's sacred sculptural monuments, based on archaeological field surveys and traditional Silpa Sastras.
          </p>
        </div>

        {/* Project Mission & Scope Callout */}
        <div
          className="card"
          style={{
            padding: '2.5rem',
            backgroundColor: 'var(--bg-card)',
            borderLeft: '5px solid var(--color-bronze)',
            marginBottom: '4rem'
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Mission & Editorial Standards
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            <div>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                1. Authentic Iconographic Verification
              </strong>
              Every sculpture listed is catalogued with verified provenance, distinguishing confirmed epigraphical records from oral lore. Iconographic attributes (Mudras, Ayudhas, Asanas) follow the Silpa Sastras (Manasara, Mayamata, and Silpa Prakasha).
            </div>
            <div>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                2. Conservation & Antiquities Stewardship
              </strong>
              Highlighting scientific conservation protocols developed by the Archaeological Survey of India (ASI) and international heritage bodies to foster awareness against illicit antiquity trafficking and vandalism.
            </div>
          </div>
        </div>

        {/* Sanskrit Sculpture Glossary */}
        <div style={{ marginBottom: '4.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.75rem' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                Glossary of Sanskrit Sculptural Terminology
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', margin: 0 }}>
                Essential canonical terms for analyzing postures, gestures, and architectural motifs.
              </p>
            </div>

            {/* Glossary Search & Filter */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <Search size={16} color="var(--color-gold)" />
                <input
                  type="text"
                  placeholder="Search glossary..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    fontSize: '0.88rem',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: '0.55rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.86rem',
                  color: 'var(--text-primary)'
                }}
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Terms Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {filteredTerms.map((t, idx) => (
              <div
                key={idx}
                className="card"
                style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="badge badge-stone" style={{ fontSize: '0.72rem' }}>
                    {t.category}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-gold)', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
                    {t.sanskrit}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
                  {t.term}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                  {t.definition}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Canonical Treatises Section */}
        <div style={{ marginBottom: '4.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            Canonical Treatises on Silpa & Vastuvidya
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
            {treatises.map((tr, i) => (
              <div
                key={i}
                className="card"
                style={{ padding: '1.75rem', backgroundColor: 'var(--bg-card)', borderTop: '4px solid var(--color-gold)' }}
              >
                <span className="badge badge-gold" style={{ fontSize: '0.72rem', alignSelf: 'flex-start', marginBottom: '0.65rem' }}>
                  {tr.century}
                </span>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  {tr.title}
                </h3>

                <div style={{ fontSize: '0.82rem', color: 'var(--color-bronze)', fontWeight: 600, marginBottom: '0.75rem' }}>
                  Ascribed Author: {tr.author}
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                  {tr.focus}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Premier Research Institutions & Repositories */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            Premier National Institutions & Antiquities Museums
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {institutions.map((inst, i) => (
              <a
                key={i}
                href={inst.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', textDecoration: 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <Landmark size={22} color="var(--color-bronze)" />
                  <ExternalLink size={16} color="var(--color-gold)" />
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
                  {inst.name}
                </h3>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                  {inst.role}
                </p>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
