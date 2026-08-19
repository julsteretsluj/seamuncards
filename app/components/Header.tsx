"use client";

import { useState } from "react";

const navLinks = [
  { label: "About", href: "https://seamun.com/about" },
  { label: "Schedule", href: "#schedule" },
  { label: "InterMUN", href: "https://intermun.site" },
  { label: "WiFi", href: "#wifi" },
  { label: "Login", href: "#delegate-login" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40"
      style={{
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderBottom: "0.5px solid rgba(0,0,0,0.06)",
      }}
    >
      <div className="container-seamun flex items-center justify-between" style={{ height: "3.25rem" }}>
        <a href="/" className="text-base font-bold" style={{ color: "#1d1d1f", letterSpacing: "-0.03em" }}>
          SEAMUN I
        </a>

        <nav className="hidden min-[1100px]:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: "#6e6e73" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1d1d1f")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6e6e73")}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className="min-[1100px]:hidden p-2 -mr-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth={1.8} className="w-5 h-5">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div
          className="min-[1100px]:hidden"
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "saturate(180%) blur(20px)",
            borderTop: "0.5px solid rgba(0,0,0,0.06)",
          }}
        >
          <div className="container-seamun flex flex-col py-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-sm font-medium"
                style={{ color: "#1d1d1f", borderBottom: "0.5px solid rgba(60,60,67,0.12)" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
