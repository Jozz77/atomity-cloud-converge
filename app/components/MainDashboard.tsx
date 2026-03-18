import { useState, useEffect } from "react";

interface MainDashboardProps {
  costs?: Record<string, number>;
  isLoading: boolean;
  isError: boolean;
  totalCost: number;
}

const PROVIDER_COLORS: Record<string, string> = {
  AWS: "bg-[#ff9900]",
  Azure: "bg-[#0078d4]",
  Google: "bg-[#4285f4]",
  OnPremise: "bg-[#71717a]", // text-muted equivalent
};

const PROVIDER_LABELS: Record<string, string> = {
  AWS: "Amazon Web Services",
  Azure: "Microsoft Azure",
  Google: "Google Cloud",
  OnPremise: "On-Premise Infrastructure",
};

export default function MainDashboard({ costs, isLoading, isError, totalCost }: MainDashboardProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(isMounted ? totalCost : 0);

  const showSkeletons = isLoading || !isMounted;

  return (
    <div 
      className="w-full max-w-[600px] rounded-card border border-border-primary bg-bg-secondary p-8 shadow-2xl shadow-accent-primary/5 relative overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 150px)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 150px)"
      }}
    >
      {/* Receiver / Landing Zone */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 -translate-y-12 border-2 border-dashed border-accent-primary/30 rounded-full bg-accent-primary/5 blur-sm" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 -translate-y-8 bg-accent-primary/10 blur-xl rounded-full" />

      <div className="mb-8 flex items-center justify-between mt-8">
        <div>
          <h2 className="text-xl font-bold text-text-primary tracking-tight">Unified Spend</h2>
          <p className="text-sm text-text-secondary">Across your cloud infrastructure</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary transition-transform active:scale-90 cursor-pointer">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
      </div>

      <div className="space-y-6 min-h-[300px] flex justify-center flex-col">
        {showSkeletons ? (
          /* Skeleton States */
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="flex animate-pulse items-center gap-4 w-full">
               <div className="h-6 w-24 rounded bg-white/5 shrink-0" />
               <div className="h-8 flex-1 rounded-full bg-white/10" />
               <div className="h-6 w-16 rounded bg-white/5 shrink-0" />
            </div>
          ))
        ) : isError ? (
          <div className="flex flex-col items-center justify-center h-[200px] gap-2">
             <span className="text-accent-error font-medium">Error Loading Infrastructure Data</span>
             <p className="text-text-secondary text-sm">Please try again later.</p>
          </div>
        ) : !costs ? null : (
          /* Actual Data Display - Unified Chart Setup */
          Object.entries(costs).map(([provider, providerCost]) => {
            const percentage = totalCost > 0 ? (providerCost / totalCost) * 100 : 0;
            const barWidth = `${Math.max(percentage, 5)}%`; // Ensure min width for visibility
            const colorClass = PROVIDER_COLORS[provider] || "bg-text-secondary";
            
            return (
              <div key={provider} className="flex items-center gap-4 w-full group">
                <div className="w-24 text-sm font-semibold text-text-primary text-right shrink-0">
                  {provider}
                </div>
                
                {/* The "Graph" Bar */}
                <div className="flex-1 h-8 rounded-full bg-bg-tertiary overflow-hidden border border-border-secondary relative">
                  <div 
                    className={`h-full ${colorClass} transition-all duration-1000 ease-out`}
                    style={{ width: barWidth }}
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                <div className="w-20 text-sm font-bold text-text-primary text-left shrink-0">
                  ${providerCost.toFixed(2)}
                </div>
              </div>
            );
          })
        )}
      </div>
      
      <div className="mt-8 flex items-center justify-between border-t border-border-secondary pt-6">
        <span className="text-sm font-medium text-text-secondary">Master View Total</span>
        <span className="text-lg font-bold text-accent-success">{formattedTotal}</span>
      </div>
    </div>
  );
}
