"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden px-5 pt-12 pb-20">
      {/* Decorative blobs */}
      <div className="absolute top-[-80px] right-[-60px] w-[280px] h-[280px] rounded-full bg-[#C4E4F7] opacity-50 blur-3xl" />
      <div className="absolute bottom-[-40px] left-[-80px] w-[220px] h-[220px] rounded-full bg-[#E8DFF5] opacity-40 blur-3xl" />
      <div className="absolute top-[30%] left-[60%] w-[160px] h-[160px] rounded-full bg-[#D4F0E7] opacity-30 blur-2xl" />

      <div className="relative z-10 max-w-lg mx-auto w-full">
        {/* NFC indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-8"
        >
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full bg-[#2A4470] opacity-10 animate-nfc-pulse" />
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-8 h-8 text-[#2A4470]"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                d="M6.5 6.5C3.5 9.5 3.5 14.5 6.5 17.5"
                strokeLinecap="round"
              />
              <path
                d="M9 9C7.5 10.5 7.5 13.5 9 15"
                strokeLinecap="round"
              />
              <path
                d="M17.5 6.5C20.5 9.5 20.5 14.5 17.5 17.5"
                strokeLinecap="round"
              />
              <path
                d="M15 9C16.5 10.5 16.5 13.5 15 15"
                strokeLinecap="round"
              />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <span className="text-sm font-medium text-[#4A6078] tracking-wide uppercase">
            Opened via NFC
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h1 className="text-[2.75rem] leading-[1.1] font-bold tracking-tight text-[#1B2E4A] mb-4">
            Welcome to
            <br />
            SEAMUN I{" "}
            <span className="animate-wave inline-block">👋</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-[#4A6078] mb-3 leading-relaxed"
        >
          January 16–17, 2027 · D-PREP International School
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[#7A8FA3] text-sm leading-relaxed mb-10 max-w-sm"
        >
          This is your digital conference companion — everything you need
          for the next two days, right here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex gap-3"
        >
          <a
            href="#schedule"
            className="px-6 py-3 bg-[#1B2E4A] text-white rounded-xl text-sm font-semibold hover:bg-[#2A4470] transition-colors duration-300 shadow-md shadow-[#1B2E4A]/10"
          >
            View schedule
          </a>
          <a
            href="#delegate-login"
            className="px-6 py-3 border-2 border-[#1B2E4A]/20 text-[#1B2E4A] rounded-xl text-sm font-semibold hover:border-[#1B2E4A]/40 hover:bg-white/40 transition-all duration-300"
          >
            Log in as delegate
          </a>
        </motion.div>
      </div>
    </section>
  );
}
