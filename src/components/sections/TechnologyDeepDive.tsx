"use client";

import React, { useState } from "react";
import { 
  Cpu, 
  GitBranch, 
  Workflow, 
  Network, 
  Sliders, 
  Boxes,
  Code2,
  Terminal,
  ArrowRight
} from "lucide-react";

interface TechPillar {
  id: string;
  category: string;
  title: string;
  status: "ACTIVE LAB RESEARCH" | "PROTOTYPE CORE" | "DEVELOPMENT SPEC";
  tag: string;
  summary: string;
  technicalDetails: string[];
  codeSnippet: string;
}

const TECH_PILLARS: TechPillar[] = [
  {
    id: "hetero-mgmt",
    category: "PILLAR 01",
    title: "Heterogeneous Resource Discovery & Profiling",
    status: "PROTOTYPE CORE",
    tag: "HARDWARE PROFILING",
    summary:
      "Continuous runtime capability fingerprinting. Rather than treating nodes as opaque black boxes, the system interrogates memory hierarchy, compute microarchitectures, thermal ceilings, and communication latency to form a real-time topology map.",
    technicalDetails: [
      "Dynamic probe kernels executed upon cluster join to measure real matrix-multiplication throughput",
      "Continuous tracking of memory headroom, thermal throttling thresholds, and PCIe/bus saturation",
      "Construction of an inter-device RTT latency matrix updated over periodic sub-millisecond heartbeats",
    ],
    codeSnippet: `// Topology Profiler Node Descriptor
struct DeviceProfile {
    node_id: Uuid,
    arch: SiliconClass::HeterogeneousMix,
    vram_allocatable_bytes: 17_179_869_184, // 16GB
    host_dram_bytes: 68_719_476_736,       // 64GB
    measured_tflops_fp16: 64.2,
    bus_bandwidth_gbps: 1.85,             // Wi-Fi 6 Mesh
    thermal_headroom_celsius: 18.4,
};`,
  },
  {
    id: "hw-aware-orch",
    category: "PILLAR 02",
    title: "Hardware-Aware Workload Scheduling",
    status: "ACTIVE LAB RESEARCH",
    tag: "GRAPH SCHEDULING",
    summary:
      "Constraint-driven graph partitioning that slices computation not arbitrarily, but strictly in alignment with the physical attributes of each participating unit.",
    technicalDetails: [
      "Graph cut algorithms that place high-communication tensor operations on co-located or low-latency devices",
      "Offloading memory-intensive attention caches and embedding tables to host system memory pools",
      "Dynamic pipeline rebalancing to minimize synchronization idle time (pipeline bubble reduction)",
    ],
    codeSnippet: `// Graph Partitioning Constraint Solver
fn solve_optimal_sharding(
    computational_graph: &ComputationGraph,
    topology_mesh: &DeviceProfileMatrix,
) -> PartitionSchedule {
    let memory_constraints = evaluate_headroom(topology_mesh);
    let communication_cost = compute_edge_latency_weights(topology_mesh);
    
    // Minimize total pipeline bubble across asymmetric compute nodes
    schedule_asymmetric_dag(computational_graph, memory_constraints, communication_cost)
}`,
  },
  {
    id: "dist-exec",
    category: "PILLAR 03",
    title: "Distributed Asymmetric Execution",
    status: "ACTIVE LAB RESEARCH",
    tag: "RUNTIME DISPATCH",
    summary:
      "A modular runtime that executes decomposed computational subgraphs across diverse execution backends simultaneously, hiding transfer overhead behind pipelined execution.",
    technicalDetails: [
      "Backend-agnostic micro-kernel execution across Vulkan Compute, Metal, and native compute abstractions",
      "Asynchronous double-buffering overlapping layer computation with network gradient exchange",
      "Graceful degradation protocols allowing transparent worker recovery without full cluster failure",
    ],
    codeSnippet: `// Asynchronous Micro-Batch Execution Loop
async fn execute_layer_pipeline(
    layer_slice: &PartitionedLayer,
    input_tensor: DeviceTensorHandle,
) -> Result<DeviceTensorHandle, ExecutionError> {
    let compute_future = dispatch_device_kernel(layer_slice, &input_tensor);
    let prefetch_future = prefetch_next_weights(layer_slice.next_stage_id);
    
    // Concurrent compute execution and parameter pre-fetch
    let (output, _) = tokio::join!(compute_future, prefetch_future);
    Ok(output)
}`,
  },
  {
    id: "inter-dev-comm",
    category: "PILLAR 04",
    title: "Inter-Device Communication & Bus Synchronization",
    status: "PROTOTYPE CORE",
    tag: "ADAPTIVE SYNC",
    summary:
      "Communication protocols engineered specifically for non-ideal, non-datacenter network fabrics where bandwidth is asymmetric and packet jitter is normal.",
    technicalDetails: [
      "Bandwidth-proportional All-Reduce ring topologies where fast links shoulder higher gradient routing",
      "Adaptive gradient quantization compressing tensors to INT8 or INT4 with error feedback accumulation",
      "Zero-copy serialization minimizing host CPU context switches during high-frequency sync",
    ],
    codeSnippet: `// Bandwidth-Weighted Ring All-Reduce Step
fn build_asymmetric_ring(nodes: &[DeviceProfile]) -> RingTopology {
    let mut sorted = nodes.to_vec();
    // Order nodes by measured bidirectional throughput to prevent head-of-line blocking
    sorted.sort_by(|a, b| b.bus_bandwidth_gbps.partial_cmp(&a.bus_bandwidth_gbps).unwrap());
    
    RingTopology::new(sorted)
}`,
  },
  {
    id: "workload-coord",
    category: "PILLAR 05",
    title: "Multi-Node Model Training & Inference Coordination",
    status: "DEVELOPMENT SPEC",
    tag: "WORKLOAD PARALLELISM",
    summary:
      "Coordinating transformer-based model evaluation and fine-tuning across the cluster through hybrid tensor and pipeline parallelism.",
    technicalDetails: [
      "Pipeline-parallel execution for multi-billion parameter autoregressive language models",
      "Delayed parameter averaging supporting asynchronous local gradient computation",
      "Dynamic KV-cache paging preventing memory fragmentation during long-sequence generation",
    ],
    codeSnippet: `// Hybrid Model Slicing Configuration
struct ModelExecutionPlan {
    pipeline_stages: 4,
    tensor_parallel_degree: 2,
    gradient_accumulation_steps: 16,
    activation_checkpointing: true,
    offload_kv_cache_to_host: true,
};`,
  },
];

