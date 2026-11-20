"use client";

import React, { useState } from "react";
import { 
  Server, 
  Cpu, 
  GitFork, 
  Zap, 
  Share2, 
  Boxes, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Compass,
  ArrowDown
} from "lucide-react";

interface LayerData {
  id: string;
  number: string;
  name: string;
  status: "PROTOTYPE IMPLEMENTED" | "IN ACTIVE DEVELOPMENT" | "PLANNED ARCHITECTURE TARGET";
  statusColor: string;
  icon: React.ElementType;
  headline: string;
  description: string;
  mechanisms: string[];
  protocolDetails: {
    label: string;
    value: string;
  }[];
  readinessNote: string;
}

const ARCHITECTURE_LAYERS: LayerData[] = [
  {
    id: "layer-6",
    number: "06",
    name: "AI Training & Inference Workloads",
    status: "PLANNED ARCHITECTURE TARGET",
    statusColor: "text-white/60 bg-white/10 border-white/20",
    icon: Boxes,
    headline: "Unified Application Layer for Distributed AI Models",
    description:
      "A high-level interface allowing large language models, vision transformers, and multi-modal neural networks to execute across pooled heterogeneous hardware without manual hardware-specific partitioning.",
    mechanisms: [
      "Distributed Tensor Parallelism across asymmetric memory buffers",
      "Dynamic Key-Value (KV) cache pooling across local host memory",
      "Adaptive gradient accumulation with delayed parameter updates",
      "Model checkpoint slicing with fault-tolerant worker substitution",
    ],
    protocolDetails: [
      { label: "Target Workloads", value: "Autoregressive LLM Inference & LoRA/Full Fine-Tuning" },
      { label: "Partitioning Strategy", value: "Hybrid Pipeline + 3D Tensor Slicing" },
      { label: "Fault Resilience", value: "Stateless micro-batch re-dispatch upon node dropout" },
    ],
    readinessNote:
      "Conceptual architecture target. Dependent on lower orchestration and execution primitives.",
  },
  {
    id: "layer-5",
    number: "05",
    name: "Inter-Device Communication & Synchronization",
    status: "IN ACTIVE DEVELOPMENT",
    statusColor: "text-[#00E5FF] bg-[#00E5FF]/10 border-[#00E5FF]/30",
    icon: Share2,
    headline: "Resilient Low-Overhead Data Transport for Non-Ideal Networks",
    description:
      "Unlike high-end datacenter clusters bound to uniform InfiniBand switches, ORITHYX LAB handles asymmetric network topologies, packet jitter, and heterogeneous throughput over standard LAN, Wi-Fi 6, and hybrid interconnects.",
    mechanisms: [
      "Bandwidth-weighted All-Reduce ring and tree routing",
      "Adaptive 8-bit & 4-bit gradient quantization with error compensation",
      "Asynchronous parameter pre-fetching based on compute-stride timing",
      "Heartbeat telemetry and dynamic rerouting around congested links",
    ],
    protocolDetails: [
      { label: "Current Interconnect", value: "Local Wi-Fi 6 / 1-10GbE P2P Mesh (Prototype)" },
      { label: "Sync Primitive", value: "Ring & Star Hybrid Gradient Exchange" },
      { label: "Latency Mitigation", value: "Zero-copy serialization with pipelined overlap" },
    ],
    readinessNote:
      "Initial implementation active in local cluster prototype. Wide-area synchronization is in research phase.",
  },
  {
    id: "layer-4",
    number: "04",
    name: "Distributed Execution Substrate",
    status: "IN ACTIVE DEVELOPMENT",
    statusColor: "text-[#00E5FF] bg-[#00E5FF]/10 border-[#00E5FF]/30",
    icon: Zap,
    headline: "Heterogeneous Micro-Kernel Dispatcher and Runtime",
    description:
      "Translates partitioned computational graphs into optimized device-native operations—dispatching matrix multiplications to discrete GPUs, quantized integer layers to NPUs, and memory-intensive layers to host CPU pools.",
    mechanisms: [
      "Hardware-specific kernel selection (Metal, Vulkan, CUDA, OpenCL)",
      "Pipelined micro-batch execution hiding transfer latency behind compute",
      "Dynamic memory paging between system DRAM and VRAM boundaries",
      "Isolated worker process sandboxing for non-disruptive execution",
    ],
    protocolDetails: [
      { label: "Kernel Backends", value: "Vulkan Compute & Device-Agnostic C++ Runtime" },
      { label: "Execution Model", value: "Asynchronous Directed Acyclic Graph (DAG) Dispatch" },
      { label: "Memory Strategy", value: "Interleaved virtual memory buffers" },
    ],
    readinessNote:
      "Core dispatch mechanisms are being benchmarked across mixed Apple Silicon, NVIDIA, and x86 nodes.",
  },
  {
    id: "layer-3",
    number: "03",
    name: "Dynamic Orchestration & Scheduling",
    status: "IN ACTIVE DEVELOPMENT",
    statusColor: "text-[#00E5FF] bg-[#00E5FF]/10 border-[#00E5FF]/30",
    icon: GitFork,
    headline: "Hardware-Aware Workload Decomposition",
    description:
      "The intelligence core of the platform. Evaluates incoming computational graphs against real-time node profiler telemetry, solving an optimization problem to balance memory headroom, compute capacity, and inter-node latency.",
    mechanisms: [
      "Graph partitioning based on FLOP-to-byte ratio matching",
      "Latency-sensitive layer assignment (keeping tightly coupled ops on high-bandwidth peers)",
      "Dynamic load rebalancing when nodes experience thermal throttling",
      "Predictive resource allocation avoiding out-of-memory (OOM) failures",
    ],
    protocolDetails: [
      { label: "Scheduler Algorithm", value: "Constraint-Driven Topological Graph Partitioning" },
      { label: "Optimization Metric", value: "Minimizing Total Pipeline Bubble & Transfer Overhead" },
      { label: "Scheduling State", value: "Distributed consensus with centralized coordinator fallback" },
    ],
    readinessNote:
      "Basic topological scheduling implemented for local Wi-Fi nodes; dynamic thermal-aware rebalancing in development.",
  },
  {
    id: "layer-2",
    number: "02",
    name: "Hardware Discovery & Resource Profiling",
    status: "PROTOTYPE IMPLEMENTED",
    statusColor: "text-[#B8FF2E] bg-[#B8FF2E]/10 border-[#B8FF2E]/30",
    icon: Cpu,
    headline: "Continuous Device Profiling & Capability Fingerprinting",
    description:
      "Continuously scans participating hardware to construct a living map of computational capability—identifying available instruction sets, physical VRAM limits, thermal dissipation rates, and real-time network throughput.",
    mechanisms: [
      "Micro-benchmark probe execution on cluster join",
      "Continuous telemetry monitoring (thermal, memory pressure, power)",
      "Network round-trip time (RTT) matrix calculation between all active peers",
      "Dynamic node state tagging (Available, Constrained, Throttling, Offline)",
    ],
    protocolDetails: [
      { label: "Discovery Mechanism", value: "mDNS / UDP Broadcast Beacon on Local Wi-Fi" },
      { label: "Profile Granularity", value: "VRAM allocation, compute FLOP estimation, bus bandwidth" },
      { label: "Telemetry Cadence", value: "Sub-50ms heartbeat with delta updates" },
    ],
    readinessNote:
      "Operational in the current local-network prototype cluster. Accurately profiles joined local machines.",
  },
  {
    id: "layer-1",
    number: "01",
    name: "Participating Hardware Devices",
    status: "PROTOTYPE IMPLEMENTED",
    statusColor: "text-[#B8FF2E] bg-[#B8FF2E]/10 border-[#B8FF2E]/30",
    icon: Server,
    headline: "The Heterogeneous Physical Hardware Tier",
    description:
      "The physical foundation. Rather than demanding identical server racks, the platform embraces diversity—accommodating developer workstations, consumer graphics cards, mini-PCs, and edge accelerators joined over common networks.",
    mechanisms: [
      "Consumer and workstation GPUs with disparate VRAM footprints",
      "Multi-core host CPUs with large system memory (DDR4/DDR5)",
      "Dedicated NPU and edge tensor accelerators",
      "Standard local network connectivity (Wi-Fi 6 / 6E, Gigabit Ethernet)",
    ],
    protocolDetails: [
      { label: "Supported Physical Hosts", value: "x86_64, ARM64 (Apple Silicon & Linux SBCs)" },
      { label: "Interconnect Physical", value: "Standard 802.11ax Wi-Fi & 1000BASE-T Ethernet" },
      { label: "Minimum Host Requirement", value: "Network connectivity, 8GB Host RAM, OpenCL/Vulkan/Compute API" },
    ],
    readinessNote:
      "Verified in lab testing: multiple physical devices successfully join and establish coordinated cluster state.",
  },
];

