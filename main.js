/**
 * Ethical Compass | Main Intelligence Script
 * Consolidates all interactive logic and premium animations.
 */

// --- THEME MANAGEMENT ---
function toggleMode() {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

function loadTheme() {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
  }
}

// --- UI INTERNALS ---
function toggleFAQ(btn) {
  const content = btn.nextElementSibling;
  const isOpen = content.classList.contains('active');
  document.querySelectorAll('.faq-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.faq-trigger').forEach(b => b.classList.remove('active'));

  if (!isOpen) {
    content.classList.add('active');
    btn.classList.add('active');
  }
}

function toggleBio(btn) {
  const content = btn.nextElementSibling;
  const isOpen = content.classList.contains('active');
  document.querySelectorAll('.bio-content').forEach(c => {
    if (c !== content) c.classList.remove('active');
  });
  document.querySelectorAll('.bio-trigger').forEach(b => {
    if (b !== btn) b.classList.remove('active');
  });
  content.classList.toggle('active');
  btn.classList.toggle('active');
}

// --- ANALYTICAL CALCULATORS ---
function updateROI() {
  const regInput = document.getElementById('input-regulatory');
  if (!regInput) return;

  const reg = parseInt(regInput.value);
  const brand = parseInt(document.getElementById('input-brand').value);
  const complexity = parseInt(document.getElementById('input-complexity').value);

  const valReg = document.getElementById('val-regulatory');
  const valBrand = document.getElementById('val-brand');
  const valComp = document.getElementById('val-complexity');
  const roiDisplay = document.getElementById('roi-display');

  if (valReg) valReg.innerText = reg;
  if (valBrand) valBrand.innerText = (brand / 1000).toFixed(1);
  if (valComp) {
    const complexityLabels = ['Low', 'Moderate', 'Significant', 'High', 'Critical'];
    valComp.innerText = complexityLabels[complexity - 1];
  }

  const failureCost = reg + brand + (complexity * 500);
  const oversightCost = 250;
  const roi = Math.max(1, Math.round(failureCost / oversightCost));
  if (roiDisplay) roiDisplay.innerText = roi + 'x';

  // Update deep-dive report if present
  const repFin = document.getElementById('rep-financial');
  if (repFin) {
    const totalExposure = reg + (brand * 0.5) + (complexity * 250);
    repFin.innerText = 'R ' + reg.toLocaleString() + ',000';
    document.getElementById('rep-reputational').innerText = 'R ' + (brand * 500).toLocaleString();
    document.getElementById('rep-opportunity').innerText = 'R ' + (reg * 1500).toLocaleString();
    document.getElementById('rep-total').innerText = 'R ' + (totalExposure * 1000).toLocaleString();
    if (roiDisplay) roiDisplay.innerText = Math.max(1, Math.round(totalExposure / 150)) + 'x';
  }
}

// --- FORENSIC LOGS ---
const logEntries = [
  "[SCANNING] Project Alpha protocol audit initiated...",
  "[OVERSIGHT] Analyzing data stream 0x4F... PASS",
  "[INTEGRITY] Syncing Regulatory Code 802.11...",
  "[STRATEGIC] Emerging ethical risk detected in Module B...",
  "[REMEDIATION] Deploying automated governance patch...",
  "[SYSTEM] Governance engine operating at 99.8% precision...",
  "[SYNC] Global ethical standards updated...",
  "[SECURITY] Air-gapped enclave integrity verified...",
  "[AUDIT] Immutable record hash generated: 7a8c...2e1",
  "[ANALYSIS] Qualitative risk indices re-calculated..."
];

let logIndex = 0;
function addLog() {
  const logContainer = document.getElementById('oversight-logs');
  if (!logContainer) return;

  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.innerText = logEntries[logIndex];
  logContainer.appendChild(entry);

  if (logContainer.children.length > 5) {
    logContainer.removeChild(logContainer.firstChild);
  }

  logIndex = (logIndex + 1) % logEntries.length;
  logContainer.scrollTop = logContainer.scrollHeight;
  setTimeout(addLog, 2000 + Math.random() * 3000);
}

// --- PREMIUM SCROLL REVEALS ---
function initScrollReveals() {
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  initScrollReveals();
  updateROI();
  addLog();
});
