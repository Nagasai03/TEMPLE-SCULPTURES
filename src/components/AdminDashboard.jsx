import React, { useState } from 'react';
import {
  Lock,
  Plus,
  Trash2,
  Edit3,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Eye,
  LogOut,
  Sparkles,
  Layers,
  Landmark
} from 'lucide-react';

export default function AdminDashboard({
  isOpen,
  onClose,
  adminToken,
  setAdminToken,
  sculptures,
  onRefreshData
}) {
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Content Management State
  const [searchTable, setSearchTable] = useState('');
  const [editingSculpture, setEditingSculpture] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // Form Fields State
  const initialFormState = {
    name: '',
    sanskritName: '',
    templeName: '',
    templeId: 'temple-01',
    location: '',
    state: 'Tamil Nadu',
    region: 'South India',
    dynasty: 'Imperial Chola Dynasty',
    period: '11th Century CE',
    material: 'Granite',
    category: 'Deities and Divine Figures',
    architecturalStyle: 'Dravidian',
    primaryImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    shortDescription: '',
    description: '',
    artisticSignificance: '',
    historicalBackground: '',
    preservationNotes: '',
    featured: false
  };

  const [formData, setFormData] = useState(initialFormState);

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setAdminToken(data.token);
        setPasscode('');
      } else {
        setLoginError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setLoginError('Network error connecting to authentication server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open Form for Adding New Sculpture
  const handleOpenAddForm = () => {
    setEditingSculpture(null);
    setFormData(initialFormState);
    setFormError('');
    setIsFormOpen(true);
  };

  // Open Form for Editing Sculpture
  const handleOpenEditForm = (sculp) => {
    setEditingSculpture(sculp);
    setFormData({
      ...sculp,
      featured: Boolean(sculp.featured)
    });
    setFormError('');
    setIsFormOpen(true);
  };

  // Save (Create or Update) Sculpture
  const handleSaveSculpture = async (e) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    const isEdit = Boolean(editingSculpture);
    const endpoint = isEdit ? `/api/sculptures/${editingSculpture.id}` : '/api/sculptures';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setActionSuccess(isEdit ? 'Sculpture updated successfully!' : 'New sculpture catalogued successfully!');
        setIsFormOpen(false);
        onRefreshData();
        setTimeout(() => setActionSuccess(''), 4000);
      } else {
        setFormError(data.error || 'Failed to save record.');
      }
    } catch (err) {
      setFormError('Server communication error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Sculpture
  const handleDeleteSculpture = async (sculpId, sculpName) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${sculpName}" from the heritage database?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/sculptures/${sculpId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setActionSuccess(`Sculpture "${sculpName}" deleted.`);
        onRefreshData();
        setTimeout(() => setActionSuccess(''), 4000);
      } else {
        alert(data.error || 'Failed to delete record.');
      }
    } catch (err) {
      alert('Network error attempting delete.');
    }
  };

  // Filtered table rows
  const tableRows = (sculptures || []).filter(s =>
    s.name.toLowerCase().includes(searchTable.toLowerCase()) ||
    s.templeName.toLowerCase().includes(searchTable.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTable.toLowerCase()) ||
    s.dynasty.toLowerCase().includes(searchTable.toLowerCase())
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '1050px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', padding: 0 }}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Lock size={20} color="var(--color-gold)" />
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Curator Administrative Portal
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {adminToken && (
              <button
                onClick={() => setAdminToken(null)}
                className="btn btn-outline btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <LogOut size={14} />
                <span>Log Out</span>
              </button>
            )}
            <button onClick={onClose} className="modal-close-btn" style={{ position: 'static' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
          
          {/* LOGIN SCREEN IF NOT AUTHENTICATED */}
          {!adminToken ? (
            <div style={{ maxWidth: '420px', margin: '2rem auto', textAlign: 'center' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-gold-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto',
                  color: 'var(--color-gold)'
                }}
              >
                <Lock size={28} />
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Curator Authentication Required
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Enter the project curator passcode to add, edit, or archive temple sculpture records. (Default: <code>heritage2025</code>)
              </p>

              {loginError && (
                <div
                  style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    color: '#b91c1c',
                    fontSize: '0.85rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem'
                  }}
                >
                  <AlertCircle size={16} />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                  type="password"
                  placeholder="Enter curator passcode..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    textAlign: 'center'
                  }}
                />

                <button
                  type="submit"
                  disabled={isSubmitting || !passcode}
                  className="btn btn-primary"
                  style={{ padding: '0.8rem' }}
                >
                  {isSubmitting ? 'Authenticating...' : 'Enter Curator Portal'}
                </button>
              </form>
            </div>
          ) : (
            // AUTHENTICATED CURATOR DASHBOARD
            <div>
              {/* Success Notification Alert */}
              {actionSuccess && (
                <div
                  style={{
                    padding: '0.85rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(34, 197, 94, 0.12)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    color: '#15803d',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <CheckCircle2 size={18} />
                  <span>{actionSuccess}</span>
                </div>
              )}

              {/* Action Bar: Search & Add New Sculpture */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.55rem 0.95rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    width: '320px'
                  }}
                >
                  <Search size={16} color="var(--color-gold)" />
                  <input
                    type="text"
                    placeholder="Search records by name, temple, dynasty..."
                    value={searchTable}
                    onChange={(e) => setSearchTable(e.target.value)}
                    style={{
                      border: 'none',
                      outline: 'none',
                      backgroundColor: 'transparent',
                      fontSize: '0.88rem',
                      color: 'var(--text-primary)',
                      width: '100%'
                    }}
                  />
                </div>

                <button
                  onClick={handleOpenAddForm}
                  className="btn btn-primary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Plus size={16} />
                  <span>Catalog New Sculpture</span>
                </button>
              </div>

              {/* Data Table */}
              <div
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  overflowX: 'auto',
                  backgroundColor: 'var(--bg-card)'
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '0.85rem 1rem' }}>Sculpture / Deity</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Temple & Location</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Dynasty & Period</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Medium</th>
                      <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((s) => (
                      <tr
                        key={s.id}
                        style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color var(--transition-fast)' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img
                              src={s.primaryImage}
                              alt={s.name}
                              style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                            />
                            <div>
                              <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{s.name}</strong>
                              <span style={{ fontSize: '0.76rem', color: 'var(--color-gold)' }}>{s.category}</span>
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>
                          <div>{s.templeName}</div>
                          <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{s.location}</span>
                        </td>

                        <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>
                          <div>{s.dynasty}</div>
                          <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{s.period}</span>
                        </td>

                        <td style={{ padding: '0.85rem 1rem' }}>
                          <span className="badge badge-stone" style={{ fontSize: '0.72rem' }}>
                            {s.material}
                          </span>
                        </td>

                        <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                            <button
                              onClick={() => handleOpenEditForm(s)}
                              title="Edit Record"
                              style={{
                                padding: '0.35rem 0.65rem',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid var(--border-color)',
                                backgroundColor: 'var(--bg-card)',
                                color: 'var(--text-primary)'
                              }}
                            >
                              <Edit3 size={15} />
                            </button>

                            <button
                              onClick={() => handleDeleteSculpture(s.id, s.name)}
                              title="Delete Record"
                              style={{
                                padding: '0.35rem 0.65rem',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                                color: '#ef4444'
                              }}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ADD / EDIT FORM MODAL OVERLAY */}
              {isFormOpen && (
                <div className="modal-backdrop" onClick={() => setIsFormOpen(false)}>
                  <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                    style={{ maxWidth: '800px', maxHeight: '85vh', padding: '2rem' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--text-primary)', margin: 0 }}>
                        {editingSculpture ? `Edit "${editingSculpture.name}"` : 'Catalog New Temple Sculpture'}
                      </h3>
                      <button onClick={() => setIsFormOpen(false)} className="modal-close-btn" style={{ position: 'static' }}>
                        <X size={18} />
                      </button>
                    </div>

                    {formError && (
                      <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#b91c1c', marginBottom: '1rem', fontSize: '0.85rem' }}>
                        {formError}
                      </div>
                    )}

                    <form onSubmit={handleSaveSculpture} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                            Sculpture Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                            Sanskrit / Traditional Title
                          </label>
                          <input
                            type="text"
                            value={formData.sanskritName}
                            onChange={(e) => setFormData({ ...formData, sanskritName: e.target.value })}
                            style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                            Temple Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.templeName}
                            onChange={(e) => setFormData({ ...formData, templeName: e.target.value })}
                            style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                            Location & State *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                            State
                          </label>
                          <select
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                          >
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                            Dynasty
                          </label>
                          <input
                            type="text"
                            value={formData.dynasty}
                            onChange={(e) => setFormData({ ...formData, dynasty: e.target.value })}
                            style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                            Period / Century
                          </label>
                          <input
                            type="text"
                            value={formData.period}
                            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                            style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                            Category
                          </label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                          >
                            <option value="Deities and Divine Figures">Deities and Divine Figures</option>
                            <option value="Mythological Scenes">Mythological Scenes</option>
                            <option value="Dancing Figures and Musicians">Dancing Figures and Musicians</option>
                            <option value="Pillar and Wall Carvings">Pillar and Wall Carvings</option>
                            <option value="Animal Sculptures">Animal Sculptures</option>
                            <option value="Guardian Figures">Guardian Figures</option>
                            <option value="Narrative Reliefs">Narrative Reliefs</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                            Material
                          </label>
                          <input
                            type="text"
                            value={formData.material}
                            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                            style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                            Architectural Style
                          </label>
                          <select
                            value={formData.architecturalStyle}
                            onChange={(e) => setFormData({ ...formData, architecturalStyle: e.target.value })}
                            style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                          >
                            <option value="Dravidian">Dravidian</option>
                            <option value="Nagara">Nagara</option>
                            <option value="Vesara">Vesara</option>
                            <option value="Hoysala">Hoysala</option>
                            <option value="Kalinga">Kalinga</option>
                            <option value="Pallava">Pallava</option>
                            <option value="Vijayanagara">Vijayanagara</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                          Primary Photograph URL *
                        </label>
                        <input
                          type="url"
                          required
                          value={formData.primaryImage}
                          onChange={(e) => setFormData({ ...formData, primaryImage: e.target.value })}
                          style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                          Detailed Description *
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                        />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <input
                          type="checkbox"
                          id="featuredCheck"
                          checked={formData.featured}
                          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        />
                        <label htmlFor="featuredCheck" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                          Feature this sculpture on the homepage showcase
                        </label>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                        <button
                          type="button"
                          onClick={() => setIsFormOpen(false)}
                          className="btn btn-secondary btn-sm"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary btn-sm"
                        >
                          {isSubmitting ? 'Saving to Database...' : (editingSculpture ? 'Update Record' : 'Save Record')}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
