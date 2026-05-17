"use client";

import React from "react";
import { Venue } from "@/lib/types";
import { motion } from "motion/react";
import {
  X,
  MapPin,
  Users,
  DollarSign, //To Fix
  Wifi,
  Car,
  Camera,
  Star,
} from "lucide-react";

interface Props {
  venue: Venue;
  isOpen: boolean;
  onClose: () => void;
  getStatusColor: (status: string) => string;
}

const VenueView: React.FC<Props> = ({
  venue,
  isOpen,
  onClose,
  getStatusColor,
}) => {
  if (!isOpen) return null;

  const amenityIcons: { [key: string]: React.ReactNode } = {
    WiFi: <Wifi size={16} />,
    Parking: <Car size={16} />,
    "AV Equipment": <Camera size={16} />,
    Stage: <Star size={16} />,
    "Ocean View": <Camera size={16} />,
    "Outdoor Space": <Star size={16} />,
    "Catering Kitchen": <Star size={16} />,
  };

  return (
    <motion.div
      className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{venue.name}</h2>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin size={16} className="mr-1" />
              <span>{venue.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                venue.status
              )}`}
            >
              {venue.status}
            </span>
            <motion.button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative h-64 rounded-lg overflow-hidden">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600">{venue.description}</p>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center text-blue-600 mb-1">
                    <DollarSign size={20} className="mr-2" />
                    <span className="font-medium">Price</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-700">
                    ${venue.price}
                  </p>
                  <p className="text-sm text-blue-600">per Day</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center text-green-600 mb-1">
                    <Users size={20} className="mr-2" />
                    <span className="font-medium">Capacity</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700">
                    {venue.capacity}
                  </p>
                  <p className="text-sm text-green-600">guests</p>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Amenities
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {venue.amenities.map((amenity, index) => (
                    <motion.div
                      key={amenity}
                      className="flex items-center p-3 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div className="text-gray-600 mr-2">
                        {amenityIcons[amenity] || <Star size={16} />}
                      </div>
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            className="flex gap-4 mt-8 pt-6 border-t border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Edit Venue
            </motion.button>
            <motion.button
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Bookings
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VenueView;
