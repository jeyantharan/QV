"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Phone, Mail, User, Send, CheckCircle2 } from "lucide-react";

export default function ReservePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "2",
    date: "",
    time: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", guests: "2", date: "", time: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[var(--accent)] uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
            Reservations
          </span>
          <h1 className="text-5xl md:text-7xl font-playfair text-white mb-6">Book Your Table</h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Experience the culinary artistry of QV Trattoria. Fill out the form below and we'll confirm your reservation via email.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Status Overlays */}
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-6"
            >
              <CheckCircle2 className="w-16 h-16 text-[var(--accent)] mb-6" />
              <h2 className="text-3xl font-playfair text-white mb-4">Reservation Sent!</h2>
              <p className="text-neutral-400 mb-8 max-w-sm">
                Thank you for choosing QV Trattoria. We have received your request and will contact you shortly to confirm.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="bg-[var(--accent)] text-black px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform"
              >
                Make Another Reservation
              </button>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-0">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm text-neutral-400 flex items-center gap-2">
                <User className="w-4 h-4 text-[var(--accent)]" /> Name
              </label>
              <input
                required
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-[var(--accent)] transition-colors outline-none"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm text-neutral-400 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--accent)]" /> Email Address
              </label>
              <input
                required
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-[var(--accent)] transition-colors outline-none"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm text-neutral-400 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--accent)]" /> Phone Number
              </label>
              <input
                required
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-[var(--accent)] transition-colors outline-none"
              />
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <label className="text-sm text-neutral-400 flex items-center gap-2">
                <Users className="w-4 h-4 text-[var(--accent)]" /> Number of Guests
              </label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-[var(--accent)] transition-colors outline-none appearance-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, "9+"].map((num) => (
                  <option key={num} value={num} className="bg-[#0a0a0a]">
                    {num} {num === 1 ? "Person" : "Persons"}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-sm text-neutral-400 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--accent)]" /> Date
              </label>
              <input
                required
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-[var(--accent)] transition-colors outline-none [color-scheme:dark]"
              />
            </div>

            {/* Time */}
            <div className="space-y-2">
              <label className="text-sm text-neutral-400 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--accent)]" /> Time
              </label>
              <input
                required
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-[var(--accent)] transition-colors outline-none [color-scheme:dark]"
              />
            </div>

            {/* Message */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-neutral-400 flex items-center gap-2">
                <Send className="w-4 h-4 text-[var(--accent)]" /> Special Requests / Message
              </label>
              <textarea
                placeholder="Any dietary restrictions or special occasions?"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-[var(--accent)] transition-colors outline-none resize-none"
              />
            </div>

            <div className="md:col-span-2 pt-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[var(--accent)] text-black font-semibold py-5 rounded-xl flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {status === "loading" ? (
                  <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    Confirm Reservation Request
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
              {status === "error" && (
                <p className="text-red-500 text-center mt-4 text-sm">
                  Something went wrong. Please try again or call us directly.
                </p>
              )}
            </div>
          </form>
        </motion.div>

        {/* Contact info footer */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 px-4">
          <div className="flex items-center gap-3 text-neutral-400">
            <Phone className="w-5 h-5 text-[var(--accent)]" />
            <span>+1 905 478 8801</span>
          </div>
          <div className="flex items-center gap-3 text-neutral-400">
            <Calendar className="w-5 h-5 text-[var(--accent)]" />
            <span>Open Daily from 11:00 AM</span>
          </div>
          <div className="text-neutral-500 text-sm italic">
            * Reservation is subject to availability
          </div>
        </div>
      </div>
    </main>
  );
}
