"use client";

import { Home, Building2, Calendar, Users } from "lucide-react";
import React from "react";
import { motion } from "motion/react";

interface Props {
  activePage: string;
  setActivePage: (page: "dashboard" | "venues" | "bookings" | "users") => void;
}

const Sidebar: React.FC<Props> = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "venues", label: "Venues", icon: Building2 },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "users", label: "Users", icon: Users },
  ];

  return (
    <motion.div 
      className="w-64 bg-white shadow-lg h-screen fixed left-0 top-20 border-r border-gray-200"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="p-6">
        <motion.nav 
          className="space-y-2 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActivePage(item.id as any)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                  activePage === item.id
                    ? "bg-blue-100 text-blue-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  animate={{ 
                    scale: activePage === item.id ? 1.1 : 1,
                    rotate: activePage === item.id ? 5 : 0 
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon size={20} className="mr-3" />
                </motion.div>
                {item.label}
              </motion.button>
            );
          })}
        </motion.nav>

        {/* Quick Stats */}
        <motion.div 
          className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-sm font-medium text-gray-900 mb-2">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Active Venues</span>
              <span className="font-medium text-blue-600">2</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Today's Bookings</span>
              <span className="font-medium text-green-600">1</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Revenue</span>
              <span className="font-medium text-purple-600">&#8358;150K</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
