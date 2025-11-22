/**
 * API Client for But-For Damages Analyzer Backend
 */

// Allow overriding the API base (useful when frontend is served from a different origin/subpath)
const API_BASE = (() => {
  if (window.APP_API_BASE) return String(window.APP_API_BASE).replace(/\/$/, '');
  const stored = localStorage.getItem('bfda_api_base');
  if (stored) return String(stored).replace(/\/$/, '');
  return window.location.origin;
})();

// Helper for API calls
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// ==================== EVALUEE API ====================

export const evalueeAPI = {
  /**
   * Get all evaluees
   */
  async getAll() {
    const data = await apiCall('/api/evaluees');
    return data.evaluees;
  },

  /**
   * Get specific evaluee with cases
   */
  async get(id) {
    const data = await apiCall(`/api/evaluees/${id}`);
    return data.evaluee;
  },

  /**
   * Create new evaluee
   */
  async create(profileName) {
    const data = await apiCall('/api/evaluees', {
      method: 'POST',
      body: JSON.stringify({ profile_name: profileName })
    });
    return data.evaluee;
  },

  /**
   * Update evaluee
   */
  async update(id, profileName) {
    const data = await apiCall(`/api/evaluees/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ profile_name: profileName })
    });
    return data.evaluee;
  },

  /**
   * Delete evaluee
   */
  async delete(id) {
    const data = await apiCall(`/api/evaluees/${id}`, {
      method: 'DELETE'
    });
    return data;
  }
};

// ==================== CASE API ====================

export const caseAPI = {
  /**
   * Get all cases for an evaluee
   */
  async getAll(evalueeId) {
    const data = await apiCall(`/api/evaluees/${evalueeId}/cases`);
    return data.cases;
  },

  /**
   * Get specific case
   */
  async get(caseId, includeHistory = false) {
    const url = includeHistory ?
      `/api/cases/${caseId}?include_history=true` :
      `/api/cases/${caseId}`;
    const data = await apiCall(url);
    return data.case;
  },

  /**
   * Create new case
   */
  async create(evalueeId, caseData) {
    const data = await apiCall(`/api/evaluees/${evalueeId}/cases`, {
      method: 'POST',
      body: JSON.stringify(caseData)
    });
    return data.case;
  },

  /**
   * Update case
   */
  async update(caseId, caseData) {
    const data = await apiCall(`/api/cases/${caseId}`, {
      method: 'PUT',
      body: JSON.stringify(caseData)
    });
    return data.case;
  },

  /**
   * Delete case
   */
  async delete(caseId) {
    const data = await apiCall(`/api/cases/${caseId}`, {
      method: 'DELETE'
    });
    return data;
  }
};

// ==================== CALCULATION API ====================

export const calculationAPI = {
  /**
   * Get calculation history for a case
   */
  async getAll(caseId) {
    const data = await apiCall(`/api/cases/${caseId}/calculations`);
    return data.calculations;
  },

  /**
   * Get specific calculation
   */
  async get(calcId) {
    const data = await apiCall(`/api/calculations/${calcId}`);
    return data.calculation;
  },

  /**
   * Save new calculation
   */
  async save(caseId, calculationData) {
    const data = await apiCall(`/api/cases/${caseId}/calculations`, {
      method: 'POST',
      body: JSON.stringify(calculationData)
    });
    return data.calculation;
  },

  /**
   * Delete calculation
   */
  async delete(calcId) {
    const data = await apiCall(`/api/calculations/${calcId}`, {
      method: 'DELETE'
    });
    return data;
  }
};

// ==================== UTILITY API ====================

export const utilAPI = {
  /**
   * Search evaluees and cases
   */
  async search(query) {
    const data = await apiCall(`/api/search?q=${encodeURIComponent(query)}`);
    return data.results;
  },

  /**
   * Get database statistics
   */
  async stats() {
    const data = await apiCall('/api/stats');
    return data.stats;
  }
};

// ==================== PROFILE ADAPTER ====================
// Adapts the API to work with the existing profile-based interface

export const profileAdapter = {
  /**
   * Get all profiles (evaluees)
   */
  async getAllProfiles() {
    const evaluees = await evalueeAPI.getAll();
    const profiles = {};

    // For each evaluee, get their latest case as the "profile"
    for (const evaluee of evaluees) {
      const cases = await caseAPI.getAll(evaluee.id);
      if (cases.length > 0) {
        // Use the most recent case
        const latestCase = cases[0];
        const assumptions = latestCase.assumptions || {};
        profiles[evaluee.profile_name] = {
          evalueeId: evaluee.id,
          caseId: latestCase.id,
          ...assumptions
        };
      } else {
        // No cases yet, create empty profile
        profiles[evaluee.profile_name] = {
          evalueeId: evaluee.id,
          caseId: null,
          meta: { profileName: evaluee.profile_name }
        };
      }
    }

    return profiles;
  },

  /**
   * Get specific profile by name
   */
  async getProfile(profileName) {
    const evaluees = await evalueeAPI.getAll();
    const evaluee = evaluees.find(e => e.profile_name === profileName);

    if (!evaluee) {
      return null;
    }

    const cases = await caseAPI.getAll(evaluee.id);
    if (cases.length > 0) {
      const latestCase = cases[0];
      const assumptions = latestCase.assumptions || {};
      return {
        evalueeId: evaluee.id,
        caseId: latestCase.id,
        ...assumptions
      };
    }

    return {
      evalueeId: evaluee.id,
      caseId: null,
      meta: { profileName: evaluee.profile_name }
    };
  },

  /**
   * Save or update profile
   */
  async saveProfile(profileName, assumptions) {
    try {
      // Check if evaluee exists
      const evaluees = await evalueeAPI.getAll();
      let evaluee = evaluees.find(e => e.profile_name === profileName);

      // Create evaluee if doesn't exist
      if (!evaluee) {
        evaluee = await evalueeAPI.create(profileName);
      }

      // Get or create case
      const cases = await caseAPI.getAll(evaluee.id);
      let currentCase;

      if (cases.length > 0) {
        // Update existing case
        currentCase = cases[0];
        await caseAPI.update(currentCase.id, {
          case_name: assumptions.meta?.caseName || 'Untitled Case',
          case_type: assumptions.meta?.caseType || 'pi',
          date_of_birth: assumptions.dates?.dob || null,
          incident_date: assumptions.dates?.incident || null,
          valuation_date: assumptions.dates?.valuation || null,
          wle_years: assumptions.horizon?.wleYears || null,
          yfs_years: assumptions.horizon?.yfsYears || null,
          le_years: assumptions.horizon?.leYears || null,
          assumptions: assumptions
        });
      } else {
        // Create new case
        currentCase = await caseAPI.create(evaluee.id, {
          case_name: assumptions.meta?.caseName || 'Untitled Case',
          case_type: assumptions.meta?.caseType || 'pi',
          date_of_birth: assumptions.dates?.dob || null,
          incident_date: assumptions.dates?.incident || null,
          valuation_date: assumptions.dates?.valuation || null,
          wle_years: assumptions.horizon?.wleYears || null,
          yfs_years: assumptions.horizon?.yfsYears || null,
          le_years: assumptions.horizon?.leYears || null,
          assumptions: assumptions
        });
      }

      return {
        evalueeId: evaluee.id,
        caseId: currentCase.id
      };
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  },

  /**
   * Delete profile
   */
  async deleteProfile(profileName) {
    const evaluees = await evalueeAPI.getAll();
    const evaluee = evaluees.find(e => e.profile_name === profileName);

    if (evaluee) {
      await evalueeAPI.delete(evaluee.id);
    }
  },

  /**
   * Save calculation result
   */
  async saveCalculation(profileName, assumptions, results) {
    const profile = await this.getProfile(profileName);

    if (!profile || !profile.caseId) {
      throw new Error('No case found for this profile');
    }

    const totals = results.totals || {};

    await calculationAPI.save(profile.caseId, {
      description: `Calculation at ${new Date().toLocaleString()}`,
      assumptions: assumptions,
      results: results,
      total_damages_pv: totals.totalPV,
      past_damages: totals.pastDam,
      future_damages_pv: totals.futurePV
    });
  }
};

// Make profileAdapter available globally for compatibility
window.profileAdapter = profileAdapter;
