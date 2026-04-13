// ═══════════════════════════════════════════════════════════════════
// 🌊 Disaster Survival AI — Express Server
// Backend powered by Gemma 4 — Cloud (Google AI) + Offline KB
// ═══════════════════════════════════════════════════════════════════

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';
import { knowledgeBase } from './knowledge-base.js';
import { SYSTEM_PROMPTS } from './prompts.js';

import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env using dotenv
dotenv.config({ path: join(__dirname, '..', '.env') });


const app = express();
const PORT = process.env.PORT || 3001;

// ─────────────────────────────────────────────────────────────────
// AI BACKEND CONFIGURATION
// Priority: 1) Google AI API  2) Offline KB
// ─────────────────────────────────────────────────────────────────

const CLOUD_MODEL = 'gemma-4-26b-a4b-it';

let aiMode = 'offline'; // 'cloud' | 'offline'
let cloudAI = null;

// Initialize Google AI
const API_KEY = process.env.GEMINI_API_KEY;
if (API_KEY && API_KEY !== 'your_api_key_here') {
  try {
    const { GoogleGenAI } = await import('@google/genai');
    cloudAI = new GoogleGenAI({ apiKey: API_KEY });
    aiMode = 'cloud';
    console.log('☁️  Google AI (cloud) initialized');
  } catch (e) {
    console.log('⚠️  Could not load @google/genai:', e.message);
  }
} else {
  console.log('⚠️  GEMINI_API_KEY not found. Running in offline knowledge base mode');
}

// ─────────────────────────────────────────────────────────────────
// UNIFIED AI GENERATION FUNCTION
// ─────────────────────────────────────────────────────────────────

async function generateAI(prompt, systemPrompt, options = {}) {
  const { maxTokens = 1024, temperature = 0.3, history = [] } = options;

  // Strategy 1: Google AI Cloud
  if (cloudAI) {
    try {
      const chatHistory = history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const response = await cloudAI.models.generateContent({
        model: CLOUD_MODEL,
        contents: [
          ...chatHistory,
          { role: 'user', parts: [{ text: prompt }] }
        ],
        config: {
          systemInstruction: systemPrompt,
          maxOutputTokens: maxTokens,
          temperature,
          topP: 0.8,
        }
      });

      return {
        text: response.text,
        source: 'gemma4-cloud',
        model: CLOUD_MODEL,
        offline: false
      };
    } catch (e) {
      console.log('⚠️  Cloud API failed:', e.message);
    }
  }

  // Strategy 2: Offline knowledge base
  return null;
}

// ─────────────────────────────────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────────────────────────────────

app.use(express.json());
app.use(express.static(join(__dirname, '..', 'public')));

