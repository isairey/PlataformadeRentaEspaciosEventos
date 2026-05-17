"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const pathname = usePathname();

   useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setIsLoggedIn(!!token);
  }, [pathname]);


  // React to explicit auth changes (login/logout) in the same tab
  useEffect(() => {
    const handleAuthChanged = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    window.addEventListener("auth-changed", handleAuthChanged);
    return () => window.removeEventListener("auth-changed", handleAuthChanged);
  }, []);
  if (isLoggedIn === null) {
    // Optional: show loading skeleton to avoid flash
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setAvatarMenuOpen(false);
  }

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/venues", label: "Venues" },
    { href: "/my-bookings", label: "My Bookings" },
    { href: "/contact", label: "Contact" },
  ];

  const avatarMenuItems = [
    // { href: "/profile", label: "Profile" },
    // { href: "/settings", label: "Settings" },
    { href: "/logout", label: "Logout" },
  ];


  return (
    <motion.nav 
      className="bg-white/95 backdrop-blur-md shadow-soft z-50 sticky top-0"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-9xl px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/"
              className="flex-shrink-0 flex items-center gap-3 group"
            >
              <motion.div 
                className="w-10 h-10 bg-gradient-green rounded-xl flex items-center justify-center shadow-green"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-white font-display font-bold text-lg">
                  E
                </span>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-bold text-dark-900 group-hover:text-primary-600 transition-colors">
                  Eventful
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <motion.div 
            className="hidden md:flex space-x-8 items-center gap-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-dark-700 hover:text-primary-600 font-medium transition-all duration-200 hover:scale-105 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Auth / Avatar */}
          <motion.div className="flex items-center gap-7 mr-5 relative">
            {isLoggedIn ? (
              <div className="relative">
                <motion.div
                  className="w-10 h-10 rounded-full bg-gradient-green flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAvatarMenuOpen((prev) => !prev)}
                >
                  <span className="text-white font-bold">U</span>
                  {/* Replace 'U' with <img src={userImage} ... /> when available */}
                </motion.div>
                <AnimatePresence>
                  {avatarMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg overflow-hidden border border-dark-100"
                    >
                      {avatarMenuItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-dark-700 hover:bg-primary-50 hover:text-primary-600"
                          onClick={() => setAvatarMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/signin" className="hidden sm:block text-dark-700 hover:text-primary-600 font-medium transition-colors">
                  Sign In
                </Link>
                <Button className="bg-gradient-green text-white hover:shadow-green-lg transition-all duration-200 font-semibold px-6 py-2 rounded-xl border-0">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </motion.div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-dark-600 hover:text-primary-600 hover:bg-primary-50 focus:outline-none transition-all duration-200"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
            >
              <motion.svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: menuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </motion.svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-dark-100 shadow-medium"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div 
              className="px-4 py-4 space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="block text-dark-700 hover:text-primary-600 hover:bg-primary-50 font-medium transition-all duration-200 px-3 py-2 rounded-lg"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                className="pt-3 border-t border-dark-100 space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Link
                  href="/signin"
                  className="block text-dark-700 hover:text-primary-600 hover:bg-primary-50 font-medium transition-all duration-200 px-3 py-2 rounded-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block bg-gradient-green text-white hover:shadow-green font-semibold transition-all duration-200 px-5 py-3 rounded-lg text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Get Started
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;


// {/* CTA Button */}
          // <motion.div 
          //   className="flex items-center gap-7 mr-5"
          //   initial={{ opacity: 0, x: 20 }}
          //   animate={{ opacity: 1, x: 0 }}
          //   transition={{ duration: 0.6, delay: 0.4 }}
          // >
          //   <Link
          //     href="/signin"
          //     className="hidden sm:block text-dark-700 hover:text-primary-600 font-medium transition-colors"
          //   >
          //     Sign In
          //   </Link>
          //   <motion.div
          //     whileHover={{ scale: 1.05 }}
          //     whileTap={{ scale: 0.95 }}
          //   >
          //     <Button className="bg-gradient-green text-white hover:shadow-green-lg transition-all duration-200 font-semibold px-6 py-2 rounded-xl border-0">
          //       <Link href="/signup">Get Started</Link>
          //     </Button>
          //   </motion.div>
          // </motion.div>
