import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TheProblem } from "@/components/sections/TheProblem";
import { ArchitectureStack } from "@/components/architecture/ArchitectureStack";
import { TechnologyDeepDive } from "@/components/sections/TechnologyDeepDive";
import { ApplicationsSection } from "@/components/sections/ApplicationsSection";
import { DevelopmentRoadmap } from "@/components/sections/DevelopmentRoadmap";
import { VisionSection } from "@/components/sections/VisionSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#08090B] text-[#F4F4F0]">
      {/* Top Fixed Header */}
      <Navbar />

      {/* Main Page Flow */}
      <main id="main-content" className="flex-1">
        {/* 01. Hero & Signature Visualizer Centerpiece */}
        <HeroSection />

        {/* 02. The Problem Narrative */}
        <TheProblem />

        {/* 03. Our Approach: 6-Tier Architecture Stack */}
        <section id="architecture" className="py-24 border-b border-white/10 bg-[#0A0C0E] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ArchitectureStack />
          </div>
        </section>

        {/* 04. Technology Deep-Dive & Engineering Domains */}
        <TechnologyDeepDive />

        {/* 05. Target Workload Applications */}
        <ApplicationsSection />

        {/* 06. Development Progress & Roadmap Progression */}
        <DevelopmentRoadmap />

        {/* 07. Long-Term Vision */}
        <VisionSection />

        {/* 08. Enterprise & Institutional Dialogue */}
        <ContactSection />
      </main>

      {/* Global Corporate Footer */}
      <Footer />
    </div>
  );
}
