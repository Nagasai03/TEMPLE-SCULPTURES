import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, MapPin, Phone, ShieldCheck } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ state: 'idle', message: '' }); // 'idle' | 'submitting' | 'success' | 'error'

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ state: 'error', message: 'Please complete all required fields.' });
      return;
    }

    setStatus({ state: 'submitting', message: 'Sending message...' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({ state: 'success', message: data.message });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ state: 'error', message: data.error || 'Failed to submit message.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ state: 'error', message: 'Network connection issue. Please check your connection and retry.' });
    }
  };

  return (
    <section style={{ padding: '3.5rem 0 6rem 0', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ marginBottom: '3rem', maxWidth: '780px' }}>
          <span className="section-tag">Research & Preservation Collaboration</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
            Contact the Heritage Documentation Team
          </h1>
          <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Have epigraphical corrections, high-resolution photographic contributions, or academic research inquiries regarding Indian temple sculptures? Reach out to our editorial and curation desk.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          
          {/* Left Form */}
          <div
            className="card"
            style={{
              padding: '2.5rem',
              backgroundColor: 'var(--bg-card)',
              boxShadow: 'var(--shadow-md)',
              borderTop: '4px solid var(--color-gold)'
            }}
          >
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
              Submit an Inquiry or Contribution
            </h2>

            {status.state === 'success' && (
              <div
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: '#15803d',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  fontSize: '0.92rem'
                }}
              >
                <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                <span>{status.message}</span>
              </div>
            )}

            {status.state === 'error' && (
              <div
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#b91c1c',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  fontSize: '0.92rem'
                }}
              >
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Your Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Dr. Radhika Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.92rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@university.edu or email@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.92rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="e.g. Epigraphical correction on Belur Madanika"
                  value={formData.subject}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.92rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Message & Field Observation *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Detail your inquiry, citation references, or monument documentation..."
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.92rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={status.state === 'submitting'}
                className="btn btn-primary"
                style={{ padding: '0.85rem', fontSize: '1rem', marginTop: '0.5rem' }}
              >
                <Send size={16} />
                <span>{status.state === 'submitting' ? 'Submitting to Curator Desk...' : 'Send Message'}</span>
              </button>
            </form>
          </div>

          {/* Right: Academic Curation Info & Guidelines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div
              className="card"
              style={{ padding: '2rem', backgroundColor: 'var(--bg-card)' }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                Editorial Review Standards
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                All photographic submissions and historical claims undergo rigorous cross-referencing against:
              </p>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                <li>Epigraphia Indica and regional Archaeological Survey bulletins</li>
                <li>Monograph publications from the National Museum and Lalit Kala Akademi</li>
                <li>Stella Kramrisch and Ananda Coomaraswamy architectural treatises</li>
                <li>Peer-reviewed art historical journals</li>
              </ul>
            </div>

            <div
              className="card"
              style={{ padding: '2rem', backgroundColor: 'var(--bg-card)', borderLeft: '4px solid var(--color-gold)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <ShieldCheck size={20} color="var(--color-gold)" />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>
                  Heritage Antiquity Hotline
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                Suspected theft or illegal trafficking of temple antiquities should be directly reported to the local state police antiquity wing and the Archaeological Survey of India (Directorate General, Janpath, New Delhi).
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
