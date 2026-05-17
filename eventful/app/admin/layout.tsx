"use client";

import type React from "react";
import { motion } from "motion/react";
import AdminAuthWrapper from "@/components/AdminAuthWrapper";
import { getCurrentUser, clearAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    const user = getCurrentUser();
    setAdminUser(user);
  }, []);

  const handleLogout = () => {
    clearAuth();
    window.dispatchEvent(new Event("auth-changed"));
    router.push("/signin");
  };
  return (
    <AdminAuthWrapper>
      <motion.div
        className="min-h-screen bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Admin Header */}
        <motion.header
          className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div
                  className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-white font-bold text-lg">E</span>
                </motion.div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Eventful Admin
                  </h1>
                  <p className="text-sm text-gray-500">Dashboard</p>
                </div>
              </motion.div>

              {/* Admin Actions */}
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Notifications */}
                <motion.button
                  className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-5 5v-5zM9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <motion.span
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.button>

                {/* Profile */}
                <motion.div
                  className="flex items-center gap-3 pl-4 border-l border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {adminUser?.fullName || adminUser?.email?.split('@')[0] || 'Admin User'}
                    </p>
                    <p className="text-xs text-gray-500">{adminUser?.email || 'admin@eventful.com'}</p>
                  </div>
                  <motion.button
                    onClick={handleLogout}
                    className="w-10 h-10 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center hover:from-red-500 hover:to-red-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Logout"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <motion.main
          className="pt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {children}
        </motion.main>
        <motion.div>
          <div>Footer</div>
        </motion.div>
      </motion.div>
    </AdminAuthWrapper>
  );
}
