"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import type {
  Booking,
  BookingsData,
  TabId,
  BackendBooking,
} from "@/components/bookings/booking-types";
import { BookingCard } from "@/components/bookings/booking-card";
import { BookingDetailsModal } from "@/components/bookings/booking-details-modal";
import { BookingSupportModal } from "@/components/bookings/booking-support-modal";
import { bookingsApi } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function MyBookingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<TabId>("upcoming");
  const [selectedBooking, setSelectedBooking] = React.useState<Booking | null>(null);
  const [showDetails, setShowDetails] = React.useState(false);
  const [showSupport, setShowSupport] = React.useState(false);
  const [bookingsData, setBookingsData] = React.useState<BookingsData>({
    upcoming: [],
    past: [],
    cancelled: [],
  });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);

  type SupportFormState = {
    subject: string;
    message: string;
    priority: "low" | "medium" | "high";
  };

  const [supportForm, setSupportForm] = React.useState<SupportFormState>({
    subject: "",
    message: "",
    priority: "medium",
  });

  // Helper function to transform backend booking to frontend booking
  const transformBackendBooking = (backendBooking: BackendBooking): Booking => {
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
  };

  // Helper function to categorize bookings
  const categorizeBookings = (backendBookings: BackendBooking[]): BookingsData => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const upcoming: Booking[] = [];
    const past: Booking[] = [];
    const cancelled: Booking[] = [];

    backendBookings.forEach((backendBooking) => {
      const transformedBooking = transformBackendBooking(backendBooking);
      const bookingDate = new Date(backendBooking.date);

      if (backendBooking.status === "cancelled") {
        cancelled.push(transformedBooking);
      } else if (bookingDate >= today) {
        // Both pending and confirmed bookings that are today or in the future go to upcoming
        upcoming.push(transformedBooking);
      } else {
        // Past bookings (completed or confirmed bookings that have passed)
        past.push({
          ...transformedBooking,
          status: "Completed", // Mark past bookings as completed
        });
      }
    });

    return { upcoming, past, cancelled };
  };

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

  // Fetch bookings data
  useEffect(() => {
    // Only fetch bookings if authenticated
    if (!isAuthenticated) return;

    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all user bookings from backend
        const backendBookings: BackendBooking[] = await bookingsApi.getUserBookings();
        console.log("Fetched backend bookings:", backendBookings);
        
        // Categorize bookings based on date and status
        const categorizedBookings = categorizeBookings(backendBookings);
        console.log("Categorized bookings:", categorizedBookings);
        setBookingsData(categorizedBookings);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        setError("Failed to load bookings. Please try again later.");
        // Keep empty data on error
        setBookingsData({
          upcoming: [],
          past: [],
          cancelled: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isAuthenticated]);

  const tabs: { id: TabId; label: string; count: number }[] = [
    { id: "upcoming", label: "Upcoming", count: bookingsData.upcoming.length },
    { id: "past", label: "Past", count: bookingsData.past.length },
    { id: "cancelled", label: "Cancelled", count: bookingsData.cancelled.length },
  ];

  const handleViewDetails = (b: Booking) => {
    setSelectedBooking(b);
    setShowDetails(true);
  };

  const handleContactSupport = (b: Booking) => {
    setSelectedBooking(b);
    setShowSupport(true);
  };

  const handleSupportSubmit = () => {
    console.log("Support request:", {
      booking: selectedBooking,
      form: supportForm,
    });
    setShowSupport(false);
    setSupportForm({ subject: "", message: "", priority: "medium" });
  };

  // Show loading spinner while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render the bookings if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your event center reservations</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <span className="ml-3 text-gray-600">Loading bookings...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* List */}
        {!loading && !error && (
          <div className="space-y-6">
            {bookingsData[activeTab].length === 0 ? (
              <EmptyState activeTab={activeTab} />
            ) : (
              bookingsData[activeTab].map((b) => (
                <BookingCard
                  key={b.id}
                  booking={b}
                  onView={handleViewDetails}
                  onContact={handleContactSupport}
                  isUpcoming={activeTab === "upcoming"}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* Details Modal */}
      <BookingDetailsModal
        open={showDetails}
        booking={selectedBooking}
        onClose={() => setShowDetails(false)}
        onContact={(b) => {
          setShowDetails(false);
          handleContactSupport(b);
        }}
        isUpcoming={activeTab === "upcoming"}
      />

      {/* Support Modal */}
      <BookingSupportModal
        open={showSupport}
        booking={selectedBooking}
        form={supportForm}
        onChange={setSupportForm}
        onSubmit={handleSupportSubmit}
        onClose={() => setShowSupport(false)}
      />
    </div>
  );
}

function EmptyState({ activeTab }: { activeTab: TabId }) {
  const getEmptyMessage = () => {
    switch (activeTab) {
      case "upcoming":
        return "You don't have any upcoming bookings. Book a venue to get started!";
      case "past":
        return "You don't have any past bookings yet.";
      case "cancelled":
        return "You don't have any cancelled bookings.";
      default:
        return "No bookings found.";
    }
  };

  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <CalendarIcon size={48} className="mx-auto" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No {activeTab} bookings
      </h3>
      <p className="text-gray-500 mb-4">
        {getEmptyMessage()}
      </p>
      {activeTab === "upcoming" && (
        <a
          href="/venues"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Browse Venues
        </a>
      )}
    </div>
  );
}