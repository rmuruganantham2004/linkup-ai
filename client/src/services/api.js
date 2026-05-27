import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('linkup_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('linkup_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// =================== AUTH ===================
export const authAPI = {
  signup: (data) => api.post('/signup', data),
  login: (data) => api.post('/login', data),
  googleAuth: (token) => api.post('/auth/google', { token }),
  githubAuth: (code) => api.post('/auth/github', { code }),
};

// =================== USER ===================
export const userAPI = {
  getProfile: (id) => api.get(`/profile/${id}`),
  updateProfile: (data) => api.put('/profile', data),
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  searchUsers: (query) => api.get('/users/search', { params: { q: query } }),
};

// =================== CONNECTIONS ===================
export const connectionAPI = {
  getRecommendations: () => api.get('/recommendations'),
  connect: (userId) => api.post(`/connect/${userId}`),
  superConnect: (userId) => api.post(`/connect/${userId}/super`),
  skip: (userId) => api.post(`/skip/${userId}`),
  getConnections: () => api.get('/connections'),
  getPendingRequests: () => api.get('/connections/pending'),
  acceptConnection: (id) => api.post(`/connections/${id}/accept`),
  declineConnection: (id) => api.post(`/connections/${id}/decline`),
};

// =================== EVENTS ===================
export const eventAPI = {
  getEvents: () => api.get('/events'),
  getEvent: (id) => api.get(`/events/${id}`),
  joinEvent: (id) => api.post(`/events/${id}/join`),
  leaveEvent: (id) => api.post(`/events/${id}/leave`),
};

// =================== ROOMS ===================
export const roomAPI = {
  getRooms: () => api.get('/rooms'),
  getRoom: (id) => api.get(`/rooms/${id}`),
  joinRoom: (id) => api.post('/rooms/join', { room_id: id }),
  leaveRoom: (id) => api.post(`/rooms/${id}/leave`),
  getRoomMessages: (id, page = 1) => api.get(`/rooms/${id}/messages`, { params: { page } }),
};

// =================== MESSAGES ===================
export const messageAPI = {
  getConversations: () => api.get('/messages/conversations'),
  getMessages: (userId, page = 1) => api.get(`/messages/${userId}`, { params: { page } }),
  sendMessage: (userId, content) => api.post(`/messages/${userId}`, { content }),
};

// =================== NOTIFICATIONS ===================
export const notificationAPI = {
  getNotifications: () => api.get('/notifications'),
  markAsRead: (id) => api.post(`/notifications/${id}/read`),
  markAllRead: () => api.post('/notifications/read-all'),
};

// =================== AI ===================
export const aiAPI = {
  getIcebreakers: (userId) => api.get(`/ai/icebreakers/${userId}`),
  getTeamSuggestions: (eventId) => api.get(`/ai/team-suggestions/${eventId}`),
  getTrendingSkills: () => api.get('/ai/trending-skills'),
};

export default api;
