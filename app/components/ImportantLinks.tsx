"use client";

import { motion } from "framer-motion";

const links = [
  {
    title: "seamun.com",
    description: "Main conference website",
    url: "https://seamun.com",
    color: "border-[#C4E4F7]",
  },
  {
    title: "intermun.site",
    description: "Digital MUN platform",
    url: "https://intermun.site",
    color: "border-[#E8DFF5]",
  },
  {
    title: "Committee documents",
    description: "Study guides & background papers",
    url: "#",
    color: "border-[#D4F0E7]",
  },
  {
    title: "@seamun.official",
    description: "Instagram",
    url: "https://instagram.com/seamun.official",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    color: "border-[#F5DFE8]",
  },
  {
    title: "SEAMUN on Facebook",
    description: "Updates and photos",
    url: "https://facebook.com/seamun",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    color: "border-[#C4E4F7]",
  },
];

export default function ImportantLinks() {
  return (
    <section className="px-5 pb-20">
      <div className="max-w-lg mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-[#1B2E4A] mb-6"
        >
          Important links
        </motion.h2>
        <div className="flex flex-col gap-3">
          {links.map((link, i) => (
            <motion.a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`bg-white/50 border-2 ${link.color} rounded-xl px-5 py-4 flex items-center justify-between hover:bg-white/70 hover:shadow-sm transition-all duration-300 group`}
            >
              <div className="flex items-center gap-3">
                {link.icon && (
                  <span className="text-[#4A6078]">{link.icon}</span>
                )}
                <div>
                  <div className="text-sm font-semibold text-[#1B2E4A]">
                    {link.title}
                  </div>
                  {link.description && (
                    <div className="text-xs text-[#7A8FA3]">
                      {link.description}
                    </div>
                  )}
                </div>
              </div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-4 h-4 text-[#7A8FA3] group-hover:translate-x-0.5 transition-transform duration-200"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
