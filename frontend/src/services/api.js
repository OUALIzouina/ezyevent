const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5002/api";
const SERVER_ORIGIN = API_URL.replace(/\/api\/?$/, ''); // strip trailing /api to get the bare server origin
// imagePath is stored as "/uploads/filename.jpg" — this builds the full URL for <img src="">
export function getUploadUrl(imagePath) {
  if (!imagePath) return '';
  return `${SERVER_ORIGIN}${imagePath}`;

}

export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `Request failed with status ${response.status}`);
  }

  return data;
}

export const auth = {
  login: (email, password) =>
    apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  registerClient: (payload) =>
    apiFetch('/auth/register/client', { method: 'POST', body: JSON.stringify(payload) }),
  registerProvider: (payload) =>
    apiFetch('/auth/register/provider', { method: 'POST', body: JSON.stringify(payload) }),
  logout: () => apiFetch('/auth/logout', { method: 'POST' }),
  me: () => apiFetch('/auth/me'),
};

export const events = {
  create: (payload) => apiFetch('/events', { method: 'POST', body: JSON.stringify(payload) }),
  mine: () => apiFetch('/events/mine'),
};

export const providers = {
  list: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiFetch(`/providers${params ? `?${params}` : ''}`);
  },
  getProfile: (providerId) => apiFetch(`/providers/${providerId}`),
  getContactDetails: (providerId) => apiFetch(`/providers/${providerId}/contact`),
};

export const bookings = {
  request: (payload) => apiFetch('/bookings', { method: 'POST', body: JSON.stringify(payload) }),
  accept: (bookingId) => apiFetch(`/bookings/${bookingId}/accept`, { method: 'POST' }),
  decline: (bookingId) => apiFetch(`/bookings/${bookingId}/decline`, { method: 'POST' }),
  complete: (bookingId) => apiFetch(`/bookings/${bookingId}/complete`, { method: 'POST' }),
  confirmPayment: (bookingId, paymentAmount, paymentFeePercentage) =>
    apiFetch(`/bookings/${bookingId}/confirm-payment`, {
      method: 'POST',
      body: JSON.stringify({ paymentAmount, paymentFeePercentage }),
    }),
  providerDashboard: () => apiFetch('/bookings/dashboard/provider'),
  clientDashboard: () => apiFetch('/bookings/dashboard/client'),
};

export const services = {
  create: (payload) => apiFetch('/services', { method: 'POST', body: JSON.stringify(payload) }),
  update: (serviceId, payload) =>
    apiFetch(`/services/${serviceId}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  remove: (serviceId) => apiFetch(`/services/${serviceId}`, { method: 'DELETE' }),
};

export const portfolios = {
  create: (payload) => apiFetch('/portfolios', { method: 'POST', body: JSON.stringify(payload) }),
  update: (portfolioId, payload) =>
    apiFetch(`/portfolios/${portfolioId}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  remove: (portfolioId) => apiFetch(`/portfolios/${portfolioId}`, { method: 'DELETE' }),

  // File upload needs its own fetch call — can't use the JSON apiFetch helper
  // since FormData sets its own Content-Type boundary header.
  uploadImage: async (portfolioId, file) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_URL}/portfolios/${portfolioId}/images`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'Upload failed');
    return data;
  },

  removeImage: (imageId) => apiFetch(`/portfolios/images/${imageId}`, { method: 'DELETE' }),
};

export const admin = {
  stats: () => apiFetch('/admin/stats'),
  users: () => apiFetch('/admin/users'),
  events: () => apiFetch('/admin/events'),
  bookings: () => apiFetch('/admin/bookings'),
  deleteUser: (userId) => apiFetch(`/admin/users/${userId}`, { method: 'DELETE' }),
};
