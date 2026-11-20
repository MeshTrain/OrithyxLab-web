"use client";

import React from "react";
import { CheckCircle2, Clock, Compass, Layers, Network, ArrowRight } from "lucide-react";

export function DevelopmentRoadmap() {
  const roadmapStages = [
    {
      phase: "STAGE 01",
      title: "Local Compute Cluster",
      status: "CURRENT PROTOTYPE",
      badgeColor: "text-[#B8FF2E] bg-[#B8FF2E]/10 border-[#B8FF2E]/30",
      isCurrent: true,
      description:
        "Initial working prototype demonstrating multi-device discovery, connection, and coordinated state over a shared local Wi-Fi / LAN network.",
      milestones: [
        "Peer-to-peer mDNS discovery and beacon verification",
        "Basic task distribution across joined local client nodes",
        "Heartbeat synchronization and connection state monitoring",
        "Initial verification that separate physical machines can join one cluster",
      ],
      currentScope:
        "Demonstrated in lab conditions across local Wi-Fi with consumer-grade devices.",
    },
    {
      phase: "STAGE 02",
      title: "Heterogeneous Orchestration",
      status: "IN ACTIVE DEVELOPMENT",
      badgeColor: "text-[#00E5FF] bg-[#00E5FF]/10 border-[#00E5FF]/30",
      isCurrent: false,
      description:
        "Building the intelligent scheduling layer capable of profiling diverse hardware attributes and dynamically partitioning computational graphs.",
      milestones: [
        "Automated device capability profiling (VRAM, memory bandwidth, compute TOPS)",
        "Constraint-driven graph partitioning for tensor operations",
        "Asymmetric load balancing based on real-time thermal and latency metrics",
        "Memory paging between host system RAM and discrete GPU VRAM",
      ],
      currentScope:
        "Core scheduling algorithms and kernel benchmarks under active research.",
    },
    {
      phase: "STAGE 03",
      title: "Distributed AI Infrastructure",
      status: "DEVELOPMENT TARGET",
      badgeColor: "text-white/60 bg-white/10 border-white/20",
      isCurrent: false,
      description:
        "Executing full-scale model training and distributed autoregressive inference workloads across the heterogeneous cluster.",
      milestones: [
        "Pipeline-parallel and tensor-sliced model execution (e.g. 70B+ LLMs)",
        "Fault-tolerant worker re-dispatch upon dynamic node disconnection",
        "Adaptive low-bit gradient compression over non-ideal network connections",
        "Drop-in runtime integration with standard AI frameworks",
      ],
      currentScope:
        "Architectural target following validation of lower orchestration primitives.",
    },
    {
      phase: "STAGE 04",
      title: "Broader Compute Network",
      status: "LONG-TERM VISION",
      badgeColor: "text-white/40 bg-white/5 border-white/10",
      isCurrent: false,
      description:
        "Extending the coordination layer beyond single local networks to support geographically distributed, community-driven, and hybrid compute pools.",
      milestones: [
        "Peer-to-peer WAN coordination across heterogeneous network environments",
        "Cryptographic proof-of-execution and verification of compute integrity",
        "Decentralized resource matching and cooperative compute sharing",
        "Resilient, latency-tolerant asynchronous gradient aggregation",
      ],
      currentScope:
        "Long-term research direction. Dependent on wide-area transport research.",
    },
  ];

  return (
    <section id="roadmap" className="py-24 border-b border-white/10 bg-[#08090B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 font-mono-tech text-xs text-[#B8FF2E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E]" />
              SECTION 06 // DEVELOPMENT TRAJECTORY
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
              Progress & engineering roadmap.
            </h2>
          </div>
          <div className="font-mono-tech text-xs text-white/50 max-w-sm">
            We are intentionally transparent about where we stand today. This progression maps our
            staged engineering path from our present local prototype to our long-term vision.
          </div>
        </div>

        {/* Roadmap Progression Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmapStages.map((stage, idx) => (
            <div
              key={stage.phase}
              className={`p-6 rounded-sm border flex flex-col justify-between transition-all duration-200 relative ${
                stage.isCurrent
                  ? "bg-[#11151D] border-[#B8FF2E] shadow-[0_0_25px_-5px_rgba(184,255,46,0.15)]"
                  : "bg-[#0A0C0E] border-white/10 hover:border-white/20"
              }`}
            >
              {stage.isCurrent && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#B8FF2E]" />
              )}

              <div>
                <div className="flex items-center justify-between mb-4 font-mono-tech text-xs">
                  <span className={stage.isCurrent ? "text-[#B8FF2E]" : "text-white/40"}>
                    {stage.phase}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded border ${stage.badgeColor}`}
                  >
                    {stage.status}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2.5 tracking-tight">
                  {stage.title}
                </h3>

                <p className="text-xs text-white/70 leading-relaxed mb-6">
                  {stage.description}
                </p>

                <div className="space-y-2.5 border-t border-white/5 pt-4">
                  <div className="font-mono-tech text-[10px] text-white/40 uppercase tracking-wider">
                    KEY OBJECTIVES
                  </div>
                  {stage.milestones.map((m, mIdx) => (
                    <div key={mIdx} className="flex items-start gap-2 text-xs text-white/80">
                      <span className="font-mono-tech text-white/30 text-[10px] mt-0.5">
                        [0{mIdx + 1}]
                      </span>
                      <span className="text-[11px]">{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 font-mono-tech text-[10px] text-white/50">
                <span className="text-white/30 uppercase">SCOPE: </span>
                <span>{stage.currentScope}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Development Honesty Callout */}
        <div className="mt-12 p-5 bg-[#0E1116] border border-white/15 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono-tech text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#B8FF2E] animate-pulse shrink-0" />
            <span className="text-white">
              Current Development Baseline: Local-network multi-device cluster prototype is functional in lab testing.
            </span>
          </div>
          <div className="text-white/40 text-[11px]">
            NEXT MILESTONE: DYNAMIC GRAPH PARTITIONING & THERMAL SCHEDULING
          </div>
        </div>
      </div>
    </section>
  );
}
