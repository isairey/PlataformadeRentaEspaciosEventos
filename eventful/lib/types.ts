export interface Booking {
  id: number;
  venue: string;
  user: string;
  date: string;
  status: string;
  userEmail: string;
  time: string;
  amount: number;
  guests: number;
  bookingId: string;
}

export interface Venue {
  id: number;
  name: string;
  location: string;
  image: string[];
  description: string;
  price: number;
  capacity: number;
  status: string;
  amenities: string[];
  availableDates: string[]; // Array of available dates in ISO format
}

export interface User {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  totalBookings: number;
  totalSpent: number;
  status: string;
}
