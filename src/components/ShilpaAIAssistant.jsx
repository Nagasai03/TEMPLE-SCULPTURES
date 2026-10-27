import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Send,
  Image,
  BookOpen,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export default function ShilpaAIAssistant({
  onClose,
  onSelectSculpture
}) {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'vision'
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([
    {
      sender: 'ai',
      text: 'Namaste! I am Shilpa AI, your Indian temple sculpture and iconography assistant. You can ask me about sacred iconography (Mudras, Ayudhas, Asanas), dynastic carving techniques, architectural canons (Silpa Sastras), or the difference between styles like Chola, Hoysala, and Nagara.',
      citations: ['Archaeological Survey of India (ASI)', 'Stella Kramrisch, "The Hindu Temple"'],
      matchedSculptures: []
    }
  ]);

  // Image exploration state
  const [imageUrl, setImageUrl] = useState('');
  const [imageStyleHint, setImageStyleHint] = useState('');
  const [visionAnalysis, setVisionAnalysis] = useState(null);
  const [visionLoading, setVisionLoading] = useState(false);

  const sampleQuestions = [
    "What does the Apasmara dwarf under Nataraja's foot symbolize?",
    "How did Hoysala sculptors achieve lace-like carving in soapstone?",
    "What is the difference between Nagara and Dravidian temple styles?",
    "What is Tribhanga posture in temple dance sculptures?",
    "What is a Yali (Vyala) and what does it symbolize on temple pillars?"
  ];

  const sampleImages = [
    {
      label: 'Hoysala Madanika (Belur)',
      url: 'https://images.unsplash.com/photo-1600100397608-f010e4299b15?auto=format&fit=crop&w=800&q=80',
      hint: 'Belur dancer chlorite schist'
    },
    {
      label: 'Khajuraho Surasundari (Nagara)',
      url: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
      hint: 'Khajuraho buff sandstone surasundari'
    },
    {
      label: 'Chola Nataraja Bronze',
      url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
      hint: 'Nataraja lost-wax bronze'
    }
  ];

  const handleAsk = async (queryText) => {
    const textToAsk = queryText || question;
    if (!textToAsk.trim() || loading) return;

    const userMessage = { sender: 'user', text: textToAsk };
    setConversation(prev => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: textToAsk })
      });
      const data = await res.json();

      setConversation(prev => [
        ...prev,
        {
          sender: 'ai',
          text: data.answer,
          citations: data.citations || [],
          matchedSculptures: data.matchedSculptures || []
        }
      ]);
    } catch (err) {
      console.error(err);
      setConversation(prev => [
        ...prev,
        {
          sender: 'ai',
          text: 'I encountered an error querying the heritage database. Please verify the backend connection and try again.',
          citations: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeImage = async (urlToAnalyze, hint) => {
    const finalUrl = urlToAnalyze || imageUrl;
    if (!finalUrl.trim() || visionLoading) return;

    setVisionLoading(true);
    setVisionAnalysis(null);

    try {
      const res = await fetch('/api/ai/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: finalUrl,
          styleHint: hint || imageStyleHint
        })
      });
      const data = await res.json();
      setVisionAnalysis(data);
    } catch (err) {
      console.error(err);
    } finally {
      setVisionLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '850px',
          height: '85vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 0
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-secondary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-bronze) 0%, var(--color-gold) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFDF9'
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Shilpa AI Iconography Assistant
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--color-gold)', fontWeight: 600 }}>
                Powered by ASI Heritage Canon & Traditional Treatises
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {/* Tabs toggle */}
            <div
              style={{
                display: 'flex',
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-color)',
                padding: '3px'
              }}
            >
              <button
                onClick={() => setActiveTab('chat')}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  backgroundColor: activeTab === 'chat' ? 'var(--color-gold)' : 'transparent',
                  color: activeTab === 'chat' ? '#120B08' : 'var(--text-secondary)'
                }}
              >
                Iconography Q&A
              </button>

              <button
                onClick={() => setActiveTab('vision')}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  backgroundColor: activeTab === 'vision' ? 'var(--color-gold)' : 'transparent',
                  color: activeTab === 'vision' ? '#120B08' : 'var(--text-secondary)'
                }}
              >
                Visual Style Heuristic
              </button>
            </div>

            <button
              onClick={onClose}
              className="modal-close-btn"
              style={{ position: 'static' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab 1: Chat Q&A View */}
        {activeTab === 'chat' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
            
            {/* Messages Scroll Area */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}
            >
              {conversation.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div
                    style={{
                      padding: '1rem 1.25rem',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: msg.sender === 'user' ? 'var(--color-bronze)' : 'var(--bg-secondary)',
                      color: msg.sender === 'user' ? '#FFFDF9' : 'var(--text-primary)',
                      border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                      fontSize: '0.92rem',
                      lineHeight: 1.6,
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {msg.text}

                    {/* Matched Sculptures links */}
                    {msg.matchedSculptures && msg.matchedSculptures.length > 0 && (
                      <div style={{ marginTop: '0.85rem', paddingTop: '0.65rem', borderTop: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-gold)', marginBottom: '0.35rem' }}>
                          Related Catalogued Sculpture:
                        </div>
                        {msg.matchedSculptures.map((sculp) => (
                          <button
                            key={sculp.id}
                            onClick={() => {
                              onClose();
                              onSelectSculpture(sculp);
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              fontSize: '0.84rem',
                              fontWeight: 700,
                              color: 'var(--color-bronze)',
                              marginTop: '0.2rem',
                              textAlign: 'left'
                            }}
                          >
                            <span>Inspect {sculp.name}</span>
                            <ArrowRight size={14} />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Scholarly Citations */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div style={{ marginTop: '0.65rem', fontSize: '0.75rem', color: msg.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' }}>
                        <em>Sources: {msg.citations.join(' • ')}</em>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <Sparkles size={16} className="animate-spin" color="var(--color-gold)" />
                  <span>Consulting Silpa Sastras & ASI records...</span>
                </div>
              )}
            </div>

            {/* Preset Sample Queries */}
            <div
              style={{
                padding: '0.65rem 1.5rem',
                borderTop: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                display: 'flex',
                gap: '0.5rem',
                overflowX: 'auto',
                whiteSpace: 'nowrap'
              }}
            >
              {sampleQuestions.map((sq, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => handleAsk(sq)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary)',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-gold)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                >
                  {sq}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAsk();
              }}
              style={{
                padding: '1rem 1.5rem',
                backgroundColor: 'var(--bg-card)',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                gap: '0.75rem'
              }}
            >
              <input
                type="text"
                placeholder="Ask about Nataraja, Hoysala soapstone, Tribhanga, mudras..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.75rem 1.1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="btn btn-primary"
                style={{
                  padding: '0.75rem 1.4rem',
                  opacity: loading || !question.trim() ? 0.5 : 1
                }}
              >
                <Send size={16} />
                <span>Ask</span>
              </button>
            </form>

          </div>
        )}

        {/* Tab 2: Visual Style Heuristic Exploration */}
        {activeTab === 'vision' && (
          <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                Image-Based Style & Material Exploration
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                Test computer-vision heuristic classification of temple sculptures. Select a sample monument photo or enter an image URL to receive suggested style orders, materials, and iconographic categories.
              </p>
            </div>

            {/* Quick Sample Presets */}
            <div style={{ marginBottom: '1.75rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.65rem' }}>
                Select Authentic Benchmark Sample:
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
                {sampleImages.map((s, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setImageUrl(s.url);
                      setImageStyleHint(s.hint);
                      handleAnalyzeImage(s.url, s.hint);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.65rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-gold)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                  >
                    <img src={s.url} alt={s.label} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom URL Input Form */}
            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                marginBottom: '2rem'
              }}
            >
              <input
                type="text"
                placeholder="Or paste external image URL (e.g. Wikimedia / UNESCO image)..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}
              />
              <button
                onClick={() => handleAnalyzeImage(imageUrl, imageStyleHint)}
                disabled={visionLoading || !imageUrl.trim()}
                className="btn btn-primary"
                style={{ padding: '0.75rem 1.4rem' }}
              >
                {visionLoading ? 'Analyzing...' : 'Analyze Visual Style'}
              </button>
            </div>

            {/* Analysis Results Display */}
            {visionAnalysis && (
              <div
                className="card"
                style={{
                  padding: '1.75rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderLeft: '5px solid var(--color-gold)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>
                    Visual Style Heuristic Assessment
                  </h4>
                  <span className="badge badge-gold">
                    Confidence: {visionAnalysis.analysis.confidence}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                      Suggested Architectural Style
                    </span>
                    <strong style={{ color: 'var(--color-bronze)', fontSize: '1.05rem' }}>
                      {visionAnalysis.analysis.detectedStyle}
                    </strong>
                  </div>

                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                      Probable Medium / Stone
                    </span>
                    <strong style={{ color: 'var(--text-primary)' }}>
                      {visionAnalysis.analysis.materialSuggestion}
                    </strong>
                  </div>

                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                      Suggested Genre
                    </span>
                    <strong style={{ color: 'var(--text-primary)' }}>
                      {visionAnalysis.analysis.suggestedCategory}
                    </strong>
                  </div>
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '1.25rem' }}>
                  * {visionAnalysis.analysis.disclaimer}
                </p>

                {/* Suggested Sculptures */}
                {visionAnalysis.suggestedSculptures && visionAnalysis.suggestedSculptures.length > 0 && (
                  <div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.65rem' }}>
                      Closest Matching Catalogued Masterwork:
                    </span>
                    {visionAnalysis.suggestedSculptures.map((sculp) => (
                      <div
                        key={sculp.id}
                        onClick={() => {
                          onClose();
                          onSelectSculpture(sculp);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '0.75rem',
                          backgroundColor: 'var(--bg-card)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-color)',
                          cursor: 'pointer'
                        }}
                      >
                        <img src={sculp.primaryImage} alt={sculp.name} style={{ width: '55px', height: '55px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                            {sculp.name}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {sculp.templeName} • {sculp.material}
                          </div>
                        </div>
                        <ArrowRight size={16} color="var(--color-bronze)" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
