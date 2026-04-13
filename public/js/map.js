// ═══════════════════════════════════════════════════════════════════
// 🌊 Disaster Survival AI — Offline Map Module
// Canvas-based offline map with GPS, shelters, and danger zones
// ═══════════════════════════════════════════════════════════════════

let mapZoom = 1;
let userLat = null;
let userLon = null;
let mapCanvas = null;
let mapCtx = null;

// Simulated map points (in a production app, these would be cached from real map data)
const mapPOIs = {
  shelters: [
    { name: "Community Shelter A", lat: 0.35, lon: 0.45, capacity: 200 },
    { name: "School Gymnasium B", lat: 0.60, lon: 0.30, capacity: 500 },
    { name: "Church Hall C", lat: 0.25, lon: 0.70, capacity: 150 },
    { name: "Fire Station D", lat: 0.75, lon: 0.65, capacity: 80 },
  ],
  medical: [
    { name: "District Hospital", lat: 0.50, lon: 0.50 },
    { name: "First Aid Station", lat: 0.40, lon: 0.25 },
    { name: "Mobile Medical Unit", lat: 0.65, lon: 0.75 },
  ],
  water: [
    { name: "Water Distribution Point 1", lat: 0.30, lon: 0.55 },
    { name: "Natural Spring", lat: 0.70, lon: 0.40 },
  ],
  danger: [
    { name: "Flood Zone", lat: 0.50, lon: 0.80, radius: 0.08 },
    { name: "Unstable Structure", lat: 0.20, lon: 0.35, radius: 0.04 },
    { name: "Chemical Spill", lat: 0.80, lon: 0.20, radius: 0.05 },
  ],
  safe: [
    { name: "High Ground - Safe Zone A", lat: 0.15, lon: 0.50, radius: 0.1 },
    { name: "Elevated Area - Safe Zone B", lat: 0.85, lon: 0.50, radius: 0.08 },
  ]
};

export function initMap() {
  const mapBtn = document.getElementById('btn-offline-map');
  const modal = document.getElementById('map-modal');
  const closeBtn = document.getElementById('map-modal-close');
  const zoomIn = document.getElementById('map-zoom-in');
  const zoomOut = document.getElementById('map-zoom-out');
  const locate = document.getElementById('map-locate');

  mapCanvas = document.getElementById('map-canvas');
  mapCtx = mapCanvas.getContext('2d');

  // Open map modal
  mapBtn.addEventListener('click', () => {
    modal.classList.add('active');
    resizeCanvas();
    drawMap();
    getLocation();
  });

  // Close modal
  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  // Zoom controls
  zoomIn.addEventListener('click', () => {
    mapZoom = Math.min(mapZoom + 0.3, 3);
    drawMap();
  });

  zoomOut.addEventListener('click', () => {
    mapZoom = Math.max(mapZoom - 0.3, 0.5);
    drawMap();
  });

  // Locate
  locate.addEventListener('click', getLocation);

  // Handle resize
  window.addEventListener('resize', () => {
    if (modal.classList.contains('active')) {
      resizeCanvas();
      drawMap();
    }
  });
}

function resizeCanvas() {
  const container = mapCanvas.parentElement;
  const rect = container.getBoundingClientRect();
  mapCanvas.width = rect.width;
  mapCanvas.height = Math.max(400, rect.width * 0.55);
}

