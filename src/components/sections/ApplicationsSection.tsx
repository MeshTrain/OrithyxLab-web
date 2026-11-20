"use client";

import React from "react";
import { 
  Terminal, 
  Rocket, 
  FlaskConical, 
  Building2, 
  Server, 
  Globe2,
  Check
} from "lucide-react";

export function ApplicationsSection() {
  const applications = [
    {
      id: "app-1",
      icon: Terminal,
      title: "Independent AI Developers & Engineers",
      badge: "DESKTOP & LOCAL CLUSTERING",
      description:
        "Individual engineers building or fine-tuning models locally can pool multiple devices—a gaming PC, a high-RAM laptop, and an external accelerator—into a unified execution environment, bypassing expensive cloud rentals for local iteration.",
      valueDrivers: [
        "Aggregate scattered local VRAM to load 70B+ parameter models locally",
        "Zero cloud ingress/egress fees during prompt testing and weight exploration",
        "Fast local network iteration without remote queue wait times",
      ],
    },
    {
      id: "app-2",
      icon: Rocket,
      title: "AI Startups & Emerging Labs",
      badge: "SEED-STAGE EFFICIENCY",
      description:
        "Early-stage AI ventures facing prohibitive compute capital expenditures can extract maximum utilization from existing internal hardware or hybrid cloud setups before committing to multi-million dollar GPU contracts.",
      valueDrivers: [
        "Extend capital runway by offloading batch inference to pooled internal silicon",
        "Avoid multi-year reservation lock-ins with volatile cloud providers",
        "Enable distributed LoRA fine-tuning across team workstations overnight",
      ],
    },
    {
      id: "app-3",
      icon: FlaskConical,
      title: "Academic & Research Laboratories",
      badge: "RESEARCH FEDERATION",
      description:
        "University labs and scientific institutions often possess dozens of heterogeneous workstations distributed across campus departments. ORITHYX LAB provides the coordination layer to federate these idle machines into a shared research cluster.",
      valueDrivers: [
        "Unify disparate grant-purchased hardware under one scheduling interface",
        "Run parameter sweep experiments across mixed-generation GPUs",
        "Preserve strict data provenance and security within campus network perimeters",
      ],
    },
    {
      id: "app-4",
      icon: Building2,
      title: "Enterprise AI & Private Infrastructure Teams",
      badge: "SOVEREIGN AGGREGATION",
      description:
        "Enterprises seeking to train or run internal inference on sensitive proprietary data can pool on-premises hardware clusters with complete architectural sovereignty, eliminating third-party data leakage risks.",
      valueDrivers: [
        "Maintain zero-data-leakage compliance by keeping workloads on private LANs",
        "Harvest compute cycles from idle workstations during off-peak hours",
        "Hardware-agnostic deployment avoiding vendor lock-in with single chipmakers",
      ],
    },
    {
      id: "app-5",
      icon: Server,
      title: "Compute Infrastructure Providers",
      badge: "STRANDED CAPACITY HARVESTING",
      description:
        "Colocation facilities, regional hosting operators, and secondary data centers with fragmented, non-uniform GPU inventory can bundle heterogeneous servers into usable high-capacity AI clusters for customers.",
      valueDrivers: [
        "Monetize asymmetric and previous-generation accelerator hardware",
        "Offer flexible, composite compute nodes tailored to specific model footprints",
        "Increase overall floor utilization and reduce stranded capacity waste",
      ],
    },
    {
      id: "app-6",
      icon: Globe2,
      title: "Distributed Resource Networks",
      badge: "LONG-TERM HORIZON",
      description:
        "The future architecture for decentralized and community compute initiatives—enabling peer-to-peer compute coordination where individual nodes contribute verified capacity to a global pool.",
      valueDrivers: [
        "Architectural foundation for open-source AI infrastructure collectives",
        "Dynamic workload routing around intermittent node availability",
        "Cooperative pooling of compute capacity across geographical boundaries",
      ],
    },
  ];

  return (
    <section id="applications" className="py-24 border-b border-white/10 bg-[#0A0C0E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2 font-mono-tech text-xs text-[#B8FF2E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E]" />
            SECTION 05 // TARGET WORKLOAD APPLICATIONS
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
            Where unified heterogeneous compute creates value.
          </h2>
          <p className="text-base text-white/70 leading-relaxed">
            By eliminating the requirement that compute devices must be identical, ORITHYX LAB opens
            new economic and technical possibilities across the AI development ecosystem.
          </p>
        </div>

        {/* 6-Card Application Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => {
            const Icon = app.icon;
            return (
              <div
                key={app.id}
                className="bg-[#0E1116] border border-white/10 hover:border-white/25 p-6 rounded-sm flex flex-col justify-between transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-sm bg-[#151921] border border-white/10 flex items-center justify-center text-[#B8FF2E] group-hover:border-[#B8FF2E]/40 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono-tech text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">
                      {app.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-medium text-white mb-2.5 tracking-tight group-hover:text-[#B8FF2E] transition-colors">
                    {app.title}
                  </h3>

                  <p className="text-xs text-white/70 leading-relaxed mb-6">
                    {app.description}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 space-y-2">
                  <div className="font-mono-tech text-[10px] text-white/40 uppercase tracking-wider">
                    POTENTIAL ARCHITECTURAL VALUE
                  </div>
                  {app.valueDrivers.map((driver, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-white/80">
                      <Check className="w-3.5 h-3.5 text-[#B8FF2E] mt-0.5 shrink-0" />
                      <span className="text-[11px]">{driver}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer Note */}
        <div className="mt-8 p-4 bg-[#08090B] border border-white/10 rounded-sm font-mono-tech text-xs text-white/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>* NOTE: APPLICATIONS REFLECT ARCHITECTURAL SUITABILITY AND TARGET USE-CASES.</span>
          <span className="text-white/40">NO COMMERCIAL PARTNERSHIPS OR CUSTOMERS IMPLIED</span>
        </div>
      </div>
    </section>
  );
}
