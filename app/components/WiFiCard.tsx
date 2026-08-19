"use client";

import { useState } from "react";
import { motion } from "framer-motion";

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center justify-between w-full rounded-xl px-4 py-3 transition-colors duration-200 group"
      style={{
        background: "#f2f2f7",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#e5e5ea")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#f2f2f7")}
    >
      <div className="text-left">
        <div className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "#6e6e73" }}>
          {label}
        </div>
        <div className="text-base font-semibold font-mono tracking-wide" style={{ color: "#1d1d1f" }}>
          {text}
        </div>
      </div>
      <span
        className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200"
        style={{
          background: copied ? "#34c759" : "rgba(0,122,255,0.1)",
          color: copied ? "#fff" : "#007aff",
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </span>
    </button>
  );
}

export default function WiFiCard() {
  return (
    <section id="wifi" className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="elevated-card"
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold mb-1" style={{ color: "#1d1d1f" }}>
              Conference WiFi
            </h2>
            <p className="text-sm" style={{ color: "#6e6e73" }}>
              Connect to get online throughout the venue
            </p>
          </div>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#007aff"
            strokeWidth={1.8}
            className="w-8 h-8 opacity-40 mt-1"
          >
            <path d="M2 8.82a15 15 0 0 1 20 0" strokeLinecap="round" />
            <path d="M5 12.86a10 10 0 0 1 14 0" strokeLinecap="round" />
            <path d="M8.5 16.43a5 5 0 0 1 7 0" strokeLinecap="round" />
            <circle cx="12" cy="20" r="1" fill="#007aff" />
          </svg>
        </div>
        <div className="flex flex-col gap-2.5">
          <CopyButton text="SEAMUN-2027" label="Network name" />
          <CopyButton text="seamun2027!" label="Password" />
        </div>
      </motion.div>
    </section>
  );
}
