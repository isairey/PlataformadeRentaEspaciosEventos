"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./calendar-styles.css";

interface Venue {
  id: number;
  name: string;
  location: string;
  image: string;
  price: number;
}

export default function BookVenuePage() {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [guests, setGuests] = useState("");
  const [payment, setPayment] = useState("Card");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const venueId = searchParams.get("venueId") || useParams().id;

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        // Store the current URL for redirect after login
        if (typeof window !== "undefined") {
          localStorage.setItem("redirectAfterLogin", window.location.pathname + window.location.search);
        }
        // Redirect to signin page if not authenticated
        router.push("/signin");
        return;
      }
      setIsAuthenticated(true);
    };

    checkAuth();
  }, [router]);

  // Fetch venue from backend
  useEffect(() => {
    if (!venueId) return;
    const fetchVenue = async () => {
      try {
        console.log("Fetching venue with ID:", venueId);
        const res = await fetch(`http://localhost:8080/api/venues/${venueId}`);
        if (!res.ok) throw new Error("Failed to fetch venue");
        const data = await res.json();
        setVenue(data);
      } catch (err) {
        console.error(err);
        alert("Failed to load venue details");
      }
    };
    fetchVenue();
  }, [venueId]);

  // Fetch available dates from backend
  useEffect(() => {
    if (!venueId) return;
    
    const fetchAvailableDates = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/venues/${venueId}/available-dates`);
        const dates = res.data.map((dateStr: string) => new Date(dateStr));
        setAvailableDates(dates);
      } catch (err) {
        console.error("Failed to fetch available dates:", err);
      }
    };
    
    fetchAvailableDates();
  }, [venueId]);

  // Helper function to check if a date is available
  const isDateAvailable = (date: Date) => {
    return availableDates.some(availableDate => 
      availableDate.toDateString() === date.toDateString()
    );
  };

  // Helper function to format date for API
  const formatDateForAPI = (date: Date) => {
    // Use local date to avoid timezone issues
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // YYYY-MM-DD format
  };

  const handleBooking = async () => {
    // Double-check authentication before booking
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      // Store the current URL for redirect after login
      if (typeof window !== "undefined") {
        localStorage.setItem("redirectAfterLogin", window.location.pathname + window.location.search);
      }
      alert("Please sign in to make a booking");
      router.push("/signin");
      return;
    }

    if (!selectedDate) {
      alert("Please select a date");
      return;
    }
    if (!guests || Number(guests) <= 0) {
      alert("Please enter number of guests");
      return;
    }
    if (!venue) {
      alert("Venue details not loaded");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          venue: venue.id,
          date: formatDateForAPI(selectedDate),
          time: "12:00", // static for now
          amount: venue.price,
          guests: Number(guests),
        }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          // Token might be expired or invalid
          localStorage.removeItem("token");
          alert("Your session has expired. Please sign in again.");
          router.push("/signin");
          return;
        }
        throw new Error("Failed to book");
      }

      router.push("/booking-success");
    } catch (err) {
      console.error(err);
      alert("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render the booking form if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Reserve your space</h1>

      {/* Venue Info */}
      {venue && (
        <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-xl">
          <div>
            <div className="text-sm text-gray-600 mb-1">Selected venue</div>
            <div className="font-bold text-gray-900">{venue.name}</div>
            <div className="text-xs text-gray-500">{venue.location}</div>
          </div>
          <div className="w-40 h-24 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={venue.image[0]}
              alt={venue.name}
              width={160}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Date Picker */}
      <div className="mb-8">
        <div className="font-semibold text-gray-900 mb-4">Select date</div>
        <div className="border-2 border-gray-300 rounded-xl p-6 bg-white shadow-sm">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            includeDates={availableDates}
            placeholderText="Choose an available date"
            dateFormat="MMMM d, yyyy"
            minDate={new Date()}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
            calendarClassName="custom-calendar"
            dayClassName={(date) => {
              const isAvailable = isDateAvailable(date);
              const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
              
              if (isSelected) {
                return "bg-green-600 text-white hover:bg-green-700 rounded-full font-bold";
              }
              if (isAvailable) {
                return "bg-green-100 text-green-800 hover:bg-green-200 rounded-full cursor-pointer font-medium";
              }
              return "text-gray-400 cursor-not-allowed";
            }}
            inline
          />
        </div>
        {availableDates.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">Loading available dates...</p>
        )}
        {availableDates.length > 0 && (
          <p className="text-sm text-gray-600 mt-2">
            {availableDates.length} date{availableDates.length !== 1 ? 's' : ''} available
          </p>
        )}
      </div>

      {/* Guests */}
      <div className="mb-8">
        <label className="block font-semibold text-gray-900 mb-2">
          Number of guests
        </label>
        <input
          type="number"
          placeholder="Enter number of guests"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          min="1"
        />
      </div>

      {/* Total Price */}
      {venue && (
        <div className="mb-8 p-4 bg-green-50 rounded-xl border border-green-200">
          <div className="font-semibold text-gray-900 mb-1">Total price</div>
          <div className="text-2xl font-bold text-green-600">
            ₦{venue.price.toLocaleString()}
          </div>
        </div>
      )}

      {/* Payment Method */}
      <div className="mb-8">
        <div className="font-semibold text-gray-900 mb-3">Payment method</div>
        <div className="flex flex-col gap-3">
          {["Card", "Bank"].map((method) => (
            <label
              key={method}
              className="flex items-center gap-3 border-2 border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-green-300 transition-colors"
            >
              <input
                type="radio"
                name="payment"
                value={method}
                checked={payment === method}
                onChange={() => setPayment(method)}
                className="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-900 font-medium">{method}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      <Button
        onClick={handleBooking}
        disabled={loading || !selectedDate}
        className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 font-bold text-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {loading ? "Processing..." : "Confirm booking"}
      </Button>
    </div>
  );
}