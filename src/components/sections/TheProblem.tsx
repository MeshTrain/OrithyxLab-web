"use client";

import React from "react";
import { AlertCircle, Layers, MemoryStick, Cpu, DollarSign, Database } from "lucide-react";

export function TheProblem() {
  const frictionPoints = [
    {
      index: "01",
      title: "The VRAM & Capacity Wall",
      tag: "MEMORY CHASM",
      description:
        "Modern neural models require tens to hundreds of gigabytes of high-bandwidth memory simply to reside in hardware. When a model's parameter footprint exceeds a single machine's local VRAM, execution halts completely—forcing developers into expensive multi-GPU monolithic nodes or aggressive quantization compromises.",
    },
    {
      index: "02",
      title: "Fragmented, Dormant Silicon",
      tag: "RESOURCE STRANDING",
      description:
        "A staggering volume of computational capability already exists in developer workstations, lab machines, edge devices, and independent data environments. Yet because these systems possess different architectures, memory hierarchies, and interconnects, they remain isolated islands, unable to pool capacity.",
    },
    {
      index: "03",
      title: "Monopolistic Compute Inflation",
      tag: "CAPITAL BARRIER",
      description:
        "Access to specialized enterprise AI accelerator clusters is concentrated among hyperscalers. Skyrocketing hourly rental rates, long multi-year reserve commitments, and waitlists lock independent engineers, early-stage startups, and academic researchers out of cutting-edge model experimentation.",
    },
    {
      index: "04",
      title: "Heterogeneity Friction",
      tag: "SOFTWARE INCOMPATIBILITY",
      description:
        "Existing distributed frameworks (e.g. standard Megatron, DeepSpeed) implicitly assume homogeneous, tightly synchronized clusters linked by uniform InfiniBand fabrics. They falter or collapse when faced with the real-world mix of asymmetric clock rates, fluctuating network throughput, and disparate memory buses.",
    },
  ];

  return (
    <section id="problem" className="py-24 border-b border-white/10 bg-[#0A0C0E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2 font-mono-tech text-xs text-[#B8FF2E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E]" />
            SECTION 02 // THE INFRASTRUCTURE BOTTLENECK
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
            The compute chasm in modern AI development.
          </h2>
          <p className="text-base text-white/70 leading-relaxed">
            AI progress is structurally throttled not by a lack of raw silicon worldwide, but by an
            orchestration deficit: the inability to coordinate disparate, non-uniform devices into a
            coherent computational engine.
          </p>
        </div>

        {/* 4-Card Friction Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {frictionPoints.map((item) => (
            <div
              key={item.index}
              className="group bg-[#0E1116] border border-white/10 hover:border-white/20 p-8 rounded-sm relative overflow-hidden transition-all duration-200"
            >
              {/* Subtle top indicator line on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#B8FF2E] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between font-mono-tech text-xs mb-6">
                <span className="text-[#B8FF2E]">{item.index} //</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50 text-[10px]">
                  {item.tag}
                </span>
              </div>

              <h3 className="text-xl font-medium text-white mb-3 tracking-tight">
                {item.title}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comparative Analytical Matrix */}
        <div className="mt-12 bg-[#08090B] border border-white/15 p-6 rounded-sm">
          <div className="font-mono-tech text-xs text-white/40 mb-4 uppercase tracking-wider flex items-center justify-between border-b border-white/10 pb-3">
            <span>PARADIGM COMPARISON: MONOLITHIC SILO VS. ORITHYX UNIFIED SUBSTRATE</span>
            <span className="text-[#B8FF2E]">ARCHITECTURAL ANALYSIS</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono-tech text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-3 px-4 font-normal">DIMENSION</th>
                  <th className="py-3 px-4 font-normal">CONVENTIONAL DATACENTER CLUSTERS</th>
                  <th className="py-3 px-4 font-normal text-[#B8FF2E]">ORITHYX LAB APPROACH</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="py-3 px-4 text-white font-medium">Hardware Topology</td>
                  <td className="py-3 px-4">Strictly homogeneous (identical GPU racks)</td>
                  <td className="py-3 px-4 text-white">Heterogeneous (mixed GPUs, CPUs, NPUs, memory)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white font-medium">Interconnect Assumption</td>
                  <td className="py-3 px-4">Costly, proprietary low-latency fabric (InfiniBand/NVLink)</td>
                  <td className="py-3 px-4 text-white">Standard network resilience (Local Wi-Fi / GbE / Mesh)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white font-medium">Workload Partitioning</td>
                  <td className="py-3 px-4">Static symmetric tensor/pipeline parallelism</td>
                  <td className="py-3 px-4 text-white">Dynamic, hardware-aware task graph decomposition</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white font-medium">Resource Utilization</td>
                  <td className="py-3 px-4">Idle capacity outside high-cost clusters is wasted</td>
                  <td className="py-3 px-4 text-white">Aggregates dormant local and distributed silicon</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
