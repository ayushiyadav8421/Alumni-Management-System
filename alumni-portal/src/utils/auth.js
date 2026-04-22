/**
 * Auth utility — retrieves JWT token from localStorage
 * and returns headers for authenticated API requests.
 */

export const getAuthHeaders = () => {
  const token = localStorage.getItem('alumniToken');
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

export const getAuthToken = () => {
  return localStorage.getItem('alumniToken');
};
