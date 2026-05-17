// API Configuration and Helper Functions
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Helper function for API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthorized - redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/signin";
      }
    }
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// ===== VENUES API =====
export const venuesApi = {
  // Get all venues with optional filters
  getAll: async (filters?: {
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    minCapacity?: number;
    amenities?: string[];
  }) => {
    const params = new URLSearchParams();
    if (filters?.location) params.append("location", filters.location);
    if (filters?.minPrice) params.append("minPrice", filters.minPrice.toString());
    if (filters?.maxPrice) params.append("maxPrice", filters.maxPrice.toString());
    if (filters?.minCapacity) params.append("minCapacity", filters.minCapacity.toString());
    if (filters?.amenities?.length) {
      filters.amenities.forEach(amenity => params.append("amenities", amenity));
    }
    
    const queryString = params.toString();
    return apiCall(`/api/venues${queryString ? `?${queryString}` : ""}`);
  },

  // Get featured venues (top-rated or promoted)
  getFeatured: async (limit: number = 4) => {
    return apiCall(`/api/venues/featured?limit=${limit}`);
  },

  // Get single venue by ID
  getById: async (id: string) => {
    return apiCall(`/api/venues/${id}`);
  },

  // Get available dates for a venue
  getAvailableDates: async (id: string) => {
    return apiCall(`/api/venues/${id}/available-dates`);
  },

  // Get all locations (for filters)
  getLocations: async () => {
    try {
      return await apiCall("/api/venues/locations");
    } catch (error) {
      // Return hardcoded locations if API fails
      console.warn("Locations API not implemented, using fallback data");
      return ["Lagos", "Kaduna", "Abuja", "Port Harcourt", "Ibadan", "Benin City", "Kano", "Jos", "Enugu", "Calabar"];
    }
  },

  // Get all amenities (for filters)
  getAmenities: async () => {
    try {
      return await apiCall("/api/venues/amenities");
    } catch (error) {
      // Return hardcoded amenities if API fails
      console.warn("Amenities API not implemented, using fallback data");
      return ["Wi-Fi", "Parking", "Projector", "Catering", "Sound System", "Air Conditioning", "Stage", "Dance Floor", "Bar Service", "Security"];
    }
  },

  // Admin: Create venue
  create: async (venueData: any) => {
    return apiCall("/api/venues", {
      method: "POST",
      body: JSON.stringify(venueData),
    });
  },

  // Admin: Update venue
  update: async (id: string, venueData: any) => {
    return apiCall(`/api/venues/${id}`, {
      method: "PUT",
      body: JSON.stringify(venueData),
    });
  },

  // Admin: Delete venue
  delete: async (id: string) => {
    return apiCall(`/api/venues/${id}`, {
      method: "DELETE",
    });
  },
};

// ===== BOOKINGS API =====
export const bookingsApi = {
  // Get user's bookings - fetch all bookings and categorize them on frontend
  getUserBookings: async (status?: "upcoming" | "past" | "cancelled") => {
    // For now, we'll fetch all user bookings and filter on frontend
    // since the backend might not support status filtering yet
    return apiCall(`/api/bookings/user`);
  },

  // Get single booking by ID
  getById: async (id: string) => {
    return apiCall(`/api/bookings/${id}`);
  },

  // Create new booking
  create: async (bookingData: {
    venue: string;
    date: string;
    time: string;
    guests: number;
    amount: number;
    paymentMethod?: string;
  }) => {
    return apiCall("/api/bookings", {
      method: "POST",
      body: JSON.stringify(bookingData),
    });
  },

  // Cancel booking
  cancel: async (id: string, reason?: string) => {
    return apiCall(`/api/bookings/${id}/cancel`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    });
  },

  // Admin: Get all bookings
  getAll: async (filters?: {
    status?: string;
    venue?: string;
    dateFrom?: string;
    dateTo?: string;
  }) => {
    try {
      const params = new URLSearchParams();
      if (filters?.status) params.append("status", filters.status);
      if (filters?.venue) params.append("venue", filters.venue);
      if (filters?.dateFrom) params.append("dateFrom", filters.dateFrom);
      if (filters?.dateTo) params.append("dateTo", filters.dateTo);
      
      const queryString = params.toString();
      return await apiCall(`/api/bookings${queryString ? `?${queryString}` : ""}`);
    } catch (error) {
      console.warn("Admin bookings API not available, using user bookings endpoint");
      // Fallback to user bookings endpoint for now
      return await apiCall(`/api/bookings/user`);
    }
  },

  // Admin: Update booking status
  updateStatus: async (id: number, status: string) => {
    try {
      return await apiCall(`/api/bookings/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });
    } catch (error) {
      console.warn("Admin booking status update API not available");
      throw error;
    }
  },
};

// ===== USERS API =====
export const usersApi = {
  // Get current user profile
  getProfile: async () => {
    return apiCall("/api/users/profile");
  },

  // Update user profile
  updateProfile: async (userData: any) => {
    return apiCall("/api/users/profile", {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  },

  // Admin: Get all users
  getAll: async (filters?: {
    status?: string;
    search?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append("status", filters.status);
    if (filters?.search) params.append("search", filters.search);
    
    const queryString = params.toString();
    return apiCall(`/api/users${queryString ? `?${queryString}` : ""}`);
  },

  // Admin: Update user status
  updateStatus: async (id: string, status: string) => {
    return apiCall(`/api/users/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  },
};

// ===== DASHBOARD/STATS API =====
export const dashboardApi = {
  // Get admin dashboard stats
  getStats: async () => {
    return apiCall("/api/dashboard/stats");
  },

  // Get recent bookings for dashboard
  getRecentBookings: async (limit: number = 5) => {
    return apiCall(`/api/dashboard/recent-bookings?limit=${limit}`);
  },

  // Get revenue analytics
  getRevenue: async (period: "week" | "month" | "year" = "month") => {
    return apiCall(`/api/dashboard/revenue?period=${period}`);
  },
};

// ===== SUPPORT API =====
export const supportApi = {
  // Submit support ticket
  submitTicket: async (ticketData: {
    bookingId?: string;
    subject: string;
    message: string;
    priority: "low" | "medium" | "high";
  }) => {
    return apiCall("/api/support/tickets", {
      method: "POST",
      body: JSON.stringify(ticketData),
    });
  },

  // Get user's support tickets
  getUserTickets: async () => {
    return apiCall("/api/support/tickets/user");
  },
};

// ===== AUTH API =====
export const authApi = {
  // Login
  login: async (email: string, password: string) => {
    return apiCall("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  // Register
  register: async (userData: {
    fullname: string;
    email: string;
    password: string;
  }) => {
    return apiCall("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  // Logout
  logout: async () => {
    return apiCall("/api/auth/logout", {
      method: "POST",
    });
  },

  // Refresh token
  refreshToken: async () => {
    return apiCall("/api/auth/refresh", {
      method: "POST",
    });
  },
};

export default {
  venues: venuesApi,
  bookings: bookingsApi,
  users: usersApi,
  dashboard: dashboardApi,
  support: supportApi,
  auth: authApi,
};