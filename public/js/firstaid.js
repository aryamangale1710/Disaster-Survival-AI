// ═══════════════════════════════════════════════════════════════════
// 🌊 Disaster Survival AI — First Aid Module
// ═══════════════════════════════════════════════════════════════════

import { apiCall, renderMarkdown } from './main.js';

const firstAidCategories = [
  { key: 'cpr', icon: '❤️', title: 'CPR', desc: 'Cardiopulmonary resuscitation for unresponsive persons', severity: 'critical', color: '#ef4444' },
  { key: 'bleeding', icon: '🩸', title: 'Severe Bleeding', desc: 'Control life-threatening blood loss', severity: 'critical', color: '#ef4444' },
  { key: 'choking', icon: '😰', title: 'Choking', desc: 'Clear blocked airways in adults and children', severity: 'critical', color: '#ef4444' },
  { key: 'shock', icon: '⚡', title: 'Shock', desc: 'Recognize and treat circulatory shock', severity: 'critical', color: '#f97316' },
  { key: 'burns', icon: '🔥', title: 'Burns', desc: 'Treat thermal, chemical, and electrical burns', severity: 'high', color: '#f97316' },
  { key: 'fractures', icon: '🦴', title: 'Fractures', desc: 'Immobilize and care for broken bones', severity: 'high', color: '#f59e0b' },
  { key: 'waterPurification', icon: '💧', title: 'Water Purification', desc: 'Make contaminated water safe to drink', severity: 'medium', color: '#06b6d4' },
];

export function initFirstAid() {
  renderFirstAidGrid();
  initModal();
}

function renderFirstAidGrid() {
  const grid = document.getElementById('firstaid-grid');
  grid.innerHTML = firstAidCategories.map(cat => `
    <div class="firstaid-card" data-key="${cat.key}" style="--card-color: ${cat.color}">
      <span class="firstaid-card-icon">${cat.icon}</span>
      <h3 class="firstaid-card-title">${cat.title}</h3>
      <p class="firstaid-card-desc">${cat.desc}</p>
      <span class="firstaid-card-severity severity-${cat.severity}">${cat.severity}</span>
    </div>
  `).join('');

  // Add click handlers
  grid.querySelectorAll('.firstaid-card').forEach(card => {
    card.addEventListener('click', () => {
      openFirstAidDetail(card.dataset.key);
    });
  });
}

async function openFirstAidDetail(key) {
  const modal = document.getElementById('firstaid-modal');
  const body = document.getElementById('firstaid-modal-body');

  // Show loading state
  body.innerHTML = '<div class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
  modal.classList.add('active');

  // Fetch from API
  const response = await apiCall('/api/first-aid', { condition: key });

  if (response && response.knowledgeBase) {
    const data = response.knowledgeBase;
    body.innerHTML = `
      <h2 style="margin-bottom: 4px;">${data.icon} ${data.title}</h2>
      <p style="color: var(--text-tertiary); margin-bottom: 24px; font-size: 0.85rem;">Step-by-step instructions</p>
      ${data.steps.map(s => `
        <div class="modal-step">
          <span class="modal-step-number">${s.step}</span>
          <span class="modal-step-action">${s.action}</span>
          <p class="modal-step-detail">${s.detail}</p>
        </div>
      `).join('')}
      ${response.reply && !response.offline ? `
        <div style="margin-top: 24px; padding: 16px; background: var(--accent-dim); border: 1px solid var(--border-accent); border-radius: var(--radius-md);">
          <h3 style="font-size: 0.9rem; margin-bottom: 8px;">🤖 AI-Enhanced Guidance</h3>
          <div class="message-body">${renderMarkdown(response.reply)}</div>
        </div>
      ` : ''}
    `;
  } else if (response && response.reply) {
    body.innerHTML = `<div class="message-body">${renderMarkdown(response.reply)}</div>`;
  } else {
    body.innerHTML = `<p style="color: var(--text-tertiary);">Unable to load first aid data. Please check your connection.</p>`;
  }
}

function initModal() {
  const modal = document.getElementById('firstaid-modal');
  const closeBtn = document.getElementById('firstaid-modal-close');

  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}
