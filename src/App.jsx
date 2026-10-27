import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedSculptures from './components/FeaturedSculptures';
import CategoryExplorer from './components/CategoryExplorer';
import RegionExplorer from './components/RegionExplorer';
import TimelineSection from './components/TimelineSection';
import PopularTemples from './components/PopularTemples';
import StylesGuide from './components/StylesGuide';
import CulturalPreservation from './components/CulturalPreservation';
import SculptureExplorer from './components/SculptureExplorer';
import SculptureModal from './components/SculptureModal';
import TempleModal from './components/TempleModal';
import ShilpaAIAssistant from './components/ShilpaAIAssistant';
import EducationalResources from './components/EducationalResources';
import ContactSection from './components/ContactSection';
import AdminDashboard from './components/AdminDashboard';
import HogSvmClassifier from './components/HogSvmClassifier';
import Footer from './components/Footer';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'explore' | 'temples' | 'styles' | 'timeline' | 'education' | 'contact'
  
  // Theme State: 'light' (Warm Sandstone) | 'dark' (Royal Obsidian)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('temple_theme') || 'light';
  });

  // Data States
  const [sculptures, setSculptures] = useState([]);
  const [temples, setTemples] = useState([]);
  const [styles, setStyles] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [glossary, setGlossary] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modals & Active Profiles
  const [selectedSculpture, setSelectedSculpture] = useState(null);
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminToken, setAdminToken] = useState(() => {
    return sessionStorage.getItem('temple_admin_token') || null;
  });

  // Cross-navigation filter presets for Explore tab
  const [exploreCategory, setExploreCategory] = useState('All');
  const [exploreState, setExploreState] = useState('All');
  const [exploreQuery, setExploreQuery] = useState('');

  // Apply Theme on change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('temple_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Sync Admin token to sessionStorage
  useEffect(() => {
    if (adminToken) {
      sessionStorage.setItem('temple_admin_token', adminToken);
    } else {
      sessionStorage.removeItem('temple_admin_token');
    }
  }, [adminToken]);

  // Fetch all initial data
  const fetchData = async () => {
    try {
      const [sculpturesRes, templesRes, stylesRes, timelineRes, glossaryRes, statsRes] = await Promise.all([
        fetch('/api/sculptures').then(r => r.json()),
        fetch('/api/temples').then(r => r.json()),
        fetch('/api/styles').then(r => r.json()),
        fetch('/api/timeline').then(r => r.json()),
        fetch('/api/glossary').then(r => r.json()),
        fetch('/api/stats').then(r => r.json())
      ]);

      if (sculpturesRes.sculptures) setSculptures(sculpturesRes.sculptures);
      if (templesRes.temples) setTemples(templesRes.temples);
      if (stylesRes.styles) setStyles(stylesRes.styles);
      if (timelineRes.timeline) setTimeline(timelineRes.timeline);
      setGlossary(glossaryRes);
      setStats(statsRes);
    } catch (err) {
      console.error('Error loading temple data from backend:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers for cross-section navigation
  const handleSelectCategoryFromHome = (categoryName) => {
    setExploreCategory(categoryName);
    setExploreState('All');
    setExploreQuery('');
    setActiveTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStateFromHome = (stateName) => {
    setExploreState(stateName);
    setExploreCategory('All');
    setExploreQuery('');
    setActiveTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeroSearch = (query) => {
    setExploreQuery(query);
    setExploreCategory('All');
    setExploreState('All');
    setActiveTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => {
          setActiveTab('explore');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAI={() => setIsAIModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        isAdminLoggedIn={Boolean(adminToken)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Router */}
      <main style={{ flex: 1 }}>
        {/* VIEW 1: HOMEPAGE */}
        {activeTab === 'home' && (
          <>
            <Hero
              onExploreClick={() => {
                setExploreCategory('All');
                setExploreState('All');
                setExploreQuery('');
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onTemplesClick={() => {
                setActiveTab('temples');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSearchSubmit={handleHeroSearch}
              stats={stats}
              onOpenAI={() => setIsAIModalOpen(true)}
            />

            <FeaturedSculptures
              sculptures={sculptures}
              onSelectSculpture={(sculp) => setSelectedSculpture(sculp)}
              onExploreAll={() => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <CategoryExplorer
              sculptures={sculptures}
              onSelectCategory={handleSelectCategoryFromHome}
            />

            <RegionExplorer
              sculptures={sculptures}
              onSelectState={handleSelectStateFromHome}
            />

            <TimelineSection
              timeline={timeline}
              onSelectSculpture={(sculp) => setSelectedSculpture(sculp)}
            />

            <PopularTemples
              temples={temples.slice(0, 6)}
              onSelectTemple={(tmpl) => setSelectedTemple(tmpl)}
              isFullDirectory={false}
            />

            <StylesGuide
              styles={styles}
            />

            <CulturalPreservation
              onOpenEducation={() => {
                setActiveTab('education');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        )}

        {/* VIEW 2: EXPLORE SCULPTURES */}
        {activeTab === 'explore' && (
          <SculptureExplorer
            sculptures={sculptures}
            onSelectSculpture={(sculp) => setSelectedSculpture(sculp)}
            initialCategory={exploreCategory}
            initialState={exploreState}
            initialQuery={exploreQuery}
          />
        )}

        {/* VIEW 3: TEMPLES DIRECTORY */}
        {activeTab === 'temples' && (
          <PopularTemples
            temples={temples}
            onSelectTemple={(tmpl) => setSelectedTemple(tmpl)}
            isFullDirectory={true}
          />
        )}

        {/* VIEW 4: HOG + SVM ARCHITECTURE CLASSIFIER */}
        {activeTab === 'classifier' && (
          <HogSvmClassifier />
        )}

        {/* VIEW 5: ART STYLES & TRADITIONS */}
        {activeTab === 'styles' && (
          <div style={{ paddingTop: '2rem' }}>
            <StylesGuide styles={styles} />
          </div>
        )}

        {/* VIEW 5: HISTORICAL TIMELINE */}
        {activeTab === 'timeline' && (
          <div style={{ paddingTop: '2rem' }}>
            <TimelineSection
              timeline={timeline}
              onSelectSculpture={(sculp) => setSelectedSculpture(sculp)}
            />
          </div>
        )}

        {/* VIEW 6: ABOUT & SANSKRIT GLOSSARY */}
        {activeTab === 'education' && (
          <EducationalResources glossaryData={glossary} />
        )}

        {/* VIEW 7: CONTACT & CONTRIBUTIONS */}
        {activeTab === 'contact' && (
          <ContactSection />
        )}
      </main>

      {/* Global Modals */}

      {/* 1. Sculpture Details Modal */}
      {selectedSculpture && (
        <SculptureModal
          sculpture={selectedSculpture}
          onClose={() => setSelectedSculpture(null)}
          onSelectSculpture={(sculp) => setSelectedSculpture(sculp)}
          onSelectTemple={(tmpl) => {
            setSelectedSculpture(null);
            setSelectedTemple(tmpl);
          }}
          allSculptures={sculptures}
          allTemples={temples}
        />
      )}

      {/* 2. Temple Details Modal */}
      {selectedTemple && (
        <TempleModal
          temple={selectedTemple}
          onClose={() => setSelectedTemple(null)}
          allSculptures={sculptures}
          onSelectSculpture={(sculp) => {
            setSelectedTemple(null);
            setSelectedSculpture(sculp);
          }}
        />
      )}

      {/* 3. Shilpa AI Iconography Assistant Modal */}
      {isAIModalOpen && (
        <ShilpaAIAssistant
          onClose={() => setIsAIModalOpen(false)}
          onSelectSculpture={(sculp) => {
            setIsAIModalOpen(false);
            setSelectedSculpture(sculp);
          }}
        />
      )}

      {/* 4. Curator Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        adminToken={adminToken}
        setAdminToken={setAdminToken}
        sculptures={sculptures}
        onRefreshData={fetchData}
      />

      {/* Footer */}
      <Footer
        onNavClick={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

    </div>
  );
}
