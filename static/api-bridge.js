/**
 * API Bridge - Replaces localStorage functions with API calls
 * Include this script BEFORE the main application script
 */

// ==================== REPLACE LOCALSTORAGE FUNCTIONS ====================

// Import the profile adapter
import { profileAdapter } from './api.js';

// Override the profile functions
window.loadProfileMap = async function() {
  try {
    return await profileAdapter.getAllProfiles();
  } catch (error) {
    console.error('Error loading profiles from API:', error);
    // Fallback to localStorage
    try {
      return JSON.parse(localStorage.getItem('bfda_profiles_v1') || '{}');
    } catch (_) {
      return {};
    }
  }
};

window.saveProfileMap = async function(map) {
  // Save all profiles to API
  for (const [name, assumptions] of Object.entries(map)) {
    try {
      await profileAdapter.saveProfile(name, assumptions);
    } catch (error) {
      console.error(`Error saving profile ${name}:`, error);
    }
  }

  // Also save to localStorage as backup
  localStorage.setItem('bfda_profiles_v1', JSON.stringify(map));
};

// Make functions async-compatible by returning Promises
const originalRefreshProfileSelect = window.refreshProfileSelect;
window.refreshProfileSelect = async function() {
  const select = document.getElementById('profileSelect');
  if (!select) return;

  try {
    const profiles = await loadProfileMap();
    select.innerHTML = '';

    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = 'Select profile';
    select.appendChild(opt);

    Object.keys(profiles).sort().forEach(name => {
      const o = document.createElement('option');
      o.value = name;
      o.textContent = name;
      select.appendChild(o);
    });
  } catch (error) {
    console.error('Error refreshing profiles:', error);
  }
};

// Override save function to save calculation results too
const originalRunCompute = window.runCompute;
window.runCompute = function() {
  if (originalRunCompute) {
    originalRunCompute();

    // After computation, save results to API
    const profileName = document.getElementById('profileName')?.value?.trim();
    if (profileName && window.__ASSUMPTIONS__ && window.__SCHEDULE__) {
      profileAdapter.saveCalculation(
        profileName,
        window.__ASSUMPTIONS__,
        window.__SCHEDULE__
      ).catch(error => {
        console.error('Error saving calculation:', error);
      });
    }
  }
};

// Add API status indicator
window.addEventListener('DOMContentLoaded', () => {
  // Check API connection
  fetch('/api/stats')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('✓ Connected to API backend');
        console.log('Database stats:', data.stats);

        // Add indicator to UI
        const footer = document.querySelector('.footer');
        if (footer) {
          const indicator = document.createElement('span');
          indicator.className = 'pill';
          indicator.style.background = 'var(--ok)';
          indicator.style.color = 'var(--bg)';
          indicator.textContent = '● API Connected';
          footer.appendChild(indicator);
        }

        // Update help text
        const helpText = document.querySelector('.section .help');
        if (helpText) {
          helpText.textContent = 'Profiles are saved to the server database. Changes are automatically synced.';
        }
      }
    })
    .catch(error => {
      console.warn('API connection failed, using localStorage fallback:', error);

      // Add warning indicator
      const footer = document.querySelector('.footer');
      if (footer) {
        const indicator = document.createElement('span');
        indicator.className = 'pill';
        indicator.style.background = 'var(--warn)';
        indicator.style.color = 'var(--bg)';
        indicator.textContent = '● Offline Mode';
        footer.appendChild(indicator);
      }
    });
});

console.log('API Bridge loaded - profiles will be saved to server');
