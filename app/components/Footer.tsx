"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="px-5 pb-12 pt-8">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t-2 border-[#C4E4F7] pt-8"
        >
          <h3 className="text-lg font-bold text-[#1B2E4A] mb-1">
            SEAMUN I · 2027
          </h3>
          <p className="text-sm text-[#4A6078] mb-4 leading-relaxed">
            Southeast Asian Model United Nations
            <br />
            D-PREP International School, Bangkok
          </p>

          <div className="bg-[#F7E8D0]/60 rounded-xl px-4 py-3 mb-6">
            <p className="text-xs font-semibold text-[#1B2E4A]">
              ❤️ 100% of surplus donated to the Thai Red Cross Society
            </p>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <a
              href="https://instagram.com/seamun.official"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7A8FA3] hover:text-[#1B2E4A] transition-colors duration-200"
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
              className="text-[#7A8FA3] hover:text-[#1B2E4A] transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://seamun.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7A8FA3] hover:text-[#1B2E4A] transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
              </svg>
            </a>
          </div>

          <p className="text-xs text-[#7A8FA3]">
            Powered by{" "}
            <a
              href="https://intermun.site"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#4A6078] hover:text-[#1B2E4A] transition-colors duration-200"
            >
              InterMUN
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
