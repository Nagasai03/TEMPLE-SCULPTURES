import React, { useState, useRef, useCallback } from 'react';
import {
  Sparkles,
  Upload,
  Cpu,
  Layers,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Eye,
  ImageIcon,
  X,
  Link2,
  BarChart3,
  Info
} from 'lucide-react';

export default function HogSvmClassifier() {
  const [imageUrl, setImageUrl] = useState('');
  const [previewSrc, setPreviewSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [inputMode, setInputMode] = useState('upload'); // 'upload' | 'url'
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const fileInputRef = useRef(null);

  /* ─── Benchmark samples ─────────────────────────────── */
  const benchmarkSamples = [
    {
      style: 'Nagara',
      title: 'Kandariya Mahadeva',
      subtitle: 'Khajuraho, MP',
      url: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80',
      color: '#C0732A',
      description: 'Curvilinear Shikhara with Amalaka finial'
    },
    {
      style: 'Dravida',
      title: 'Brihadisvara Temple',
      subtitle: 'Thanjavur, TN',
      url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
      color: '#6B8E5A',
      description: 'Stepped pyramidal Vimana with horizontal Talas'
    },
    {
      style: 'Vesara',
      title: 'Pattadakal Virupaksha',
      subtitle: 'Karnataka',
      url: 'https://images.unsplash.com/photo-1600100397608-f010e4299b15?auto=format&fit=crop&w=600&q=80',
      color: '#7B68B5',
      description: 'Deccan synthesis of curvilinear and tiered profiles'
    }
  ];

  /* ─── Core classification call ──────────────────────── */
  const runClassification = useCallback(async (inputSrc) => {
    const target = (inputSrc || imageUrl || '').trim();
    if (!target) {
      setError('Please upload an image or paste a temple photo URL.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/classify/hog-svm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: target })
      });
      const data = await res.json();
      if (res.ok && !data.error) {
        setResult(data);
        // Scroll to results
        setTimeout(() => {
          document.getElementById('classifier-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      } else {
        setError(data.error || 'Classification failed. Please try another image.');
      }
    } catch (err) {
      console.error(err);
      setError('Could not connect to the HOG + SVM inference engine. Is the server running?');
    } finally {
      setLoading(false);
    }
  }, [imageUrl]);

  /* ─── File handling ─────────────────────────────────── */
  const processFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPG, PNG, WEBP, etc.).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image is too large (max 10 MB). Please choose a smaller file.');
      return;
    }
    setError('');
    setResult(null);
    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
      setImageUrl('');
      runClassification(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e) => {
    processFile(e.target.files[0]);
    // reset input so same file can be re-uploaded
    e.target.value = '';
  };

  /* ─── Drag & Drop ───────────────────────────────────── */
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  /* ─── URL submit ────────────────────────────────────── */
  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (!imageUrl.trim()) { setError('Please enter a valid image URL.'); return; }
    setPreviewSrc(imageUrl.trim());
    setUploadedFileName('');
    runClassification(imageUrl.trim());
  };

  /* ─── Clear state ───────────────────────────────────── */
  const handleClear = () => {
    setPreviewSrc('');
    setImageUrl('');
    setResult(null);
    setError('');
    setUploadedFileName('');
  };

  /* ─── Style metadata ────────────────────────────────── */
  const styleColors = { Nagara: '#C0732A', Dravida: '#6B8E5A', Vesara: '#7B68B5' };
  const styleIcons = { Nagara: '🏯', Dravida: '🏛️', Vesara: '⛩️' };

  /* ─────────────────────────────────────────────────────── */
  return (
    <section style={{ padding: '3.5rem 0 6rem 0', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">

        {/* ── Header ── */}
        <div style={{ marginBottom: '2.5rem', maxWidth: '780px' }}>
          <span className="section-tag">Machine Learning · Computer Vision</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: 'var(--text-primary)', margin: '0.5rem 0 0.7rem' }}>
            Temple Style Classifier
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
            Upload any temple photo and our <strong>HOG + SVM</strong> model instantly classifies it as
            <strong> Nagara</strong>, <strong>Dravida</strong>, or <strong>Vesara</strong> — the three classical orders of Indian sacred architecture.
          </p>
        </div>

        {/* ── Pipeline steps ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {[
            { icon: <ImageIcon size={15}/>, label: 'Upload Image' },
            { icon: <ArrowRight size={13}/>, label: null },
            { icon: <Cpu size={15}/>, label: 'HOG Features' },
            { icon: <ArrowRight size={13}/>, label: null },
            { icon: <BarChart3 size={15}/>, label: 'SVM Classify' },
            { icon: <ArrowRight size={13}/>, label: null },
            { icon: <CheckCircle2 size={15}/>, label: 'Style Result' },
          ].map((step, i) => step.label ? (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              padding: '0.35rem 0.85rem', borderRadius: '999px',
              backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)',
              fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)'
            }}>
              {step.icon} {step.label}
            </div>
          ) : (
            <span key={i} style={{ color: 'var(--text-muted)', opacity: 0.5 }}>{step.icon}</span>
          ))}
        </div>

        {/* ── Main card ── */}
        <div className="card" style={{
          padding: '0',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-color)',
          marginBottom: '2.5rem'
        }}>

          {/* Tab bar: Upload / URL */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
            {[
              { id: 'upload', label: 'Upload Image', icon: <Upload size={15}/> },
              { id: 'url',    label: 'Paste URL',    icon: <Link2 size={15}/> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setInputMode(tab.id); setError(''); }}
                style={{
                  flex: 1, padding: '0.9rem 1.25rem',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem',
                  fontWeight: 600, fontSize: '0.88rem',
                  backgroundColor: inputMode === tab.id ? 'var(--bg-card)' : 'transparent',
                  color: inputMode === tab.id ? 'var(--color-gold)' : 'var(--text-muted)',
                  borderBottom: inputMode === tab.id ? '2px solid var(--color-gold)' : '2px solid transparent',
                  transition: 'all 0.2s',
                  marginBottom: '-1px'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div style={{ padding: '2rem' }}>

            {/* ── Upload mode ── */}
            {inputMode === 'upload' && (
              <div>
                {/* Drag-drop zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `2px dashed ${isDragging ? 'var(--color-gold)' : 'var(--border-color)'}`,
                    borderRadius: 'var(--radius-lg)',
                    padding: '3rem 2rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: isDragging ? 'var(--color-gold-soft)' : 'var(--bg-secondary)',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  {previewSrc ? (
                    /* ── Image preview ── */
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img
                        src={previewSrc}
                        alt="Uploaded temple"
                        style={{ maxHeight: '240px', maxWidth: '100%', borderRadius: 'var(--radius-md)', objectFit: 'contain', boxShadow: 'var(--shadow-md)' }}
                      />
                      <button
                        onClick={(e) => { e.stopPropagation(); handleClear(); }}
                        style={{
                          position: 'absolute', top: '-10px', right: '-10px',
                          width: '28px', height: '28px', borderRadius: '50%',
                          border: 'none', cursor: 'pointer',
                          backgroundColor: '#ef4444', color: '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                        }}
                      >
                        <X size={14}/>
                      </button>
                    </div>
                  ) : (
                    /* ── Drop prompt ── */
                    <>
                      <div style={{
                        width: '60px', height: '60px', borderRadius: '50%',
                        backgroundColor: 'var(--color-gold-soft)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1rem',
                        border: '1px solid var(--color-gold-border)'
                      }}>
                        <Upload size={26} color="var(--color-gold)"/>
                      </div>
                      <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.35rem' }}>
                        Drag & drop your temple image here
                      </p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 1.25rem' }}>
                        or click anywhere in this area to browse files
                      </p>
                      <span style={{
                        display: 'inline-block', padding: '0.55rem 1.5rem',
                        borderRadius: '999px', border: '1.5px solid var(--color-gold)',
                        color: 'var(--color-gold)', fontSize: '0.85rem', fontWeight: 600
                      }}>
                        Browse Files
                      </span>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.9rem' }}>
                        Supports JPG, PNG, WEBP, GIF · Max 10 MB
                      </p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    style={{ display: 'none' }}
                  />
                </div>

                {/* File name + re-upload */}
                {uploadedFileName && !loading && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.85rem', fontSize: '0.83rem', color: 'var(--text-muted)' }}>
                    <span>📎 {uploadedFileName}</span>
                    <button onClick={() => fileInputRef.current?.click()} style={{ background: 'none', border: 'none', color: 'var(--color-gold)', cursor: 'pointer', fontWeight: 600, fontSize: '0.83rem' }}>
                      Choose different image
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ── URL mode ── */}
            {inputMode === 'url' && (
              <form onSubmit={handleUrlSubmit}>
                <label style={{ display: 'block', fontSize: '0.83rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
                  Temple Image URL
                </label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <input
                    type="url"
                    placeholder="https://example.com/temple.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    style={{
                      flex: 1, padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.92rem'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={loading || !imageUrl.trim()}
                    className="btn btn-primary"
                    style={{ padding: '0.8rem 1.5rem', whiteSpace: 'nowrap' }}
                  >
                    {loading ? <RefreshCw size={16} className="animate-spin"/> : <Cpu size={16}/>}
                    {loading ? ' Classifying…' : ' Classify'}
                  </button>
                </div>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="URL preview"
                    style={{ marginTop: '1rem', maxHeight: '160px', borderRadius: 'var(--radius-md)', objectFit: 'contain', border: '1px solid var(--border-color)' }}
                    onError={(e) => e.target.style.display='none'}
                  />
                )}
              </form>
            )}

            {/* ── Loading indicator ── */}
            {loading && (
              <div style={{
                marginTop: '1.5rem', padding: '1.25rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-gold-soft)',
                border: '1px solid var(--color-gold-border)',
                display: 'flex', alignItems: 'center', gap: '1rem'
              }}>
                <RefreshCw size={20} color="var(--color-gold)" className="animate-spin"/>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, color: 'var(--color-bronze)', fontSize: '0.95rem' }}>
                    Extracting HOG Features &amp; Running SVM…
                  </p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Computing gradient orientations across 8×8 pixel cells · Normalizing blocks · Classifying…
                  </p>
                </div>
              </div>
            )}

            {/* ── Error ── */}
            {error && (
              <div style={{
                marginTop: '1.25rem', padding: '0.85rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#b91c1c',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontSize: '0.88rem'
              }}>
                <AlertCircle size={17}/>
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Benchmark samples ── */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
            Or try a benchmark example:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {benchmarkSamples.map((bench, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (loading) return;
                  handleClear();
                  setPreviewSrc(bench.url);
                  setInputMode('upload');
                  runClassification(bench.url);
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.85rem',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-card)',
                  border: `1px solid var(--border-color)`,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.borderColor = bench.color; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 4px 16px ${bench.color}22`; }}}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <img
                  src={bench.url}
                  alt={bench.title}
                  style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ minWidth: 0 }}>
                  <span style={{
                    display: 'inline-block', padding: '0.15rem 0.55rem',
                    borderRadius: '999px', fontSize: '0.65rem', fontWeight: 700,
                    backgroundColor: bench.color + '22', color: bench.color,
                    border: `1px solid ${bench.color}55`,
                    marginBottom: '0.2rem'
                  }}>
                    {bench.style}
                  </span>
                  <p style={{ margin: 0, fontSize: '0.83rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {bench.title}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-muted)' }}>{bench.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════ */}
        {/* ── RESULTS ── */}
        {/* ══════════════════════════════════════════════════ */}
        {result && (
          <div id="classifier-results">

            {/* Prediction banner */}
            <div className="card" style={{
              padding: '2.25rem 2.5rem',
              marginBottom: '1.75rem',
              borderTop: `5px solid ${styleColors[result.predictedClass] || 'var(--color-gold)'}`,
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.25rem' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
                    Classified Style
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 2.8rem)', margin: '0.15rem 0 0.3rem', color: styleColors[result.predictedClass] || 'var(--color-bronze)' }}>
                    {styleIcons[result.predictedClass]} {result.predictedClass} Order
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    Canonical examples: <em>{result.canonicalExamples}</em>
                  </p>
                </div>
                <div style={{
                  padding: '1.1rem 1.8rem', borderRadius: 'var(--radius-lg)', textAlign: 'center',
                  backgroundColor: (styleColors[result.predictedClass] || '#C0732A') + '15',
                  border: `1px solid ${(styleColors[result.predictedClass] || '#C0732A')}44`
                }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                    Confidence
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 800, color: styleColors[result.predictedClass] || 'var(--color-bronze)', lineHeight: 1.1 }}>
                    {result.confidence}
                  </div>
                </div>
              </div>
            </div>

            {/* Visual row: Original + HOG map */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>

              <div className="card" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Eye size={16} color="var(--color-gold)"/> Input Image
                </h4>
                <div style={{ height: '260px', borderRadius: 'var(--radius-md)', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={previewSrc || imageUrl}
                    alt="Input Temple"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              </div>

              <div className="card" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Cpu size={16} color="var(--color-gold)"/> HOG Gradient Vector Map
                </h4>
                <div style={{ height: '260px', borderRadius: 'var(--radius-md)', overflow: 'hidden', backgroundColor: '#080604', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={result.hogVisualization}
                    alt="HOG Vector Map"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.4rem', textAlign: 'center' }}>
                  Each line = dominant gradient direction in an 8×8 px cell (0°–180°)
                </p>
              </div>
            </div>

            {/* SVM Probability bars */}
            <div className="card" style={{ padding: '1.75rem', marginBottom: '1.75rem' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <BarChart3 size={17} color="var(--color-gold)"/> SVM Class Probabilities
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {Object.entries(result.probabilities).map(([styleName, prob]) => {
                  const pct = Math.round(prob * 100);
                  const isTop = styleName === result.predictedClass;
                  const col = styleColors[styleName] || 'var(--color-sandstone)';
                  return (
                    <div key={styleName}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.88rem' }}>
                        <span style={{ fontWeight: isTop ? 700 : 500, color: isTop ? col : 'var(--text-primary)' }}>
                          {styleIcons[styleName]} {styleName} Style
                          {isTop && <span style={{ marginLeft: '0.4rem', fontSize: '0.72rem', padding: '0.1rem 0.45rem', borderRadius: '999px', backgroundColor: col + '22', color: col }}>Best Match</span>}
                        </span>
                        <strong style={{ color: isTop ? col : 'var(--text-secondary)' }}>{pct}%</strong>
                      </div>
                      <div style={{ width: '100%', height: '10px', borderRadius: '5px', backgroundColor: 'var(--bg-secondary)', overflow: 'hidden' }}>
                        <div style={{
                          width: `${pct}%`, height: '100%', borderRadius: '5px',
                          backgroundColor: col, opacity: isTop ? 1 : 0.45,
                          transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)'
                        }}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detail grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>

              <div className="card" style={{ padding: '1.5rem' }}>
                <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--color-bronze)', marginBottom: '0.6rem' }}>
                  🔍 Gradient Analysis
                </h5>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                  {result.architecturalReasoning}
                </p>
              </div>

              <div className="card" style={{ padding: '1.5rem' }}>
                <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--color-bronze)', marginBottom: '0.6rem' }}>
                  🏗️ Defining Elements
                </h5>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.75, margin: 0 }}>
                  {result.keyElements.map((el, i) => <li key={i}>{el}</li>)}
                </ul>
              </div>

              <div className="card" style={{ padding: '1.5rem' }}>
                <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--color-bronze)', marginBottom: '0.6rem' }}>
                  📐 HOG Metrics
                </h5>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  <div>• <strong>Feature vector:</strong> {result.hogFeatureVectorLength} dimensions</div>
                  <div>• <strong>Orientation bins:</strong> 9 (0° – 180°)</div>
                  <div>• <strong>Cell size:</strong> 8 × 8 pixels</div>
                  <div>• <strong>Block norm:</strong> L2-Hys (clip 0.2)</div>
                  <div>• <strong>SVM kernel:</strong> RBF (C=10, γ=scale)</div>
                </div>
              </div>
            </div>

            {/* Classify another button */}
            <div style={{ textAlign: 'center' }}>
              <button onClick={handleClear} className="btn btn-secondary" style={{ padding: '0.8rem 2rem', fontSize: '0.95rem' }}>
                <Upload size={16}/> Classify Another Image
              </button>
            </div>
          </div>
        )}

        {/* ── Algorithm explainer ── */}
        <div className="glass" style={{
          padding: '2rem 2.5rem', borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-color)',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem', marginTop: '2.5rem'
        }}>
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Layers size={16} color="var(--color-gold)"/> Why HOG?
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              HOG captures structural <em>edge orientations</em> while ignoring colour and illumination. Nagara temples produce strong parabolic vertical contours; Dravida produces distinct horizontal step cornices; Vesara shows a diagonal hybrid distribution.
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Cpu size={16} color="var(--color-gold)"/> Why SVM?
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              SVM with an RBF kernel excels in high-dimensional spaces (d ≈ 8,100). It maximises the separating margin between the three morphological feature distributions, achieving robust multi-class confidence scores even on unseen temple photographs.
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Info size={16} color="var(--color-gold)"/> Training
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              The model was trained on 450 augmented synthetic canonical-elevation drawings (150 per class) with random rotation, scaling, brightness variation, and mirroring. The pre-trained model is loaded at startup for fast inference.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
