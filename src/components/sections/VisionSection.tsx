"use client";

import React from "react";
import { Sparkles, Terminal, Network, ShieldCheck, Compass, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function VisionSection() {
  return (
    <section className="py-24 border-b border-white/10 bg-[#0A0C0E] relative overflow-hidden">
      {/* Background architectural grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#B8FF2E]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0E1116] border border-white/15 font-mono-tech text-xs text-[#B8FF2E]">
            <Compass className="w-3.5 h-3.5" />
            <span>THE LONG-TERM HORIZON</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight">
            A future where compute behaves as a continuous, unified substrate.
          </h2>

          <div className="space-y-4 text-white/70 text-base sm:text-lg leading-relaxed font-normal pt-2">
            <p>
              Computing today remains rigidly bound to physical machine chassis. If an AI workload
              requires 80 gigabytes of VRAM, an engineer must either procure an individual machine
              possessing that exact capacity or abandon the experiment.
            </p>
            <p className="text-white/80">
              ORITHYX LAB envisions a different architecture: one where computational capability is
              decoupled from physical enclosure constraints. In this future, any device with spare
              cycles and memory—whether on a local desk, in a university lab, or across a distributed
              network—can seamlessly coordinate to execute demanding models.
            </p>
          </div>

          {/* Core Tenets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 text-left">
            <div className="bg-[#08090B] border border-white/10 p-6 rounded-sm space-y-3">
              <div className="font-mono-tech text-xs text-[#B8FF2E]">TENET 01 //</div>
              <h3 className="text-base font-semibold text-white">Silicon Agnosticism</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Workloads must not depend on homogeneous hardware monocultures. Software should adapt
                dynamically to whatever silicon is available.
              </p>
            </div>

            <div className="bg-[#08090B] border border-white/10 p-6 rounded-sm space-y-3">
              <div className="font-mono-tech text-xs text-[#00E5FF]">TENET 02 //</div>
              <h3 className="text-base font-semibold text-white">Network Resilience</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Distributed computing cannot assume perpetual gigabit perfection. Protocols must thrive
                over real-world network fluctuations, latency jitter, and dynamic topology changes.
              </p>
            </div>

            <div className="bg-[#08090B] border border-white/10 p-6 rounded-sm space-y-3">
              <div className="font-mono-tech text-xs text-[#FFB020]">TENET 03 //</div>
              <h3 className="text-base font-semibold text-white">Democratized Access</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                By making fragmented hardware usable together, we dramatically lower the capital
                threshold required to explore frontier artificial intelligence.
              </p>
            </div>
          </div>

          {/* Action Link */}
          <div className="pt-8">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-[#B8FF2E] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#cbfb4c] transition-colors"
            >
              <span>Engage with the Research Lab</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
