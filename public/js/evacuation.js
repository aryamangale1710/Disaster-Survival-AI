// ═══════════════════════════════════════════════════════════════════
// 🌊 Disaster Survival AI — Evacuation Module
// ═══════════════════════════════════════════════════════════════════

import { apiCall, renderMarkdown } from './main.js';

export function initEvacuation() {
  initDisasterSelector();
}

function initDisasterSelector() {
  const buttons = document.querySelectorAll('.disaster-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const type = btn.dataset.disaster;
      loadEvacuationPlan(type);
    });
  });
}

async function loadEvacuationPlan(disasterType) {
  const content = document.getElementById('evacuation-content');
  const checklistSection = document.getElementById('checklist-section');

  // Show loading
  content.innerHTML = `
    <div class="evac-section" style="text-align: center; padding: 40px;">
      <div class="typing-indicator" style="justify-content: center;">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
      <p style="color: var(--text-tertiary); margin-top: 12px;">Generating evacuation plan...</p>
    </div>
  `;

  // Fetch evacuation plan
  const response = await apiCall('/api/evacuate', { disasterType });

  if (response && response.disasterData) {
    const d = response.disasterData;
    content.innerHTML = `
      <div class="evac-section">
        <h2 class="evac-section-title">⚠️ During the ${capitalize(disasterType)}</h2>
        <ul class="evac-list">
          ${d.during.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      <div class="evac-section" style="animation-delay: 0.1s">
        <h2 class="evac-section-title">✅ After the ${capitalize(disasterType)}</h2>
        <ul class="evac-list">
          ${d.after.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      <div class="evac-section" style="animation-delay: 0.2s">
        <h2 class="evac-section-title">🎒 Essential Supplies</h2>
        <ul class="evac-list">
          ${d.supplies.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      ${response.reply && !response.offline ? `
        <div class="evac-section" style="animation-delay: 0.3s; border-color: var(--border-accent);">
          <h2 class="evac-section-title">🤖 AI Evacuation Plan</h2>
          <div class="message-body">${renderMarkdown(response.reply)}</div>
        </div>
      ` : ''}
    `;

    // Show checklist
    if (response.checklist) {
      renderChecklist(response.checklist);
      checklistSection.style.display = 'block';
    }
  } else if (response && response.reply) {
    content.innerHTML = `
      <div class="evac-section">
        <div class="message-body">${renderMarkdown(response.reply)}</div>
      </div>
    `;
  } else {
    content.innerHTML = `
      <div class="evac-placeholder">
        <span class="evac-placeholder-icon">⚠️</span>
        <p>Unable to load evacuation data. Working in offline mode.</p>
      </div>
    `;
  }
}

function renderChecklist(checklist) {
  const container = document.getElementById('evacuation-checklist');
  container.innerHTML = checklist.items.map((item, i) => `
    <div class="checklist-item" data-index="${i}">
      <div class="checklist-checkbox">✓</div>
      <div class="checklist-text">
        <strong>${item.name}</strong>
        <span>${item.detail}</span>
      </div>
      <span class="checklist-priority priority-${item.priority}">${item.priority}</span>
    </div>
  `).join('');

  // Toggle checked state
  container.querySelectorAll('.checklist-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('checked');
    });
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
