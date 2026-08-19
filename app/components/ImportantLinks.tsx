"use client";

import { motion } from "framer-motion";

const links = [
  {
    title: "seamun.com",
    description: "Main conference website",
    url: "https://seamun.com",
  },
  {
    title: "intermun.site",
    description: "Digital MUN platform",
    url: "https://intermun.site",
  },
  {
    title: "@seamun.official",
    description: "Instagram",
    url: "https://instagram.com/seamun.official",
  },
  {
    title: "SEAMUN on Facebook",
    description: "Updates and photos",
    url: "https://facebook.com/seamun",
  },
];

export default function ImportantLinks() {
  return (
    <section className="w-full elevated-card">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold mb-5"
        style={{ color: "#1d1d1f" }}
      >
        Important links
      </motion.h2>
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "#ffffff", border: "0.5px solid rgba(0,0,0,0.06)" }}
      >
        {links.map((link, i) => (
          <motion.a
            key={link.title}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className="flex items-center justify-between px-4 py-3.5 transition-colors duration-150 group"
            style={{
              borderBottom: i < links.length - 1 ? "0.5px solid rgba(60,60,67,0.12)" : "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f2f2f7")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div>
              <div className="text-sm font-semibold" style={{ color: "#1d1d1f" }}>
                {link.title}
              </div>
              {link.description && (
                <div className="text-xs" style={{ color: "#6e6e73" }}>
                  {link.description}
                </div>
              )}
            </div>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c7c7cc"
              strokeWidth={2.5}
              className="w-4 h-4 shrink-0 ml-3"
            >
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
