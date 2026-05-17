"use client";

import React, { useState } from "react";
import Sidebar from "@/app/admin/Sidebar";
import StatsCards from "@/app/admin/Dashboard/StatsCards";
import RecentBookings from "@/app/admin/Dashboard/RecentBookings";
import VenueGrid from "@/app/admin/venue/VenueGrid";
import BookingsTable from "@/app/admin/Bookings/BookingsTable";
import UsersTable from "@/app/admin/Users/UsersTable";
import { Booking, Venue, User } from "@/lib/types";
import { motion, AnimatePresence } from "motion/react";

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

const sampleVenues: Venue[] = [
  {
    id: 1,
    name: "Grand Ballroom",
    location: "Downtown Plaza",
    capacity: 300,
    price: 2500,
    amenities: ["WiFi", "AV Equipment", "Stage", "Parking"],
    image: "/images/Background.jpeg",
    status: "active",
    description: "Elegant ballroom perfect for weddings and corporate events",
  },
  {
    id: 2,
    name: "Ocean View Terrace",
    location: "Waterfront District",
    capacity: 150,
    price: 1800,
    amenities: ["Ocean View", "Outdoor Space", "Catering Kitchen"],
    image: "/images/Background.jpeg",
    status: "active",
    description: "Beautiful terrace with stunning ocean views",
  },
];

const sampleUsers: User[] = [
  {
    id: 1,
    name: "Sophia Clark",
    email: "sophia@email.com",
    joinDate: "2024-01-15",
    totalBookings: 3,
    totalSpent: 7500,
    status: "active",
  },
  {
    id: 2,
    name: "Ethan Bennett",
    email: "ethan@email.com",
    joinDate: "2024-02-20",
    totalBookings: 1,
    totalSpent: 1800,
    status: "active",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Confirmed":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const HomePage = () => {

  let cancelled = false;
  const [activePage, setActivePage] = useState("dashboard");

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 }
  };

  const pageTransition = {
    duration: 0.4
  };

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
                <StatsCards
                  stats={[
                    {
                      label: "Total Bookings",
                      value: 128,
                      change: "+5.2%",
                      color: "green",
                    },
                    {
                      label: "Revenue",
                      value: "$12,500",
                      change: "+3.8%",
                      color: "green",
                    },
                    {
                      label: "Active Venues",
                      value: 18,
                      change: "+1.1%",
                      color: "green",
                    },
                    {
                      label: "New Users",
                      value: 42,
                      change: "+4.5%",
                      color: "green",
                    },
                  ]}
                />
                <RecentBookings
                  bookings={sampleBookings}
                  getStatusColor={getStatusColor}
                />
              </motion.div>
            )}

            {activePage === "venues" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <VenueGrid venues={sampleVenues} getStatusColor={getStatusColor} />
              </motion.div>
            )}

            {activePage === "bookings" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <BookingsTable
                  bookings={sampleBookings}
                  getStatusColor={getStatusColor}
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


