import React, { useState, useEffect } from 'react';
import {
  Compass,
  Landmark,
  Layers,
  Clock,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  Lock,
  Cpu
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenAI,
  onOpenAdmin,
  isAdminLoggedIn,
  theme,
  toggleTheme
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Landmark },
    { id: 'explore', label: 'Explore Sculptures', icon: Compass },
    { id: 'temples', label: 'Temples', icon: Landmark },
    { id: 'classifier', label: 'HOG + SVM AI', icon: Cpu },
    { id: 'styles', label: 'Art Styles', icon: Layers },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'education', label: 'About & Glossary', icon: BookOpen },
    { id: 'contact', label: 'Contact', icon: ShieldCheck }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: isScrolled
          ? 'var(--bg-card)'
          : 'var(--bg-primary)',
        borderBottom: isScrolled
          ? '1px solid var(--border-color)'
          : '1px solid transparent',
        boxShadow: isScrolled ? 'var(--shadow-md)' : 'none',
        transition: 'all var(--transition-normal)'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--color-bronze) 0%, var(--color-gold) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFDF9',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Landmark size={24} />
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.28rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                color: 'var(--text-primary)',
                display: 'block',
                lineHeight: 1.15
              }}
            >
              TEMPLE SCULPTURES
            </span>
            <span
              style={{
                fontSize: '0.74rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                fontWeight: 700,
                display: 'block'
              }}
            >
              Sacred Heritage of India
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.6rem'
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-gold)' : 'var(--text-secondary)',
                  position: 'relative',
                  padding: '0.4rem 0',
                  transition: 'color var(--transition-fast)'
                }}
              >
                {item.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: 'var(--color-gold)',
                      borderRadius: '2px'
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Utilities */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            title="Search Sculptures & Temples"
            className="btn btn-secondary btn-sm"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.8rem'
            }}
          >
            <Search size={16} color="var(--color-gold)" />
            <span className="search-text-hide" style={{ fontSize: '0.82rem' }}>Search</span>
          </button>

          {/* Shilpa AI Assistant Button */}
          <button
            onClick={onOpenAI}
            title="Ask Shilpa AI Assistant"
            className="btn btn-gold btn-sm"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem'
            }}
          >
            <Sparkles size={16} />
            <span className="ai-btn-text" style={{ fontSize: '0.82rem' }}>Shilpa AI</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Warm Sandstone' : 'Imperial Obsidian'} Theme`}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)'
            }}
          >
            {theme === 'dark' ? <Sun size={18} color="var(--color-gold)" /> : <Moon size={18} />}
          </button>

          {/* Admin Portal Button */}
          <button
            onClick={onOpenAdmin}
            title={isAdminLoggedIn ? "Curator Portal (Active)" : "Curator Admin Login"}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: isAdminLoggedIn ? 'var(--color-gold-soft)' : 'var(--bg-card)',
              color: isAdminLoggedIn ? 'var(--color-gold)' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Lock size={17} />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-nav-toggle"
            aria-label="Toggle Navigation Menu"
            style={{
              width: '40px',
              height: '40px',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1.25rem 1.5rem',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.7rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'var(--color-gold-soft)' : 'transparent',
                  color: isActive ? 'var(--color-gold)' : 'var(--text-primary)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.95rem',
                  textAlign: 'left'
                }}
              >
                <Icon size={18} color={isActive ? 'var(--color-gold)' : 'var(--text-muted)'} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: flex !important;
          }
          .search-text-hide {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