function drawMap() {
  if (!mapCtx) return;
  const w = mapCanvas.width;
  const h = mapCanvas.height;

  // Clear
  mapCtx.clearRect(0, 0, w, h);

  // Background
  const bgGrad = mapCtx.createLinearGradient(0, 0, w, h);
  bgGrad.addColorStop(0, '#0c1120');
  bgGrad.addColorStop(1, '#111827');
  mapCtx.fillStyle = bgGrad;
  mapCtx.fillRect(0, 0, w, h);

  // Grid lines
  mapCtx.strokeStyle = 'rgba(148, 163, 184, 0.06)';
  mapCtx.lineWidth = 1;
  const gridSize = 40 * mapZoom;
  for (let x = 0; x < w; x += gridSize) {
    mapCtx.beginPath();
    mapCtx.moveTo(x, 0);
    mapCtx.lineTo(x, h);
    mapCtx.stroke();
  }
  for (let y = 0; y < h; y += gridSize) {
    mapCtx.beginPath();
    mapCtx.moveTo(0, y);
    mapCtx.lineTo(w, y);
    mapCtx.stroke();
  }

  // Draw terrain (simplified polygons)
  drawTerrain(w, h);

  // Draw danger zones
  mapPOIs.danger.forEach(d => {
    const x = d.lon * w;
    const y = d.lat * h;
    const r = d.radius * w * mapZoom;

    // Red glow
    const grad = mapCtx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, 'rgba(239, 68, 68, 0.25)');
    grad.addColorStop(1, 'rgba(239, 68, 68, 0)');
    mapCtx.fillStyle = grad;
    mapCtx.beginPath();
    mapCtx.arc(x, y, r, 0, Math.PI * 2);
    mapCtx.fill();

    // Border
    mapCtx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
    mapCtx.lineWidth = 1.5;
    mapCtx.setLineDash([5, 5]);
    mapCtx.stroke();
    mapCtx.setLineDash([]);

    // Label
    drawLabel(x, y + r + 14, d.name, '#ef4444');
  });

  // Draw safe zones
  mapPOIs.safe.forEach(s => {
    const x = s.lon * w;
    const y = s.lat * h;
    const r = s.radius * w * mapZoom;

    const grad = mapCtx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, 'rgba(34, 197, 94, 0.15)');
    grad.addColorStop(1, 'rgba(34, 197, 94, 0)');
    mapCtx.fillStyle = grad;
    mapCtx.beginPath();
    mapCtx.arc(x, y, r, 0, Math.PI * 2);
    mapCtx.fill();

    mapCtx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
    mapCtx.lineWidth = 1.5;
    mapCtx.setLineDash([5, 5]);
    mapCtx.stroke();
    mapCtx.setLineDash([]);

    drawLabel(x, y - r - 8, s.name, '#22c55e');
  });

  // Draw roads (stylized lines)
  drawRoads(w, h);

  // Draw POI markers
  mapPOIs.shelters.forEach(p => drawMarker(p.lon * w, p.lat * h, '#3b82f6', '🏠'));
  mapPOIs.medical.forEach(p => drawMarker(p.lon * w, p.lat * h, '#f97316', '🏥'));
  mapPOIs.water.forEach(p => drawMarker(p.lon * w, p.lat * h, '#06b6d4', '💧'));

  // Draw user location
  if (userLat !== null && userLon !== null) {
    const ux = 0.5 * w; // Center the user
    const uy = 0.5 * h;

    // Pulse ring
    const time = Date.now() / 1000;
    const pulseR = 20 + Math.sin(time * 2) * 8;
    mapCtx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
    mapCtx.lineWidth = 2;
    mapCtx.beginPath();
    mapCtx.arc(ux, uy, pulseR, 0, Math.PI * 2);
    mapCtx.stroke();

    // User dot
    mapCtx.fillStyle = '#3b82f6';
    mapCtx.beginPath();
    mapCtx.arc(ux, uy, 8, 0, Math.PI * 2);
    mapCtx.fill();

    mapCtx.fillStyle = 'white';
    mapCtx.beginPath();
    mapCtx.arc(ux, uy, 4, 0, Math.PI * 2);
    mapCtx.fill();

    drawLabel(ux, uy - 20, 'You', '#3b82f6');
  }

  // Title
  mapCtx.fillStyle = 'rgba(241, 245, 249, 0.6)';
  mapCtx.font = '11px Inter, sans-serif';
  mapCtx.textAlign = 'left';
  mapCtx.fillText(`Zoom: ${mapZoom.toFixed(1)}x | Offline Emergency Map`, 10, h - 10);
}

function drawTerrain(w, h) {
  // Simplified terrain shapes
  mapCtx.fillStyle = 'rgba(34, 197, 94, 0.04)';

  // Area 1
  mapCtx.beginPath();
  mapCtx.moveTo(0, h * 0.3);
  mapCtx.lineTo(w * 0.2, h * 0.15);
  mapCtx.lineTo(w * 0.35, h * 0.25);
  mapCtx.lineTo(w * 0.25, h * 0.45);
  mapCtx.lineTo(0, h * 0.5);
  mapCtx.closePath();
  mapCtx.fill();

  // Area 2
  mapCtx.fillStyle = 'rgba(6, 182, 212, 0.04)';
  mapCtx.beginPath();
  mapCtx.moveTo(w * 0.6, h * 0.7);
  mapCtx.lineTo(w * 0.8, h * 0.65);
  mapCtx.lineTo(w, h * 0.75);
  mapCtx.lineTo(w, h);
  mapCtx.lineTo(w * 0.55, h);
  mapCtx.closePath();
  mapCtx.fill();
}

