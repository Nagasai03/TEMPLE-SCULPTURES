import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { execFile } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Helper to read JSON data safely
const readData = (filename) => {
  const filePath = path.join(__dirname, 'data', filename);
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return null;
  }
};

// Helper to write JSON data safely
const writeData = (filename, data) => {
  const filePath = path.join(__dirname, 'data', filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    return false;
  }
};

// Simple admin token authentication
const ADMIN_TOKEN = 'secret-temple-curator-token-2025';
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    if (token === ADMIN_TOKEN) {
      return next();
    }
  }
  return res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
};

// ----------------- API ROUTES -----------------

// 1. Health check & Stats
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Temple Sculptures API', timestamp: new Date().toISOString() });
});

app.get('/api/stats', (req, res) => {
  const sculpturesData = readData('sculptures.json') || { sculptures: [] };
  const templesData = readData('temples.json') || { temples: [] };
  const stylesData = readData('styles.json') || { styles: [] };
  const timelineData = readData('timeline.json') || { timeline: [] };

  const uniqueDynasties = new Set(sculpturesData.sculptures.map(s => s.dynasty));
  const uniqueStates = new Set(sculpturesData.sculptures.map(s => s.state));
  const uniqueCategories = new Set(sculpturesData.sculptures.map(s => s.category));

  res.json({
    totalSculptures: sculpturesData.sculptures.length,
    totalTemples: templesData.temples.length,
    totalStyles: stylesData.styles.length,
    totalTimelineEras: timelineData.timeline.length,
    totalDynasties: uniqueDynasties.size,
    totalStates: uniqueStates.size,
    totalCategories: uniqueCategories.size
  });
});

// 2. Sculptures: List, Filter, Search, Sort & Paginate
app.get('/api/sculptures', (req, res) => {
  const data = readData('sculptures.json');
  if (!data || !data.sculptures) {
    return res.status(500).json({ error: 'Failed to load sculptures data' });
  }

  let results = [...data.sculptures];
  const { search, category, state, region, dynasty, material, style, sort, page = 1, limit = 12 } = req.query;

  // Search filter
  if (search && search.trim() !== '') {
    const query = search.trim().toLowerCase();
    results = results.filter(s =>
      s.name?.toLowerCase().includes(query) ||
      s.sanskritName?.toLowerCase().includes(query) ||
      s.templeName?.toLowerCase().includes(query) ||
      s.location?.toLowerCase().includes(query) ||
      s.dynasty?.toLowerCase().includes(query) ||
      s.material?.toLowerCase().includes(query) ||
      s.category?.toLowerCase().includes(query) ||
      s.description?.toLowerCase().includes(query) ||
      s.architecturalStyle?.toLowerCase().includes(query)
    );
  }

  // Exact/category filters
  if (category && category !== 'All') {
    results = results.filter(s => s.category === category);
  }
  if (state && state !== 'All') {
    results = results.filter(s => s.state === state);
  }
  if (region && region !== 'All') {
    results = results.filter(s => s.region === region);
  }
  if (dynasty && dynasty !== 'All') {
    results = results.filter(s => s.dynasty.toLowerCase().includes(dynasty.toLowerCase()));
  }
  if (material && material !== 'All') {
    results = results.filter(s => s.material.toLowerCase().includes(material.toLowerCase()));
  }
  if (style && style !== 'All') {
    results = results.filter(s => s.architecturalStyle.toLowerCase().includes(style.toLowerCase()));
  }

  // Sort
  if (sort === 'name-asc') {
    results.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'name-desc') {
    results.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sort === 'period-asc') {
    results.sort((a, b) => a.period.localeCompare(b.period));
  } else if (sort === 'period-desc') {
    results.sort((a, b) => b.period.localeCompare(a.period));
  }

  // Extract metadata facets for client filters
  const allSculptures = data.sculptures;
  const facets = {
    categories: Array.from(new Set(allSculptures.map(s => s.category).filter(Boolean))),
    states: Array.from(new Set(allSculptures.map(s => s.state).filter(Boolean))).sort(),
    dynasties: Array.from(new Set(allSculptures.map(s => s.dynasty).filter(Boolean))).sort(),
    materials: ['Granite', 'Sandstone', 'Chlorite Schist', 'Bronze', 'Basalt', 'Dolerite'],
    styles: Array.from(new Set(allSculptures.map(s => s.architecturalStyle).filter(Boolean))).sort()
  };

  const total = results.length;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 12;
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedResults = results.slice(startIndex, startIndex + limitNum);

  res.json({
    sculptures: paginatedResults,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum) || 1,
    facets
  });
});

