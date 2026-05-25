"use client";

import { motion } from "framer-motion";
import { Mail, Clock, Calendar, CheckCircle2 } from "lucide-react";

const occasions = [
  "Bridal Showers", "Baby Showers", "Birthday Parties", "Communion Parties", 
  "Confirmation Parties", "Wedding Anniversaries", "Retirement Parties", 
  "Sports Teams", "Corporate Events", "Weddings", "Baptisms", 
  "Graduation Parties"
];

export default function PrivateEvents() {
  return (
    <section className="min-h-screen py-24 md:py-40 bg-[#050505] relative overflow-hidden flex flex-col justify-center">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-[var(--accent)]/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-white/5 blur-[100px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/4" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="w-10 h-px bg-[var(--accent)]" />
            <span className="text-[var(--accent)] uppercase tracking-widest text-xs font-semibold">Exclusivity</span>
            <span className="w-10 h-px bg-[var(--accent)]" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl text-white mb-8 leading-tight"
          >
            Private Parties <br />
            <span className="italic text-neutral-400">& Events</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed font-light"
          >
            Celebrate your next milestone with us. We host private parties and events and offer 
            <span className="text-[var(--accent)] font-medium"> customized menus</span> tailored specifically for your occasion.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Occasions Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12"
          >
            <h3 className="font-serif text-3xl text-white mb-8 flex items-center gap-3">
              <Calendar className="text-[var(--accent)] w-7 h-7" />
              Perfect For
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              {occasions.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)]/60 group-hover:text-[var(--accent)] transition-colors" />
                  <span className="text-neutral-300 group-hover:text-white transition-colors">{item}</span>
                </div>
              ))}
              <div className="flex items-center gap-3 italic text-neutral-500">
                & many more...
              </div>
            </div>
          </motion.div>

          {/* Availability & Contact */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-[var(--accent)]/20 transition-all duration-700" />
              
              <h3 className="font-serif text-3xl text-white mb-8 flex items-center gap-3">
                <Clock className="text-[var(--accent)] w-7 h-7" />
                Available Times
              </h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-neutral-400 uppercase tracking-widest text-xs">Mon & Tue</span>
                  <span className="text-white font-medium text-lg">All Day</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-neutral-400 uppercase tracking-widest text-xs">Wed — Sun</span>
                  <span className="text-white font-medium text-lg">10:00 AM — 3:30 PM</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[var(--accent)] rounded-3xl p-8 md:p-10 text-black shadow-[0_20px_50px_rgba(224,175,69,0.2)]"
            >
              <h3 className="font-serif text-3xl mb-4 font-bold">Ready to Plan?</h3>
              <p className="text-black/80 mb-8 font-medium">
                Contact our events team today to discuss your vision and receive a custom menu proposal.
              </p>
              <a
                href="mailto:qvtrattoria@gmail.com"
                className="flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-xl hover:bg-neutral-800 transition-all group font-bold tracking-wider uppercase text-sm"
              >
                <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                qvtrattoria@gmail.com
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
