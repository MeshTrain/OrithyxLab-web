"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { HeterogeneousComputeVisualizer } from "@/components/visualizer/HeterogeneousComputeVisualizer";
import { ArrowDown, ArrowUpRight, Cpu, Network, ShieldCheck, Terminal } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="vision"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-white/10 bg-[#08090B] overflow-hidden"
    >
      {/* Precision grid backdrop */}
      <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B8FF2E]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Telemetry Stamp */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-8 font-mono-tech text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E]" />
            <span className="text-white/80">SYS.ID: ORITHYX-INFRA-01</span>
            <span className="text-white/30">|</span>
            <span className="text-[#B8FF2E]">RESEARCH PROTOTYPE ACTIVE</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-white/40">
            <span>COORDINATE: 51.5074°N / 0.1278°W</span>
            <span>SPEC: HETEROGENEOUS ORCHESTRATION</span>
          </div>
        </div>

        {/* Editorial Headline & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0E1116] border border-white/15 font-mono-tech text-[11px] text-[#B8FF2E]">
              <Terminal className="w-3.5 h-3.5" />
              <span>DISTRIBUTED AI INFRASTRUCTURE</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.05]">
              Compute without <br className="hidden sm:inline" />
              <span className="text-[#F4F4F0] underline decoration-[#B8FF2E]/60 underline-offset-8">
                boundaries.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/70 max-w-2xl font-normal leading-relaxed">
              ORITHYX LAB is building the foundational software layer to coordinate fragmented,
              heterogeneous hardware into a unified compute substrate for AI model training and
              distributed inference.
            </p>

            {/* Calls to Action */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#architecture"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-[#B8FF2E] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#cbfb4c] transition-colors shadow-[0_0_20px_-3px_rgba(184,255,46,0.35)]"
              >
                <span>Explore the Technology</span>
                <ArrowDown className="w-4 h-4" />
              </Link>

              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-[#0E1116] border border-white/20 text-white font-medium text-xs uppercase tracking-wider hover:bg-[#151921] hover:border-white/40 transition-colors"
              >
                <span>Discuss a Partnership</span>
                <ArrowUpRight className="w-4 h-4 text-[#B8FF2E]" />
              </Link>
            </div>
          </div>

          {/* Right Status Metadata Card */}
          <div className="lg:col-span-4 bg-[#0A0C0E] border border-white/10 p-5 rounded-sm space-y-4 font-mono-tech text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-white/40 uppercase">DEVELOPMENT CADENCE</span>
              <span className="text-[#B8FF2E] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E] animate-ping" />
                LAB ITERATION
              </span>
            </div>

            <div className="space-y-3 text-white/70">
              <div>
                <div className="text-white/40 text-[10px]">CURRENT PROTOTYPE</div>
                <div className="text-white font-medium mt-0.5">
                  Multi-device cluster synchronized over shared local Wi-Fi.
                </div>
              </div>

              <div>
                <div className="text-white/40 text-[10px]">TARGET WORKLOAD CLASS</div>
                <div className="text-white font-medium mt-0.5">
                  Partitioned autoregressive transformer inference & parameter updates.
                </div>
              </div>

              <div>
                <div className="text-white/40 text-[10px]">HARDWARE AGNOSTICISM</div>
                <div className="text-white font-medium mt-0.5">
                  Discrete GPUs, host CPUs, systolic NPUs, pooled system DRAM.
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 text-[11px] text-white/40 flex items-center justify-between">
              <span>STATUS: TRANSPARENT EARLY-STAGE</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
            </div>
          </div>
        </div>

        {/* The Signature Visual Centerpiece */}
        <div className="w-full mt-4">
          <div className="mb-2 flex items-center justify-between font-mono-tech text-xs text-white/50 px-1">
            <span className="flex items-center gap-2">
              <Network className="w-3.5 h-3.5 text-[#B8FF2E]" />
              <span>LIVE COMPUTATIONAL TOPOLOGY MODEL</span>
            </span>
            <span className="text-white/30 hidden sm:inline">
              INTERACTIVE SCHEDULER & PACKET FLOW SIMULATION
            </span>
          </div>

          <HeterogeneousComputeVisualizer />
        </div>
      </div>
    </section>
  );
}
