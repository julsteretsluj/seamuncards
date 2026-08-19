"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="w-full text-center" style={{ paddingTop: "1rem", paddingBottom: "0.5rem" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="elevated-card mx-auto flex flex-col items-center"
        style={{ maxWidth: "48rem" }}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full mb-6"
          style={{
            background: "rgba(0,122,255,0.1)",
            color: "#007aff",
          }}
        >
          January 16–17, 2027
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-5xl font-bold mb-3"
          style={{ color: "#1d1d1f", letterSpacing: "-0.03em" }}
        >
          Welcome to SEAMUN I{" "}
          <span className="animate-wave inline-block">👋</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-lg font-medium mb-3"
          style={{ color: "#6e6e73" }}
        >
          Your NFC conference companion
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-sm leading-relaxed mb-8 max-w-md"
          style={{ color: "#6e6e73" }}
        >
          Everything you need for the next two days at D-PREP International School — schedule, WiFi, committee info, and more.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <a
            href="#schedule"
            className="px-6 py-2.5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-85"
            style={{
              background: "#007aff",
              borderRadius: "980px",
            }}
          >
            View schedule
          </a>
          <a
            href="#delegate-login"
            className="px-6 py-2.5 text-sm font-semibold transition-opacity duration-200 hover:opacity-75"
            style={{
              background: "rgba(0,122,255,0.1)",
              color: "#007aff",
              borderRadius: "980px",
            }}
          >
            Log in as delegate
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