// 3. Single Sculpture Details
app.get('/api/sculptures/:id', (req, res) => {
  const data = readData('sculptures.json');
  const templesData = readData('temples.json');
  if (!data || !data.sculptures) {
    return res.status(500).json({ error: 'Database unavailable' });
  }

  const sculpture = data.sculptures.find(s => s.id === req.params.id);
  if (!sculpture) {
    return res.status(404).json({ error: 'Sculpture not found' });
  }

  // Related sculptures (same style or same dynasty or same temple)
  const relatedSculptures = data.sculptures
    .filter(s => s.id !== sculpture.id && (s.templeId === sculpture.templeId || s.architecturalStyle === sculpture.architecturalStyle || s.category === sculpture.category))
    .slice(0, 4);

  // Associated temple
  let relatedTemple = null;
  if (templesData && templesData.temples) {
    relatedTemple = templesData.temples.find(t => t.id === sculpture.templeId) || null;
  }

  res.json({
    sculpture,
    relatedSculptures,
    relatedTemple
  });
});

// 4. Admin Create Sculpture
app.post('/api/sculptures', authenticateAdmin, (req, res) => {
  const data = readData('sculptures.json') || { sculptures: [] };
  const { name, templeName, location, state, region, dynasty, period, material, category, architecturalStyle, primaryImage, description, shortDescription, sanskritName, iconography, artisticSignificance, citations } = req.body;

  if (!name || !templeName || !location || !primaryImage) {
    return res.status(400).json({ error: 'Missing required sculpture fields (name, templeName, location, primaryImage)' });
  }

  const newId = `sculpture-${Date.now().toString().slice(-6)}`;
  const newSculpture = {
    id: newId,
    name: name.trim(),
    sanskritName: sanskritName || '',
    templeId: req.body.templeId || 'temple-general',
    templeName: templeName.trim(),
    location: location.trim(),
    state: state || 'Pan-India',
    region: region || 'South India',
    dynasty: dynasty || 'Historical Dynastic Period',
    period: period || 'Medieval Period',
    material: material || 'Carved Stone',
    category: category || 'Deities and Divine Figures',
    architecturalStyle: architecturalStyle || 'Dravidian',
    dimensions: req.body.dimensions || 'Canonical proportions',
    condition: req.body.condition || 'Protected archaeological monument',
    primaryImage,
    galleryImages: req.body.galleryImages && req.body.galleryImages.length > 0 ? req.body.galleryImages : [primaryImage],
    shortDescription: shortDescription || description?.slice(0, 160) || '',
    description: description || 'Authentic temple sculpture preserved in accordance with traditional Silpa Sastras.',
    iconography: iconography || {
      mudra: 'Traditional iconographic gesture',
      attributes: 'Sacred emblems and ornamentation',
      symbolism: 'Cosmic and philosophical significance'
    },
    artisticSignificance: artisticSignificance || 'Exemplary craftsmanship illustrating classical Indian sculptural canons.',
    historicalBackground: req.body.historicalBackground || 'Historical provenance recorded by state and national antiquities bodies.',
    preservationNotes: req.body.preservationNotes || 'Monitored under archaeological conservation protocols.',
    citations: citations || ['Archaeological Survey of India (ASI) Monument Records'],
    featured: Boolean(req.body.featured)
  };

  data.sculptures.unshift(newSculpture);
  writeData('sculptures.json', data);

  res.status(201).json({ success: true, sculpture: newSculpture });
});

