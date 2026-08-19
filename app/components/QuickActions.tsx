"use client";

import { motion } from "framer-motion";

const actions = [
  {
    label: "WiFi details",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M2 8.82a15 15 0 0 1 20 0" strokeLinecap="round" />
        <path d="M5 12.86a10 10 0 0 1 14 0" strokeLinecap="round" />
        <path d="M8.5 16.43a5 5 0 0 1 7 0" strokeLinecap="round" />
        <circle cx="12" cy="20" r="1" fill="currentColor" />
      </svg>
    ),
    href: "#wifi",
    color: "bg-[#D4F0E7]",
  },
  {
    label: "Full schedule",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    href: "#schedule",
    color: "bg-[#E8DFF5]",
  },
  {
    label: "seamun.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
      </svg>
    ),
    href: "https://seamun.com",
    color: "bg-[#F7E8D0]",
    external: true,
  },
  {
    label: "InterMUN",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    href: "https://intermun.site",
    color: "bg-[#F5DFE8]",
    external: true,
  },
  {
    label: "Emergency",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    href: "tel:+66812345678",
    color: "bg-red-50",
    subtitle: "+66 81 234 5678",
  },
];

export default function QuickActions() {
  return (
    <section className="px-5 pb-16">
      <div className="max-w-lg mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-[#1B2E4A] mb-6"
        >
          Quick actions
        </motion.h2>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, i) => (
            <motion.a
              key={action.label}
              href={action.href}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`${action.color} rounded-xl p-4 flex flex-col gap-2 hover:shadow-md transition-shadow duration-300 ${i === 0 ? "row-span-1" : ""}`}
              style={{ minHeight: i % 3 === 0 ? "110px" : "100px" }}
            >
              <span className="text-[#1B2E4A]">{action.icon}</span>
              <span className="text-sm font-semibold text-[#1B2E4A]">
                {action.label}
              </span>
              {action.subtitle && (
                <span className="text-xs text-[#4A6078]">{action.subtitle}</span>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
