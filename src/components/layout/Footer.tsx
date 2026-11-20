"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Terminal, Shield, ArrowUp, X, Check } from "lucide-react";

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<"TERMS" | "PRIVACY" | "DISCLAIMER">("DISCLAIMER");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const openModal = (type: "TERMS" | "PRIVACY" | "DISCLAIMER") => {
    setModalContent(type);
    setLegalModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-[#050608] border-t border-white/10 text-white/70 py-16 font-mono-tech text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Column 1: Identity & Ambition */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-sm bg-[#0E1116] border border-white/20 flex items-center justify-center p-1 text-[#B8FF2E]">
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
                  </svg>
                </div>
                <span className="font-semibold text-white tracking-widest text-sm uppercase">
                  ORITHYX <span className="font-light text-white/70">LAB</span>
                </span>
              </div>

              <p className="text-white/60 font-sans text-xs leading-relaxed max-w-sm">
                Building foundational infrastructure that makes distributed heterogeneous computing
                resources usable as a unified substrate for AI training and inference.
              </p>

              <div className="pt-2 text-[11px] text-white/40 space-y-1">
                <div>OFFICIAL DOMAIN: {siteConfig.domain}</div>
                <div>OFFICIAL CONTACT: {siteConfig.contactEmail}</div>
              </div>
            </div>

            {/* Column 2: Architecture Navigation */}
            <div className="md:col-span-4 space-y-3">
              <div className="text-white/40 uppercase tracking-wider text-[11px]">
                ARCHITECTURAL DIRECTORY
              </div>
              <ul className="space-y-2">
                {siteConfig.navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/60 hover:text-[#B8FF2E] transition-colors flex items-center gap-2"
                    >
                      <span className="text-white/30 text-[10px]">{item.id}</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Telemetry & Lab Specs */}
            <div className="md:col-span-3 space-y-3">
              <div className="text-white/40 uppercase tracking-wider text-[11px]">
                LAB STATUS SPECIFICATION
              </div>
              <div className="p-3 bg-[#0A0C0E] border border-white/10 rounded-sm space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-white/40">PHASE</span>
                  <span className="text-[#B8FF2E]">{siteConfig.status.phase}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">INTERCONNECT</span>
                  <span className="text-white">Local Wi-Fi Mesh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">WORKLOAD</span>
                  <span className="text-white">Heterogeneous Sync</span>
                </div>
              </div>

              <button
                onClick={scrollToTop}
                className="mt-2 w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm text-white/70 hover:text-white flex items-center justify-center gap-2 transition-colors text-[11px]"
              >
                <span>Back to Zenith</span>
                <ArrowUp className="w-3.5 h-3.5 text-[#B8FF2E]" />
              </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
            <div>
              © {currentYear} {siteConfig.name}. All rights reserved. Canonical domain: {siteConfig.canonicalUrl}.
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => openModal("DISCLAIMER")}
                className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20"
              >
                Research Transparency Note
              </button>
              <span>•</span>
              <button
                onClick={() => openModal("PRIVACY")}
                className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20"
              >
                Privacy Notice
              </button>
              <span>•</span>
              <button
                onClick={() => openModal("TERMS")}
                className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20"
              >
                Terms of Use
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Accessible Legal / Transparency Modal */}
      {legalModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#0E1116] border border-white/20 max-w-lg w-full p-6 rounded-sm space-y-4 font-mono-tech text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Shield className="w-4 h-4 text-[#B8FF2E]" />
                <span>
                  {modalContent === "DISCLAIMER"
                    ? "RESEARCH TRANSPARENCY DISCLAIMER"
                    : modalContent === "PRIVACY"
                    ? "DATA PRIVACY NOTICE"
                    : "TERMS OF USE"}
                </span>
              </div>
              <button
                onClick={() => setLegalModalOpen(false)}
                className="p-1 text-white/40 hover:text-white"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-white/70 space-y-3 font-sans text-xs leading-relaxed max-h-80 overflow-y-auto pr-1">
              {modalContent === "DISCLAIMER" && (
                <>
                  <p>
                    <strong>Development Stage Statement:</strong> ORITHYX LAB is an early-stage AI
                    infrastructure research initiative. Our current milestone is an initial prototype
                    wherein multiple heterogeneous devices join and coordinate over a local Wi-Fi
                    network.
                  </p>
                  <p>
                    References to wide-area distributed execution, global compute networks, and
                    autonomous scheduling represent our technical roadmap and design architecture,
                    not validated commercial products or production-scale deployments.
                  </p>
                  <p>
                    All technical descriptions are provided for scientific discussion and prospective
                    research collaboration purposes.
                  </p>
                </>
              )}

              {modalContent === "PRIVACY" && (
                <>
                  <p>
                    <strong>Privacy Commitment:</strong> ORITHYX LAB respects digital sovereignty.
                    This website does not store third-party advertising cookies, does not collect
                    biometric data, and does not sell visitor information.
                  </p>
                  <p>
                    Direct communications initiated via {siteConfig.contactEmail} are handled with
                    strict confidentiality for technical collaboration and inquiry resolution.
                  </p>
                </>
              )}

              {modalContent === "TERMS" && (
                <>
                  <p>
                    <strong>Terms of Use:</strong> All intellectual property, architectural models,
                    visualizations, and brand assets displayed on orithyxlab.com are the property of
                    ORITHYX LAB.
                  </p>
                  <p>
                    Content may not be repurposed for commercial reproduction without written authorization
                    from the lab.
                  </p>
                </>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setLegalModalOpen(false)}
                className="px-4 py-2 bg-[#B8FF2E] text-black font-semibold text-xs rounded-sm hover:bg-[#cbfb4c]"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
