/**
 * Ethical Compass Intelligence Script
 * Developed & Created by Gcwelethemba Tshuma
 * Copyright (c) 2026 Gcwelethemba Tshuma. All rights reserved.
 */

console.log("%c Ethical Compass — Developed & Created by Gcwelethemba Tshuma", "font-weight: bold; color: #3b82f6; font-size: 12px;");
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

// --- SMOOTH COUNTER ANIMATIONS ---
function initCounterAnimations() {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const rawText = el.innerText.trim();
        const targetValue = parseFloat(el.getAttribute('data-target') || rawText.replace(/[^0-9.]/g, ''));
        if (isNaN(targetValue) || targetValue === 0) return;

        const duration = 1500;
        const startTime = performance.now();
        const prefix = el.getAttribute('data-prefix') || (rawText.match(/^[^\d]+/)?.[0] || '');
        const suffix = el.getAttribute('data-suffix') || (rawText.match(/[^\d]+$/)?.[0] || '');
        const decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals')) : (rawText.includes('.') ? 1 : 0);

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentCount = (easeProgress * targetValue).toFixed(decimals);
          
          el.innerText = `${prefix}${parseFloat(currentCount).toLocaleString()}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          }
        }

        requestAnimationFrame(updateCount);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('[data-target], .count-up, .metric-value, .stat-number').forEach(el => counterObserver.observe(el));
}

// --- BRIEFING MODAL SYSTEM ---
function injectBriefingModal() {
  if (document.getElementById('briefing-modal-overlay')) return;

  const modalHtml = `
    <div id="briefing-modal-overlay" class="briefing-modal-overlay" onclick="handleBriefingBackdropClick(event)">
      <div class="briefing-modal-card">
        <button class="briefing-modal-close" onclick="closeBriefingModal()" aria-label="Close Modal">&times;</button>
        <div class="briefing-modal-header">
          <h3>Request an Executive Briefing</h3>
          <p>Tailored governance intelligence and deployment options for your organization.</p>
        </div>
        <form onsubmit="handleBriefingSubmit(event)">
          <div class="briefing-form-group">
            <label for="briefing-name">Full Name</label>
            <input type="text" id="briefing-name" class="briefing-form-input" placeholder="e.g. Dr. Jane Smith" required />
          </div>
          <div class="briefing-form-group">
            <label for="briefing-email">Official Email</label>
            <input type="email" id="briefing-email" class="briefing-form-input" placeholder="name@institution.gov.za" required />
          </div>
          <div class="briefing-form-group">
            <label for="briefing-org">Organization / Department</label>
            <input type="text" id="briefing-org" class="briefing-form-input" placeholder="Department of Public Works / Treasury" required />
          </div>
          <div class="briefing-form-group">
            <label for="briefing-type">Organization Sector</label>
            <select id="briefing-type" class="briefing-form-select" required>
              <option value="" disabled selected>Select Sector...</option>
              <option value="soe">State-Owned Enterprise (SOE)</option>
              <option value="public">Public Sector / Department</option>
              <option value="financial">Financial Institution</option>
              <option value="corporate">Private Corporate Enclave</option>
              <option value="other">Other Institutional Body</option>
            </select>
          </div>
          <div class="briefing-form-group">
            <label for="briefing-notes">Briefing Focus Areas</label>
            <textarea id="briefing-notes" class="briefing-form-textarea" rows="3" placeholder="Outline specific regulatory, POPIA, or governance requirements..."></textarea>
          </div>
          <button type="submit" class="briefing-submit-btn">Submit Request &rarr;</button>
        </form>
      </div>
    </div>
    <div id="briefing-toast" class="briefing-toast">
      ✅ Briefing request submitted. Our executive team will contact you shortly.
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function openBriefingModal(e) {
  if (e) e.preventDefault();
  const section = document.getElementById('briefing-section');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
    const firstInput = section.querySelector('input');
    if (firstInput) setTimeout(() => firstInput.focus(), 600);
  } else {
    injectBriefingModal();
    const overlay = document.getElementById('briefing-modal-overlay');
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
}

function closeBriefingModal() {
  const overlay = document.getElementById('briefing-modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function handleBriefingBackdropClick(e) {
  if (e.target.id === 'briefing-modal-overlay') {
    closeBriefingModal();
  }
}

function handleBriefingSubmit(e) {
  e.preventDefault();
  closeBriefingModal();
  
  const toast = document.getElementById('briefing-toast');
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
}

// Global Escape Key Listener
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeBriefingModal();
  }
});

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  initScrollReveals();
  initCounterAnimations();
  injectBriefingModal();
  updateValue();
  addLog();
});


