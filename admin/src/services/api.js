const API_BASE_URL = 'http://localhost:5000/api';

export const adminService = {
  // Fetch system-wide alerts
  getAllAlerts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/recent`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("Error fetching alerts:", error);
      // Fallback data for frontend demo
      return [
        { id: 1, code: 'Code Blue', floor: '3', ward: 'ICU', room: '302', status: 'Active', time: '10:05 AM' },
        { id: 2, code: 'Code Red', floor: '1', ward: 'ER', room: '105', status: 'Active', time: '10:15 AM' }
      ];
    }
  },

  // Update alert configuration or status globally
  updateSystemAlert: async (alertId, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/alerts/system/${alertId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error(`Error updating system alert ${alertId}:`, error);
      throw error;
    }
  }
};
