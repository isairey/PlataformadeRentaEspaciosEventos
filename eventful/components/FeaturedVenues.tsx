"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { venuesApi } from "@/lib/api";
import Link from "next/link";

interface Venue {
  id: number;
  name: string;
  location: string;
  price: number;
  image: string[];
}

const FeaturedVenues = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedVenues = async () => {
      try {
        setLoading(true);
        // Get first 4 venues from the main venues endpoint
        const data = await venuesApi.getAll();
        const featuredVenues = Array.isArray(data) ? data.slice(0, 4) : [];
        setVenues(featuredVenues);
      } catch (err) {
        console.error("Failed to fetch featured venues:", err);
        setError("Failed to load featured venues");
        // Fallback to static data if API fails
        setVenues([
          {
            id: 1,
            name: "Grand Palace Hall",
            location: "Ikeja, Lagos",
            price: 500000,
            image: ["/images/Background.jpeg"],
          },
          {
            id: 2,
            name: "Emerald Event Center",
            location: "Victoria Island, Lagos",
            price: 750000,
            image: ["/images/Background.jpeg"],
          },
          {
            id: 3,
            name: "Rosewood Banquet",
            location: "Abuja",
            price: 600000,
            image: ["/images/Background.jpeg"],
          },
          {
            id: 4,
            name: "Gold Crest Pavilion",
            location: "Port Harcourt",
            price: 400000,
            image: ["/images/Background.jpeg"],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedVenues();
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return (
      <motion.section 
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.h2 
          className="text-3xl font-display font-bold text-primary mb-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Featured Venues
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
              <div className="h-40 bg-gray-300"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded mb-2 w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded mb-4 w-1/2"></div>
                <div className="h-8 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      className="mb-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2 
        className="text-3xl font-display font-bold text-primary mb-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Featured Venues
      </motion.h2>
      
      {error && (
        <motion.div 
          className="text-center text-red-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.div>
      )}
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {venues.map((venue, index) => (
          <motion.div
            key={venue.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-400"
            variants={cardVariants}
            whileHover={{ 
              y: -8, 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="relative h-40 w-full overflow-hidden"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={venue.image[0] || "/images/Background.jpeg"}
                alt={venue.name}
                fill
                className="object-cover"
              />
            </motion.div>
            
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <motion.h3 
                  className="text-xl font-bold text-black mb-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  {venue.name}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 text-sm mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {venue.location}
                </motion.p>
                <motion.p 
                  className="text-primary font-semibold mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  ₦{venue.price.toLocaleString()}/night
                </motion.p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Link href={`/venues/${venue.id}`}>
                  <Button className="mt-auto px-4 py-2 rounded-xl bg-black text-white font-semibold hover:bg-accent hover:text-primary transition-colors w-full">
                    Book Now
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default FeaturedVenues;
