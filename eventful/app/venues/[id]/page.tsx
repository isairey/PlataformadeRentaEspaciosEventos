// "use client";

// import Image from "next/image";
// import {
//   FaStar,
//   FaWifi,
//   FaParking,
//   FaSnowflake,
//   FaVolumeUp,
//   FaVideo,
//   FaArrowLeft,
// } from "react-icons/fa";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useParams } from "next/navigation";

// const mockVenue = {
//   name: "The Grand Ballroom",
//   address: "123 Main Street, Cityville, State 12345",
//   rating: 4.8,
//   reviews: 256,
//   ratingsBreakdown: [70, 20, 5, 3, 2],
//   about: `The Grand Ballroom offers a sophisticated and versatile space for any event. With a capacity of up to 500 guests, state-of-the-art lighting and sound systems, and customizable layouts, we ensure your event is a success. Our experienced team provides exceptional service, from planning to execution, making your vision a reality.`,
//   amenities: [
//     { icon: <FaWifi />, label: "WIFI" },
//     { icon: <FaParking />, label: "Parking" },
//     { icon: <FaSnowflake />, label: "Air Conditioning" },
//     { icon: <FaVolumeUp />, label: "Sound System" },
//     { icon: <FaVideo />, label: "Projector" },
//   ],
//   price: 2500,
//   availableDates: ["2024-07-05", "2024-08-07"],
// };

// function RatingBar({ percent }: { percent: number }) {
//   return (
//     <div className="flex items-center gap-2">
//       <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
//         <div className="h-2 bg-primary" style={{ width: `${percent}%` }} />
//       </div>
//       <span className="text-xs text-gray-500">{percent}%</span>
//     </div>
//   );
// }

// export default function VenueDetailPage() {
//   const { id } = useParams();

//   return (
//     <div className="max-w-4xl mx-auto py-10 px-4">
//       {/* Back Button */}
//       <div className="mb-4">
//         <Link href="/venues">
//           <Button
//             variant="outline"
//             className="flex items-center gap-2 px-6 py-3 rounded-full text-black hover:text-green-300"
//           >
//             <FaArrowLeft />
//           </Button>
//         </Link>
//       </div>
//       {/* Venue Images */}
//       <div className="flex gap-4 mb-8">
//         {[1, 2, 3].map((i) => (
//           <div key={i} className="flex-1 rounded-xl overflow-hidden shadow-lg">
//             <Image
//               src="/images/Background.jpeg"
//               alt="Venue"
//               width={400}
//               height={200}
//               className="object-cover w-full h-40"
//             />
//           </div>
//         ))}
//       </div>
//       {/* Venue Name & Address */}
//       <h1 className="text-3xl font-bold text-black mb-2">{mockVenue.name}</h1>
//       <p className="text-gray-500 mb-1">
//         Located in the heart of downtown, this elegant ballroom is perfect for
//         weddings, corporate events, and galas.
//       </p>
//       <p className="text-primary font-medium mb-4">{mockVenue.address}</p>
//       {/* Rating & Reviews */}
//       {/* <div className="flex items-center gap-8 mb-6">
//         <div className="flex flex-col items-center">
//           <div className="flex items-center gap-1 text-primary text-xl font-bold">
//             <FaStar className="text-yellow-400" />
//             {mockVenue.rating}
//           </div>
//           <div className="text-xs text-gray-500">
//             {mockVenue.reviews} reviews
//           </div>
//         </div>
//         <div className="flex flex-col gap-1">
//           {[5, 4, 3, 2, 1].map((star) => (
//             <div key={star} className="flex items-center gap-2">
//               <span className="text-xs text-gray-500 w-4">{star}</span>
//               <RatingBar percent={mockVenue.ratingsBreakdown[5 - star]} />
//             </div>
//           ))}
//         </div>
//       </div> */}
//       {/* About */}
//       <h2 className="text-xl font-bold text-black mb-2">About This Venue</h2>
//       <p className="text-gray-700 mb-4">{mockVenue.about}</p>
//       {/* Amenities */}
//       <h2 className="text-xl font-bold text-black mb-2">Amenities</h2>
//       <div className="flex flex-wrap gap-3 mb-6">
//         {mockVenue.amenities.map((am, idx) => (
//           <div
//             key={idx}
//             className="flex items-center gap-2 px-4 py-2 bg-gray rounded-xl text-black text-sm font-medium shadow"
//           >
//             {am.icon}
//             {am.label}
//           </div>
//         ))}
//       </div>
//       {/* Availability (static calendar for now) */}
//       <h2 className="text-xl font-bold text-black mb-2">Availability</h2>
//       <div className="flex flex-col md:flex-row gap-8 mb-6 w-full">
//         {/* July 2024 */}
//         <div className="flex-1">
//           <div className="text-sm font-semibold text-black mb-2">July 2024</div>
//           <div className="grid grid-cols-7 gap-1 text-xs text-center">
//             {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
//               <div key={i} className="font-bold text-gray-500">
//                 {d}
//               </div>
//             ))}
//             {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
//               <div
//                 key={day}
//                 className={`py-1 rounded-full ${
//                   mockVenue.availableDates.includes(
//                     `2024-07-${String(day).padStart(2, "0")}`
//                   )
//                     ? "bg-primary text-white"
//                     : "text-black"
//                 }`}
//               >
//                 {day}
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* August 2024 */}
//         <div className="flex-1">
//           <div className="text-sm font-semibold text-black mb-2">
//             August 2024
//           </div>
//           <div className="grid grid-cols-7 gap-1 text-xs text-center">
//             {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
//               <div key={i} className="font-bold text-gray-500">
//                 {d}
//               </div>
//             ))}
//             {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
//               <div
//                 key={day}
//                 className={`py-1 rounded-full ${
//                   mockVenue.availableDates.includes(
//                     `2024-08-${String(day).padStart(2, "0")}`
//                   )
//                     ? "bg-primary text-white"
//                     : "text-black"
//                 }`}
//               >
//                 {day}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       {/* Pricing */}
//       <h2 className="text-xl font-bold text-black mb-2">Pricing</h2>
//       <p className="mb-6 text-gray-700">
//         Starting at ${mockVenue.price} per event. Contact us for custom quotes
//         and package options.
//       </p>
//       <Link href={`/venues/${id}/book`}>
//         <Button className="bg-black text-white hover:bg-accent hover:text-primary px-8 py-3 rounded-xl font-bold w-full mt-2">
//           Book Now
//         </Button>
//       </Link>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaStar,
  FaWifi,
  FaParking,
  FaSnowflake,
  FaVolumeUp,
  FaVideo,
  FaArrowLeft,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

