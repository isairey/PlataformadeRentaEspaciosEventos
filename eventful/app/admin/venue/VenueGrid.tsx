"use client";

import React, { useState } from "react";
import VenueCard from "./VenueCard";
import VenueView from "./VenueView";
import VenueEdit from "./VenueEdit";
import { Venue } from "@/lib/types";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

interface Props {
  venues: Venue[];
  getStatusColor: (status: string) => string;
}

const VenueGrid: React.FC<Props> = ({ venues, getStatusColor }) => {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [venueList, setVenueList] = useState<Venue[]>(venues);

  const handleView = (venue: Venue) => {
    setSelectedVenue(venue);
    setIsViewOpen(true);
  };

  const handleEdit = (venue: Venue) => {
    setSelectedVenue(venue);
    setIsEditOpen(true);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setSelectedVenue(null);
    setIsEditOpen(true);
    setIsCreating(true);
  };

  // const handleSave = (venue: Venue) => {
  //   if (isCreating) {
  //     setVenueList(prev => [...prev, venue]);
  //   } else {
  //     setVenueList(prev => prev.map(v => v.id === venue.id ? venue : v));
  //   }
  // };

  const closeModals = () => {
    setIsViewOpen(false);
    setIsEditOpen(false);
    setSelectedVenue(null);
    setIsCreating(false);
  };
  
  const handleSave = async (venue: Venue) => {
    try {
      const method = isCreating ? "POST" : "PUT";
      const url = isCreating
        ? "http://localhost:8080/api/venues"
        : `http://localhost:8080/api/venues/${venue.id}`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(venue),
      });

      if (!res.ok) throw new Error("Failed to save venue");

      const savedVenue: Venue = await res.json();

      if (isCreating) {
        setVenueList((prev) => [...prev, savedVenue]);
      } else {
        setVenueList((prev) =>
          prev.map((v) => (v.id === savedVenue.id ? savedVenue : v))
        );
      }

      closeModals();
    } catch (err) {
      console.error(err);
      alert("Could not save venue. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <motion.div 
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Venues</h2>
          <p className="text-gray-600">Manage your event venues</p>
        </div>
        <motion.button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={20} />
          Create Venue
        </motion.button>
      </motion.div>

      {/* Venues Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {venueList.map((venue, index) => (
          <motion.div
            key={venue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <VenueCard 
              venue={venue} 
              getStatusColor={getStatusColor}
              onView={handleView}
              onEdit={handleEdit}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {venueList.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-gray-400 mb-4">
            <Plus size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No venues yet</h3>
          <p className="text-gray-600 mb-4">Get started by creating your first venue</p>
          <motion.button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Venue
          </motion.button>
        </motion.div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {isViewOpen && selectedVenue && (
          <VenueView
            venue={selectedVenue}
            isOpen={isViewOpen}
            onClose={closeModals}
            getStatusColor={getStatusColor}
          />
        )}
        
        {isEditOpen && (
          <VenueEdit
            venue={selectedVenue}
            isOpen={isEditOpen}
            onClose={closeModals}
            onSave={handleSave}
            isCreating={isCreating}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default VenueGrid;
