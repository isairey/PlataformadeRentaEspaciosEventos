import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-green rounded-xl flex items-center justify-center shadow-green">
                <span className="text-white font-display font-bold text-xl">
                  E
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-green-500">
                  Eventful
                </h3>
              </div>
            </div>
            <p className="text-dark-300 text-lg mb-6 max-w-md leading-relaxed">
              Your trusted partner for finding and booking the perfect event
              venues. Making memorable moments happen since forever.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { name: "Facebook", icon: FaFacebookF },
                { name: "Twitter", icon: FaTwitter },
                { name: "Instagram", icon: FaInstagram },
                { name: "LinkedIn", icon: FaLinkedinIn },
              ].map((social) => (
                <Link
                  key={social.name}
                  href="#"
                  className="w-10 h-10 bg-dark-800 rounded-xl flex items-center justify-center text-dark-400 hover:bg-primary-600 hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-6 text-green-500">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Browse Venues", href: "/venues" },
                { name: "My Bookings", href: "/my-bookings" },
                { name: "Contact Us", href: "/contact" },
                { name: "About", href: "/about" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-dark-300 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <svg
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-6 text-green-500">
              Support & Legal
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Help Center", href: "/help" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Cookie Policy", href: "/cookies" },
                { name: "FAQ", href: "/faq" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-dark-300 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <svg
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-dark-800/50 rounded-2xl p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-2xl font-display font-bold text-green-500 mb-4">
              Stay Updated
            </h4>
            <p className="text-dark-300 mb-6">
              Get the latest venue listings and exclusive deals delivered to
              your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-dark-700 border border-dark-600 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="bg-gradient-green text-white px-6 py-3 rounded-xl font-semibold hover:shadow-green hover:scale-105 transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-dark-400 text-sm">
              © {new Date().getFullYear()} Eventful. All rights reserved. Made
              with ❤️ for amazing events.
            </p>
            <div className="flex items-center gap-6 text-sm text-dark-400">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                All systems operational
              </span>
              <Link
                href="/status"
                className="hover:text-primary-400 transition-colors"
              >
                Status
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