function RatingBar({ percent }: { percent: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-2 bg-primary" style={{ width: `${percent}%` }} />
      </div>
      <span className="text-xs text-gray-500">{percent}%</span>
    </div>
  );
}

export default function VenueDetailPage() {
  const { id } = useParams();
  const [venue, setVenue] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchVenue = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/venues/${id}`);
        if (!res.ok) throw new Error("Failed to fetch venue data");
        const data = await res.json();
        console.log("Fetched venue images:", data.image);
        setVenue(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading venue details...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  }

  if (!venue) {
    return <p className="text-center mt-10">No venue found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Back Button */}
      <div className="mb-4">
        <Link href="/venues">
          <Button
            variant="outline"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-black hover:text-green-300"
          >
            <FaArrowLeft />
          </Button>
        </Link>
      </div>

      {/* Venue Images */}
      <div className="flex gap-4 mb-8">
        {venue.image && venue.image.length > 0 ? (
          venue.image.map((img: string, i: number) => (
            <div
              key={i}
              className="flex-1 aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-200"
              >
              <Image
                src={img}
                alt={venue.name}
                width={400}
                height={700}
                className="object-cover w-full h-full"
              />
            </div>
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>

      {/* Venue Name & Address */}
      <h1 className="text-3xl font-bold text-black mb-2">{venue.name}</h1>
      {/* <p className="text-gray-500 mb-1">{venue.shortDescription}</p> */}
      <p className="text-gray-500 mb-1">
      Located in the heart of downtown, this elegant ballroom is perfect for
      weddings, corporate events, and galas.
     </p>
      <p className="text-primary font-medium mb-4">{venue.location}</p>

      {/* About */}
      <h2 className="text-xl font-bold text-black mb-2">About This Venue</h2>
      <p className="text-gray-700 mb-4">{venue.description}</p>

      {/* Amenities */}
      <h2 className="text-xl font-bold text-black mb-2">Amenities</h2>
      <div className="flex flex-wrap gap-3 mb-6">
        {venue.amenities && venue.amenities.length > 0 ? (
          venue.amenities.map((label: string, idx: number) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-4 py-2 bg-gray rounded-xl text-black text-sm font-medium shadow"
            >
              {label === "WIFI" && <FaWifi />}
              {label === "Parking" && <FaParking />}
              {label === "Air Conditioning" && <FaSnowflake />}
              {label === "Sound System" && <FaVolumeUp />}
              {label === "Projector" && <FaVideo />}
              {label}
            </div>
          ))
        ) : (
          <p>No amenities listed</p>
        )}
      </div>
      {/* Availability */}
      <h2 className="text-xl font-bold text-black mb-2">Availability</h2>
      <div className="flex flex-col md:flex-row gap-8 mb-6 w-full">
        {[0, 1].map((monthOffset) => {
          const today = new Date();
          const monthDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
          const month = monthDate.toLocaleString("default", { month: "long" });
          const year = monthDate.getFullYear();
          const daysInMonth = new Date(year, monthDate.getMonth() + 1, 0).getDate();
          const availableDates = venue.availableDates || [];

          return (
            <div key={monthOffset} className="flex-1">
              <div className="text-sm font-semibold text-black mb-2">
                {month} {year}
              </div>
              <div className="grid grid-cols-7 gap-1 text-xs text-center">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <div key={i} className="font-bold text-gray-500">
                    {d}
                  </div>
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                  const dateStr = `${year}-${String(monthDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const isAvailable = availableDates.includes(dateStr);
                  return (
                    <div
                      key={day}
                      className={`py-1 rounded-full flex items-center justify-center font-bold transition
                        ${isAvailable
                          ? "bg-green-500 text-white border-2 border-green-700 shadow-lg"
                          : "bg-gray-100 text-black"
                        }`}
                      title={isAvailable ? "Available" : "Unavailable"}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pricing */}
      <h2 className="text-xl font-bold text-black mb-2">Pricing</h2>
      <p className="mb-6 text-gray-700">
        Starting at ₦{venue.price.toLocaleString()} per event. Contact us for custom quotes and
        package options.
      </p>

      {/* Book Now */}
      <Link href={`/venues/${id}/book`}>
        <Button className="bg-black text-white hover:bg-accent hover:text-primary px-8 py-3 rounded-xl font-bold w-full mt-2">
          Book Now
        </Button>
      </Link>
    </div>
  );
}
