// ═══════════════════════════════════════════════════════════════════
// 🌊 Disaster Survival AI — Chat Module
// ═══════════════════════════════════════════════════════════════════

import { apiCall, renderMarkdown } from './main.js';

let chatHistory = [];
let currentAbortController = null;
let isThinking = false;

// ─────────────────────────────────────────────────────────────────────
// LIVE ELAPSED TIMER
// ─────────────────────────────────────────────────────────────────────
let timerInterval = null;
let timerStart    = null;

function startTimer() {
  timerStart = Date.now();
  timerInterval = setInterval(() => {
    const el = document.getElementById('thinking-timer');
    if (!el) return;
    const secs = ((Date.now() - timerStart) / 1000).toFixed(1);
    el.textContent = secs;
  }, 100);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

export function initChat() {
  const input   = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const stopBtn = document.getElementById('chat-stop');

  // ── Send ──────────────────────────────────────────────────────────
  sendBtn.addEventListener('click', () => sendMessage());

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // ── Stop / Cancel ─────────────────────────────────────────────────
  stopBtn.addEventListener('click', () => abortThinking());

  // ── Auto-resize textarea ──────────────────────────────────────────
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });

  // ── Quick action chips — stay visible permanently ─────────────────
  const quickBtns = document.querySelectorAll('.quick-btn');
  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const msg = btn.dataset.message;
      document.getElementById('chat-input').value = msg;
      sendMessage();
    });
  });

  // ── Welcome suggestion buttons — hide on use ──────────────────────
  const suggestionBtns = document.querySelectorAll('.suggestion-btn');
  suggestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const msg = btn.dataset.message;
      document.getElementById('chat-input').value = msg;
      sendMessage();
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// ABORT — cancel the in-flight API request
// ─────────────────────────────────────────────────────────────────────
function abortThinking() {
  if (currentAbortController) {
    currentAbortController.abort();
    currentAbortController = null;
  }
  stopTimer();
  const typing = document.getElementById('typing-bubble');
  if (typing) typing.remove();
  setThinkingState(false);
  addMessage('ai', '_Response stopped by user._', 'system');
}

// ─────────────────────────────────────────────────────────────────────
// SEND MESSAGE
// ─────────────────────────────────────────────────────────────────────
async function sendMessage() {
  if (isThinking) return;

  const input   = document.getElementById('chat-input');
  const message = input.value.trim();
  if (!message) return;

  input.value = '';
  input.style.height = 'auto';

  // Hide the initial welcome text and suggestions after first message
  const welcomeText = document.querySelector('.welcome-text');
  const welcomeSugs = document.getElementById('welcome-suggestions');
  if (welcomeText) welcomeText.style.display = 'none';
  if (welcomeSugs) welcomeSugs.style.display = 'none';

  // Quick actions stay visible — no hiding here

  addMessage('user', message);
  chatHistory.push({ role: 'user', content: message });

  const typingEl = showTyping();
  setThinkingState(true);

  currentAbortController = new AbortController();

  try {
    const isFastMode = document.getElementById('chat-fast-mode')?.checked || false;

    const response = await apiCallWithAbort('/api/chat', {
      message,
      history: chatHistory.slice(-10),
      fastMode: isFastMode
    }, currentAbortController.signal);

    stopTimer();
    typingEl.remove();
    setThinkingState(false);
    currentAbortController = null;

    if (response && response.reply) {
      addMessage('ai', response.reply, response.source);
      chatHistory.push({ role: 'assistant', content: response.reply });
    } else {
      addMessage('ai', "I'm currently in offline mode. I can still help with basic disaster survival guidance. Try asking about specific emergencies like earthquakes, floods, first aid, or evacuation procedures.", 'knowledge-base');
    }

  } catch (err) {
    stopTimer();
    typingEl.remove();
    setThinkingState(false);
    currentAbortController = null;

    if (err.name !== 'AbortError') {
      addMessage('ai', "🚨 <b>System Error:</b> Could not connect to the local server. The AI backend is offline or restarting. Please ensure the server is running and try again.", 'system');
    }
  }
}

// ─────────────────────────────────────────────────────────────────────
// UI STATE — swap Send ↔ Stop button
// ─────────────────────────────────────────────────────────────────────
function setThinkingState(thinking) {
  isThinking = thinking;
  const sendBtn = document.getElementById('chat-send');
  const stopBtn = document.getElementById('chat-stop');
  const input   = document.getElementById('chat-input');

  if (thinking) {
    sendBtn.style.display = 'none';
    stopBtn.style.display = 'flex';
    input.disabled = true;
    input.placeholder = 'AI is thinking…';
  } else {
    sendBtn.style.display = 'flex';
    stopBtn.style.display = 'none';
    input.disabled = false;
    input.placeholder = 'Describe your emergency situation…';
  }
}

// ─────────────────────────────────────────────────────────────────────
// FETCH WITH ABORT SUPPORT
// ─────────────────────────────────────────────────────────────────────
async function apiCallWithAbort(endpoint, data, signal) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    signal
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// ─────────────────────────────────────────────────────────────────────
// TYPING INDICATOR WITH LIVE TIMER
// ─────────────────────────────────────────────────────────────────────
function showTyping() {
  startTimer();
  const container = document.getElementById('chat-messages');
  const typingEl  = document.createElement('div');
  typingEl.id = 'typing-bubble';
  typingEl.className = 'message ai-message';
  typingEl.innerHTML = `
    <div class="message-avatar">🌊</div>
    <div class="message-content">
      <div class="typing-indicator">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-text">Gemma 4 is thinking…</span>
        <span class="thinking-timer-badge"><span id="thinking-timer">0.0</span>s</span>
      </div>
    </div>
  `;
  container.appendChild(typingEl);
  container.scrollTop = container.scrollHeight;
  return typingEl;
}

// ─────────────────────────────────────────────────────────────────────
// ADD MESSAGE TO CHAT
// ─────────────────────────────────────────────────────────────────────
function addMessage(role, content, source = 'knowledge-base') {
  const container = document.getElementById('chat-messages');
  const messageEl = document.createElement('div');
  messageEl.className = `message ${role === 'user' ? 'user-message' : 'ai-message'}`;

  const badgeLabels = {
    'gemma4-cloud':  '☁️ Gemma 4',
    'gemma4':        '☁️ Gemma 4',
    'knowledge-base':'📴 Offline KB',
    'system':        '⛔ Stopped'
  };
  const badgeText = badgeLabels[source] || source;

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (role === 'user') {
    messageEl.innerHTML = `
      <div class="message-avatar">👤</div>
      <div class="message-content">
        <div class="message-header">
          <span class="message-name">You</span>
          <span class="message-time">${now}</span>
        </div>
        <div class="message-body">${escapeHtml(content)}</div>
      </div>
    `;
  } else {
    messageEl.innerHTML = `
      <div class="message-avatar">🌊</div>
      <div class="message-content">
        <div class="message-header">
          <span class="message-name">SurviveAI</span>
          <span class="message-badge">${badgeText}</span>
          <span class="message-time">${now}</span>
        </div>
        <div class="message-body">${renderMarkdown(content)}</div>
      </div>
    `;
  }

  container.appendChild(messageEl);
  container.scrollTop = container.scrollHeight;
}

// ─────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
