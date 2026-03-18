"use client";

import Header from "./components/Header";
import ConvergenceSection from "./components/ConvergenceSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen overflow-hidden flex-col bg-bg-primary text-text-primary font-sans antialiased">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-container text-center pt-32 mb-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-primary/20 bg-accent-primary/5 px-4 py-1.5 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-accent-primary animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-primary">
              Waitlist Open
            </span>
          </div>
          <h1
            className="mx-auto max-w-4xl text-balance font-bold tracking-tight leading-[1.1]"
            style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)" }}
          >
            Everything you spend,{" "}
            <span className="text-accent-primary">converged.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-text-secondary leading-relaxed">
            Unify your AWS, Azure, Google Cloud, and On-Premise costs into a
            single, automated source of truth.
          </p>
        </section>

        {/* 
          ConvergenceSection handles:
          - Data fetching (useCloudData)
          - GSAP ScrollTrigger animation (badges fly in → bars rise → count-up)
          - pin: true keeps the section fixed during scroll
        */}
        <ConvergenceSection />
      </main>

      <Footer />
    </div>
  );
}
