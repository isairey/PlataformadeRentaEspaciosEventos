"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    conPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (formData.password !== formData.conPassword)
      newErrors.conPassword = "Passwords do not match";
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

      const res = await axios.post("http://localhost:8080/api/auth/register", {
        fullname: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setServerMessage("Signup successful! Please login.");
      setFormData({ name: "", email: "", password: "", conPassword: "" });
    } catch (error: any) {
      if (error.response?.data?.message) {
        setServerMessage(error.response.data.message);
      } else {
        setServerMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 pb-20">
      <p className="text-4xl font-bold mb-4 text-center pt-8">Sign Up</p>
      <form
        onSubmit={handleSubmit}
        className="space-y-8 max-w-md mx-auto p-6 mt-5 border border-gray-300 rounded-md shadow-md bg-white"
      >
        <div className="w-15 h-15 bg-gradient-green rounded-xl ml-45 flex items-center justify-center shadow-green group-hover:scale-105 transition-transform duration-200">
          <span className="text-white font-display font-bold text-xl">E</span>
        </div>
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
            aria-describedby="name-error"
            className="w-full mt-1"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
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
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
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
          {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
        </div>

        <div>
          <Label htmlFor="conPassword">Confirm Password</Label>
          <Input
            id="conPassword"
            type="password"
            placeholder="••••••••"
            value={formData.conPassword}
            onChange={handleChange}
            aria-invalid={!!errors.password}
            aria-describedby="password-error"
            className="w-full mt-1"
          />
          {errors.conPassword && <p className="text-red-600 text-sm">{errors.conPassword}</p>}
        </div>

        {serverMessage && <p className="text-center text-sm text-blue-600">{serverMessage}</p>}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing up..." : "Sign Up"}
        </Button>

        <p className="text-center text-sm">
          Already have an account ?{" "}
          <Link href="/signin" className="text-green-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