// 5. Admin Update Sculpture
app.put('/api/sculptures/:id', authenticateAdmin, (req, res) => {
  const data = readData('sculptures.json');
  if (!data || !data.sculptures) {
    return res.status(500).json({ error: 'Database error' });
  }

  const index = data.sculptures.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Sculpture not found' });
  }

  data.sculptures[index] = {
    ...data.sculptures[index],
    ...req.body,
    id: req.params.id // prevent id override
  };

  writeData('sculptures.json', data);
  res.json({ success: true, sculpture: data.sculptures[index] });
});

// 6. Admin Delete Sculpture
app.delete('/api/sculptures/:id', authenticateAdmin, (req, res) => {
  const data = readData('sculptures.json');
  if (!data || !data.sculptures) {
    return res.status(500).json({ error: 'Database error' });
  }

  const initialCount = data.sculptures.length;
  data.sculptures = data.sculptures.filter(s => s.id !== req.params.id);

  if (data.sculptures.length === initialCount) {
    return res.status(404).json({ error: 'Sculpture not found' });
  }

  writeData('sculptures.json', data);
  res.json({ success: true, message: 'Sculpture deleted successfully' });
});

// 7. Temples: List & Filter
app.get('/api/temples', (req, res) => {
  const data = readData('temples.json');
  const sculpturesData = readData('sculptures.json');
  if (!data || !data.temples) {
    return res.status(500).json({ error: 'Failed to load temples' });
  }

  let list = [...data.temples];
  const { search, style, state } = req.query;

  if (search && search.trim() !== '') {
    const q = search.trim().toLowerCase();
    list = list.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.location.toLowerCase().includes(q) ||
      t.dynasty.toLowerCase().includes(q) ||
      t.architecturalStyle.toLowerCase().includes(q)
    );
  }

  if (style && style !== 'All') {
    list = list.filter(t => t.architecturalStyle.toLowerCase().includes(style.toLowerCase()));
  }

  if (state && state !== 'All') {
    list = list.filter(t => t.state === state);
  }

  // Attach count of affiliated sculptures
  const enhancedTemples = list.map(t => {
    const count = sculpturesData?.sculptures?.filter(s => s.templeId === t.id).length || 0;
    return {
      ...t,
      sculpturesCount: count
    };
  });

  res.json({ temples: enhancedTemples, total: enhancedTemples.length });
});

// 8. Single Temple Details
app.get('/api/temples/:id', (req, res) => {
  const templesData = readData('temples.json');
  const sculpturesData = readData('sculptures.json');
  if (!templesData || !templesData.temples) {
    return res.status(500).json({ error: 'Failed to load temples' });
  }

  const temple = templesData.temples.find(t => t.id === req.params.id);
  if (!temple) {
    return res.status(404).json({ error: 'Temple not found' });
  }

  // Find affiliated sculptures
  const affiliatedSculptures = sculpturesData?.sculptures?.filter(s => s.templeId === temple.id) || [];

  res.json({ temple, affiliatedSculptures });
});

// 9. Art Styles
app.get('/api/styles', (req, res) => {
  const data = readData('styles.json');
  res.json(data || { styles: [] });
});

// 10. Historical Timeline
app.get('/api/timeline', (req, res) => {
  const timelineData = readData('timeline.json');
  const sculpturesData = readData('sculptures.json');

  if (!timelineData || !timelineData.timeline) {
    return res.status(500).json({ error: 'Timeline data not found' });
  }

  // Attach populated sculptures to timeline items
  const enriched = timelineData.timeline.map(period => {
    const matchedSculptures = (period.keySculptures || []).map(sculptureId => {
      return sculpturesData?.sculptures?.find(s => s.id === sculptureId) || null;
    }).filter(Boolean);

    return {
      ...period,
      sculptureDetails: matchedSculptures
    };
  });

  res.json({ timeline: enriched });
});

// 11. Glossary & Educational Resources
app.get('/api/glossary', (req, res) => {
  const data = readData('glossary.json');
  res.json(data || { glossary: [], educationalInstitutions: [], canonicalTreatises: [] });
});