// ─────────────────────────────────────────────────────────────────
// API ENDPOINTS
// ─────────────────────────────────────────────────────────────────

  // Chat endpoint — main disaster AI conversation
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context = 'general', history = [], fastMode = false } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // If Fast Mode is enabled, skip the AI entirely and use preloaded info
    if (fastMode) {
      const reply = getOfflineResponse(message, context);
      return res.json({
        reply,
        source: 'knowledge-base',
        offline: true
      });
    }

    // Try AI generation (Cloud → Offline)
    const result = await generateAI(message, SYSTEM_PROMPTS.main, {
      history: history.slice(-10),
      maxTokens: 1024,
      temperature: 0.3
    });

    if (result) {
      return res.json({
        reply: result.text,
        source: result.source,
        model: result.model,
        offline: result.offline
      });
    }

    // Offline fallback — use knowledge base
    const reply = getOfflineResponse(message, context);
    res.json({
      reply,
      source: 'knowledge-base',
      offline: true
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// First aid endpoint — structured first aid guidance
app.post('/api/first-aid', async (req, res) => {
  try {
    const { condition, details = '' } = req.body;

    if (!condition) {
      return res.status(400).json({ error: 'Condition is required' });
    }

    const prompt = `The user needs first aid help for: ${condition}. ${details ? `Additional details: ${details}` : ''}. Provide clear, step-by-step first aid instructions.`;

    const result = await generateAI(prompt, SYSTEM_PROMPTS.firstAid, {
      maxTokens: 1024,
      temperature: 0.2
    });

    if (result) {
      return res.json({
        reply: result.text,
        source: result.source,
        model: result.model,
        offline: result.offline,
        knowledgeBase: findFirstAidData(condition)
      });
    }

    // Offline fallback
    const data = findFirstAidData(condition);
    if (data) {
      const steps = data.steps.map(s => `**Step ${s.step}: ${s.action}**\n${s.detail}`).join('\n\n');
      res.json({
        reply: `# ${data.icon} ${data.title}\n\n${steps}`,
        source: 'knowledge-base',
        offline: true,
        knowledgeBase: data
      });
    } else {
      res.json({
        reply: getOfflineResponse(condition, 'firstaid'),
        source: 'knowledge-base',
        offline: true
      });
    }
  } catch (error) {
    console.error('First aid error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Evacuation endpoint
app.post('/api/evacuate', async (req, res) => {
  try {
    const { disasterType, situation = '', specialNeeds = [] } = req.body;

    if (!disasterType) {
      return res.status(400).json({ error: 'Disaster type is required' });
    }

    const prompt = `Create an evacuation plan for a ${disasterType}. ${situation ? `Current situation: ${situation}.` : ''} ${specialNeeds.length ? `Special considerations: ${specialNeeds.join(', ')}.` : ''} Provide a prioritized, actionable evacuation plan.`;

    const result = await generateAI(prompt, SYSTEM_PROMPTS.evacuation, {
      maxTokens: 1024,
      temperature: 0.2
    });

    if (result) {
      return res.json({
        reply: result.text,
        source: result.source,
        model: result.model,
        offline: result.offline,
        disasterData: knowledgeBase.disasters[disasterType] || null,
        checklist: knowledgeBase.evacuation.essentials
      });
    }

    // Offline fallback
    const disaster = knowledgeBase.disasters[disasterType];
    if (disaster) {
      let reply = `# ${disaster.icon} ${disaster.title} — Evacuation Plan\n\n`;
      reply += `## ⚠️ During the ${disasterType.charAt(0).toUpperCase() + disasterType.slice(1)}\n`;
      reply += disaster.during.map(d => `- ${d}`).join('\n');
      reply += `\n\n## After the ${disasterType.charAt(0).toUpperCase() + disasterType.slice(1)}\n`;
      reply += disaster.after.map(a => `- ${a}`).join('\n');
      reply += `\n\n## 🎒 Essential Supplies\n`;
      reply += disaster.supplies.map(s => `- ${s}`).join('\n');

      res.json({
        reply,
        source: 'knowledge-base',
        offline: true,
        disasterData: disaster,
        checklist: knowledgeBase.evacuation.essentials
      });
    } else {
      res.json({
        reply: getOfflineResponse(disasterType, 'evacuation'),
        source: 'knowledge-base',
        offline: true,
        checklist: knowledgeBase.evacuation.essentials
      });
    }
  } catch (error) {
    console.error('Evacuation error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Voice endpoint — shorter responses for speech synthesis
app.post('/api/voice', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const result = await generateAI(message, SYSTEM_PROMPTS.voice, {
      maxTokens: 200,
      temperature: 0.3
    });

    if (result) {
      return res.json({
        reply: result.text,
        source: result.source,
        model: result.model,
        offline: result.offline
      });
    }

    // Offline voice response
    const reply = getOfflineResponse(message, 'voice');
    res.json({
      reply,
      source: 'knowledge-base',
      offline: true
    });
  } catch (error) {
    console.error('Voice error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Knowledge base API — get raw data
app.get('/api/knowledge', (req, res) => {
  res.json(knowledgeBase);
});

// SOS patterns endpoint
app.get('/api/sos', (req, res) => {
  res.json(knowledgeBase.sos);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'operational',
    aiMode,
    aiEnabled: aiMode !== 'offline',
    cloudModel: cloudAI ? CLOUD_MODEL : null,
    timestamp: new Date().toISOString()
  });
});

// Re-check AI mode manually
app.post('/api/reconnect', async (req, res) => {
  res.json({ aiMode, message: `AI mode: ${aiMode}` });
});

// ─────────────────────────────────────────────────────────────────
// OFFLINE RESPONSE ENGINE (WHO-Enhanced)
// ─────────────────────────────────────────────────────────────────

function findFirstAidData(condition) {
  const query = condition.toLowerCase();
  for (const [key, data] of Object.entries(knowledgeBase.firstAid)) {
    if (query.includes(key) || data.title.toLowerCase().includes(query)) {
      return data;
    }
  }
  return null;
}

// Helper to format a disaster entry (natural or man-made)
function formatDisasterResponse(data) {
  let reply = `# ${data.icon} ${data.title}\n\n`;
  if (data.description) reply += `*${data.description}*\n\n`;
  if (data.during) {
    reply += `## ⚠️ What To Do Now\n`;
    reply += data.during.map(d => `- ${d}`).join('\n');
  }
  if (data.after) {
    reply += `\n\n## After It's Over\n`;
    reply += data.after.map(a => `- ${a}`).join('\n');
  }
  if (data.supplies) {
    reply += `\n\n## 🎒 Essential Supplies\n`;
    reply += data.supplies.map(s => `- ${s}`).join('\n');
  }
  if (data.warningSigns) {
    reply += `\n\n## 🔍 Warning Signs\n`;
    reply += data.warningSigns.map(w => `- ${w}`).join('\n');
  }
  if (data.warningSignsNatural) {
    reply += `\n\n## 🔍 Natural Warning Signs\n`;
    reply += data.warningSignsNatural.map(w => `- ${w}`).join('\n');
  }
  return reply;
}

function getOfflineResponse(message, context) {
  const query = message.toLowerCase();

  // ── First Aid Keywords ──
  const firstAidMap = {
    'cpr': 'cpr', 'heart': 'cpr', 'not breathing': 'cpr', 'unconscious': 'cpr',
    'bleed': 'bleeding', 'blood': 'bleeding', 'cut': 'bleeding', 'wound': 'bleeding',
    'burn': 'burns', 'scald': 'burns',
    'break': 'fractures', 'fracture': 'fractures', 'bone': 'fractures', 'broken': 'fractures',
    'chok': 'choking', 'can\'t breathe': 'choking', 'airway': 'choking',
    'shock': 'shock', 'pale': 'shock', 'faint': 'shock',
    'water purif': 'waterPurification', 'purif': 'waterPurification', 'clean water': 'waterPurification'
  };

  for (const [keyword, topic] of Object.entries(firstAidMap)) {
    if (query.includes(keyword)) {
      const data = knowledgeBase.firstAid[topic];
      if (data) {
        const steps = data.steps.map(s => `**Step ${s.step}: ${s.action}**\n${s.detail}`).join('\n\n');
        return `# ${data.icon} ${data.title}\n\n${steps}`;
      }
    }
  }

  // ── Natural Disaster Keywords (original + WHO extended) ──
  const disasterMap = {
    'earthquake': 'earthquake', 'quake': 'earthquake', 'shaking': 'earthquake', 'seismic': 'earthquake',
    'flood': 'flood', 'water rising': 'flood', 'drowning': 'flood', 'inundation': 'flood',
    'wildfire': 'fire', 'smoke': 'fire',
    'hurricane': 'hurricane', 'cyclone': 'hurricane', 'typhoon': 'hurricane',
    'tornado': 'tornado', 'twister': 'tornado', 'funnel': 'tornado',
    'tsunami': 'tsunami', 'tidal wave': 'tsunami', 'ocean wave': 'tsunami',
    'volcano': 'volcano', 'volcanic': 'volcano', 'eruption': 'volcano', 'lava': 'volcano', 'ash fall': 'volcano',
    'landslide': 'landslide', 'mudslide': 'landslide', 'mudflow': 'landslide', 'debris flow': 'landslide',
    'drought': 'drought', 'water shortage': 'drought', 'dry spell': 'drought',
    'heatwave': 'heatwave', 'heat wave': 'heatwave', 'heat stroke': 'heatwave', 'heat exhaustion': 'heatwave', 'extreme heat': 'heatwave',
    'blizzard': 'winterStorm', 'winter storm': 'winterStorm', 'snowstorm': 'winterStorm', 'hypothermia': 'winterStorm', 'frostbite': 'winterStorm', 'freezing': 'winterStorm',
    'avalanche': 'avalanche', 'buried in snow': 'avalanche', 'snow slide': 'avalanche'
  };

  for (const [keyword, topic] of Object.entries(disasterMap)) {
    if (query.includes(keyword)) {
      const data = knowledgeBase.disasters[topic];
      if (data) {
        return formatDisasterResponse(data);
      }
    }
  }

  // ── Man-Made / Technological Disaster Keywords ──
  const manMadeMap = {
    'nuclear': 'nuclear', 'radiation': 'nuclear', 'radioactive': 'nuclear', 'fallout': 'nuclear', 'reactor': 'nuclear', 'dirty bomb': 'nuclear',
    'chemical spill': 'chemicalSpill', 'chemical': 'chemicalSpill', 'toxic gas': 'chemicalSpill', 'toxic release': 'chemicalSpill', 'gas leak': 'chemicalSpill', 'chlorine': 'chemicalSpill',
    'industrial accident': 'industrialAccident', 'explosion': 'industrialAccident', 'factory': 'industrialAccident', 'refinery': 'industrialAccident', 'plant explosion': 'industrialAccident',
    'terror': 'terrorism', 'active shooter': 'terrorism', 'bombing': 'terrorism', 'mass violence': 'terrorism', 'attack': 'terrorism', 'active threat': 'terrorism',
    'hazmat': 'hazmat', 'hazardous material': 'hazmat', 'cbrn': 'hazmat', 'decontamination': 'hazmat', 'contamination': 'hazmat'
  };

  for (const [keyword, topic] of Object.entries(manMadeMap)) {
    if (query.includes(keyword)) {
      const data = knowledgeBase.manMadeDisasters[topic];
      if (data) {
        return formatDisasterResponse(data);
      }
    }
  }

  // ── Armed Conflict / War Keywords ──
  const warKeywords = ['war', 'conflict', 'shelling', 'bombardment', 'airstrike', 'air strike', 'missile',
    'bombing', 'siege', 'military', 'combat', 'ceasefire', 'refugee', 'displaced', 'displacement',
    'civilian protection', 'armed conflict', 'invasion', 'occupation'];

  if (warKeywords.some(kw => query.includes(kw))) {
    const wc = knowledgeBase.warAndConflict;
    let reply = `# ${wc.icon} ${wc.title}\n\n*${wc.description}*\n\n`;

    // Direct impacts
    reply += `## 💥 Direct Health Impacts\n`;
    reply += wc.directHealthImpacts.content.map(c => `- ${c}`).join('\n');
    reply += `\n\n## 🩹 Immediate First Aid\n`;
    reply += wc.directHealthImpacts.immediateFirstAid.map(c => `- ${c}`).join('\n');

    // Civilian protection
    reply += `\n\n## 🕊️ ${wc.civilianProtection.title}\n`;
    reply += wc.civilianProtection.content.map(c => `- ${c}`).join('\n');

    // Displacement
    reply += `\n\n## 🏕️ ${wc.displacementSurvival.title}\n`;
    reply += wc.displacementSurvival.content.map(c => `- ${c}`).join('\n');

    // Psychological
    reply += `\n\n## 🧠 ${wc.psychologicalImpact.title}\n`;
    reply += `### Coping Strategies\n`;
    reply += wc.psychologicalImpact.content.copingStrategies.map(c => `- ${c}`).join('\n');

    return reply;
  }

  // ── Biological Hazard Keywords ──
  const bioKeywords = ['epidemic', 'pandemic', 'virus', 'disease', 'outbreak', 'infection', 'cholera',
    'plague', 'quarantine', 'isolation', 'contagious', 'infectious', 'ppe', 'mask'];

  if (bioKeywords.some(kw => query.includes(kw))) {
    const epi = knowledgeBase.biologicalHazards.epidemic;
    let reply = `# ${epi.icon} ${epi.title}\n\n*${epi.description}*\n\n`;
    reply += `## 🛡️ Prevention\n`;
    reply += epi.prevention.map(p => `- ${p}`).join('\n');
    reply += `\n\n## 🧤 Improvised PPE\n`;
    reply += epi.improvPPE.map(p => `- ${p}`).join('\n');
    reply += `\n\n## 💊 WHO Oral Rehydration Solution\n`;
    reply += `*${epi.oralRehydration.description}*\n\n`;
    reply += `**Recipe:** ${epi.oralRehydration.recipe}\n\n`;
    reply += epi.oralRehydration.instructions.map(i => `- ${i}`).join('\n');
    reply += `\n\n## 🏠 Quarantine Guidance\n`;
    reply += epi.quarantineGuidance.map(q => `- ${q}`).join('\n');
    return reply;
  }

  // ── Vector-Borne Disease Keywords ──
  const vectorKeywords = ['mosquito', 'malaria', 'dengue', 'tick', 'zika', 'yellow fever', 'lyme',
    'insect', 'vector', 'bed net', 'repellent'];

  if (vectorKeywords.some(kw => query.includes(kw))) {
    const vb = knowledgeBase.biologicalHazards.vectorBorne;
    let reply = `# ${vb.icon} ${vb.title}\n\n*${vb.description}*\n\n`;
    reply += `## 🦟 Common Diseases\n`;
    reply += vb.diseases.map(d => `- ${d}`).join('\n');
    reply += `\n\n## 🛡️ Prevention\n`;
    reply += vb.prevention.map(p => `- ${p}`).join('\n');
    return reply;
  }

  // ── SOS / Signal Keywords ──
  if (query.includes('sos') || query.includes('signal') || query.includes('rescue')) {
    let reply = `# 🆘 Emergency SOS Signals\n\n`;
    reply += `## Visual Signals\n`;
    reply += knowledgeBase.sos.visual.map(s => `- **${s.method}**: ${s.detail}`).join('\n');
    reply += `\n\n## Audio Signals\n`;
    reply += knowledgeBase.sos.audio.map(s => `- **${s.method}**: ${s.detail}`).join('\n');
    reply += `\n\n## Morse Code\n- **SOS**: ${knowledgeBase.sos.morse.sos}\n- ${knowledgeBase.sos.morse.description}`;
    return reply;
  }

  // ── Shelter Keywords ──
  if (query.includes('shelter') || query.includes('camp') || query.includes('sleep')) {
    let reply = `# 🏕️ Emergency Shelter Building\n\n`;
    knowledgeBase.shelter.types.forEach(s => {
      reply += `## ${s.name}\n*Best for: ${s.when}*\n\n`;
      reply += s.steps.map((step, i) => `${i + 1}. ${step}`).join('\n');
      reply += '\n\n';
    });
    return reply;
  }

  // ── Evacuation Keywords ──
  if (query.includes('evacuat') || query.includes('leave') || query.includes('go bag') || query.includes('pack')) {
    const items = knowledgeBase.evacuation.essentials.items;
    let reply = `# 🎒 Evacuation Checklist\n\n`;
    reply += `## 🔴 Critical Items\n`;
    reply += items.filter(i => i.priority === 'critical').map(i => `- **${i.name}**: ${i.detail}`).join('\n');
    reply += `\n\n## 🟡 High Priority\n`;
    reply += items.filter(i => i.priority === 'high').map(i => `- **${i.name}**: ${i.detail}`).join('\n');
    reply += `\n\n## 🟢 Recommended\n`;
    reply += items.filter(i => i.priority === 'medium').map(i => `- **${i.name}**: ${i.detail}`).join('\n');
    return reply;
  }

  // ── Voice mode — keep it short ──
  if (context === 'voice') {
    return "I'm here to help. Tell me what emergency you're facing — natural disaster, chemical spill, conflict zone, medical emergency, or epidemic? I'll give you step-by-step guidance.";
  }

  // ── Default response — expanded help menu ──
  return `# 🌊 SurviveAI — Disaster Survival Assistant
*Powered by WHO/CRED EM-DAT Disaster Classification Framework*

I'm your offline disaster survival assistant. I can help with:

## 🩹 First Aid
- CPR, bleeding control, burn treatment
- Fracture care, choking response, shock treatment
- Blast injury first aid, water purification

## 🌪️ Natural Disasters
- **Earthquake** · **Flood** · **Wildfire** · **Hurricane** · **Tornado**
- **Tsunami** · **Volcanic Eruption** · **Landslide**
- **Drought** · **Extreme Heat** · **Blizzard** · **Avalanche**

## 💣 Man-Made / Technological Disasters
- **Nuclear/Radiological** emergency response
- **Chemical Spill** and toxic release
- **Industrial Accident** and explosion
- **Terrorism / Active Threat** (Run-Hide-Fight)
- **HAZMAT** identification and decontamination

## ⚔️ Armed Conflict & War
- Civilian survival in conflict zones
- Health consequences of war (water contamination, epidemics, malnutrition)
- Displacement and refugee survival
- Psychological trauma and coping
- International Humanitarian Law (civilian protection)

## 🦠 Biological Hazards
- Epidemic & pandemic response
- Improvised PPE and quarantine guidance
- WHO Oral Rehydration Solution (ORS)
- Vector-borne disease prevention (malaria, dengue, cholera)

## 🎒 Evacuation · 🆘 SOS Signals · 🏕️ Shelter Building

**Tell me what you need help with, and I'll guide you step by step.**`;
}

// ─────────────────────────────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────────────────────────────

const modeLabels = {
  cloud: '☁️  Google AI Cloud (gemma-4-26b-a4b-it)',
  offline: '📴 Offline Knowledge Base Only'
};

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════════════╗
║   🌊 Disaster Survival AI — Server Running                      ║
║   ────────────────────────────────────────────────────           ║
║   URL:   http://localhost:${PORT}                                 ║
║   Mode:  ${modeLabels[aiMode]}${' '.repeat(Math.max(0, 42 - modeLabels[aiMode].length))}║
║   ────────────────────────────────────────────────────           ║
║   Knowledge: WHO/CRED EM-DAT Enhanced (30+ disaster types)       ║
║   Priority: Google Cloud → Offline KB                            ║
║   Built for Gemma 4 Good Hackathon                               ║
╚══════════════════════════════════════════════════════════════════╝
  `);
});

