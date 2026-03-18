"use client";

import { useMemo } from "react";
import { useCloudData, type Product } from "@/app/hooks/useCloudData";
import Header from "./components/Header";
import MainDashboard from "./components/MainDashboard";
import CloudBadge from "./components/CloudBadge";
import Footer from "./components/Footer";

export default function Home() {
  const { data, isLoading, isError } = useCloudData();

  console.log("Data",data);

  // Data Integration Logic
  const processedData = useMemo(() => {
    if (!data || data.length < 12) return null;

    // 1. Partition into 4 groups of 3
    const groups = {
      AWS: data.slice(0, 3),
      Azure: data.slice(3, 6),
      Google: data.slice(6, 9),
      OnPremise: data.slice(9, 12),
    };

    // 2. Calculate dynamic costs using actual prices scaled to look like cloud spend
    const calculateCost = (products: Product[]) => 
      products.reduce((sum, p) => sum + p.price, 0) * 124.50;

    const costs = {
      AWS: calculateCost(groups.AWS),
      Azure: calculateCost(groups.Azure),
      Google: calculateCost(groups.Google),
      OnPremise: calculateCost(groups.OnPremise),
    };

    const totalCost = Object.values(costs).reduce((sum, c) => sum + c, 0);

    return { groups, costs, totalCost };
  }, [data]);

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
              {!isLoading && !isError && processedData && (
                <>
                  <CloudBadge 
                    type="AWS" 
                    cost={processedData.costs.AWS} 
                    className="absolute top-[10%] left-[15%] rotate-[12deg]" 
                  />
                  <CloudBadge 
                    type="Azure" 
                    cost={processedData.costs.Azure} 
                    className="absolute top-[5%] left-[45%] -rotate-[8deg]" 
                  />
                  <CloudBadge 
                    type="Google" 
                    cost={processedData.costs.Google} 
                    className="absolute top-[15%] right-[20%] rotate-[18deg]" 
                  />
                  <CloudBadge 
                    type="On-Premise" 
                    cost={processedData.costs.OnPremise} 
                    className="absolute top-[8%] right-[40%] -rotate-[12deg]" 
                  />
                </>
              )}
            </div>

            {/* The Processor */}
            <div className="relative z-10">
              <MainDashboard 
                costs={processedData?.costs}
                isLoading={isLoading}
                isError={isError}
                totalCost={processedData?.totalCost || 0}
              />
            </div>
            
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

