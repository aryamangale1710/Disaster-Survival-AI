// ═══════════════════════════════════════════════════════════════════
// 🌊 Disaster Survival AI — Voice Module
// Voice interaction for hands-free emergency guidance
// ═══════════════════════════════════════════════════════════════════

import { apiCall, renderMarkdown } from './main.js';

let recognition = null;
let synthesis = window.speechSynthesis;
let isListening = false;
let isPanicMode = false;

export function initVoice() {
  const voiceBtn = document.getElementById('voice-btn');
  const panicToggle = document.getElementById('panic-mode');
  const voiceCmds = document.querySelectorAll('.voice-cmd');

  // Initialize Speech Recognition
  initSpeechRecognition();

  // Voice button
  voiceBtn.addEventListener('click', toggleListening);

  // Panic mode
  panicToggle.addEventListener('change', (e) => {
    isPanicMode = e.target.checked;
    const visual = document.getElementById('voice-visual');
    if (isPanicMode) {
      visual.style.setProperty('--accent', 'var(--red)');
      document.getElementById('voice-status').textContent = 'PANIC MODE — Tap to speak';
    } else {
      visual.style.removeProperty('--accent');
      document.getElementById('voice-status').textContent = 'Tap to speak';
    }
  });

  // Quick voice commands
  voiceCmds.forEach(cmd => {
    cmd.addEventListener('click', () => {
      processVoiceInput(cmd.dataset.cmd);
    });
  });
}

function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    document.getElementById('voice-status').textContent = 'Voice recognition not supported in this browser';
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    stopListening();
    processVoiceInput(transcript);
  };

  recognition.onerror = (event) => {
    console.log('Speech recognition error:', event.error);
    stopListening();
    if (event.error === 'not-allowed') {
      document.getElementById('voice-status').textContent = 'Microphone access denied. Please allow microphone.';
    } else {
      document.getElementById('voice-status').textContent = 'Voice error — tap to try again';
    }
  };

  recognition.onend = () => {
    if (isListening) stopListening();
  };
}

function toggleListening() {
  if (isListening) {
    stopListening();
  } else {
    startListening();
  }
}

function startListening() {
  if (!recognition) {
    processVoiceInput('help me');
    return;
  }

  try {
    recognition.start();
    isListening = true;

    const btn = document.getElementById('voice-btn');
    const waves = document.getElementById('voice-waves');
    const status = document.getElementById('voice-status');

    btn.classList.add('listening');
    waves.classList.add('active');
    status.textContent = 'Listening... speak now';
  } catch (e) {
    console.log('Recognition start error:', e);
  }
}

function stopListening() {
  if (recognition) {
    try { recognition.stop(); } catch (e) {}
  }
  isListening = false;

  const btn = document.getElementById('voice-btn');
  const waves = document.getElementById('voice-waves');
  const status = document.getElementById('voice-status');

  btn.classList.remove('listening');
  waves.classList.remove('active');
  status.textContent = 'Tap to speak';
}

async function processVoiceInput(text) {
  const responseEl = document.getElementById('voice-response');
  const status = document.getElementById('voice-status');

  // Show what was heard
  status.textContent = `Heard: "${text}"`;

  // Show processing
  responseEl.innerHTML = `
    <div style="text-align: center;">
      <div class="typing-indicator" style="justify-content: center;">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
      <p style="color: var(--text-tertiary); margin-top: 8px; font-size: 0.85rem;">Processing...</p>
    </div>
  `;

  // Call voice API
  const response = await apiCall('/api/voice', { message: text });

  let replyText = '';
  if (response && response.reply) {
    replyText = response.reply;
  } else {
    replyText = "I'm here to help. Tell me what emergency you're facing. I can guide you through first aid, evacuation, or disaster survival.";
  }

  // Display response
  responseEl.innerHTML = `
    <div class="voice-response-text">${renderMarkdown(replyText)}</div>
  `;

  // Speak the response
  speak(replyText);

  status.textContent = 'Tap to speak again';
}

function speak(text) {
  if (!synthesis) return;

  // Cancel any current speech
  synthesis.cancel();

  // Clean text for speech (remove markdown)
  const cleanText = text
    .replace(/#{1,3}\s/g, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/- /g, '')
    .replace(/\n/g, '. ')
    .replace(/⚠️|✅|🔴|🟡|🟢|❤️|🩸|🔥|🦴|😰|⚡|💧|🏚️|🌊|🌀|🌪️|🆘|🏕️|🎒|📍|🧭/g, '');

  const utterance = new SpeechSynthesisUtterance(cleanText);

  // Use a calm, clear voice
  utterance.rate = isPanicMode ? 0.85 : 0.95;
  utterance.pitch = 1;
  utterance.volume = 1;

  // Try to get a good voice
  const voices = synthesis.getVoices();
  const preferredVoice = voices.find(v =>
    v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Microsoft')
  ) || voices.find(v => v.lang === 'en-US' && v.localService) || voices[0];

  if (preferredVoice) utterance.voice = preferredVoice;

  synthesis.speak(utterance);
}
