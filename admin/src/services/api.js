const API_BASE_URL = 'http://localhost:5000/api';

export const adminService = {
  // Authentication
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error('Login failed');
      return await response.json();
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // Fetch system-wide alerts
  getAllAlerts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/alerts/recent`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("Error fetching alerts:", error);
      throw error;
    }
  },

  // Update alert status globally
  updateSystemAlert: async (alertId, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/alerts/${alertId}/status`, {
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
  },

  // User Management
  getUsers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  addUser: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch (error) {
      console.error(`Error updating user ${userId}:`, error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      console.error(`Error deleting user ${userId}:`, error);
      throw error;
    }
  },

  // Department Management
  getDepartments: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/departments`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("Error fetching departments:", error);
      throw error;
    }
  },

  addDepartment: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/departments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Error adding department:", error);
      throw error;
    }
  },

  updateDepartment: async (id, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/departments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error(`Error updating department ${id}:`, error);
      throw error;
    }
  },

  deleteDepartment: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/departments/${id}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      console.error(`Error deleting department ${id}:`, error);
      throw error;
    }
  }
};
