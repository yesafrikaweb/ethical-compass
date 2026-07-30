// Tag 0.20
/**
 * Ethical Compass Intelligence Script
 * Developed & Created by Gcwelethemba Tshuma
 * Copyright (c) 2026 Gcwelethemba Tshuma. All rights reserved.
 */

console.log("%c Ethical Compass — Developed & Created by Gcwelethemba Tshuma", "font-weight: bold; color: #3b82f6; font-size: 12px;");
// dashboard-common.js

// 1. Disable transitions immediately to prevent load-time layout flash/flicker
document.documentElement.classList.add('no-transitions');

// 2. Initial State Sync (runs immediately when script is loaded to prevent flashing)
if (localStorage.getItem('sidebar-collapsed') === 'true') {
  document.body.classList.add('sidebar-collapsed');
}
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
}

// Restore transitions after the browser has completed layout and initial paint
window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('no-transitions');
    });
  });
});

// 2. Global Toggles
function toggleSidebar() {
  document.body.classList.toggle('sidebar-collapsed');
  const collapsed = document.body.classList.contains('sidebar-collapsed');
  localStorage.setItem('sidebar-collapsed', collapsed ? 'true' : 'false');
}

function toggleContextDrawer() {
  const drawer = document.getElementById('context-drawer');
  if (drawer) {
    drawer.classList.toggle('open');
  }
}

function toggleMode() {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// 3. Live Clock functionality
function updateClock() {
  const clockTime = document.getElementById('live-time');
  const clockDate = document.getElementById('live-date');
  if (!clockTime && !clockDate) return;
  
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const timeStr = `${hours}:${minutes} ${ampm}`;

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dateStr = `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

  if (clockTime) clockTime.innerText = timeStr;
  if (clockDate) clockDate.innerText = dateStr;
}

// 4. Global DOM Setup
document.addEventListener('DOMContentLoaded', () => {
  const headerRight = document.querySelector('.header-right');
  if (headerRight) {
    const settingsBtn = headerRight.querySelector('.action-btn-settings');
    
    // Inject Theme Switcher Button if not present
    if (!headerRight.querySelector('.mode-toggle')) {
      const modeBtn = document.createElement('button');
      modeBtn.className = 'mode-toggle';
      modeBtn.setAttribute('aria-label', 'Toggle Appearance');
      modeBtn.setAttribute('data-tooltip', 'Toggle light / dark appearance mode');
      modeBtn.setAttribute('data-tooltip-pos', 'bottom');
      modeBtn.style.cssText = 'background: transparent; border: 1px solid var(--color-border); color: var(--color-text-muted); cursor: pointer; transition: var(--transition); border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;';
      modeBtn.onclick = toggleMode;
      modeBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      if (settingsBtn) {
        headerRight.insertBefore(modeBtn, settingsBtn);
      } else {
        headerRight.appendChild(modeBtn);
      }
    }

    // Inject Live Clock if not present
    if (!headerRight.querySelector('.clock-display')) {
      const clockDiv = document.createElement('div');
      clockDiv.className = 'clock-display';
      clockDiv.innerHTML = `<span id="live-time" style="color: var(--color-text); font-weight: 600;">00:00 AM</span>`;
      if (settingsBtn) {
        headerRight.insertBefore(clockDiv, settingsBtn);
      } else {
        headerRight.appendChild(clockDiv);
      }
    }

    // Inject UTAUT Adoption Audit button if not present
    if (!headerRight.querySelector('.action-btn-adoption')) {
      const adoptBtn = document.createElement('button');
      adoptBtn.className = 'action-btn-adoption';
      adoptBtn.setAttribute('aria-label', 'System Adoption Audit');
      adoptBtn.setAttribute('data-tooltip', 'Audit system adoption and user friction (UTAUT)');
      adoptBtn.setAttribute('data-tooltip-pos', 'bottom');
      adoptBtn.style.cssText = 'background: transparent; border: 1px solid var(--color-border); color: var(--color-text-muted); cursor: pointer; transition: var(--transition); border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; margin-right: 0.5rem;';
      adoptBtn.onclick = toggleUtautDrawer;
      adoptBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="M9 11l2 2 4-4"></path>
        </svg>
      `;
      if (settingsBtn) {
        headerRight.insertBefore(adoptBtn, settingsBtn);
      } else {
        headerRight.appendChild(adoptBtn);
      }
    }
  }

  // Inject UTAUT drawer if not present in body
  if (!document.getElementById('utaut-drawer')) {
    const drawerDiv = document.createElement('div');
    drawerDiv.id = 'utaut-drawer';
    drawerDiv.className = 'context-drawer';
    drawerDiv.innerHTML = `
      <div class="drawer-header">
        <h3>System Adoption Audit</h3>
        <button class="drawer-close-btn" onclick="toggleUtautDrawer()">&times;</button>
      </div>
      <div class="drawer-body">
        <div class="utaut-score-card">
          <span class="utaut-index-title">System Acceptance Index</span>
          <div class="utaut-gauge-container">
            <div class="utaut-gauge-background"></div>
            <div class="utaut-gauge-fill" id="utaut-gauge-fill"></div>
            <div class="utaut-gauge-value" id="utaut-gauge-value">75%</div>
          </div>
          <div class="utaut-insight" id="utaut-gauge-insight">Loading assessment...</div>
        </div>

        <div class="drawer-section">
          <h4>UTAUT Core Pillars</h4>
          
          <div class="drawer-slider">
            <div style="display:flex; justify-content:space-between;">
              <span>Utility Boost (PE):</span>
              <span id="utaut-val-pe">75%</span>
            </div>
            <input type="range" id="utaut-slider-pe" min="10" max="100" value="75" oninput="updateUtautScore()">
          </div>

          <div class="drawer-slider" style="margin-top:0.5rem;">
            <div style="display:flex; justify-content:space-between;">
              <span>Friction Deficit (EE):</span>
              <span id="utaut-val-ee">80%</span>
            </div>
            <input type="range" id="utaut-slider-ee" min="10" max="100" value="80" oninput="updateUtautScore()">
          </div>

          <div class="drawer-slider" style="margin-top:0.5rem;">
            <div style="display:flex; justify-content:space-between;">
              <span>Collaboration Endorsement (SI):</span>
              <span id="utaut-val-si">70%</span>
            </div>
            <input type="range" id="utaut-slider-si" min="10" max="100" value="70" oninput="updateUtautScore()">
          </div>

          <div class="drawer-slider" style="margin-top:0.5rem;">
            <div style="display:flex; justify-content:space-between;">
              <span>Workspace Support Health (FC):</span>
              <span id="utaut-val-fc">85%</span>
            </div>
            <input type="range" id="utaut-slider-fc" min="10" max="100" value="85" oninput="updateUtautScore()">
          </div>
        </div>

        <button class="utaut-save-btn" onclick="saveUtautAudit()">Save Audit Settings</button>
      </div>
    `;
    document.body.appendChild(drawerDiv);
  }

  // Load saved values
  const pe = localStorage.getItem('utaut_pe') || '75';
  const ee = localStorage.getItem('utaut_ee') || '80';
  const si = localStorage.getItem('utaut_si') || '70';
  const fc = localStorage.getItem('utaut_fc') || '85';

  const sPE = document.getElementById('utaut-slider-pe');
  const sEE = document.getElementById('utaut-slider-ee');
  const sSI = document.getElementById('utaut-slider-si');
  const sFC = document.getElementById('utaut-slider-fc');

  if (sPE) sPE.value = pe;
  if (sEE) sEE.value = ee;
  if (sSI) sSI.value = si;
  if (sFC) sFC.value = fc;

  updateUtautScore();

  // Setup clock interval
  setInterval(updateClock, 1000);
  updateClock();
});

