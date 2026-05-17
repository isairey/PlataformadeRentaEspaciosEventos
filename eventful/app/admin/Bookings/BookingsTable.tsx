"use client";

import React, { useState, useEffect } from "react";
import { Booking } from "@/lib/types";
import { motion } from "motion/react";
import { Check, X, Eye, Calendar, DollarSign, Users, Clock, RefreshCw } from "lucide-react";
import { bookingsApi } from "@/lib/api";

interface Props {
  bookings: Booking[];
  getStatusColor: (status: string) => string;
  onBookingsUpdate?: () => void;
}

const BookingsTable: React.FC<Props> = ({ bookings, getStatusColor, onBookingsUpdate }) => {
  const [bookingList, setBookingList] = useState<Booking[]>(bookings);
  const [loadingActions, setLoadingActions] = useState<{ [key: number]: boolean }>({});

  // Update local state when props change
  useEffect(() => {
    setBookingList(bookings);
  }, [bookings]);

  const handleAccept = async (bookingId: number) => {
    setLoadingActions(prev => ({ ...prev, [bookingId]: true }));
    
    try {
      await bookingsApi.updateStatus(bookingId, 'confirmed');
      
      // Update local state
      setBookingList(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'confirmed' }
            : booking
        )
      );
      
      // Notify parent component to refresh data
      if (onBookingsUpdate) {
        onBookingsUpdate();
      }
      
      // Show success feedback
      alert('Booking confirmed successfully!');
    } catch (error) {
      console.error('Failed to confirm booking:', error);
      alert('Failed to confirm booking. Please try again.');
    } finally {
      setLoadingActions(prev => ({ ...prev, [bookingId]: false }));
    }
  };

  const handleReject = async (bookingId: number) => {
    setLoadingActions(prev => ({ ...prev, [bookingId]: true }));
    
    try {
      await bookingsApi.updateStatus(bookingId, 'cancelled');
      
      // Update local state
      setBookingList(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'cancelled' }
            : booking
        )
      );
      
      // Notify parent component to refresh data
      if (onBookingsUpdate) {
        onBookingsUpdate();
      }
      
      // Show success feedback
      alert('Booking cancelled successfully!');
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      alert('Failed to cancel booking. Please try again.');
    } finally {
      setLoadingActions(prev => ({ ...prev, [bookingId]: false }));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-gray-900">Bookings</h2>
        <p className="text-gray-600">Manage venue bookings and reservations</p>
      </motion.div>

      {/* Desktop Table */}
      <motion.div 
        className="hidden lg:block bg-white rounded-lg shadow overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookingList.map((booking, index) => (
                <motion.tr 
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.venue}</div>
                      <div className="text-sm text-gray-500">ID: {booking.bookingId}</div>
                      <div className="text-sm font-medium text-green-600">{formatCurrency(booking.amount)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.user}</div>
                      <div className="text-sm text-gray-500">{booking.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(booking.date)}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        {booking.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users size={14} className="mr-1" />
                        {booking.guests} guests
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {booking.status === 'pending' && (
                        <>
                          <motion.button
                            onClick={() => handleAccept(booking.id)}
                            className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Check size={14} className="mr-1" />
                            Accept
                          </motion.button>
                          <motion.button
                            onClick={() => handleReject(booking.id)}
                            className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <X size={14} className="mr-1" />
                            Reject
                          </motion.button>
                        </>
                      )}
                      <motion.button
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye size={14} className="mr-1" />
                        View
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {bookingList.map((booking, index) => (
          <motion.div
            key={booking.id}
            className="bg-white rounded-lg shadow p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{booking.venue}</h3>
                <p className="text-sm text-gray-500">ID: {booking.bookingId}</p>
              </div>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                  booking.status
                )}`}
              >
                {booking.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-900">{booking.user}</p>
                <p className="text-sm text-gray-500">{booking.userEmail}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">{formatCurrency(booking.amount)}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {formatDate(booking.date)} at {booking.time}
              </div>
              <div className="flex items-center">
                <Users size={14} className="mr-1" />
                {booking.guests} guests
              </div>
            </div>

            <div className="flex space-x-2">
              {booking.status === 'pending' && (
                <>
                  <motion.button
                    onClick={() => handleAccept(booking.id)}
                    className="flex-1 bg-green-100 text-green-700 py-2 px-4 rounded-lg hover:bg-green-200 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Check size={16} className="inline mr-1" />
                    Accept
                  </motion.button>
                  <motion.button
                    onClick={() => handleReject(booking.id)}
                    className="flex-1 bg-red-100 text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <X size={16} className="inline mr-1" />
                    Reject
                  </motion.button>
                </>
              )}
              <motion.button
                className="bg-blue-100 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Eye size={16} className="inline mr-1" />
                View
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {bookingList.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-gray-400 mb-4">
            <Calendar size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
          <p className="text-gray-600">Bookings will appear here when customers make reservations</p>
        </motion.div>
      )}
    </div>
  );
};

export default BookingsTable;
