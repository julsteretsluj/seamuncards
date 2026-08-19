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
      className="flex items-center justify-between w-full bg-white/60 rounded-lg px-4 py-3 hover:bg-white/80 transition-colors duration-200 group"
    >
      <div className="text-left">
        <div className="text-xs text-[#7A8FA3] font-medium uppercase tracking-wider">
          {label}
        </div>
        <div className="text-lg font-semibold text-[#1B2E4A] font-mono tracking-wide">
          {text}
        </div>
      </div>
      <span className="text-xs font-medium text-[#4A6078] bg-white/80 px-3 py-1.5 rounded-lg group-hover:bg-[#1B2E4A] group-hover:text-white transition-all duration-200">
        {copied ? "Copied!" : "Copy"}
      </span>
    </button>
  );
}

export default function WiFiCard() {
  return (
    <section id="wifi" className="px-5 pb-20">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-[#D4F0E7] to-[#C4E4F7] rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-[#1B2E4A] mb-1">
                Conference WiFi
              </h2>
              <p className="text-sm text-[#4A6078]">
                Connect to get online throughout the venue
              </p>
            </div>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1B2E4A"
              strokeWidth={1.8}
              className="w-10 h-10 opacity-30 mt-1"
            >
              <path d="M2 8.82a15 15 0 0 1 20 0" strokeLinecap="round" />
              <path d="M5 12.86a10 10 0 0 1 14 0" strokeLinecap="round" />
              <path d="M8.5 16.43a5 5 0 0 1 7 0" strokeLinecap="round" />
              <circle cx="12" cy="20" r="1" fill="#1B2E4A" />
            </svg>
          </div>
          <div className="flex flex-col gap-2.5">
            <CopyButton text="SEAMUN-2027" label="Network name" />
            <CopyButton text="seamun2027!" label="Password" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
