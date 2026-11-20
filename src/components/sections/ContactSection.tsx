"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  ArrowUpRight, 
  ShieldCheck, 
  Terminal, 
  Building, 
  Users, 
  Cpu 
} from "lucide-react";

export function ContactSection() {
  const [topic, setTopic] = useState("Technical Partnership");
  const [senderName, setSenderName] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const contactEmail = siteConfig.contactEmail;

  const topics = [
    { id: "tech", label: "Technical Partnership", icon: Cpu },
    { id: "investor", label: "Investor Conversation", icon: Building },
    { id: "enterprise", label: "Enterprise Collaboration", icon: Users },
    { id: "general", label: "General Research Inquiry", icon: Terminal },
  ];

  // Construct mailto URL dynamically
  const subject = encodeURIComponent(`[ORITHYX LAB] ${topic} — ${organization || senderName || "Inquiry"}`);
  const bodyText = `Topic: ${topic}
From: ${senderName || "N/A"}
Organization / Institution: ${organization || "N/A"}

Message / Inquiry:
${message || "Hello ORITHYX LAB team, I would like to discuss..."}

-------------------------
Sent via orithyxlab.com`;

  const mailtoUrl = `mailto:${contactEmail}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 border-b border-white/10 bg-[#08090B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2 font-mono-tech text-xs text-[#B8FF2E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E]" />
            SECTION 07 // INSTITUTIONAL DIALOGUE
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
            Engage with ORITHYX LAB.
          </h2>
          <p className="text-base text-white/70 leading-relaxed">
            We welcome conversations with distributed systems researchers, AI infrastructure engineers,
            early-stage venture investors, and technology partners interested in heterogeneous compute.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Details & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0A0C0E] border border-white/10 p-6 rounded-sm space-y-5">
              <div className="font-mono-tech text-xs text-white/40 uppercase tracking-wider">
                PRIMARY OFFICIAL CHANNEL
              </div>

              <div>
                <div className="text-xs text-white/50 mb-1">Official Company Email:</div>
                <div className="flex items-center justify-between p-3 bg-[#0E1116] border border-white/10 rounded-sm font-mono-tech text-sm text-[#B8FF2E]">
                  <span className="select-all">{contactEmail}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 hover:text-white transition-colors text-white/60"
                    title="Copy Email Address"
                    aria-label="Copy Email Address"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#B8FF2E]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-2 font-mono-tech text-xs text-white/70 border-t border-white/10">
                <div className="flex items-start gap-2.5">
                  <span className="text-[#B8FF2E] mt-0.5">▪</span>
                  <div>
                    <span className="text-white font-medium">Technical Inquiries: </span>
                    Feedback on scheduling algorithms, cluster protocols, and kernel dispatch.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-[#00E5FF] mt-0.5">▪</span>
                  <div>
                    <span className="text-white font-medium">Investor Relations: </span>
                    Institutional dialogue concerning our compute infrastructure roadmap.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-[#FFB020] mt-0.5">▪</span>
                  <div>
                    <span className="text-white font-medium">Hardware Pilots: </span>
                    Discussions regarding prospective testing across diverse local device pools.
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`mailto:${contactEmail}`}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono-tech text-xs uppercase tracking-wider rounded-sm transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#B8FF2E]" />
                  <span>Launch Default Email Client</span>
                </a>
              </div>
            </div>

            {/* Credibility & Privacy Statement */}
            <div className="p-4 bg-[#0E1116] border border-white/10 rounded-sm font-mono-tech text-xs text-white/60 space-y-2">
              <div className="flex items-center gap-2 text-white font-medium">
                <ShieldCheck className="w-4 h-4 text-[#B8FF2E]" />
                <span>Direct Communication Guarantee</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                We do not route communications through opaque marketing automation funnels or third-party CRM trackers. Inquiries reach our core engineering team directly.
              </p>
            </div>
          </div>

          {/* Right: Interactive Inquiry Form (Dispatches via Mailto) */}
          <div className="lg:col-span-7 bg-[#0A0C0E] border border-white/15 p-6 sm:p-8 rounded-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="font-mono-tech text-xs text-white/40 uppercase tracking-wider">
                STRUCTURED INQUIRY GENERATOR
              </div>
              <span className="font-mono-tech text-[10px] text-[#B8FF2E]">
                DISPATCHES DIRECT EMAIL
              </span>
            </div>

            <div className="space-y-5">
              {/* Topic Selector */}
              <div>
                <label className="block font-mono-tech text-xs text-white/70 mb-2">
                  CONVERSATION FOCUS
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {topics.map((t) => {
                    const Icon = t.icon;
                    const isSelected = topic === t.label;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTopic(t.label)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-sm border font-mono-tech text-xs text-left transition-all ${
                          isSelected
                            ? "bg-[#11151D] border-[#B8FF2E] text-white"
                            : "bg-[#0E1116] border-white/10 text-white/60 hover:text-white hover:border-white/20"
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-[#B8FF2E]" : "text-white/40"}`} />
                        <span>{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sender Name & Organization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name-input" className="block font-mono-tech text-xs text-white/70 mb-1.5">
                    YOUR NAME
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Dr. Alex Vance"
                    className="w-full bg-[#0E1116] border border-white/10 focus:border-[#B8FF2E] rounded-sm px-3 py-2 text-xs text-white placeholder-white/20 font-mono-tech outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="org-input" className="block font-mono-tech text-xs text-white/70 mb-1.5">
                    ORGANIZATION / INSTITUTION
                  </label>
                  <input
                    id="org-input"
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Stanford AI Lab / Foundry Capital"
                    className="w-full bg-[#0E1116] border border-white/10 focus:border-[#B8FF2E] rounded-sm px-3 py-2 text-xs text-white placeholder-white/20 font-mono-tech outline-none"
                  />
                </div>
              </div>

              {/* Inquiry Brief */}
              <div>
                <label htmlFor="inquiry-input" className="block font-mono-tech text-xs text-white/70 mb-1.5">
                  INQUIRY DETAILS / TECHNICAL SCOPE
                </label>
                <textarea
                  id="inquiry-input"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline your research question, partnership interest, or hardware cluster environment..."
                  className="w-full bg-[#0E1116] border border-white/10 focus:border-[#B8FF2E] rounded-sm p-3 text-xs text-white placeholder-white/20 font-mono-tech outline-none resize-none"
                />
              </div>

              {/* Dispatch Action */}
              <div className="pt-2">
                <a
                  href={mailtoUrl}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#B8FF2E] text-black font-semibold font-mono-tech text-xs uppercase tracking-wider rounded-sm hover:bg-[#cbfb4c] transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Email via Default Client</span>
                </a>
                <p className="mt-2 text-center font-mono-tech text-[10px] text-white/40">
                  Pre-fills your inquiry directly into your email client addressed to {contactEmail}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
