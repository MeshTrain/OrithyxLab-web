"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, RefreshCw, Cpu, Layers, Activity, Network, ShieldCheck, X } from "lucide-react";

export type VisualizerMode = "DISCOVERY" | "ORCHESTRATION" | "EXECUTION";

interface ComputeNode {
  id: string;
  name: string;
  type: "GPU" | "CPU" | "NPU" | "MEM";
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  angle: number;
  radius: number;
  speed: number;
  status: "SYNCHRONIZED" | "PROFILING" | "EXECUTING";
  specs: {
    arch: string;
    cores: string;
    memory: string;
    bandwidth: string;
    utilization: number;
  };
}

interface DataPacket {
  sourceIndex: number; // -1 for central core
  targetIndex: number;
  progress: number;
  speed: number;
  type: "GRADIENT" | "TELEMETRY" | "SHARD";
}

export function HeterogeneousComputeVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [mode, setMode] = useState<VisualizerMode>("ORCHESTRATION");
  const [isRunning, setIsRunning] = useState(true);
  const [activeNode, setActiveNode] = useState<ComputeNode | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [fps, setFps] = useState(60);

  // Use refs to store mutable simulation data to prevent React re-renders during 60/120fps canvas loop
  const simRef = useRef<{
    nodes: ComputeNode[];
    packets: DataPacket[];
    centerRotation: number;
    mouse: { x: number; y: number; active: boolean; hoveredNode: ComputeNode | null };
    lastTime: number;
    frameCount: number;
    fpsTimer: number;
  }>({
    nodes: [],
    packets: [],
    centerRotation: 0,
    mouse: { x: -1000, y: -1000, active: false, hoveredNode: null },
    lastTime: performance.now(),
    frameCount: 0,
    fpsTimer: performance.now(),
  });

  // Initialize node topology
  const initializeTopology = useCallback((width: number, height: number) => {
    const cx = width / 2;
    const cy = height / 2;
    const minDim = Math.min(width, height);
    const orbit1 = minDim * 0.28;
    const orbit2 = minDim * 0.42;

    const initialNodes: ComputeNode[] = [
      {
        id: "NODE-01-GPU",
        name: "Discrete Matrix Accelerator",
        type: "GPU",
        x: cx + Math.cos(0.2) * orbit1,
        y: cy + Math.sin(0.2) * orbit1,
        targetX: cx + Math.cos(0.2) * orbit1,
        targetY: cy + Math.sin(0.2) * orbit1,
        angle: 0.2,
        radius: orbit1,
        speed: 0.0008,
        status: "EXECUTING",
        specs: {
          arch: "Tensor Cluster (8-SM Equivalent)",
          cores: "4096 Tensor Cores",
          memory: "16 GB VRAM Pool",
          bandwidth: "768 GB/s Bus",
          utilization: 87,
        },
      },
      {
        id: "NODE-02-CPU",
        name: "Heterogeneous Host Processor",
        type: "CPU",
        x: cx + Math.cos(1.8) * orbit1,
        y: cy + Math.sin(1.8) * orbit1,
        targetX: cx + Math.cos(1.8) * orbit1,
        targetY: cy + Math.sin(1.8) * orbit1,
        angle: 1.8,
        radius: orbit1,
        speed: -0.0006,
        status: "SYNCHRONIZED",
        specs: {
          arch: "16-Core Low-Latency Scalar",
          cores: "32 Threads AVX-512",
          memory: "64 GB Unified DDR5",
          bandwidth: "112 GB/s Bandwidth",
          utilization: 42,
        },
      },
      {
        id: "NODE-03-NPU",
        name: "Edge Quantized Neural Engine",
        type: "NPU",
        x: cx + Math.cos(3.4) * orbit1,
        y: cy + Math.sin(3.4) * orbit1,
        targetX: cx + Math.cos(3.4) * orbit1,
        targetY: cy + Math.sin(3.4) * orbit1,
        angle: 3.4,
        radius: orbit1,
        speed: 0.0007,
        status: "EXECUTING",
        specs: {
          arch: "Systolic Vector Array (INT8/FP16)",
          cores: "64 TOPS Quantized",
          memory: "8 GB Shared LPDDR5X",
          bandwidth: "85 GB/s Direct Bus",
          utilization: 64,
        },
      },
      {
        id: "NODE-04-MEM",
        name: "Interleaved Virtual Memory Shard",
        type: "MEM",
        x: cx + Math.cos(4.9) * orbit1,
        y: cy + Math.sin(4.9) * orbit1,
        targetX: cx + Math.cos(4.9) * orbit1,
        targetY: cy + Math.sin(4.9) * orbit1,
        angle: 4.9,
        radius: orbit1,
        speed: -0.0005,
        status: "SYNCHRONIZED",
        specs: {
          arch: "Distributed Paged Buffer",
          cores: "Zero-Copy RDMA Pipeline",
          memory: "32 GB Virtualized",
          bandwidth: "Local Mesh Low-Latency",
          utilization: 58,
        },
      },
      {
        id: "NODE-05-GPU",
        name: "Secondary Matrix Sub-Cluster",
        type: "GPU",
        x: cx + Math.cos(0.9) * orbit2,
        y: cy + Math.sin(0.9) * orbit2,
        targetX: cx + Math.cos(0.9) * orbit2,
        targetY: cy + Math.sin(0.9) * orbit2,
        angle: 0.9,
        radius: orbit2,
        speed: -0.0004,
        status: "SYNCHRONIZED",
        specs: {
          arch: "Workstation Consumer GPU",
          cores: "2048 FP32/FP16 Cores",
          memory: "12 GB GDDR6",
          bandwidth: "360 GB/s Interconnect",
          utilization: 79,
        },
      },
      {
        id: "NODE-06-CPU",
        name: "Distributed Worker Node",
        type: "CPU",
        x: cx + Math.cos(2.6) * orbit2,
        y: cy + Math.sin(2.6) * orbit2,
        targetX: cx + Math.cos(2.6) * orbit2,
        targetY: cy + Math.sin(2.6) * orbit2,
        angle: 2.6,
        radius: orbit2,
        speed: 0.0005,
        status: "PROFILING",
        specs: {
          arch: "Local Network Peer Node",
          cores: "8-Core ARM64 / x86",
          memory: "16 GB RAM",
          bandwidth: "Wi-Fi 6 Mesh Sync (1.8 Gbps)",
          utilization: 31,
        },
      },
      {
        id: "NODE-07-NPU",
        name: "Auxiliary Inference Slice",
        type: "NPU",
        x: cx + Math.cos(4.1) * orbit2,
        y: cy + Math.sin(4.1) * orbit2,
        targetX: cx + Math.cos(4.1) * orbit2,
        targetY: cy + Math.sin(4.1) * orbit2,
        angle: 4.1,
        radius: orbit2,
        speed: -0.0003,
        status: "EXECUTING",
        specs: {
          arch: "Embedded Neuromorphic Unit",
          cores: "32 Matrix Units",
          memory: "4 GB Dedicated Cache",
          bandwidth: "High-Speed Serial Bus",
          utilization: 49,
        },
      },
    ];

    simRef.current.nodes = initialNodes;
    if (!activeNode) {
      setActiveNode(initialNodes[0]);
    }

    // Initialize packets
    const packets: DataPacket[] = [];
    for (let i = 0; i < 16; i++) {
      packets.push({
        sourceIndex: -1,
        targetIndex: i % initialNodes.length,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.006,
        type: i % 3 === 0 ? "GRADIENT" : i % 3 === 1 ? "TELEMETRY" : "SHARD",
      });
    }
    simRef.current.packets = packets;
  }, [activeNode]);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Main Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      initializeTopology(canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const render = (time: number) => {
      if (!isRunning) {
        animId = requestAnimationFrame(render);
        return;
      }

      const sim = simRef.current;
      const dt = Math.min((time - sim.lastTime) / 1000, 0.1);
      sim.lastTime = time;

      // FPS Calculation
      sim.frameCount++;
      if (time - sim.fpsTimer >= 1000) {
        setFps(Math.round((sim.frameCount * 1000) / (time - sim.fpsTimer)));
        sim.frameCount = 0;
        sim.fpsTimer = time;
      }

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // 1. Draw Subtle Technical Coordinate Grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.028)";
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 2. Draw Concentric Coordination Radar Orbits
      const orbitRadii = [Math.min(w, h) * 0.16, Math.min(w, h) * 0.28, Math.min(w, h) * 0.42];
      orbitRadii.forEach((r, idx) => {
        ctx.strokeStyle = idx === 0 ? "rgba(184, 255, 46, 0.18)" : "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 1;
        ctx.setLineDash(idx === 1 ? [4, 8] : idx === 2 ? [2, 12] : []);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 3. Update & Draw Central Orchestration Kernel
      if (!reducedMotion) {
        sim.centerRotation += 0.005;
      }
      const rot = sim.centerRotation;

      // Outer Ticked Reticle
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.strokeStyle = "rgba(184, 255, 46, 0.4)";
      ctx.lineWidth = 1.2;
      const numTicks = 24;
      const coreR = Math.min(w, h) * 0.085;
      for (let i = 0; i < numTicks; i++) {
        const theta = (i * Math.PI * 2) / numTicks;
        const tickLen = i % 4 === 0 ? 8 : 4;
        ctx.beginPath();
        ctx.moveTo(Math.cos(theta) * (coreR - tickLen), Math.sin(theta) * (coreR - tickLen));
        ctx.lineTo(Math.cos(theta) * coreR, Math.sin(theta) * coreR);
        ctx.stroke();
      }

      // Inner Hexagonal Orchestrator Core
      ctx.rotate(-rot * 2);
      ctx.fillStyle = "rgba(184, 255, 46, 0.06)";
      ctx.strokeStyle = "#B8FF2E";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const rx = Math.cos(a) * (coreR * 0.65);
        const ry = Math.sin(a) * (coreR * 0.65);
        if (i === 0) ctx.moveTo(rx, ry);
        else ctx.lineTo(rx, ry);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Central Pulse Dot
      const pulseSize = 4 + Math.sin(time * 0.004) * 1.5;
      ctx.fillStyle = "#B8FF2E";
      ctx.beginPath();
      ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Core Label HUD
      ctx.font = "10px monospace";
      ctx.fillStyle = "rgba(184, 255, 46, 0.85)";
      ctx.textAlign = "center";
      ctx.fillText("ORITHYX COORDINATOR", cx, cy + coreR + 18);
      ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
      ctx.fillText(`CLUSTER: ${mode}`, cx, cy + coreR + 30);

      // 4. Update Node Positions & Draw Interconnect Buses
      const nodes = sim.nodes;
      let hovered: ComputeNode | null = null;

      nodes.forEach((node) => {
        // Orbital drift
        if (!reducedMotion) {
          node.angle += node.speed * (mode === "EXECUTION" ? 1.6 : mode === "DISCOVERY" ? 0.7 : 1);
          node.targetX = cx + Math.cos(node.angle) * node.radius;
          node.targetY = cy + Math.sin(node.angle) * node.radius;
        }

        // Mouse proximity repulsion scaled with DPR
        const dx = sim.mouse.x - node.x;
        const dy = sim.mouse.y - node.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const hoverThreshold = 55 * Math.min(window.devicePixelRatio || 1, 2);
        if (distToMouse < hoverThreshold) {
          hovered = node;
          node.x += (node.targetX - dx * 0.3 - node.x) * 0.1;
          node.y += (node.targetY - dy * 0.3 - node.y) * 0.1;
        } else {
          node.x += (node.targetX - node.x) * 0.08;
          node.y += (node.targetY - node.y) * 0.08;
        }

        // Draw Interconnect Vector to Center Orchestrator
        const isSelected = activeNode?.id === node.id;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        
        // Orthogonal stepped lines for technical architectural feel
        const midX = (cx + node.x) / 2;
        ctx.lineTo(midX, cy);
        ctx.lineTo(node.x, node.y);

        if (isSelected) {
          ctx.strokeStyle = "rgba(184, 255, 46, 0.55)";
          ctx.lineWidth = 1.75;
        } else if (node.type === "GPU") {
          ctx.strokeStyle = "rgba(184, 255, 46, 0.22)";
          ctx.lineWidth = 1;
        } else if (node.type === "CPU") {
          ctx.strokeStyle = "rgba(0, 229, 255, 0.22)";
          ctx.lineWidth = 1;
        } else {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
          ctx.lineWidth = 0.8;
        }
        ctx.stroke();

        // Mesh interconnect between adjacent nodes
        const nextNode = nodes[(nodes.indexOf(node) + 1) % nodes.length];
        ctx.beginPath();
        ctx.setLineDash([2, 6]);
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(nextNode.x, nextNode.y);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.setLineDash([]);
      });

      sim.mouse.hoveredNode = hovered;

      // 5. Draw Dynamic Data Packets Flowing Along Interconnects
      sim.packets.forEach((p) => {
        if (!reducedMotion) {
          p.progress += p.speed * (mode === "EXECUTION" ? 1.8 : 1);
          if (p.progress >= 1) {
            p.progress = 0;
            p.targetIndex = Math.floor(Math.random() * nodes.length);
          }
        }

        const targetNode = nodes[p.targetIndex];
        if (!targetNode) return;

        // Trace orthogonal path
        const midX = (cx + targetNode.x) / 2;
        let px = cx;
        let py = cy;

        if (p.progress < 0.5) {
          const t = p.progress / 0.5;
          px = cx + (midX - cx) * t;
          py = cy;
        } else {
          const t = (p.progress - 0.5) / 0.5;
          px = midX + (targetNode.x - midX) * t;
          py = cy + (targetNode.y - cy) * t;
        }

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);

        if (p.type === "GRADIENT") {
          ctx.fillStyle = "#B8FF2E";
          ctx.shadowColor = "#B8FF2E";
          ctx.shadowBlur = 6;
        } else if (p.type === "TELEMETRY") {
          ctx.fillStyle = "#00E5FF";
          ctx.shadowColor = "#00E5FF";
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = "#F4F4F0";
          ctx.shadowColor = "#F4F4F0";
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 6. Draw Distinct Heterogeneous Node Geometries
      nodes.forEach((node) => {
        const isHovered = sim.mouse.hoveredNode?.id === node.id;
        const isSelected = activeNode?.id === node.id;
        const size = isSelected ? 18 : isHovered ? 16 : 13;

        ctx.save();
        ctx.translate(node.x, node.y);

        // Node Glow Ring on Selection
        if (isSelected || isHovered) {
          ctx.strokeStyle = "rgba(184, 255, 46, 0.35)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(0, 0, size * 1.8, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Hardware Specific Geometry
        if (node.type === "GPU") {
          // Hexagon Matrix Core (Accelerator)
          ctx.fillStyle = isSelected ? "#151F10" : "#0E1510";
          ctx.strokeStyle = isSelected ? "#B8FF2E" : "rgba(184, 255, 46, 0.75)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const hx = Math.cos(angle) * size;
            const hy = Math.sin(angle) * size;
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Internal Tensor Core Grid Dot
          ctx.fillStyle = "#B8FF2E";
          ctx.fillRect(-2, -2, 4, 4);
        } else if (node.type === "CPU") {
          // Quad-core Cross / Box (Host CPU)
          ctx.fillStyle = isSelected ? "#0F1A24" : "#0D131A";
          ctx.strokeStyle = isSelected ? "#00E5FF" : "rgba(0, 229, 255, 0.7)";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(-size, -size, size * 2, size * 2);
          ctx.fillRect(-size, -size, size * 2, size * 2);

          // Internal 4-core crosshair
          ctx.strokeStyle = "rgba(0, 229, 255, 0.4)";
          ctx.beginPath();
          ctx.moveTo(-size, 0);
          ctx.lineTo(size, 0);
          ctx.moveTo(0, -size);
          ctx.lineTo(0, size);
          ctx.stroke();
        } else if (node.type === "NPU") {
          // Diamond Systolic Vector Unit (Edge/NPU)
          ctx.fillStyle = isSelected ? "#231B10" : "#14110D";
          ctx.strokeStyle = isSelected ? "#FFB020" : "rgba(255, 176, 32, 0.8)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(0, -size * 1.2);
          ctx.lineTo(size * 1.2, 0);
          ctx.lineTo(0, size * 1.2);
          ctx.lineTo(-size * 1.2, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "#FFB020";
          ctx.beginPath();
          ctx.arc(0, 0, 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Interleaved Memory Bank
          ctx.fillStyle = "#15181F";
          ctx.strokeStyle = "rgba(244, 244, 240, 0.7)";
          ctx.lineWidth = 1.2;
          ctx.strokeRect(-size * 1.2, -size * 0.7, size * 2.4, size * 1.4);
          ctx.fillRect(-size * 1.2, -size * 0.7, size * 2.4, size * 1.4);

          ctx.fillStyle = "rgba(244, 244, 240, 0.5)";
          ctx.fillRect(-size * 0.8, -size * 0.3, size * 1.6, size * 0.6);
        }

        // Hardware Tag & Utilization Metric
        ctx.font = "9px monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = isSelected ? "#F4F4F0" : "rgba(244, 244, 240, 0.65)";
        ctx.fillText(node.type, 0, size + 12);

        // Utilization indicator bar below node
        const barW = size * 2;
        const fillW = (barW * node.specs.utilization) / 100;
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.fillRect(-barW / 2, size + 16, barW, 2);
        ctx.fillStyle = node.type === "GPU" ? "#B8FF2E" : node.type === "CPU" ? "#00E5FF" : "#FFB020";
        ctx.fillRect(-barW / 2, size + 16, fillW, 2);

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isRunning, mode, activeNode, reducedMotion, initializeTopology]);

  // Handle Mouse Click on Nodes
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const clickX = (e.clientX - rect.left) * dpr;
    const clickY = (e.clientY - rect.top) * dpr;

    for (const node of simRef.current.nodes) {
      const dx = clickX - node.x;
      const dy = clickY - node.y;
      if (Math.sqrt(dx * dx + dy * dy) < 30 * dpr) {
        setActiveNode(node);
        break;
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !e.changedTouches[0]) return;
    const touch = e.changedTouches[0];
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const clickX = (touch.clientX - rect.left) * dpr;
    const clickY = (touch.clientY - rect.top) * dpr;

    for (const node of simRef.current.nodes) {
      const dx = clickX - node.x;
      const dy = clickY - node.y;
      if (Math.sqrt(dx * dx + dy * dy) < 35 * dpr) {
        setActiveNode(node);
        break;
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    simRef.current.mouse.x = (e.clientX - rect.left) * dpr;
    simRef.current.mouse.y = (e.clientY - rect.top) * dpr;
    simRef.current.mouse.active = true;
  };

  const handleMouseLeave = () => {
    simRef.current.mouse.active = false;
    simRef.current.mouse.x = -1000;
    simRef.current.mouse.y = -1000;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] md:h-[620px] bg-[#0A0C0E] border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between"
      aria-label="Interactive Heterogeneous Compute Topology Visualizer"
    >
      {/* Top Telemetry Header Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#08090B]/90 backdrop-blur-md border-b border-white/10 font-mono-tech text-xs">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#B8FF2E] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#B8FF2E] animate-pulse" />
            TOPOLOGY.VIRTUAL_MESH
          </span>
          <span className="hidden sm:inline text-white/40">//</span>
          <span className="hidden sm:inline text-white/60">LOCAL WI-FI PROTOTYPE CLUSTER</span>
        </div>

        {/* Mode Toggles */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded border border-white/10">
          {(["DISCOVERY", "ORCHESTRATION", "EXECUTION"] as VisualizerMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-2.5 py-1 text-[10px] tracking-wider transition-colors uppercase ${
                mode === m
                  ? "bg-[#B8FF2E] text-black font-semibold"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {m === "DISCOVERY" ? "01 Discovery" : m === "ORCHESTRATION" ? "02 Orchestration" : "03 Execution"}
            </button>
          ))}
        </div>

        {/* Performance & Playback controls */}
        <div className="flex items-center gap-3 text-white/50">
          <span className="hidden md:inline text-[11px] font-mono">
            REFRESH: <span className="text-[#B8FF2E]">{fps} FPS</span>
          </span>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-1 hover:text-[#B8FF2E] transition-colors"
            title={isRunning ? "Pause Simulation" : "Resume Simulation"}
            aria-label={isRunning ? "Pause Simulation" : "Resume Simulation"}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => {
              if (canvasRef.current) {
                initializeTopology(canvasRef.current.width, canvasRef.current.height);
              }
            }}
            className="p-1 hover:text-[#B8FF2E] transition-colors"
            title="Reset Topology Vectors"
            aria-label="Reset Topology Vectors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Canvas Canvas Element */}
      <div className="relative flex-1 w-full h-full cursor-crosshair">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onTouchStart={handleTouchStart}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-full block"
        />

        {/* Corner Telemetry Watermark */}
        <div className="absolute bottom-3 left-4 pointer-events-none font-mono-tech text-[10px] text-white/30 space-y-0.5">
          <div>LATENCY: 1.4ms L2L // PEER-TO-PEER MESH</div>
          <div>PROTOCOL: ASYMMETRIC WEIGHTED ALL-REDUCE</div>
        </div>

        {/* Selected Node Telemetry HUD */}
        {activeNode && (
          <div className="absolute top-3 right-3 left-3 sm:left-auto sm:top-4 sm:right-4 z-20 w-auto sm:w-72 max-w-sm bg-[#0E1116]/95 backdrop-blur-md border border-white/15 p-3.5 rounded-sm shadow-2xl font-mono-tech text-xs pointer-events-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-sm ${
                    activeNode.type === "GPU"
                      ? "bg-[#B8FF2E]"
                      : activeNode.type === "CPU"
                      ? "bg-[#00E5FF]"
                      : activeNode.type === "NPU"
                      ? "bg-[#FFB020]"
                      : "bg-white"
                  }`}
                />
                <span className="font-semibold text-white tracking-wide">{activeNode.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/70">
                  {activeNode.status}
                </span>
                <button
                  onClick={() => setActiveNode(null)}
                  className="p-1 text-white/40 hover:text-white transition-colors"
                  aria-label="Dismiss Node Telemetry"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="text-[11px] text-white/90 font-sans font-medium mb-2.5">
              {activeNode.name}
            </div>

            <div className="space-y-1.5 text-[10px] text-white/70 border-t border-white/5 pt-2">
              <div className="flex justify-between">
                <span className="text-white/40">ARCHITECTURE</span>
                <span className="text-white/90 text-right">{activeNode.specs.arch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">COMPUTE CAPACITY</span>
                <span className="text-[#B8FF2E]">{activeNode.specs.cores}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">MEMORY POOL</span>
                <span className="text-white/90">{activeNode.specs.memory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">INTERCONNECT BUS</span>
                <span className="text-[#00E5FF]">{activeNode.specs.bandwidth}</span>
              </div>
              <div className="pt-1">
                <div className="flex justify-between text-white/40 mb-1">
                  <span>WORKLOAD UTILIZATION</span>
                  <span className="text-white">{activeNode.specs.utilization}%</span>
                </div>
                <div className="w-full bg-white/10 h-1 rounded-none overflow-hidden">
                  <div
                    className="h-full bg-[#B8FF2E] transition-all duration-300"
                    style={{ width: `${activeNode.specs.utilization}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-white/10 text-[9px] text-white/40 flex items-center justify-between">
              <span>CLICK TO PIN NODE</span>
              <span className="text-[#B8FF2E]">PROFILED VIRTUAL UNIT</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Technical Status Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-[#08090B]/90 backdrop-blur-md border-t border-white/10 font-mono-tech text-[10px] text-white/50">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E]" />
            GPU ACCELERATOR (TENSOR)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
            HOST CPU (SCALAR)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB020]" />
            QUANTIZED NPU (SYSTOLIC)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            SHARED VRAM SHARD
          </span>
        </div>
        <div className="text-white/40">
          INTERACTIVE PROJECTION • DRAG/HOVER TO ENGAGE NODES
        </div>
      </div>
    </div>
  );
}
