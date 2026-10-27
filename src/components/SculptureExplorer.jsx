import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Grid,
  List,
  RotateCcw,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  Eye,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function SculptureExplorer({
  sculptures,
  onSelectSculpture,
  initialCategory = 'All',
  initialState = 'All',
  initialQuery = ''
}) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [stateFilter, setStateFilter] = useState(initialState);
  const [dynastyFilter, setDynastyFilter] = useState('All');
  const [materialFilter, setMaterialFilter] = useState('All');
  const [styleFilter, setStyleFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Sync if initial props change
  useEffect(() => {
    if (initialCategory && initialCategory !== 'All') setCategoryFilter(initialCategory);
    if (initialState && initialState !== 'All') setStateFilter(initialState);
    if (initialQuery) setSearchQuery(initialQuery);
  }, [initialCategory, initialState, initialQuery]);

  // Reset page when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, stateFilter, dynastyFilter, materialFilter, styleFilter, sortBy]);

  // Extract unique facets from actual data
  const allSculptures = sculptures || [];
  const categories = ['All', ...Array.from(new Set(allSculptures.map(s => s.category).filter(Boolean)))];
  const states = ['All', ...Array.from(new Set(allSculptures.map(s => s.state).filter(Boolean))).sort()];
  const dynasties = ['All', 'Chola', 'Hoysala', 'Pallava', 'Rashtrakuta', 'Chandela', 'Eastern Ganga', 'Vijayanagara', 'Kakatiya', 'Gupta'];
  const materials = ['All', 'Bronze', 'Granite', 'Chlorite Schist', 'Sandstone', 'Basalt', 'Dolerite'];
  const styles = ['All', 'Dravidian', 'Nagara', 'Vesara', 'Hoysala', 'Kalinga', 'Pallava', 'Vijayanagara'];

  // Apply Real Filtering
  let filtered = allSculptures.filter(s => {
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match =
        s.name.toLowerCase().includes(q) ||
        (s.sanskritName && s.sanskritName.toLowerCase().includes(q)) ||
        s.templeName.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.dynasty.toLowerCase().includes(q) ||
        s.material.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.architecturalStyle.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Category
    if (categoryFilter !== 'All' && s.category !== categoryFilter) return false;

    // State
    if (stateFilter !== 'All' && s.state !== stateFilter) return false;

    // Dynasty
    if (dynastyFilter !== 'All' && !s.dynasty.toLowerCase().includes(dynastyFilter.toLowerCase())) return false;

    // Material
    if (materialFilter !== 'All' && !s.material.toLowerCase().includes(materialFilter.toLowerCase())) return false;

    // Style
    if (styleFilter !== 'All' && !s.architecturalStyle.toLowerCase().includes(styleFilter.toLowerCase())) return false;

    return true;
  });

  // Apply Sorting
  if (sortBy === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'name-desc') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortBy === 'period-asc') {
    filtered.sort((a, b) => a.period.localeCompare(b.period));
  } else if (sortBy === 'period-desc') {
    filtered.sort((a, b) => b.period.localeCompare(a.period));
  }

  // Pagination calculation
  const totalResults = filtered.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const resetAllFilters = () => {
    setSearchQuery('');
    setCategoryFilter('All');
    setStateFilter('All');
    setDynastyFilter('All');
    setMaterialFilter('All');
    setStyleFilter('All');
    setSortBy('name-asc');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    categoryFilter !== 'All' ||
    stateFilter !== 'All' ||
    dynastyFilter !== 'All' ||
    materialFilter !== 'All' ||
    styleFilter !== 'All';

  return (
    <section style={{ padding: '3.5rem 0 6rem 0', backgroundColor: 'var(--bg-primary)', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Page Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="section-tag">National Antiquities & Masterworks</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.6rem', color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
            Temple Sculptures Exploration
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '820px' }}>
            Filter and study authentic Indian temple sculptures by iconography, geographic state, dynastic period, architectural style, and sculptural medium.
          </p>
        </div>

        {/* Filter & Search Control Panel */}
        <div
          className="card"
          style={{
            padding: '1.75rem',
            marginBottom: '2.5rem',
            backgroundColor: 'var(--bg-card)',
            boxShadow: 'var(--shadow-md)',
            borderTop: '4px solid var(--color-gold)'
          }}
        >
          {/* Top Bar: Search Query & View Toggle */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              paddingBottom: '1.25rem',
              borderBottom: '1px solid var(--border-color)'
            }}
          >
            {/* Search Input */}
            <div
              style={{
                flex: 1,
                minWidth: '280px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.65rem 1.1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)'
              }}
            >
              <Search size={18} color="var(--color-gold)" />
              <input
                type="text"
                placeholder="Search by deity, temple, location, material, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  fontSize: '0.95rem',
                  color: 'var(--text-primary)',
                  width: '100%'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort & View Mode */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  fontWeight: 600
                }}
              >
                <option value="name-asc">Sort: Name (A to Z)</option>
                <option value="name-desc">Sort: Name (Z to A)</option>
                <option value="period-asc">Sort: Period (Oldest First)</option>
                <option value="period-desc">Sort: Period (Newest First)</option>
              </select>

              {/* View Toggle */}
              <div
                style={{
                  display: 'flex',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  padding: '3px'
                }}
              >
                <button
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                  style={{
                    padding: '0.45rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: viewMode === 'grid' ? 'var(--color-gold)' : 'transparent',
                    color: viewMode === 'grid' ? '#120B08' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Grid size={17} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  title="List View"
                  style={{
                    padding: '0.45rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: viewMode === 'list' ? 'var(--color-gold)' : 'transparent',
                    color: viewMode === 'list' ? '#120B08' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <List size={17} />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Dropdowns Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              marginBottom: '1.25rem'
            }}
          >
            {/* Category Filter */}
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Sculpture Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem'
                }}
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
                ))}
              </select>
            </div>

            {/* State Filter */}
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Indian State
              </label>
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem'
                }}
              >
                {states.map(s => (
                  <option key={s} value={s}>{s === 'All' ? 'All States' : s}</option>
                ))}
              </select>
            </div>

            {/* Dynasty Filter */}
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Dynasty / Era
              </label>
              <select
                value={dynastyFilter}
                onChange={(e) => setDynastyFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem'
                }}
              >
                {dynasties.map(d => (
                  <option key={d} value={d}>{d === 'All' ? 'All Dynasties' : d}</option>
                ))}
              </select>
            </div>

            {/* Material Filter */}
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Sculptural Medium
              </label>
              <select
                value={materialFilter}
                onChange={(e) => setMaterialFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem'
                }}
              >
                {materials.map(m => (
                  <option key={m} value={m}>{m === 'All' ? 'All Materials' : m}</option>
                ))}
              </select>
            </div>

            {/* Style Filter */}
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Architectural Style
              </label>
              <select
                value={styleFilter}
                onChange={(e) => setStyleFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem'
                }}
              >
                {styles.map(st => (
                  <option key={st} value={st}>{st === 'All' ? 'All Styles' : st}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Status Bar with Reset Button */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              paddingTop: '0.85rem',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.86rem'
            }}
          >
            <div style={{ color: 'var(--text-secondary)' }}>
              Showing <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong> matching sculptures
              {hasActiveFilters && <span style={{ color: 'var(--color-gold)' }}> (filtered from {allSculptures.length} total)</span>}
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="btn btn-outline btn-sm"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.8rem'
                }}
              >
                <RotateCcw size={14} />
                <span>Clear All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div
            className="card"
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              backgroundColor: 'var(--bg-card)'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-gold-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                color: 'var(--color-gold)'
              }}
            >
              <Search size={28} />
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
              No Temple Sculptures Match Your Filters
            </h3>

            <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 1.75rem auto', fontSize: '0.95rem' }}>
              Try loosening your search query, selecting "All Categories", or checking different states and materials.
            </p>

            <button
              onClick={resetAllFilters}
              className="btn btn-primary"
            >
              <RotateCcw size={16} />
              <span>Reset Filters</span>
            </button>
          </div>
        )}

        {/* Grid Display Mode */}
        {viewMode === 'grid' && paginatedItems.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}
          >
            {paginatedItems.map((sculpture) => (
              <div
                key={sculpture.id}
                className="card"
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectSculpture(sculpture)}
              >
                <div className="card-img-wrapper" style={{ height: '240px' }}>
                  <img
                    src={sculpture.primaryImage}
                    alt={sculpture.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Crect width='100%25' height='100%25' fill='%23D4A373'/%3E%3Ctext x='50%25' y='50%25' fill='%23FFFDF9' font-size='24' font-family='Georgia' text-anchor='middle' dominant-baseline='middle'%3E" + encodeURIComponent(sculpture.name) + "%3C/text%3E%3C/svg%3E";
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
                    {sculpture.category}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      right: '1rem',
                      backgroundColor: 'rgba(30, 20, 14, 0.85)',
                      color: 'var(--color-gold)',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    {sculpture.material}
                  </span>
                </div>

                <div className="card-body">
                  {sculpture.sanskritName && (
                    <span style={{ fontSize: '0.84rem', color: 'var(--color-gold)', fontWeight: 600, fontFamily: 'var(--font-serif)', marginBottom: '0.25rem' }}>
                      {sculpture.sanskritName}
                    </span>
                  )}

                  <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    {sculpture.name}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.55,
                      marginBottom: '1rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {sculpture.shortDescription || sculpture.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.82rem', color: 'var(--text-muted)', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <MapPin size={14} color="var(--color-bronze)" />
                      <span style={{ color: 'var(--text-secondary)' }}>{sculpture.templeName}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Calendar size={14} color="var(--color-gold)" />
                      <span>{sculpture.period} ({sculpture.dynasty})</span>
                    </div>
                  </div>

                  <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--color-bronze)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      View Details <ArrowRight size={14} />
                    </span>
                    <span className="badge badge-stone" style={{ fontSize: '0.72rem' }}>
                      {sculpture.architecturalStyle}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List Display Mode */}
        {viewMode === 'list' && paginatedItems.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
            {paginatedItems.map((sculpture) => (
              <div
                key={sculpture.id}
                className="card"
                onClick={() => onSelectSculpture(sculpture)}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  cursor: 'pointer',
                  padding: '1.25rem',
                  gap: '1.5rem',
                  alignItems: 'center'
                }}
              >
                <img
                  src={sculpture.primaryImage}
                  alt={sculpture.name}
                  style={{
                    width: '140px',
                    height: '140px',
                    borderRadius: 'var(--radius-md)',
                    objectFit: 'cover',
                    flexShrink: 0
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Crect width='100%25' height='100%25' fill='%23D4A373'/%3E%3C/svg%3E";
                  }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                    <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>{sculpture.category}</span>
                    <span className="badge badge-stone" style={{ fontSize: '0.7rem' }}>{sculpture.material}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-gold)', fontWeight: 600 }}>{sculpture.sanskritName}</span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                    {sculpture.name}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.65rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {sculpture.shortDescription || sculpture.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <span><strong>Temple:</strong> {sculpture.templeName}</span>
                    <span><strong>Location:</strong> {sculpture.location}</span>
                    <span><strong>Dynasty:</strong> {sculpture.dynasty}</span>
                    <span><strong>Style:</strong> {sculpture.architecturalStyle}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-bronze)', fontWeight: 700, paddingLeft: '1rem', flexShrink: 0 }}>
                  <Eye size={20} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '2rem'
            }}
          >
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="btn btn-secondary btn-sm"
              style={{ opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  border: pageNum === currentPage ? '1px solid var(--color-gold)' : '1px solid var(--border-color)',
                  backgroundColor: pageNum === currentPage ? 'var(--color-gold)' : 'var(--bg-card)',
                  color: pageNum === currentPage ? '#120B08' : 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn btn-secondary btn-sm"
              style={{ opacity: currentPage === totalPages ? 0.4 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
