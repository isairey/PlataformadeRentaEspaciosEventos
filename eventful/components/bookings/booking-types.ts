"use client";

// Backend user structure
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  totalBookings: number;
  totalSpent: number | null;
  joinDate: string | null;
  role: string;
  createdAt: string | null;
  status: string;
}

// Backend venue structure
export interface Venue {
  id: number;
  name: string;
  description: string;
  location: string;
  price: number;
  capacity: number;
  amenities: string[];
  status: string;
  image: string[];
  availableDates: string[];
  createdAt: string;
}

// Backend booking structure
export interface BackendBooking {
  id: number;
  user: User;
  venue: Venue;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
  price: number | null;
  guest: number;
  bookingId: string;
}

// Frontend booking structure (for compatibility with existing components)
export interface Booking {
  id: number;
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
  title: string;
  venue: string;
  date: string;          
  amount: string;        
  image: string;
  type: string;
  time?: string;
  duration?: string;
  guests?: number;
  bookingId?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  specialRequests?: string;
  amenities?: string[];
}

export interface BookingsData {
  upcoming: Booking[];
  past: Booking[];
  cancelled: Booking[];
}

export type TabId = keyof BookingsData; // 'upcoming' | 'past' | 'cancelled'

// Helper function to transform backend booking to frontend booking
export function transformBackendBooking(backendBooking: BackendBooking): Booking {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const capitalizeStatus = (status: string): "Pending" | "Confirmed" | "Cancelled" | "Completed" => {
    switch (status.toLowerCase()) {
      case "pending":
        return "Pending";
      case "confirmed":
        return "Confirmed";
      case "cancelled":
        return "Cancelled";
      default:
        return "Pending";
    }
  };

  return {
    id: backendBooking.id,
    status: capitalizeStatus(backendBooking.status),
    title: `Event at ${backendBooking.venue.name}`,
    venue: backendBooking.venue.name,
    date: formatDate(backendBooking.date),
    time: backendBooking.time,
    amount: `₦${backendBooking.venue.price.toLocaleString()}`,
    image: backendBooking.venue.image[0] || "/images/Background.jpeg",
    type: "Event",
    guests: backendBooking.guest,
    bookingId: backendBooking.bookingId,
    contactPerson: backendBooking.user.name,
    phone: "+234 XXX XXX XXXX", // Placeholder since not in backend
    email: backendBooking.user.email,
    specialRequests: "", // Placeholder since not in backend
    amenities: backendBooking.venue.amenities,
  };
}

export function getStatusColor(status: Booking["status"]): string {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    case "completed":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}