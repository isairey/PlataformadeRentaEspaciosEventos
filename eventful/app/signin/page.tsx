"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "motion/react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      setServerMessage("");

      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // Backend returns { jwt: "...", role: "...", message: "..." }
      if (res.data?.jwt && res.data?.role) {
        localStorage.setItem("token", res.data.jwt);
        localStorage.setItem("userRole", res.data.role);
        
        // Trigger auth-changed event for navbar
        window.dispatchEvent(new Event("auth-changed"));
        
        // Check if there's a redirect URL stored
        const redirectUrl = localStorage.getItem("redirectAfterLogin");
        if (redirectUrl) {
          localStorage.removeItem("redirectAfterLogin");
          router.push(redirectUrl);
        } else {
          // Redirect based on user role
          if (res.data.role === 'ADMIN') {
            router.push("/admin");
          } else {
            router.push("/"); // Default redirect to home for regular users
          }
        }
      } else {
        setServerMessage("Unexpected server response.");
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        setServerMessage(error.response.data.message);
      } else {
        setServerMessage("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="bg-gray-50 pb-30 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.p 
        className="text-4xl font-bold mb-4 text-center pt-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Login
      </motion.p>
      
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-10 max-w-md mx-auto p-6 mt-8 border border-gray-300 rounded-md shadow-md bg-white"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      >
        <motion.div 
          className="w-15 h-15 bg-gradient-green rounded-xl mx-auto flex items-center justify-center shadow-green"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <span className="text-white font-display font-bold text-xl">E</span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Label htmlFor="email">Email</Label>
          <motion.div
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              className="w-full mt-1"
            />
          </motion.div>
          {errors.email && (
            <motion.p 
              id="email-error" 
              className="text-red-600 text-sm mt-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {errors.email}
            </motion.p>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Label htmlFor="password">Password</Label>
          <motion.div
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
              className="w-full mt-1"
            />
          </motion.div>
          {errors.password && (
            <motion.p 
              id="password-error" 
              className="text-red-600 text-sm mt-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {errors.password}
            </motion.p>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              disabled={Object.keys(errors).length > 0}
              className="w-full"
            >
              Log In
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.p 
          className="text-center text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          Don't have an account?{" "}
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-block"
          >
            <Link href="/signup" className="text-green-500 hover:text-green-600 transition-colors">
              Sign Up
            </Link>
          </motion.span>
        </motion.p>
      </motion.form>
    </motion.div>
  );
}