// 12. Contact Form Submission
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  // Basic email pattern check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const messages = readData('messages.json') || [];
  const newMessage = {
    id: `msg-${Date.now()}`,
    name: name.trim(),
    email: email.trim(),
    subject: subject ? subject.trim() : 'General Inquiry',
    message: message.trim(),
    receivedAt: new Date().toISOString()
  };

  messages.push(newMessage);
  writeData('messages.json', messages);

  res.json({ success: true, message: 'Thank you for reaching out! Your message has been received by the Temple Sculptures heritage preservation team.' });
});

// 13. Admin Auth Login
app.post('/api/auth/login', (req, res) => {
  const { passcode } = req.body;
  if (passcode === 'heritage2025' || passcode === 'admin123') {
    return res.json({
      success: true,
      token: ADMIN_TOKEN,
      user: {
        role: 'curator',
        name: 'Heritage Project Curator',
        accessLevel: 'full'
      }
    });
  }
  return res.status(401).json({ error: 'Invalid curator passcode. Please try again.' });
});

// 14. Shilpa AI Iconography Assistant
app.post('/api/ai/ask', (req, res) => {
  const { question } = req.body;
  if (!question || question.trim() === '') {
    return res.status(400).json({ error: 'Question is required' });
  }

  const q = question.toLowerCase();
  const sculpturesData = readData('sculptures.json');
  const stylesData = readData('styles.json');
  const glossaryData = readData('glossary.json');

  let answer = '';
  let citations = [
    'Archaeological Survey of India (ASI) National Heritage Documentation',
    'Stella Kramrisch, "The Hindu Temple" (1976)',
    'Ananda K. Coomaraswamy, "The Dance of Shiva" (1918)'
  ];
  let matchedSculptures = [];

  if (q.includes('nataraja') || q.includes('dance') || q.includes('cosmic') || q.includes('apasmara')) {
    answer = "The Nataraja icon (literally 'King of Dance') embodies Shiva's continuous cosmic cycles of creation, preservation, destruction, veil of illusion, and liberation (Panchakritya). Under his right foot lies the dwarf Apasmara (or Muyalaka), personifying cosmic ignorance and heedlessness. The upper right hand holds the Damaru (drum of primordial sound), while the upper left hand cradles Agni (flame of dissolution). The lower right hand performs Abhaya Mudra (protection), and the lower left points gracefully across the body in Gajahasta to the raised left foot—the haven of spiritual liberation. The surrounding Prabhamandala symbolizes the dynamic universe ignited by divine energy.";
    matchedSculptures = (sculpturesData?.sculptures || []).filter(s => s.id === 'sculpture-01');
    citations.push('C. Sivaramamurti, "South Indian Bronzes" (Lalit Kala Akademi)');
  } else if (q.includes('hoysala') || q.includes('soapstone') || q.includes('madanika') || q.includes('belur')) {
    answer = "Hoysala sculpture is renowned for its unmatched filigree detail and deep undercutting. The sculptors used Chlorite Schist (commonly termed Soapstone or potstone), which is relatively soft when newly quarried from riverbeds, allowing exquisite micro-undercutting of beads, jewelry, and foliage. Upon prolonged exposure to air and light, chlorite schist undergoes mineral hardening, preserving sharp contours for centuries. Unique to Hoysala art, master sculptors (Ruvari) proudly inscribed their names onto the pedestals of their sculptures (such as Ruvari Mallitamma and Dasoja).";
    matchedSculptures = (sculpturesData?.sculptures || []).filter(s => s.id === 'sculpture-02');
    citations.push('S. Settar, "The Hoysala Temples: Royal Enterprise and Art Architecture"');
  } else if (q.includes('dravidian') || q.includes('nagara') || q.includes('difference') || q.includes('style')) {
    answer = "Indian temple architecture is broadly categorized into two classical geographical and stylistic orders, plus a hybrid Deccan order: \n1. Nagara (Northern): Characterized by a curvilinear, beehive-shaped Shikhara tower crowned by an Amalaka (fluted circular stone disk) and Kalasha finial, built on an elevated open platform (Jagati).\n2. Dravidian (Southern): Characterized by a stepped pyramidal tower (Vimana) directly over the sanctum, surrounded by high compound walls with towering monumental gateway towers (Gopurams) and pillared corridors.\n3. Vesara: A Deccan hybrid school originating under the Badami Chalukyas and Hoysalas, merging the curvilinear Nagara verticality with the tier articulation of Dravidian mandapas.";
    citations.push('Percy Brown, "Indian Architecture (Buddhist and Hindu Periods)"');
  } else if (q.includes('tribhanga') || q.includes('posture') || q.includes('mudra')) {
    answer = "In classical Indian sculpture and the Silpa Sastras, 'Tribhanga' (thrice-bent posture) is a celebrated standing posture where the body bends in three opposing curves: the neck tilts in one direction, the torso shifts in the reverse, and the hips and legs bend back. This stance infuses sculpted stone and bronze figures with extraordinary kinetic grace, rhythm, and lifelike naturalism. It is prominently featured in depictions of Krishna, celestial Surasundaris, and Madanika bracket figures at Khajuraho and Belur.";
    citations.push('Kapila Vatsyayan, "Classical Indian Dance in Literature and the Arts"');
  } else if (q.includes('yali') || q.includes('vyala') || q.includes('pillar')) {
    answer = "The Yali (or Vyala) is a mythical composite guardian beast possessing the body of a lion, head of an elephant (Gaja-Vyala) or lion, and tail of a serpent. In Vijayanagara and late Dravidian temples (such as Hampi and Madurai), Yalis are sculpted rearing dynamically on their hind legs from single monolithic granite pillars. They symbolize supernatural strength, spiritual guardianship, and mastery over terrestrial and cosmic forces. Sculptors often carved freely rolling stone balls inside their open jaws.";
    matchedSculptures = (sculpturesData?.sculptures || []).filter(s => s.id === 'sculpture-07');
  } else {
    answer = `Based on authenticated documentation from the Archaeological Survey of India (ASI) and traditional treatises (Silpa Prakasha and Manasara), Indian temple sculptures served as architectural visual scriptures rather than mere decoration. Every posture (Asana), gesture (Mudra), sacred attribute (Ayudha), and floral motif followed strict mathematical proportions (Talamana) designed to induce contemplative aesthetic delight (Rasa) and spiritual communion. If you are researching a specific deity, dynasty, or temple, explore our collections for Brihadisvara, Belur, Konark, Mamallapuram, or Khajuraho.`;
  }

  res.json({
    answer,
    citations,
    matchedSculptures
  });
});

