"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./components/Hero";
import QuickActions from "./components/QuickActions";
import WiFiCard from "./components/WiFiCard";
import Schedule from "./components/Schedule";
import ImportantLinks from "./components/ImportantLinks";
import DelegateLogin from "./components/DelegateLogin";
import Footer from "./components/Footer";
import Header from "./components/Header";

function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: "#f2f2f7" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="relative w-20 h-20 mb-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-[#007aff]/20"
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{
                duration: 1.8,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1d1d1f"
              strokeWidth={1.8}
              className="w-10 h-10"
            >
              <path d="M6.5 6.5C3.5 9.5 3.5 14.5 6.5 17.5" strokeLinecap="round" />
              <path d="M9 9C7.5 10.5 7.5 13.5 9 15" strokeLinecap="round" />
              <path d="M17.5 6.5C20.5 9.5 20.5 14.5 17.5 17.5" strokeLinecap="round" />
              <path d="M15 9C16.5 10.5 16.5 13.5 15 15" strokeLinecap="round" />
              <circle cx="12" cy="12" r="1.5" fill="#1d1d1f" />
            </svg>
          </div>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm font-semibold tracking-wide"
          style={{ color: "#1d1d1f" }}
        >
          SEAMUN I · 2027
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.6 }}
          className="text-xs mt-1"
          style={{ color: "#6e6e73" }}
        >
          Card detected
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen" style={{ background: "#f2f2f7" }}>
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Header />
          <div
            className="container-seamun flex flex-col items-center"
            style={{ gap: "clamp(1.25rem, 2.5vw, 2rem)", paddingTop: "5.5rem", paddingBottom: "3rem" }}
          >
            <Hero />
            <QuickActions />
            <WiFiCard />
            <Schedule />
            <ImportantLinks />
            <DelegateLogin />
            <Footer />
          </div>
        </motion.div>
      )}
    </main>
  );
}