export function TechnologyDeepDive() {
  const [activePillarId, setActivePillarId] = useState<string>("hetero-mgmt");

  const currentPillar =
    TECH_PILLARS.find((p) => p.id === activePillarId) || TECH_PILLARS[0];

  return (
    <section id="technology" className="py-24 border-b border-white/10 bg-[#08090B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 font-mono-tech text-xs text-[#B8FF2E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E]" />
              SECTION 04 // ENGINEERING DOMAINS
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
              Platform technology & development areas.
            </h2>
          </div>
          <div className="font-mono-tech text-xs text-white/50 max-w-sm">
            Core systems research underway at ORITHYX LAB. Each domain targets specific friction points
            inherent to running complex AI models across unaligned hardware.
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex overflow-x-auto gap-2 pb-4 mb-8 border-b border-white/10 scrollbar-none">
          {TECH_PILLARS.map((pillar) => {
            const isActive = pillar.id === activePillarId;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillarId(pillar.id)}
                className={`px-4 py-2.5 rounded-sm font-mono-tech text-xs whitespace-nowrap transition-all border ${
                  isActive
                    ? "bg-[#11141A] border-[#B8FF2E] text-white font-semibold"
                    : "bg-[#0E1116] border-white/10 text-white/60 hover:text-white hover:border-white/20"
                }`}
              >
                <span className="text-[#B8FF2E] mr-2">{pillar.category}</span>
                <span>{pillar.title.split("&")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Deep-Dive Card */}
        <div className="bg-[#0A0C0E] border border-white/15 rounded-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Explanatory Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center justify-between font-mono-tech text-xs">
                <span className="text-[#B8FF2E] font-semibold">{currentPillar.category}</span>
                <span className="px-2 py-0.5 rounded bg-white/10 border border-white/15 text-white/70">
                  {currentPillar.status}
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-white tracking-tight">
                {currentPillar.title}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed">
                {currentPillar.summary}
              </p>

              <div className="space-y-3 pt-2">
                <div className="font-mono-tech text-xs text-white/40 uppercase tracking-wider">
                  TECHNICAL FOCUS & SYSTEM ARCHITECTURE
                </div>
                <div className="space-y-2">
                  {currentPillar.technicalDetails.map((detail, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-[#0E1116] border border-white/10 rounded-sm text-xs text-white/80"
                    >
                      <span className="font-mono-tech text-[#B8FF2E] text-[11px] mt-0.5">
                        [0{idx + 1}]
                      </span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Technical Code & Protocol Schema */}
            <div className="lg:col-span-6 bg-[#08090B] border border-white/10 rounded-sm overflow-hidden font-mono-tech text-xs">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0E1116] border-b border-white/10 text-white/50 text-[11px]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#B8FF2E]" />
                  <span>CORE PROTOCOL SPECIFICATION // RUST PSEUDOCODE</span>
                </div>
                <span className="text-[10px] text-white/30">READ-ONLY SPEC</span>
              </div>

              <div className="p-4 overflow-x-auto text-white/80 text-[11px] leading-relaxed">
                <pre className="text-[#00E5FF]">
                  <code>{currentPillar.codeSnippet}</code>
                </pre>
              </div>

              <div className="px-4 py-2 bg-white/5 border-t border-white/10 text-[10px] text-white/40 flex items-center justify-between">
                <span>STAGE: RESEARCH & LAB IMPLEMENTATION</span>
                <span className="text-[#B8FF2E]">ORITHYX CORE INFRASTRUCTURE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
