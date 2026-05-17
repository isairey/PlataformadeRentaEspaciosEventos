// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// const allVenues = [
//   {
//     id: 1,
//     name: "The Grand Ballroom",
//     location: "Downtown, Metropolis",
//     price: 800,
//     capacity: 300,
//     amenities: ["Parking", "WiFi"],
//   },
//   {
//     id: 2,
//     name: "The Lakeside Pavilion",
//     location: "Lakeside, Suburbia",
//     price: 400,
//     capacity: 120,
//     amenities: ["WiFi"],
//   },
//   {
//     id: 3,
//     name: "The Urban Loft",
//     location: "City Center, Metropolis",
//     price: 600,
//     capacity: 200,
//     amenities: ["Parking"],
//   },
//   {
//     id: 4,
//     name: "The Rustic Barn",
//     location: "Countryside, Rural",
//     price: 300,
//     capacity: 100,
//     amenities: ["Parking", "WiFi"],
//   },
//   {
//     id: 5,
//     name: "The Skyview Terrace",
//     location: "Rooftop, Metropolis",
//     price: 1000,
//     capacity: 400,
//     amenities: ["WiFi"],
//   },
//   {
//     id: 6,
//     name: "The Garden Oasis",
//     location: "Botanical Gardens, Suburbia",
//     price: 200,
//     capacity: 80,
//     amenities: ["Parking"],
//   },
// ];

// const locations = [
//   "Downtown, Metropolis",
//   "Lakeside, Suburbia",
//   "City Center, Metropolis",
//   "Countryside, Rural",
//   "Rooftop, Metropolis",
//   "Botanical Gardens, Suburbia",
// ];

// const amenities = ["Parking", "WiFi"];

// export default function VenuesPage() {
//   const [price, setPrice] = useState([100, 1000]);
//   const [capacity, setCapacity] = useState(50);
//   const [location, setLocation] = useState("");
//   const [amenity, setAmenity] = useState("");

//   const filteredVenues = allVenues.filter((venue) => {
//     return (
//       venue.price >= price[0] &&
//       venue.price <= price[1] &&
//       venue.capacity >= capacity &&
//       (location === "" || venue.location === location) &&
//       (amenity === "" || venue.amenities.includes(amenity))
//     );
//   });

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { venuesApi } from "@/lib/api";


// Venue type definition
type Venue = {
  id: number;
  name: string;
  location: string;
  price: number;
  capacity: number;
  amenities: string[];
  image:string[];
};

export default function VenuesPage() {

  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState([20000, 500000]);
  const [capacity, setCapacity] = useState(50);
  const [location, setLocation] = useState("");
  const [amenity, setAmenity] = useState("");

  const [locations, setLocations] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);

  // Fetch venues, locations, and amenities
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch venues
        const venuesData = await venuesApi.getAll();
        setVenues(Array.isArray(venuesData) ? venuesData : []);
        
        // Fetch locations (with built-in fallback)
        const locationsData = await venuesApi.getLocations();
        setLocations(Array.isArray(locationsData) ? locationsData : []);
        
        // Fetch amenities (with built-in fallback)
        const amenitiesData = await venuesApi.getAmenities();
        setAmenities(Array.isArray(amenitiesData) ? amenitiesData : []);
        
      } catch (err) {
        console.error("Error fetching data:", err);
        setVenues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const filteredVenues = venues.filter((venue) => {
    return (
      venue.price >= price[0] &&
      venue.price <= price[1] &&
      venue.capacity >= capacity &&
      (location === "" || venue.location === location) &&
      (amenity === "" || venue.amenities.includes(amenity))
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading venues...</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-8 py-10 px-4">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 bg-white rounded-xl shadow-lg p-6 mb-6 md:mb-0">
          <h3 className="text-lg font-bold text-black mb-4">Filters</h3>
          <div className="mb-6">
            <label className="block text-sm font-medium text-black mb-2">
              Price Range
            </label>
            <div className=" gap-2">
              <input
                type="range"
                min={20000}
                max={500000}
                step={5000}
                value={price[0]}
                onChange={(e) => setPrice([+e.target.value, price[1]])}
                className="w-full border border-accent-primar rounded-2xl py-1 px-1"
              />
              <span className="text-sm text-gray-500 pl-44">₦{price[0].toLocaleString()}</span>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-black mb-2">
              Capacity
            </label>
            <input
              type="range"
              min={50}
              max={400}
              value={capacity}
              onChange={(e) => setCapacity(+e.target.value)}
              className="w-full border border-accent-primar rounded-2xl py-1 px-1"
            />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {capacity}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-black mb-2">
              Location
            </label>
            <select
              className="w-full rounded-xl border border-gray-300 py-2 px-3 focus:outline-none focus:border-primary"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-black mb-2">
              Amenities
            </label>
            <select
              className="w-full rounded-xl border border-gray-300 py-2 px-3 focus:outline-none focus:border-primary"
              value={amenity}
              onChange={(e) => setAmenity(e.target.value)}
            >
              <option value="">Amenities</option>
              {amenities.map((am) => (
                <option key={am} value={am}>
                  {am}
                </option>
              ))}
            </select>
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1">
          <h1 className="text-3xl font-display font-bold text-black mb-8">
            Event Centers
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredVenues.map((venue) => (
              <Link
                key={venue.id}
                href={`/venues/${venue.id}`}
                className="block group"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group-hover:shadow-xl transition-shadow">
                  <div className="relative h-32 w-full">
                    <Image
                      src={venue.image[0]}
                      alt={venue.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-black mb-1">
                        {venue.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-1">
                        {venue.location}
                      </p>
                      <p className="text-primary font-semibold mb-2">
                        ₦{venue.price.toLocaleString()} | {venue.capacity} guests
                      </p>
                      <p className="text-xs text-gray-500 mb-2">
                        {venue.amenities.join(", ")}
                      </p>
                    </div>
                    <Button className="mt-auto px-4 py-2 rounded-xl bg-black text-white font-semibold hover:bg-accent hover:text-primary transition-colors">
                      View Details
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* Pagination (static for now) */}
          <div className="flex justify-center mt-8 gap-2">
            <Button variant="outline" className="rounded-full px-3 py-1 ">
              &lt;
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-3.5 py-1 bg-black text-white"
            >
              1
            </Button>
            <Button variant="outline" className="rounded-full px-3 py-1">
              2
            </Button>
            <Button variant="outline" className="rounded-full px-3 py-1">
              3
            </Button>
            <span className="px-2 py-1">...</span>
            <Button variant="outline" className="rounded-full px-3 py-1">
              10
            </Button>
            <Button variant="outline" className="rounded-full px-3 py-1">
              &gt;
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
