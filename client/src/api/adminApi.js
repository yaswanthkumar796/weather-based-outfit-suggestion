const API_URL = 'http://localhost:5000/api/admin';


const getAuthHeader = () => {
     const user = JSON.parse(localStorage.getItem('adminUser'));
     if (user && user.token) {
          return { 'Authorization': 'Bearer ' + user.token };
     } else {
          return {};
     }
};

export const loginAdmin = async (username, password) => {
     const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
     });
     if (!response.ok) {
          throw new Error('Login failed');
     }
     return response.json();
};

export const getRequests = async () => {
     const response = await fetch(`${API_URL}/requests`, {
          headers: getAuthHeader(),
     });
     if (!response.ok) {
          const error = new Error('Failed to fetch requests');
          error.status = response.status;
          throw error;
     }
     return response.json();
};

export const approveRequest = async (id) => {
     const response = await fetch(`${API_URL}/requests/${id}/approve`, {
          method: 'POST',
          headers: getAuthHeader(),
     });
     if (!response.ok) {
          const error = new Error('Failed to approve request');
          error.status = response.status;
          throw error;
     }
     return response.json();
};

export const rejectRequest = async (id) => {
     const response = await fetch(`${API_URL}/requests/${id}/reject`, {
          method: 'POST',
          headers: getAuthHeader(),
     });
     if (!response.ok) {
          const error = new Error('Failed to reject request');
          error.status = response.status;
          throw error;
     }
     return response.json();
};

export const getFeedback = async () => {
     const response = await fetch(`http://localhost:5000/api/feedback`, {
          headers: getAuthHeader(),
     });
     if (!response.ok) {
          const error = new Error('Failed to fetch feedback');
          error.status = response.status;
          throw error;
     }
     return response.json();
};