// 15. AI Image-Based Exploration
app.post('/api/ai/analyze-image', (req, res) => {
  const { imageUrl, styleHint } = req.body;
  const sculpturesData = readData('sculptures.json');

  // Provide intelligent classification based on visual hints & simulated computer vision tag analysis
  let detectedStyle = 'Dravidian';
  let suggestedCategory = 'Deities and Divine Figures';
  let materialSuggestion = 'Granite / Bronze';
  let confidence = '89%';
  let matchingSculptureIds = ['sculpture-01'];

  const urlLower = (imageUrl || '').toLowerCase() + ' ' + (styleHint || '').toLowerCase();

  if (urlLower.includes('madanika') || urlLower.includes('dancer') || urlLower.includes('filigree') || urlLower.includes('soapstone') || urlLower.includes('belur')) {
    detectedStyle = 'Hoysala';
    suggestedCategory = 'Dancing Figures and Musicians';
    materialSuggestion = 'Chlorite Schist (Soapstone)';
    confidence = '94%';
    matchingSculptureIds = ['sculpture-02'];
  } else if (urlLower.includes('khajuraho') || urlLower.includes('sandstone') || urlLower.includes('surasundari') || urlLower.includes('nagara')) {
    detectedStyle = 'Nagara (Chandela)';
    suggestedCategory = 'Dancing Figures and Musicians';
    materialSuggestion = 'Buff Sandstone';
    confidence = '92%';
    matchingSculptureIds = ['sculpture-05'];
  } else if (urlLower.includes('konark') || urlLower.includes('sun') || urlLower.includes('chariot') || urlLower.includes('kalinga')) {
    detectedStyle = 'Kalinga';
    suggestedCategory = 'Deities and Divine Figures';
    materialSuggestion = 'Chlorite and Khondalite Stone';
    confidence = '95%';
    matchingSculptureIds = ['sculpture-06'];
  } else if (urlLower.includes('mamallapuram') || urlLower.includes('ganga') || urlLower.includes('pallava') || urlLower.includes('rock')) {
    detectedStyle = 'Pallava';
    suggestedCategory = 'Narrative Reliefs';
    materialSuggestion = 'Pink Granite';
    confidence = '93%';
    matchingSculptureIds = ['sculpture-03'];
  } else if (urlLower.includes('yali') || urlLower.includes('hampi') || urlLower.includes('pillar') || urlLower.includes('vijayanagara')) {
    detectedStyle = 'Vijayanagara';
    suggestedCategory = 'Pillar and Wall Carvings';
    materialSuggestion = 'Hard Grey Granite';
    confidence = '91%';
    matchingSculptureIds = ['sculpture-07'];
  }

  const suggestedSculptures = (sculpturesData?.sculptures || []).filter(s => matchingSculptureIds.includes(s.id));

  res.json({
    analysis: {
      detectedStyle,
      suggestedCategory,
      materialSuggestion,
      confidence,
      disclaimer: 'Visual analysis provided as an educational heuristic. Historical verification requires epigraphical context and archaeological field review.'
    },
    suggestedSculptures
  });
});

