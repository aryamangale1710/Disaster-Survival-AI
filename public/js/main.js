// ═══════════════════════════════════════════════════════════════════
// 🌊 Disaster Survival AI — Main Application Controller
// ═══════════════════════════════════════════════════════════════════

import { initChat } from './chat.js';
import { initFirstAid } from './firstaid.js';
import { initEvacuation } from './evacuation.js';
import { initVoice } from './voice.js';
import { initSOS } from './sos.js';
import { initMap } from './map.js';

// ─── APP STATE ───
const state = {
  currentPage: 'chat',
  isOnline: navigator.onLine,
  aiMode: 'checking'
};

// ─── INITIALIZATION ───
document.addEventListener('DOMContentLoaded', () => {
  initLoading();
  initNavigation();
  initNetworkStatus();
  initChat();
  initFirstAid();
  initEvacuation();
  initVoice();
  initSOS();
  initMap();
  checkAIStatus();
});

// ─── LOADING SCREEN ───
function initLoading() {
  const loading = document.getElementById('loading-screen');
  setTimeout(() => {
    loading.classList.add('hidden');
  }, 1800);
}

// ─── NAVIGATION ───
function initNavigation() {
  const items = document.querySelectorAll('.nav-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const page = item.dataset.page;
      navigateTo(page);
    });
  });
}

export function navigateTo(page) {
  // Update sidebar nav items
  document.querySelectorAll('.nav-item').forEach(t => t.classList.remove('active'));
  const activeTab = document.querySelector(`.nav-item[data-page="${page}"]`);
  if (activeTab) activeTab.classList.add('active');

  // Update pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const activePage = document.getElementById(`page-${page}`);
  if (activePage) activePage.classList.add('active');

  state.currentPage = page;
}

// ─── NETWORK STATUS ───
function initNetworkStatus() {
  updateNetworkUI();

  window.addEventListener('online', () => {
    state.isOnline = true;
    updateNetworkUI();
  });

  window.addEventListener('offline', () => {
    state.isOnline = false;
    updateNetworkUI();
  });
}

function updateNetworkUI() {
  const el = document.getElementById('network-status');
  const lbl = document.getElementById('net-label');
  if (!el) return;

  if (state.isOnline) {
    el.className = 'net-status online';
    if (lbl) lbl.textContent = 'Connected';
  } else {
    el.className = 'net-status offline';
    if (lbl) lbl.textContent = 'Offline';
  }
}

// ─── AI STATUS CHECK ───
async function checkAIStatus() {
  try {
    const res = await fetch('/api/health');
    const data = await res.json();
    state.aiMode = data.aiMode;

    const aiLabel = document.getElementById('ai-label');
    const gemmaBadge = document.getElementById('gemma-badge');

    if (data.aiMode === 'cloud') {
      if (aiLabel) aiLabel.textContent = 'Gemma 4 Cloud';
      if (gemmaBadge) {
        gemmaBadge.innerHTML = '<span class="gemma-dot"></span> Gemma 4 Cloud';
        gemmaBadge.style.color = 'var(--primary)';
        gemmaBadge.style.borderColor = 'rgba(14, 165, 233, 0.2)';
        gemmaBadge.style.background = 'rgba(14, 165, 233, 0.08)';
      }
    } else {
      if (aiLabel) aiLabel.textContent = 'Offline KB';
      if (gemmaBadge) {
        gemmaBadge.innerHTML = '<span class="gemma-dot"></span> Offline Mode';
        gemmaBadge.style.color = 'var(--secondary)';
        gemmaBadge.style.borderColor = 'rgba(238, 152, 0, 0.2)';
        gemmaBadge.style.background = 'rgba(238, 152, 0, 0.08)';
      }
    }
  } catch (e) {
    state.aiMode = 'offline';
  }
}


// ─── API HELPER ───
export async function apiCall(endpoint, data) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (error) {
    console.log('API call failed, likely offline:', error.message);
    return null;
  }
}

// ─── MARKDOWN RENDERER (Simple) ───
export function renderMarkdown(text) {
  if (!text) return '';
  let html = text
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');

  // Wrap consecutive li elements in ul
  html = html.replace(/(<li>.*?<\/li>(\s*<br>)*)+/g, (match) => {
    const cleaned = match.replace(/<br>/g, '');
    return `<ul>${cleaned}</ul>`;
  });

  return `<p>${html}</p>`;
}