export function ArchitectureStack() {
  const [selectedLayerId, setSelectedLayerId] = useState<string>("layer-2");

  const selectedLayer =
    ARCHITECTURE_LAYERS.find((l) => l.id === selectedLayerId) || ARCHITECTURE_LAYERS[1];

  return (
    <div className="w-full space-y-6">
      {/* Editorial Section Intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 font-mono-tech text-xs text-[#B8FF2E] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E]" />
            SECTION 03 // ARCHITECTURAL SUBSTRATE
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            The Six-Layer Heterogeneous Compute Stack
          </h3>
        </div>
        <div className="font-mono-tech text-xs text-white/50 max-w-md">
          A coherent architectural model bridging fragmented physical devices and unified AI execution.
          Inspect each tier to review engineering mechanisms and current development readiness.
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: The 6 Stacked Layers */}
        <div className="lg:col-span-5 space-y-2">
          {ARCHITECTURE_LAYERS.map((layer) => {
            const Icon = layer.icon;
            const isSelected = layer.id === selectedLayerId;

            return (
              <button
                key={layer.id}
                onClick={() => setSelectedLayerId(layer.id)}
                className={`w-full text-left p-4 rounded-sm border transition-all duration-200 group relative ${
                  isSelected
                    ? "bg-[#11141A] border-[#B8FF2E] shadow-[0_0_20px_-5px_rgba(184,255,46,0.2)]"
                    : "bg-[#0A0C0E] border-white/10 hover:border-white/20 hover:bg-[#0E1116]"
                }`}
              >
                {/* Active Indicator Bar */}
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#B8FF2E]" />
                )}

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono-tech text-xs text-white/40 group-hover:text-white/70">
                      {layer.number}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected ? "text-[#B8FF2E]" : "text-white/60 group-hover:text-white"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium tracking-tight ${
                        isSelected ? "text-white font-semibold" : "text-white/80"
                      }`}
                    >
                      {layer.name}
                    </span>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected
                        ? "text-[#B8FF2E] translate-x-0.5"
                        : "text-white/20 group-hover:text-white/50"
                    }`}
                  />
                </div>

                {/* Sub-status pill */}
                <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono-tech">
                  <span
                    className={`inline-block px-2 py-0.5 rounded border ${layer.statusColor}`}
                  >
                    {layer.status}
                  </span>
                  <span className="text-white/30">
                    {layer.id === "layer-1" || layer.id === "layer-2"
                      ? "PROTOTYPE VERIFIED"
                      : layer.id === "layer-3" || layer.id === "layer-5" || layer.id === "layer-4"
                      ? "LAB PROTOTYPING"
                      : "LONG-TERM SPEC"}
                  </span>
                </div>
              </button>
            );
          })}

          <div className="pt-2 flex items-center justify-center gap-2 font-mono-tech text-[11px] text-white/40">
            <ArrowDown className="w-3.5 h-3.5 text-[#B8FF2E]" />
            <span>TOP-DOWN WORKFLOW DISPATCH // BOTTOM-UP RESOURCE HARVESTING</span>
          </div>
        </div>

        {/* Right: Detailed Deep-Dive Telemetry View for Selected Layer */}
        <div className="lg:col-span-7 bg-[#0A0C0E] border border-white/15 p-6 rounded-sm relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />

          <div className="relative z-10 space-y-6">
            {/* Header with Layer Meta */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="font-mono-tech text-xs bg-[#B8FF2E]/15 text-[#B8FF2E] px-2 py-0.5 rounded border border-[#B8FF2E]/30">
                  LAYER {selectedLayer.number}
                </span>
                <h4 className="text-xl font-semibold text-white tracking-tight">
                  {selectedLayer.name}
                </h4>
              </div>

              <span
                className={`font-mono-tech text-xs px-2.5 py-1 rounded border ${selectedLayer.statusColor}`}
              >
                {selectedLayer.status}
              </span>
            </div>

            {/* Headline & Narrative */}
            <div>
              <div className="text-sm font-semibold text-white/90 mb-1.5">
                {selectedLayer.headline}
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                {selectedLayer.description}
              </p>
            </div>

            {/* Mechanisms List */}
            <div>
              <div className="font-mono-tech text-[11px] text-white/40 uppercase tracking-wider mb-2.5">
                ENGINEERING MECHANISMS & ARCHITECTURAL SPECS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedLayer.mechanisms.map((mech, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 bg-[#0E1116] border border-white/10 p-2.5 rounded-sm text-xs text-white/80"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B8FF2E] mt-0.5 shrink-0" />
                    <span>{mech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Protocol Readout Specifications */}
            <div className="border border-white/10 bg-[#08090B] p-3.5 rounded-sm space-y-2 font-mono-tech text-xs">
              <div className="text-[10px] text-white/40 tracking-wider uppercase mb-1">
                PROTOCOL SPECIFICATIONS
              </div>
              {selectedLayer.protocolDetails.map((detail, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 border-b border-white/5 last:border-0 gap-1"
                >
                  <span className="text-white/50 text-[11px]">{detail.label}</span>
                  <span className="text-[#B8FF2E] text-[11px]">{detail.value}</span>
                </div>
              ))}
            </div>

            {/* Readiness & Honesty Disclaimer Note */}
            <div className="flex items-start gap-2.5 p-3 bg-white/5 border border-white/10 rounded-sm font-mono-tech text-[11px] text-white/60">
              <Compass className="w-4 h-4 text-[#00E5FF] mt-0.5 shrink-0" />
              <div>
                <span className="text-white font-medium">Readiness Transparency: </span>
                {selectedLayer.readinessNote}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
