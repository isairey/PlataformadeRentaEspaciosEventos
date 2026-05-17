"use client";

import * as React from "react";
import { Calendar, MapPin, Phone, Eye } from "lucide-react";
import type { Booking } from "./booking-types";
import { getStatusColor } from "./booking-types";

interface BookingCardProps {
  booking: Booking;
  onView: (b: Booking) => void;
  onContact: (b: Booking) => void;
  isUpcoming?: boolean;
}

export function BookingCard({ booking, onView, onContact, isUpcoming = false }: BookingCardProps) {
  // For upcoming bookings, display "Confirmed" instead of "Pending"
  const displayStatus = isUpcoming && booking.status === "Pending" ? "Confirmed" : booking.status;
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {/* Image */}
          <div className="flex-shrink-0">
            <img src={booking.image} alt={booking.venue} className="w-full lg:w-48 h-32 object-cover rounded-lg" />
          </div>

          {/* Content */}
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(displayStatus)}`}>
                    {displayStatus}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{booking.type}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{booking.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">Venue: {booking.venue}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-1" />
                  <span className="text-sm">Date: {booking.date}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900 mb-4">Amount: {booking.amount}</div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => onView(booking)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Eye size={16} className="mr-1" />
                    View Details
                  </button>
                  <button
                    onClick={() => onContact(booking)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Phone size={16} className="mr-1" />
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
