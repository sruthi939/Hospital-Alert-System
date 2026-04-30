// Service for interacting with the Backend API

const API_BASE_URL = 'http://localhost:5000/api';

export const alertService = {
  // Fetch all active alerts
  getActiveAlerts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/alerts`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("Error fetching alerts:", error);
      // Fallback data for frontend demo
      return [
        { id: 1, code: 'Code Blue', floor: '3', ward: 'ICU', room: '302', status: 'ACTIVE', time: '10:05 AM' },
        { id: 2, code: 'Code Red', floor: '1', ward: 'ER', room: '105', status: 'IN_PROGRESS', time: '10:15 AM' }
      ];
    }
  },

  // Update alert status
  updateStatus: async (alertId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/alerts/${alertId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      return await response.json();
    } catch (error) {
      console.error(`Error updating alert ${alertId}:`, error);
      throw error;
    }
  }
};
