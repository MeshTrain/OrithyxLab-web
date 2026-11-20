"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Menu, X, Terminal, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#08090B]/90 backdrop-blur-md border-b border-white/10 py-3"
            : "bg-transparent border-b border-white/5 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Brandmark */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B8FF2E]"
              aria-label="ORITHYX LAB Homepage"
            >
              {/* Geometric Brandmark */}
              <div className="w-8 h-8 rounded-sm bg-[#0E1116] border border-white/15 flex items-center justify-center p-1.5 group-hover:border-[#B8FF2E]/60 transition-colors">
                <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
                  <path
                    d="M16 4L26 10V22L16 28L6 22V10L16 4Z"
                    stroke="rgba(244,244,240,0.5)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M16 9L22 12.5V19.5L16 23L10 19.5V12.5L16 9Z"
                    fill="rgba(184,255,46,0.15)"
                    stroke="#B8FF2E"
                    strokeWidth="1.75"
                  />
                  <circle cx="16" cy="16" r="2" fill="#B8FF2E" />
                </svg>
              </div>

              {/* Typographic Wordmark */}
              <div className="flex flex-col">
                <span className="font-semibold text-white tracking-widest text-sm uppercase group-hover:text-[#B8FF2E] transition-colors">
                  ORITHYX <span className="font-light text-white/70">LAB</span>
                </span>
                <span className="font-mono-tech text-[9px] text-white/40 tracking-wider">
                  DISTRIBUTED COMPUTE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Items */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-mono-tech text-xs text-white/70 hover:text-white transition-colors flex items-center gap-1.5 py-1 group"
                >
                  <span className="text-white/30 text-[10px] group-hover:text-[#B8FF2E] transition-colors">
                    {item.id}
                  </span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Status Indicator & CTA */}
            <div className="hidden sm:flex items-center gap-4">
              {/* Lab Status Pill */}
              <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded bg-[#0E1116] border border-white/10 font-mono-tech text-[10px] text-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E] animate-pulse" />
                <span>PROTOTYPE: LOCAL CLUSTER</span>
              </div>

              {/* Action Button */}
              <Link
                href="#contact"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#F4F4F0] text-black font-medium text-xs hover:bg-[#B8FF2E] transition-all duration-200"
              >
                <span>Initiate Dialogue</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-sm border border-white/10 text-white hover:text-[#B8FF2E] hover:border-white/30 transition-colors"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#08090B]/98 backdrop-blur-xl lg:hidden flex flex-col pt-20 px-6 pb-8 border-b border-white/10 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col space-y-4 py-4 border-b border-white/10">
            <div className="font-mono-tech text-xs text-[#B8FF2E] flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              NAVIGATION DIRECTORY
            </div>
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-lg text-white/80 hover:text-[#B8FF2E] py-2 border-b border-white/5 font-mono-tech"
              >
                <span>{item.label}</span>
                <span className="text-xs text-white/40">{item.id}</span>
              </Link>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <div className="p-3 bg-[#0E1116] border border-white/10 rounded-sm font-mono-tech text-xs text-white/60">
              <div className="text-[10px] text-white/40 uppercase mb-1">CURRENT STATUS</div>
              <div className="text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8FF2E]" />
                {siteConfig.status.currentMilestone}
              </div>
            </div>

            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#B8FF2E] text-black font-semibold text-sm rounded-sm"
            >
              <span>Initiate Dialogue</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <div className="text-center font-mono-tech text-xs text-white/40 pt-2">
              ORITHYX LAB • {siteConfig.domain}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
