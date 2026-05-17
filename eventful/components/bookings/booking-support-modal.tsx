"use client";

import * as React from "react";
import { X, MessageSquare } from "lucide-react";
import type { Booking } from "./booking-types";

interface SupportFormState {
  subject: string;
  message: string;
  priority: "low" | "medium" | "high";
}

interface BookingSupportModalProps {
  open: boolean;
  booking: Booking | null;
  form: SupportFormState;
  onChange: (form: SupportFormState) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export function BookingSupportModal({ open, booking, form, onChange, onSubmit, onClose }: BookingSupportModalProps) {
  if (!open || !booking) return null;

  const disabled = !form.subject.trim() || !form.message.trim();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Contact Support</h2>
              <p className="text-sm text-gray-600">Regarding: {booking.title}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => onChange({ ...form, subject: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of your issue"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => onChange({ ...form, priority: e.target.value as SupportFormState["priority"] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => onChange({ ...form, message: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Please describe your issue or question in detail..."
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600">
              <strong>Booking Details:</strong><br />
              ID: {booking.bookingId}<br />
              Event: {booking.title}<br />
              Date: {booking.date}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-6 mt-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={disabled}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MessageSquare size={16} className="inline mr-2" />
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}