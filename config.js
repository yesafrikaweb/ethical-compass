/**
 * Ethical Compass — Site Configuration & Feature Flags
 * Easily enable/disable site modules and feature links across the application.
 *
 * Developed & Created by Gcwelethemba Tshuma
 * Copyright (c) 2026 Gcwelethemba Tshuma. All rights reserved.
 */

window.EthicalCompassConfig = {
  // Feature Flags — Set to true/false to enable or disable features site-wide
  features: {
    enableDashboard: false,           // Set to true to enable/show Dashboard links site-wide
    enableROIAnalytics: true,         // Strategic ROI Calculator
    enableComparisonMatrix: true,     // Plan Comparison Matrix
    enablePersonnelPage: true         // Team Leadership Page
  },

  // Site Metadata
  site: {
    name: "Ethical Compass",
    tagline: "The precision of continuous institutional oversight",
    version: "1.0.0"
  }
};

/**
 * Automatically applies configuration flags to DOM elements marked with [data-feature="..."]
 */
function applySiteConfiguration() {
  const config = window.EthicalCompassConfig;
  if (!config || !config.features) return;

  // Handle Dashboard Feature Flag
  const dashboardElements = document.querySelectorAll('[data-feature="dashboard"]');
  dashboardElements.forEach(el => {
    if (!config.features.enableDashboard) {
      el.style.display = 'none';
    } else {
      el.style.display = '';
    }
  });
}

// Execute configuration scan on initial load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applySiteConfiguration);
} else {
  applySiteConfiguration();
}
