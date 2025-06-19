// Get token from localStorage
export function getToken() {
  return localStorage.getItem('token');
}

// Save token to localStorage
export function saveToken(token) {
  localStorage.setItem('token', token);
}

// Save role to localStorage (optional, if needed separately)
export function saveRole(role) {
  localStorage.setItem('role', role);
}

// Get role from token payload
export function getRole() {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch (e) {
    console.error('Invalid token format', e);
    return null;
  }
}

// Get role (alias if you're using this name elsewhere)
export function getUserRole() {
  return getRole();
}

// Clear token and role
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
}
