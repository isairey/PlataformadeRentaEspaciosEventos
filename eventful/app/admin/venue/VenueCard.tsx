"use client";

import React from "react";
import { Venue } from "@/lib/types";
import { Eye, Edit, MapPin } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  venue: Venue;
  getStatusColor: (status: string) => string;
  onView: (venue: Venue) => void;
  onEdit: (venue: Venue) => void;
}

const VenueCard: React.FC<Props> = ({ venue, getStatusColor, onView, onEdit }) => (
  <motion.div 
    className="bg-white rounded-lg shadow overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
    transition={{ duration: 0.3 }}
  >
    <motion.div
      className="relative overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={venue.image[0]}
        alt={venue.name}
        className="w-full h-48 object-cover"
      />
    </motion.div>
    
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{venue.name}</h3>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
            venue.status
          )}`}
        >
          {venue.status}
        </span>
      </div>
      
      <div className="flex items-center text-gray-600 mb-2">
        <MapPin size={16} className="mr-1" />
        <span className="text-sm">{venue.location}</span>
      </div>
      
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{venue.description}</p>
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-bold text-gray-900">${venue.price}</span>
        <span className="text-sm text-gray-600">
          Capacity: {venue.capacity}
        </span>
      </div>
      
      <div className="flex space-x-2">
        <motion.button 
          onClick={() => onView(venue)}
          className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded text-sm hover:bg-blue-200 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Eye size={16} className="inline mr-1" />
          View
        </motion.button>
        <motion.button 
          onClick={() => onEdit(venue)}
          className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-200 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Edit size={16} className="inline mr-1" />
          Edit
        </motion.button>
      </div>
    </div>
  </motion.div>
);

export default VenueCard;
