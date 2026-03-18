"use client";

import Header from "./components/Header";
import MainDashboard from "./components/MainDashboard";
import CloudBadge from "./components/CloudBadge";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-primary text-text-primary font-sans antialiased">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-container text-center pt-32 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-primary/20 bg-accent-primary/5 px-4 py-1.5 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-accent-primary animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-primary">Waitlist Open</span>
          </div>
          <h1 className="mx-auto max-w-4xl text-balance font-bold tracking-tight leading-[1.1]" 
              style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)" }}>
            Everything you spend, <span className="text-accent-primary">converged.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-text-secondary leading-relaxed">
            Unify your AWS, Azure, Google Cloud, and On-Premise costs into a single, automated source of truth.
          </p>
        </section>

        {/* Funnel Section - High Canvas */}
        <section 
          className="relative h-[400vh] w-full"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)",
            backgroundSize: "40px 40px"
          }}
        >
          {/* Sticky Controller */}
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 bg-accent-primary/10 blur-[120px] rounded-full w-[600px] h-[600px]" />

            {/* Scattered Cloud Badges at the "Entry" (Top) */}
            <div className="absolute inset-0 max-w-7xl mx-auto px-container">
              <CloudBadge type="AWS" className="absolute top-[10%] left-[15%] rotate-[12deg]" />
              <CloudBadge type="Azure" className="absolute top-[5%] left-[45%] -rotate-[8deg]" />
              <CloudBadge type="Google" className="absolute top-[15%] right-[20%] rotate-[18deg]" />
              <CloudBadge type="On-Premise" className="absolute top-[8%] right-[40%] -rotate-[12deg]" />
              
              {/* Extra scattered ones for effect */}
              <CloudBadge type="AWS" className="absolute top-[25%] left-[30%] rotate-6 opacity-40 scale-90" />
              <CloudBadge type="Azure" className="absolute top-[20%] right-[10%] -rotate-12 opacity-30 scale-75" />
            </div>

            {/* The Processor */}
            <div className="relative z-10">
              <MainDashboard />
            </div>
            
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