function drawRoads(w, h) {
  mapCtx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
  mapCtx.lineWidth = 2;

  // Main roads
  const roads = [
    [[0.1, 0.5], [0.3, 0.45], [0.5, 0.5], [0.7, 0.45], [0.9, 0.5]],
    [[0.5, 0.1], [0.48, 0.3], [0.5, 0.5], [0.52, 0.7], [0.5, 0.9]],
    [[0.2, 0.2], [0.4, 0.35], [0.6, 0.35], [0.8, 0.2]],
    [[0.2, 0.8], [0.4, 0.65], [0.6, 0.65], [0.8, 0.8]],
  ];

  roads.forEach(road => {
    mapCtx.beginPath();
    road.forEach(([rx, ry], i) => {
      const x = rx * w;
      const y = ry * h;
      if (i === 0) mapCtx.moveTo(x, y);
      else mapCtx.lineTo(x, y);
    });
    mapCtx.stroke();
  });
}

function drawMarker(x, y, color, emoji) {
  // Background circle
  mapCtx.fillStyle = color;
  mapCtx.beginPath();
  mapCtx.arc(x, y, 14, 0, Math.PI * 2);
  mapCtx.fill();

  // Inner circle
  mapCtx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  mapCtx.beginPath();
  mapCtx.arc(x, y, 12, 0, Math.PI * 2);
  mapCtx.fill();

  // Emoji
  mapCtx.font = '14px sans-serif';
  mapCtx.textAlign = 'center';
  mapCtx.textBaseline = 'middle';
  mapCtx.fillText(emoji, x, y);
}

function drawLabel(x, y, text, color) {
  mapCtx.font = '10px Inter, sans-serif';
  mapCtx.textAlign = 'center';
  mapCtx.textBaseline = 'middle';

  const metrics = mapCtx.measureText(text);
  const padding = 4;

  // Background
  mapCtx.fillStyle = 'rgba(6, 10, 19, 0.8)';
  mapCtx.beginPath();
  mapCtx.roundRect(
    x - metrics.width / 2 - padding,
    y - 7,
    metrics.width + padding * 2,
    14,
    3
  );
  mapCtx.fill();

  // Text
  mapCtx.fillStyle = color || '#f1f5f9';
  mapCtx.fillText(text, x, y);
}

function getLocation() {
  const gpsStatus = document.getElementById('gps-status');
  const shelterInfo = document.getElementById('nearest-shelter');

  if (!navigator.geolocation) {
    gpsStatus.textContent = 'GPS not available';
    // Use simulated position
    userLat = 37.7749;
    userLon = -122.4194;
    updateLocationInfo();
    drawMap();
    return;
  }

  gpsStatus.textContent = 'Acquiring GPS signal...';

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userLat = pos.coords.latitude;
      userLon = pos.coords.longitude;
      gpsStatus.textContent = `${userLat.toFixed(4)}°N, ${userLon.toFixed(4)}°W`;
      updateLocationInfo();
      drawMap();
    },
    (err) => {
      // Fallback to simulated position
      userLat = 37.7749;
      userLon = -122.4194;
      gpsStatus.textContent = `Simulated: ${userLat.toFixed(4)}°N, ${userLon.toFixed(4)}°W`;
      updateLocationInfo();
      drawMap();
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

function updateLocationInfo() {
  const shelterInfo = document.getElementById('nearest-shelter');
  // Simulate nearest shelter calculation
  const nearest = mapPOIs.shelters[Math.floor(Math.random() * mapPOIs.shelters.length)];
  const dist = (Math.random() * 2 + 0.3).toFixed(1);
  shelterInfo.textContent = `${nearest.name} (~${dist} km)`;
}

// Animate map (pulse effect on user location)
function animateMap() {
  drawMap();
  requestAnimationFrame(animateMap);
}
