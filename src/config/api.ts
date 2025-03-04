export const API_BASE_URL = "http://localhost:8080/api";

export const API_ENDPOINTS = {
  users: `${API_BASE_URL}/clients`,
  user: (id: string) => `${API_BASE_URL}/clients?id=${id}`,
  delete: (id: string) => `${API_BASE_URL}/clients/${id}`,
  put: (id: string) => `${API_BASE_URL}/clients/${id}`,
};
