# 🛕 Temple Sculptures — Sacred Art, Iconography & Architecture of India

An authentic, responsive, full-stack web application designed for students, historians, archaeologists, and heritage enthusiasts to explore Indian temple sculptures, sacred iconography, architectural orders, and verified historical monuments.

---

## 🌟 Key Features

### 1. Curated Heritage User Interface
- **Indian Heritage Visual Theme**: Warm Sandstone (`#D4A373`), Ivory/Cream, Bronze, and subtle Temple Gold accents.
- **Theme Switcher**: Instant switching between **Warm Sandstone Heritage Mode** and **Imperial Obsidian Dark Mode**.
- **Modern Classical Typography**: Google Fonts `Cinzel` (traditional serif for monument titles) & `Plus Jakarta Sans` (for readable curatorial descriptions).
- **Responsive Layout**: Fluid experience across desktop, tablet, and mobile devices with interactive mobile drawer navigation.

### 2. Comprehensive Homepage
- **Hero Section**: Tagline, live counter metrics (*Masterwork Sculptures, Monumental Temples, Imperial Dynasties, Millennia of Living Heritage*), and quick search.
- **Featured Sculptures Showcase**: Highlighted masterworks (e.g. *Chola Nataraja, Hoysala Madanika, Arjuna's Penance, Ravana Shaking Kailasa*).
- **Explore by Sculpture Category**: 8 canonical genres (*Deities and Divine Figures, Mythological Scenes, Dancing Figures and Musicians, Floral & Geometric Motifs, Guardian Figures, Animal Sculptures, Pillar & Wall Carvings, Narrative Reliefs*).
- **Explore by Indian Region & State**: Tamil Nadu, Karnataka, Telangana, Andhra Pradesh, Odisha, Madhya Pradesh, Maharashtra with stone medium classifications.
- **Interactive Historical Timeline**: Step-by-step chronology from 4th Century CE classical foundations to 17th Century CE Nayaka & Vijayanagara monoliths.
- **Popular Temples Showcase**: Monument profiles for *Brihadisvara, Chennakeshava Belur, Mamallapuram, Kailasa Ellora, Kandariya Mahadeva Khajuraho, Konark Sun Temple, Vittala Hampi, and Ramappa*.
- **Cultural Significance & Conservation**: Scientific protocols by the Archaeological Survey of India (ASI) and Silpa Sastra canons (*Talamana, Madhuchishtavidhana, Rasa theory*).

### 3. Sculpture Exploration Directory
- **Full Search**: Real-time multi-field search across deity names, Sanskrit titles, temples, materials, dynasties, and keywords.
- **Multi-Faceted Filtering**: Filter by category, state, dynasty, medium (granite, bronze, chlorite schist, sandstone, basalt), and architectural style.
- **View Modes**: Interactive Grid view and List view toggle.
- **Sorting**: Name (A–Z / Z–A) and Chronological Period (Earliest / Latest).
- **Pagination & Reset**: Dynamic page calculation with empty-state resets.

### 4. Detailed Sculpture Profiles
- High-resolution zoomable gallery with thumbnail selection.
- Detailed iconographic breakdown (*Mudras, Ayudhas, Pedestals, Sacred Symbolism*).
- Architectural setting, artistic significance, and dynastic patronage.
- Scientific conservation and preservation status.
- Verified academic citations (e.g. Ananda Coomaraswamy, Stella Kramrisch, ASI Bulletins).
- Direct links to affiliated temples and related sculptures.
- Share link with clipboard copying.

### 5. Temples & Sanctuaries Directory
- Search and filter temples by architectural order and geographic state.
- Full temple profiles detailing presiding deities, engineering feats (such as Ramappa's floating bricks or Ellora's top-down monolithic excavation), notable collections, and catalogued affiliated sculptures.

### 6. Architectural Styles & Dynastic Traditions Guide
- In-depth comparative guide covering *Dravidian, Nagara, Vesara, Hoysala, Kalinga, Pallava, Chola, and Vijayanagara*.
- Scholarly distinction separating architectural taxonomy (formal geometry, Vimana vs. Shikhara) from dynastic patron traditions.

### 7. Shilpa AI Iconography Assistant
- **Iconography Q&A**: Answers questions regarding postures (*Tribhanga*), hand gestures (*Mudras*), composite mythical beasts (*Yali/Vyala*), and divine attributes with scholarly citations.
- **Visual Style Heuristic**: Test image analysis with sample benchmark photographs or external URLs to classify probable styles, mediums, and matching masterworks.

### 8. Educational Resources & Sanskrit Glossary
- Searchable Sanskrit glossary (*Abhaya Mudra, Tribhanga, Yali, Salabhanjika, Vimana, Shikhara, Apasmara, Prabhamandala, Ayudha, Gopuram*).
- Canonical treatises (*Silpa Prakasha, Manasara Vastusastra, Mayamata, Citrasutra*).
- Directory of premier repositories (*Archaeological Survey of India, National Museum New Delhi, Government Museum Chennai, IGNCA*).

### 9. Curator Administrative Portal
- Passcode-protected access (`heritage2025` or `admin123`).
- Full CRUD operations: Add new sculptures, edit existing records, or archive/delete entries with safety confirmation.
- Directly persists to the server database.

### 10. Contact & Contributions Desk
- Form connected directly to `/api/contact` with input validation, success banners, and field observation reviews.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite 8, Lucide React icons.
- **Styling**: Vanilla CSS design system with CSS custom properties (variables) supporting light and dark themes.
- **Backend**: Node.js, Express 5 REST API with input validation and token authorization.
- **Database**: Local JSON persistence (`server/data/sculptures.json`, `temples.json`, `styles.json`, `timeline.json`, `glossary.json`, `messages.json`).

---

## 📁 Folder Structure

```
sculptures/
├── index.html                   # HTML entry point with Google Fonts & Kalasha Favicon
├── package.json                 # Dependencies and npm scripts
├── vite.config.js               # Vite config with API proxy
├── .env.example                 # Environment configuration template
├── README.md                    # Project documentation
├── public/                      # Static assets
├── server/
│   ├── index.js                 # Express 5 REST API server
│   └── data/
│       ├── sculptures.json      # Verified sculptures database
│       ├── temples.json         # Temples directory database
│       ├── styles.json          # Architectural styles guide data
│       ├── timeline.json        # Historical timeline data
│       ├── glossary.json        # Sanskrit glossary & educational institutions
│       └── messages.json        # Persisted user contact messages
└── src/
    ├── main.jsx                 # React root renderer
    ├── App.jsx                  # Main application shell and state manager
    ├── index.css                # Heritage design system & theme styling
    └── components/
        ├── Navbar.jsx           # Responsive header, search & theme toggle
        ├── Hero.jsx             # Hero section with live stats and quick search
        ├── FeaturedSculptures.jsx # Curated masterworks grid
        ├── CategoryExplorer.jsx # 8 iconographic category cards
        ├── RegionExplorer.jsx   # State & regional geology exploration
        ├── TimelineSection.jsx  # Interactive chronological timeline
        ├── PopularTemples.jsx   # Temples directory & homepage showcase
        ├── StylesGuide.jsx      # Architectural vs. dynastic guide
        ├── CulturalPreservation.jsx # ASI conservation & Silpa Sastras
        ├── SculptureExplorer.jsx# Multi-faceted search & filter explorer
        ├── SculptureModal.jsx   # Detailed sculpture profile & zoom viewer
        ├── TempleModal.jsx      # Temple profile & affiliated sculptures
        ├── ShilpaAIAssistant.jsx# Iconography AI assistant & image analyzer
        ├── EducationalResources.jsx # Glossary & academic bibliography
        ├── ContactSection.jsx   # Validated contact form
        ├── AdminDashboard.jsx   # Passcode-protected curator CRUD portal
        └── Footer.jsx           # Institutional links and credits
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher (v22.20.0 tested)
- **npm**: v9.0.0 or higher

### Installation

```bash
# Clone or navigate to the directory
cd sculptures

# Install all dependencies
npm install
```

### Running Locally (Development)

Start both the Express API server and the Vite development client with a single command:

```bash
npm run dev
```

- **Frontend Client**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

### Running Production Bundle

```bash
# Build the optimized production bundle
npm run build

# Start the full-stack server serving the production bundle
npm start
```

Open your browser to: `http://localhost:5000`

---

## 🔑 Curator Portal Access

To access administrative capabilities (cataloging new sculptures, editing metadata, or deleting records):
1. Click the **Lock icon** in the top navigation bar or the **Curator Admin Access** link in the footer.
2. Enter the curator passcode: `heritage2025` (or `admin123`).
3. Manage sculptures with live updates to `server/data/sculptures.json`.

---

## 📚 Academic Citations & Data Sources

- **Archaeological Survey of India (ASI)**: National monument register and conservation bulletins.
- **Ananda K. Coomaraswamy**: *The Dance of Shiva: Fourteen Indian Essays* (1918).
- **Stella Kramrisch**: *The Hindu Temple*, Vols. I & II, Motilal Banarsidass (1976).
- **C. Sivaramamurti**: *South Indian Bronzes*, Lalit Kala Akademi (1963).
- **Percy Brown**: *Indian Architecture (Buddhist and Hindu Periods)* (1942).
- **S. Settar**: *The Hoysala Temples: Royal Enterprise and Art Architecture* (1992).
- **Devangana Desai**: *The Religious Imagery of Khajuraho*, Franco-Indian Research (1996).
