const API_BASE = 'http://localhost:3000/api';

export const api = {
  enhanceText: async (text, type) => {
    try {
      const res = await fetch(`${API_BASE}/enhance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, type }),
      });
      return await res.json();
    } catch (error) {
      console.error('Error enhancing text:', error);
      return { enhancedText: text }; // Fallback
    }
  },

  generateLogo: async (name, style, color) => {
    try {
      const res = await fetch(`${API_BASE}/logo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, style, color }),
      });
      return await res.json();
    } catch (error) {
      console.error('Error generating logo:', error);
      return null;
    }
  },

  generatePortfolio: async (data) => {
    try {
      const res = await fetch(`${API_BASE}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (error) {
      console.error('Error generating portfolio:', error);
      return null;
    }
  }
};
