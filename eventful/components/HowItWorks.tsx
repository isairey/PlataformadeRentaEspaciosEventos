import {
  FaSearchLocation,
  FaRegCalendarCheck,
  FaGlassCheers,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaSearchLocation size={36} className="text-primary mb-2" />,
    title: "Search",
    desc: "Find the perfect venue for your event by location, date, and type.",
  },
  {
    icon: <FaRegCalendarCheck size={36} className="text-primary mb-2" />,
    title: "Book",
    desc: "Book your chosen venue easily and securely online.",
  },
  {
    icon: <FaGlassCheers size={36} className="text-primary mb-2" />,
    title: "Celebrate",
    desc: "Enjoy your event at a top-rated venue with peace of mind.",
  },
];

const HowItWorks = () => (
  <section className="mb-12 pt-20">
    <h2 className="text-3xl font-display font-bold text-primary mb-6 text-center">
      How It Works
    </h2>
    <div className="flex flex-col md:flex-row justify-center items-center gap-8">
      {steps.map((step, idx) => (
        <div
          key={idx}
          className="bg-white/80 rounded-xl shadow p-6 flex flex-col items-center text-center max-w-xs"
        >
          {step.icon}
          <h3 className="text-xl font-bold text-black mb-2">{step.title}</h3>
          <p className="text-gray-700">{step.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorks;
