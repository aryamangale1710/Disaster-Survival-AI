// ═══════════════════════════════════════════════════════════════════
// 🌊 Disaster Survival AI — SOS Module
// Emergency SOS signals: flashlight, audio, and morse code
// ═══════════════════════════════════════════════════════════════════

let sosFlashInterval = null;
let sosAudioInterval = null;
let audioCtx = null;

export function initSOS() {
  initFlashlight();
  initAudioSignal();
  loadSignalCards();
}

// ─── SOS FLASHLIGHT ───
function initFlashlight() {
  const btn = document.getElementById('sos-flash-btn');
  const screen = document.getElementById('sos-flash-screen');

  btn.addEventListener('click', () => {
    if (sosFlashInterval) {
      stopFlash();
      btn.classList.remove('active');
      btn.querySelector('span:last-child').textContent = 'Start SOS Flash';
    } else {
      startFlash();
      btn.classList.add('active');
      btn.querySelector('span:last-child').textContent = 'Stop SOS Flash';
    }
  });

  // Click flash screen to stop
  screen.addEventListener('click', () => {
    stopFlash();
    btn.classList.remove('active');
    btn.querySelector('span:last-child').textContent = 'Start SOS Flash';
  });
}

function startFlash() {
  const screen = document.getElementById('sos-flash-screen');
  screen.style.display = 'block';

  // SOS pattern: ... --- ...
  // dot = 200ms, dash = 600ms, gap between = 200ms, letter gap = 600ms, word gap = 1400ms
  const pattern = [
    // S: · · ·
    200, 200, 200, 200, 200, 600,
    // O: — — —
    600, 200, 600, 200, 600, 600,
    // S: · · ·
    200, 200, 200, 200, 200, 1400,
  ];

  let index = 0;
  let isOn = true;

  function flash() {
    if (isOn) {
      screen.style.background = 'white';
    } else {
      screen.style.background = 'black';
    }

    const duration = pattern[index % pattern.length];
    index++;
    isOn = !isOn;

    sosFlashInterval = setTimeout(flash, duration);
  }

  flash();
}

function stopFlash() {
  if (sosFlashInterval) {
    clearTimeout(sosFlashInterval);
    sosFlashInterval = null;
  }
  const screen = document.getElementById('sos-flash-screen');
  screen.style.display = 'none';
}

// ─── SOS AUDIO SIGNAL ───
function initAudioSignal() {
  const btn = document.getElementById('sos-sound-btn');

  btn.addEventListener('click', () => {
    if (sosAudioInterval) {
      stopAudio();
      btn.classList.remove('active');
      btn.querySelector('span:last-child').textContent = 'SOS Audio Signal';
    } else {
      startAudio();
      btn.classList.add('active');
      btn.querySelector('span:last-child').textContent = 'Stop Audio';
    }
  });
}

function startAudio() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // SOS pattern timings (in ms)
  const pattern = [
    { freq: 880, dur: 150 }, // S dot
    { pause: 100 },
    { freq: 880, dur: 150 }, // S dot
    { pause: 100 },
    { freq: 880, dur: 150 }, // S dot
    { pause: 300 },          // letter gap
    { freq: 880, dur: 400 }, // O dash
    { pause: 100 },
    { freq: 880, dur: 400 }, // O dash
    { pause: 100 },
    { freq: 880, dur: 400 }, // O dash
    { pause: 300 },          // letter gap
    { freq: 880, dur: 150 }, // S dot
    { pause: 100 },
    { freq: 880, dur: 150 }, // S dot
    { pause: 100 },
    { freq: 880, dur: 150 }, // S dot
    { pause: 1000 },         // word gap
  ];

  function playPattern() {
    let time = audioCtx.currentTime;

    pattern.forEach(item => {
      if (item.freq) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = item.freq;
        osc.type = 'sine';
        gain.gain.value = 0.3;
        osc.start(time);
        osc.stop(time + item.dur / 1000);
        time += item.dur / 1000;
      } else if (item.pause) {
        time += item.pause / 1000;
      }
    });

    // Total pattern duration
    const totalDuration = pattern.reduce((sum, item) => {
      return sum + ((item.dur || item.pause || 0) / 1000);
    }, 0);

    sosAudioInterval = setTimeout(playPattern, totalDuration * 1000);
  }

  playPattern();
}

function stopAudio() {
  if (sosAudioInterval) {
    clearTimeout(sosAudioInterval);
    sosAudioInterval = null;
  }
  if (audioCtx) {
    audioCtx.close().catch(() => {});
    audioCtx = null;
  }
}

// ─── SIGNAL CARDS ───
function loadSignalCards() {
  const visualSignals = [
    { method: "Mirror Signal", detail: "Reflect sunlight toward rescuers. Flash 3 times, pause, repeat." },
    { method: "Fire Signal", detail: "Build 3 fires in a triangle (international distress signal). Add green vegetation for smoke." },
    { method: "Ground Signals", detail: "Create large X or SOS with rocks, logs, or bright colored items. Make at least 10 feet tall." },
    { method: "Flashlight", detail: "Flash SOS in Morse code: 3 short, 3 long, 3 short. Repeat." },
    { method: "Clothing", detail: "Hang brightly colored clothing in open areas visible from the air." }
  ];

  const audioSignals = [
    { method: "Whistle", detail: "3 blasts is the universal distress signal. Pause 1 minute, repeat." },
    { method: "Banging", detail: "Bang on pipes, walls, or any hard surface in groups of 3." },
    { method: "Voice", detail: "Shout 'HELP' in groups of 3 to conserve energy. Shout only when you hear rescuers nearby." }
  ];

  document.getElementById('visual-signals').innerHTML = visualSignals.map(s => `
    <div class="signal-card">
      <h4 class="signal-card-title">${s.method}</h4>
      <p class="signal-card-detail">${s.detail}</p>
    </div>
  `).join('');

  document.getElementById('audio-signals').innerHTML = audioSignals.map(s => `
    <div class="signal-card">
      <h4 class="signal-card-title">${s.method}</h4>
      <p class="signal-card-detail">${s.detail}</p>
    </div>
  `).join('');
}
