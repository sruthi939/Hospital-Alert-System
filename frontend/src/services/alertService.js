const API_URL = 'http://localhost:5000/api';

export const alertService = {
  triggerAlert: async (alertData) => {
    const response = await fetch(`${API_URL}/alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alertData),
    });
    if (!response.ok) throw new Error('Failed to trigger alert');
    return response.json();
  },

  getRecentAlerts: async () => {
    const response = await fetch(`${API_URL}/alerts/recent`);
    if (!response.ok) throw new Error('Failed to fetch alerts');
    return response.json();
  }
};
