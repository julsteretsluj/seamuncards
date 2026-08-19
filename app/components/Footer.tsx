"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full elevated-card">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h3 className="text-base font-bold mb-1" style={{ color: "#1d1d1f" }}>
            SEAMUN I · 2027
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "#6e6e73" }}>
            Southeast Asian Model United Nations
            <br />
            D-PREP International School, Bangkok
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-3">
          <div
            className="rounded-lg px-3 py-2"
            style={{ background: "rgba(0,122,255,0.06)" }}
          >
            <p className="text-xs font-semibold" style={{ color: "#007aff" }}>
              ❤️ 100% of surplus donated to the Thai Red Cross Society
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/seamun.official"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity duration-200 hover:opacity-60"
              style={{ color: "#6e6e73" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://facebook.com/seamun"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity duration-200 hover:opacity-60"
              style={{ color: "#6e6e73" }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://seamun.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity duration-200 hover:opacity-60"
              style={{ color: "#6e6e73" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
              </svg>
            </a>
          </div>

          <p className="text-xs" style={{ color: "#6e6e73" }}>
            Powered by{" "}
            <a
              href="https://intermun.site"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold transition-colors duration-200"
              style={{ color: "#007aff" }}
            >
              InterMUN
            </a>
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