// UTAUT Global Functions
function toggleUtautDrawer() {
  const drawer = document.getElementById('utaut-drawer');
  if (drawer) {
    drawer.classList.toggle('open');
  }
}

function updateUtautScore() {
  const pe = parseInt(document.getElementById('utaut-slider-pe')?.value || '75');
  const ee = parseInt(document.getElementById('utaut-slider-ee')?.value || '80');
  const si = parseInt(document.getElementById('utaut-slider-si')?.value || '70');
  const fc = parseInt(document.getElementById('utaut-slider-fc')?.value || '85');

  // Update slider label values
  const lPE = document.getElementById('utaut-val-pe');
  const lEE = document.getElementById('utaut-val-ee');
  const lSI = document.getElementById('utaut-val-si');
  const lFC = document.getElementById('utaut-val-fc');

  if (lPE) lPE.innerText = pe + '%';
  if (lEE) lEE.innerText = ee + '%';
  if (lSI) lSI.innerText = si + '%';
  if (lFC) lFC.innerText = fc + '%';

  // Calculate adoption score: 40% PE, 30% EE, 15% SI, 15% FC
  const score = Math.round((pe * 0.4) + (ee * 0.3) + (si * 0.15) + (fc * 0.15));

  // Update gauge UI
  const gaugeFill = document.getElementById('utaut-gauge-fill');
  const gaugeValue = document.getElementById('utaut-gauge-value');
  const gaugeInsight = document.getElementById('utaut-gauge-insight');

  if (gaugeValue) gaugeValue.innerText = score + '%';
  
  if (gaugeFill) {
    const rotation = (score / 100) * 180 - 135;
    gaugeFill.style.transform = `rotate(${rotation}deg)`;
  }

  if (gaugeInsight) {
    if (score >= 85) {
      gaugeInsight.innerText = 'High adoption probability. User-perceived friction is minimal and performance gains are significant.';
    } else if (score >= 70) {
      gaugeInsight.innerText = 'Moderate adoption probability. Consider improving UX friction or workspace support.';
    } else {
      gaugeInsight.innerText = 'Low adoption probability. Immediate UI refinements and stakeholder training recommended.';
    }
  }
}

function saveUtautAudit() {
  const pe = document.getElementById('utaut-slider-pe')?.value || '75';
  const ee = document.getElementById('utaut-slider-ee')?.value || '80';
  const si = document.getElementById('utaut-slider-si')?.value || '70';
  const fc = document.getElementById('utaut-slider-fc')?.value || '85';

  localStorage.setItem('utaut_pe', pe);
  localStorage.setItem('utaut_ee', ee);
  localStorage.setItem('utaut_si', si);
  localStorage.setItem('utaut_fc', fc);

  const score = Math.round((parseInt(pe) * 0.4) + (parseInt(ee) * 0.3) + (parseInt(si) * 0.15) + (parseInt(fc) * 0.15));

  // Dispatch custom event for telemetry page integration
  window.dispatchEvent(new CustomEvent('utaut-audit-saved', { detail: { score: score } }));

  showToast(`UTAUT audit saved! Predicted adoption is at ${score}%`);
  toggleUtautDrawer();
}

// Global showToast fallback
window.showToast = window.showToast || function(message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    toast.style.cssText = 'position: fixed; bottom: 2rem; right: 2rem; background-color: var(--color-midnight); border: 1px solid var(--color-electric-blue); border-radius: var(--radius-md); padding: 1rem 1.5rem; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); z-index: 10000; transition: opacity 0.35s ease, transform 0.35s ease; opacity: 0; transform: translateY(20px); pointer-events: none; color: var(--color-text); font-size: 0.85rem;';
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';
  
  if (window.toastTimeout) clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
  }, 3000);
};

