"use client";

import * as React from "react";
import { X, MapPin, Calendar, Clock, Users, DollarSign, Mail, CheckCircle } from "lucide-react";
import type { Booking } from "./booking-types";
import { getStatusColor } from "./booking-types";

interface BookingDetailsModalProps {
  open: boolean;
  booking: Booking | null;
  onClose: () => void;
  onContact: (booking: Booking) => void;
  isUpcoming?: boolean;
}

export function BookingDetailsModal({ open, booking, onClose, onContact, isUpcoming = false }: BookingDetailsModalProps) {
  if (!open || !booking) return null;

  // For upcoming bookings, display "Confirmed" instead of "Pending"
  const displayStatus = isUpcoming && booking.status === "Pending" ? "Confirmed" : booking.status;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{booking.title}</h2>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(displayStatus)}`}>
                  {displayStatus}
                </span>
                {booking.bookingId && (
                  <span className="text-sm text-gray-500">ID: {booking.bookingId}</span>
                )}
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          {/* Image */}
          <div className="mb-6">
            <img src={booking.image} alt={booking.venue} className="w-full h-48 object-cover rounded-lg" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <Item icon={<MapPin className="text-gray-400" size={18} />} label="Venue">
                {booking.venue}
              </Item>
              <Item icon={<Calendar className="text-gray-400" size={18} />} label="Date & Time">
                {booking.date}<br />{booking.time}
              </Item>
              <Item icon={<Clock className="text-gray-400" size={18} />} label="Duration">
                {booking.duration}
              </Item>
            </div>
            <div className="space-y-4">
              <Item icon={<Users className="text-gray-400" size={18} />} label="Expected Guests">
                {booking.guests} people
              </Item>
              <Item icon={<DollarSign className="text-gray-400" size={18} />} label="Total Amount">
                {booking.amount}
              </Item>
              <Item icon={<Mail className="text-gray-400" size={18} />} label="Contact Person">
                {booking.contactPerson}<br />{booking.email}<br />{booking.phone}
              </Item>
            </div>
          </div>

          {/* Amenities */}
          {booking.amenities?.length ? (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Included Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {booking.amenities.map((a, i) => (
                  <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    <CheckCircle size={14} className="mr-1" />
                    {a}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {/* Special Requests */}
          {booking.specialRequests ? (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Special Requests</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">{booking.specialRequests}</p>
              </div>
            </div>
          ) : null}

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={() => onContact(booking)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ItemProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}
function Item({ icon, label, children }: ItemProps) {
  return (
    <div className="flex items-start gap-3">
      {icon}
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600 leading-snug">{children}</p>
      </div>
    </div>
  );
}
