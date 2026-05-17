"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/app/admin/Sidebar";
import StatsCards from "@/app/admin/Dashboard/StatsCards";
import RecentBookings from "@/app/admin/Dashboard/RecentBookings";
import VenueGrid from "@/app/admin/venue/VenueGrid";
import BookingsTable from "@/app/admin/Bookings/BookingsTable";
import UsersTable from "@/app/admin/Users/UsersTable";
import { Booking, Venue, User } from "@/lib/types";
import { motion, AnimatePresence } from "motion/react";
import { bookingsApi, usersApi, dashboardApi } from "@/lib/api";

const sampleBookings: Booking[] = [
  {
    id: 52,
    venue: "Grand Ballroom",
    user: "Sophia Clark",
    userEmail: "sophia@email.com",
    date: "2024-07-15",
    time: "18:00",
    status: "confirmed",
    amount: 2500,
    guests: 250,
    bookingId: "GB-2024-001",
  },
  {
    id: 42,
    venue: "Ocean View Terrace",
    user: "Ethan Bennett",
    userEmail: "ethan@email.com",
    date: "2024-07-20",
    time: "16:00",
    status: "pending",
    amount: 1800,
    guests: 120,
    bookingId: "OVT-2024-002",
  },
];

const sampleUsers: User[] = [
  {
    id: 1,
    name: "Jamiu Dehertz",
    email: "jamiu@mail.com",
    joinDate: "2025-08-12",
    totalBookings: 6,
    totalSpent: 150000,
    status: "active",
  },
  {
    id: 2,
    name: "Jamiu Admin",
    email: "admin@mail.com",
    joinDate: "2025-08-12",
    totalBookings: 0,
    totalSpent: 0,
    status: "active",
  },
  {
    id: 3,
    name: "Jamiu Admin",
    email: "JamiuAdmin@mail.com",
    joinDate: "2025-08-12",
    totalBookings: 0,
    totalSpent: 0,
    status: "active",
  },
];

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    // bookings
    case "confirmed":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    // venues
    case "active":
      return "bg-green-100 text-green-700";
    case "inactive":
      return "bg-gray-100 text-gray-700";
    case "maintenance":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const HomePage = () => {
  const [activePage, setActivePage] = useState("dashboard");

  // State for all data
  const [venues, setVenues] = useState<Venue[]>([]);
  const [venuesLoading, setVenuesLoading] = useState(true);
  const [venuesError, setVenuesError] = useState<string | null>(null);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState<string | null>(null);

  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState<string | null>(null);

  const [dashboardStats, setDashboardStats] = useState({
    totalBookings: 0,
    revenue: 0,
    activeVenues: 0,
    newUsers: 0,
  });


  useEffect(() => {
    let cancelled = false;

    async function fetchVenues() {
      try {
        setVenuesLoading(true);
        setVenuesError(null);

        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;

        const res = await fetch(`${API_BASE}/api/venues`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        // Normalize API → UI shape safely
        const normalized: Venue[] = (Array.isArray(data) ? data : []).map(
          (v: any) => ({
            id: Number(v.id),
            name: v.name ?? "",
            location: v.location ?? "—",
            image: v.image ?? "/images/Background.jpeg",
            description: v.description ?? "",
            price: Number(v.price ?? 0),
            capacity: Number(v.capacity ?? 0),
            status: v.status ?? "active",
            amenities: Array.isArray(v.amenities) ? v.amenities : [],
          })
        );

        if (!cancelled) setVenues(normalized);
      } catch (err: any) {
        if (!cancelled) setVenuesError(err?.message || "Failed to fetch venues");
      } finally {
        if (!cancelled) setVenuesLoading(false);
      }
    }

    fetchVenues();
    return () => {
      cancelled = true;
    };
  }, []);

  // Fetch bookings with admin API
  useEffect(() => {
    let cancelled = false;

    async function fetchBookings() {
      try {
        setBookingsLoading(true);
        setBookingsError(null);

        // Try admin bookings API first, fallback to user bookings
        const data = await bookingsApi.getAll();

        // Map backend → UI shape
        const normalized: Booking[] = (Array.isArray(data) ? data : []).map(
          (b: any) => ({
            id: Number(b.id),
            venue: b.venue?.name ?? "—",
            user: b.user?.name ?? "—",
            userEmail: b.user?.email ?? "",
            date: b.date ?? "",
            time: b.time ?? "",
            status: b.status ?? "pending",
            amount: Number(b.venue?.price ?? b.amount ?? 0),
            guests: Number(b.guest ?? b.guests ?? 0),
            bookingId: b.bookingId ?? "",
          })
        );

        if (!cancelled) setBookings(normalized);
      } catch (err: any) {
        if (!cancelled) setBookingsError(err?.message || "Failed to fetch bookings");
      } finally {
        if (!cancelled) setBookingsLoading(false);
      }
    }

    fetchBookings();
    return () => {
      cancelled = true;
    };
  }, []);

  // Fetch users
  useEffect(() => {
    let cancelled = false;

    async function fetchUsers() {
      try {
        setUsersLoading(true);
        setUsersError(null);

        const data = await usersApi.getAll();
        
        // Map backend → UI shape
        const normalized: User[] = (Array.isArray(data) ? data : []).map(
          (u: any) => ({
            id: Number(u.id),
            name: u.name ?? u.fullName ?? "—",
            email: u.email ?? "",
            joinDate: u.createdAt ?? u.joinDate ?? "",
            totalBookings: Number(u.totalBookings ?? 0),
            totalSpent: Number(u.totalSpent ?? 0),
            status: u.status ?? "active",
          })
        );

        if (!cancelled) setUsers(normalized);
      } catch (err: any) {
        console.warn("Users API not available, using sample data");
        if (!cancelled) {
          setUsers(sampleUsers);
          setUsersError(null); // Don't show error for fallback data
        }
      } finally {
        if (!cancelled) setUsersLoading(false);
      }
    }

    fetchUsers();
    return () => {
      cancelled = true;
    };
  }, []);

  // Calculate dashboard stats from real data
  useEffect(() => {
    if (!bookingsLoading && !venuesLoading) {
      const totalBookings = bookings.length;
      const revenue = bookings.reduce((sum, booking) => sum + booking.amount, 0);
      const activeVenues = venues.filter(v => v.status === 'active').length;
      const newUsers = users.length; // Could be filtered by recent join date

      setDashboardStats({
        totalBookings,
        revenue,
        activeVenues,
        newUsers,
      });
    }
  }, [bookings, venues, users, bookingsLoading, venuesLoading]);

  // Function to refresh bookings data
  const refreshBookings = async () => {
    try {
      const data = await bookingsApi.getAll();
      const normalized: Booking[] = (Array.isArray(data) ? data : []).map(
        (b: any) => ({
          id: Number(b.id),
          venue: b.venue?.name ?? "—",
          user: b.user?.name ?? "—",
          userEmail: b.user?.email ?? "",
          date: b.date ?? "",
          time: b.time ?? "",
          status: b.status ?? "pending",
          amount: Number(b.venue?.price ?? b.amount ?? 0),
          guests: Number(b.guest ?? b.guests ?? 0),
          bookingId: b.bookingId ?? "",
        })
      );
      setBookings(normalized);
    } catch (error) {
      console.error('Failed to refresh bookings:', error);
    }
  };

  // Format currency in Naira
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Get stats with fallback values in Naira
  const getStatsCards = () => {
    const fallbackStats = [
      { label: "Total Bookings", value: 156, change: "+12.5%", color: "green" },
      { label: "Revenue", value: formatNaira(2850000), change: "+8.3%", color: "green" },
      { label: "Active Venues", value: 24, change: "+4.2%", color: "green" },
      { label: "New Users", value: 67, change: "+15.7%", color: "green" },
    ];

    if (dashboardStats.totalBookings > 0) {
      return [
        { label: "Total Bookings", value: dashboardStats.totalBookings, change: "+12.5%", color: "green" },
        { label: "Revenue", value: formatNaira(dashboardStats.revenue), change: "+8.3%", color: "green" },
        { label: "Active Venues", value: dashboardStats.activeVenues, change: "+4.2%", color: "green" },
        { label: "New Users", value: dashboardStats.newUsers, change: "+15.7%", color: "green" },
      ];
    }

    return fallbackStats;
  };


  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 },
  };

  const pageTransition = { duration: 0.4 };

  const getPageTitle = (page: string) => {
    switch (page) {
      case "dashboard":
        return "Dashboard Overview";
      case "venues":
        return "Venue Management";
      case "bookings":
        return "Booking Management";
      case "users":
        return "User Management";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <motion.main
        className="ml-64 p-6 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Page Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.h1
            className="text-4xl font-bold text-gray-900 mb-2"
            key={activePage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {getPageTitle(activePage)}
          </motion.h1>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Welcome back! Here's what's happening with your events today.
          </motion.p>
        </motion.div>

        {/* Page Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            {activePage === "dashboard" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <StatsCards stats={getStatsCards()} />
                <RecentBookings bookings={bookings} getStatusColor={getStatusColor} />
              </motion.div>
            )}

            {activePage === "venues" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {venuesLoading && <div className="text-gray-600">Loading venues…</div>}
                {!venuesLoading && venuesError && (
                  <div className="text-red-600">Error: {venuesError}</div>
                )}
                {!venuesLoading && !venuesError && (
                  <VenueGrid venues={venues} getStatusColor={getStatusColor} />
                )}
              </motion.div>
            )}

            {activePage === "bookings" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <BookingsTable 
                  bookings={bookings} 
                  getStatusColor={getStatusColor} 
                  onBookingsUpdate={refreshBookings}
                />
              </motion.div>
            )}

            {activePage === "users" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <UsersTable users={sampleUsers} />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.main>
    </div>
  );
};

export default HomePage;
