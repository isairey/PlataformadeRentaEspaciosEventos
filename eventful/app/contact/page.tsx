"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Submit form or handle success
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    }
  };

  return (
    <main className=" bg-gray-50 pb-40 pt-10 ">
      <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
      <div className="flex justify-center">
        <div className="border border-gray-300 rounded-md shadow-md p-8 max-w-md w-full bg-white">
          <form onSubmit={handleSubmit} className="space-y-10">
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
              {errors.name && (
                <p id="name-error" className="text-red-600 text-sm mt-1">
                  {errors.name}
                </p>
              )}
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
              {errors.email && (
                <p id="email-error" className="text-red-600 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                aria-invalid={!!errors.subject}
                aria-describedby="subject-error"
                className="w-full mt-1"
              />
              {errors.subject && (
                <p id="subject-error" className="text-red-600 text-sm mt-1">
                  {errors.subject}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={4}
                placeholder="Type your message..."
                value={formData.message}
                onChange={handleChange}
                aria-invalid={!!errors.message}
                aria-describedby="message-error"
                className="w-full mt-1"
              />
              {errors.message && (
                <p id="message-error" className="text-red-600 text-sm mt-1">
                  {errors.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={Object.keys(errors).length > 0}
              className="ml-65"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
