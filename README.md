# ORITHYX LAB — Corporate Website

Official corporate website and technical infrastructure portal for **ORITHYX LAB** ([orithyxlab.com](https://orithyxlab.com)).

ORITHYX LAB is building the foundational software layer to coordinate distributed, heterogeneous computing resources into a unified infrastructure substrate for AI training and inference.

---

## Technical Stack

* **Framework**: Next.js 16 (App Router)
* **Language**: TypeScript 5
* **Runtime**: React 19
* **Styling**: Tailwind CSS v4 + Custom Industrial Editorial Design System
* **Visualizations**: Procedural HTML5 Canvas Heterogeneous Topology Engine (60/120 FPS capable)
* **Icons**: Lucide React
* **Typography**: Geist Sans & Geist Mono (Latin subsets)
* **Deployment Target**: Vercel Edge / Serverless

---

## Architectural Features

1. **Signature Computational Visualizer**:
   - Abstract interactive simulation of heterogeneous nodes (GPU tensor cores, CPU host processors, NPU systolic units, interleaved virtual memory shards) synchronizing with a central coordination kernel.
   - Interactive mode toggles: `01 Discovery`, `02 Orchestration`, `03 Execution`.
   - Node telemetry HUD displaying simulated capacity, architecture, and bus bandwidth.
   - Touchscreen and High-DPI (`devicePixelRatio`) support with static fallback for `prefers-reduced-motion`.
2. **Six-Layer Architecture Stack**:
   - Interactive stack decomposing Participating Hardware, Resource Discovery, Dynamic Scheduling, Distributed Execution, Inter-Device Sync, and AI Workloads.
3. **Platform Technology Deep-Dive**:
   - 5 engineering domain pillars with protocol specifications in Rust pseudocode.
4. **Transparent Development Progression**:
   - Clearly separates current prototype status (local Wi-Fi cluster) from active development and long-term vision.
5. **Institutional Contact Dispatcher**:
   - Client-side pre-filled `mailto:` generator for technical partnerships, investor dialogues, and research collaborations.
6. **Enterprise Credibility & SEO**:
   - Semantic HTML5, Schema.org Organization structured data, Open Graph tags, Twitter cards, `robots.txt`, and `sitemap.xml`.

---

## Getting Started

### Prerequisites
* Node.js v20+ (tested on Node v22)
* npm v10+

### Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build
```bash
npm run build
npm run start
```

---

## Configuration

Site constants, metadata, navigation, and official email addresses are centralized in:
`src/config/site.ts`

```typescript
export const siteConfig = {
  name: "ORITHYX LAB",
  domain: "orithyxlab.com",
  canonicalUrl: "https://orithyxlab.com",
  contactEmail: "contact@orithyxlab.com",
  // ...
};
```

---

## License
Proprietary — All rights reserved by ORITHYX LAB.
