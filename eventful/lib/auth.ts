// Authentication utilities for admin and user access control

export interface DecodedToken {
  sub: string; // email
  fullName: string;
  exp: number;
  iat: number;
}

export interface UserInfo {
  email: string;
  fullName: string;
  role: "USER" | "ADMIN";
  exp: number;
  iat: number;
}

// Decode JWT token (simple base64 decode - in production use a proper JWT library)
export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  const decoded = decodeToken(token);
  if (!decoded) return false;
  
  // Check if token is expired
  const now = Date.now() / 1000;
  if (decoded.exp < now) {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    return false;
  }
  
  return true;
};

// Check if user is admin
export const isAdmin = (): boolean => {
  if (!isAuthenticated()) return false;
  
  const userRole = localStorage.getItem('userRole');
  return userRole === 'ADMIN';
};

// Get current user info
export const getCurrentUser = (): UserInfo | null => {
  if (!isAuthenticated()) return null;
  
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  if (!token || !userRole) return null;
  
  const decoded = decodeToken(token);
  if (!decoded) return null;
  
  return {
    email: decoded.sub,
    fullName: decoded.fullName,
    role: userRole as "USER" | "ADMIN",
    exp: decoded.exp,
    iat: decoded.iat,
  };
};

// Clear authentication
export const clearAuth = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('redirectAfterLogin');
  }
};

// Redirect based on user role
export const redirectBasedOnRole = (router: any): void => {
  const user = getCurrentUser();
  
  if (!user) {
    router.push('/signin');
    return;
  }
  
  if (user.role === 'ADMIN') {
    router.push('/admin');
  } else {
    router.push('/');
  }
};