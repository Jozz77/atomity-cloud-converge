"use client";

export default function MainDashboard() {
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
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
      </div>

      <div className="space-y-4">
        {/* Skeleton States */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex animate-pulse items-center justify-between rounded-lg bg-bg-tertiary p-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-white/5" />
              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-white/10" />
                <div className="h-3 w-16 rounded bg-white/5" />
              </div>
            </div>
            <div className="h-4 w-12 rounded bg-white/10" />
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex items-center justify-between border-t border-border-secondary pt-6">
        <span className="text-sm font-medium text-text-secondary">Total Optimization Potential</span>
        <span className="text-lg font-bold text-accent-success">$0.00</span>
      </div>
    </div>
  );
}
