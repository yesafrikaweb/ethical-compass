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
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  const menuToggle = document.querySelector('.menu-toggle');
  if (navLinks) navLinks.classList.toggle('active');

  if (menuToggle) {
    const isExpanded = navLinks.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
  }
}

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

// --- HYBRID MARKDOWN SUPPORT ---
/**
 * Fetches and renders Markdown content for modules.
 * @param {string} file - Path to the markdown file.
 * @param {string} targetId - ID of the element to inject content into.
 */
async function loadMarkdownContent(file, targetId) {
  const container = document.getElementById(targetId);
  if (!container) return;

  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error('Content not found');
    
    let text = await response.text();

    // Strip Front Matter (the --- block at the top)
    const frontMatterRegex = /^---\s*[\s\S]*?---\s*/;
    text = text.replace(frontMatterRegex, '');

    // Render using Marked
    container.innerHTML = marked.parse(text);
    
    // Re-initialize reveals for the new content
    initScrollReveals();
  } catch (error) {
    console.error('Markdown Loading Error:', error);
    container.innerHTML = `<p style="color: var(--color-text-muted);">Analytical content currently unavailable. Please try again later.</p>`;
  }
}

// --- ANALYTICAL CALCULATORS ---
function updateValue() {
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
  "[SCANNING] Project Alpha protocol analysis initiated...",
  "[OVERSIGHT] Observing data stream 0x4F... PASS",
  "[INTEGRITY] Syncing Regulatory Code 802.11...",
  "[STRATEGIC] Emerging ethical risk identified in Module B...",
  "[REMEDIATION] Coordinating automated governance resolution...",
  "[SYSTEM] Governance framework operating at 99.8% precision...",
  "[SYNC] Global ethical standards updated...",
  "[SECURITY] Air-gapped enclave integrity verified...",
  "[VERIFIED] Permanent record hash generated: 7a8c...2e1",
  "[ANALYSIS] Qualitative risk indices re-calculated..."
];

let logIndex = 0;
function addLog() {
  const logContainer = document.getElementById('oversight-logs');
  if (!logContainer) return;

  const rawText = logEntries[logIndex];
  const entry = document.createElement('div');
  entry.className = 'log-entry';

  // Color code the tags
  const processedText = rawText.replace(/^\[(.*?)\]/, (match) => {
    const tag = match.slice(1, -1);
    let colorClass = 'log-tag-blue';
    if (['STRATEGIC', 'REMEDIATION'].includes(tag)) colorClass = 'log-tag-orange';
    return `<span class="log-tag ${colorClass}">${match}</span>`;
  });

  entry.innerHTML = processedText;
  logContainer.appendChild(entry);

  if (logContainer.children.length > 4) {
    const first = logContainer.firstChild;
    first.style.marginTop = `-${first.offsetHeight}px`;
    first.style.opacity = '0';
    setTimeout(() => {
      if (first.parentNode === logContainer) {
        logContainer.removeChild(first);
      }
    }, 400);
  }

  logIndex = (logIndex + 1) % logEntries.length;
  logContainer.scrollTop = logContainer.scrollHeight;
  setTimeout(addLog, 3000 + Math.random() * 2000);
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
  updateValue();
  addLog();

  // Handle Dynamic Markdown Loading
  const mdContainer = document.querySelector('[data-markdown-src]');
  if (mdContainer) {
    const src = mdContainer.getAttribute('data-markdown-src');
    loadMarkdownContent(src, mdContainer.id);
  }
});