// 16. HOG + SVM Temple Architectural Classifier (Nagara vs. Dravida vs. Vesara)
app.post('/api/classify/hog-svm', (req, res) => {
  const { imageUrl } = req.body;
  if (!imageUrl || !imageUrl.trim()) {
    return res.status(400).json({ error: 'Image URL or base64 data URI is required.' });
  }

  const scriptPath = path.join(__dirname, 'ml', 'train_and_classify.py');
  const input = imageUrl.trim();
  const isBase64 = input.startsWith('data:image');

  const runPython = (inputArg, tempFile) => {
    execFile('python', [scriptPath, '--predict', inputArg], { maxBuffer: 20 * 1024 * 1024, timeout: 60000 }, (error, stdout, stderr) => {
      // Clean up temp file if used
      if (tempFile) {
        try { fs.unlinkSync(tempFile); } catch (_) {}
      }
      if (error) {
        console.error('HOG+SVM execution error:', stderr || error.message);
        return res.status(500).json({ error: 'HOG + SVM inference failed: ' + (stderr?.split('\n')[0] || error.message) });
      }
      try {
        const result = JSON.parse(stdout.trim());
        res.json(result);
      } catch (parseErr) {
        console.error('Failed to parse HOG+SVM output:', stdout.slice(0, 500));
        res.status(500).json({ error: 'Invalid model output format. Raw: ' + stdout.slice(0, 200) });
      }
    });
  };

  if (isBase64) {
    // Write base64 data URI to a temp image file to avoid CLI length limits
    try {
      const matches = input.match(/^data:image\/(\w+);base64,(.+)$/);
      const ext = (matches && matches[1]) ? matches[1] : 'png';
      const b64data = (matches && matches[2]) ? matches[2] : input.split(',')[1];
      const tempFile = path.join(os.tmpdir(), `temple_classify_${Date.now()}.${ext}`);
      fs.writeFileSync(tempFile, Buffer.from(b64data, 'base64'));
      runPython(tempFile, tempFile);
    } catch (writeErr) {
      return res.status(500).json({ error: 'Failed to process uploaded image: ' + writeErr.message });
    }
  } else {
    runPython(input, null);
  }
});

// Serve frontend static files if built in production
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Temple Sculptures API Server running on port ${PORT}`);
});
