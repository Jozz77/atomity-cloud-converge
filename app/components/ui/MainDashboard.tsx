"use client";

import { forwardRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MainDashboardProps {
  isLoading: boolean;
  isError: boolean;
  totalCost: number;
  costs?: { AWS: number; Azure: number; Google: number; OnPremise: number };
}

// ─── Component ───────────────────────────────────────────────────────────────

const MainDashboard = forwardRef<HTMLDivElement, MainDashboardProps>(
  function MainDashboard({ isLoading, isError, totalCost, costs }, ref) {
    const fmt = (n: number) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(n);

    const maxCost = costs ? Math.max(...Object.values(costs)) : 1;
    const getBarHeight = (cost: number) =>
      `${Math.max(8, (cost / maxCost) * 100)}%`;

    const chartData = costs
      ? [
          {
            label: "AWS",
            cost: costs.AWS,
            color: "bg-accent-aws",
            hoverColor: "hover:bg-amber-400",
            shadowColor: "shadow-amber-500/30",
          },
          {
            label: "Azure",
            cost: costs.Azure,
            color: "bg-accent-primary",
            hoverColor: "hover:bg-blue-400",
            shadowColor: "shadow-blue-500/30",
          },
          {
            label: "Google",
            cost: costs.Google,
            color: "bg-accent-google",
            hoverColor: "hover:bg-indigo-400",
            shadowColor: "shadow-indigo-500/30",
          },
          {
            label: "On-Prem",
            cost: costs.OnPremise,
            color: "bg-text-muted",
            hoverColor: "hover:bg-zinc-400",
            shadowColor: "shadow-zinc-500/30",
          },
        ]
      : [];

    return (
      <section
        ref={ref}
        aria-labelledby="dashboard-title"
        className="main-dashboard w-full max-w-[580px] rounded-card border border-border-primary bg-bg-secondary shadow-2xl shadow-black/40 relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 120px)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 120px)",
        }}
      >
        {/* Receiver / Landing Zone — glowing dashed ring at the top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-16 sm:h-20 -translate-y-8 sm:-translate-y-10 border-2 border-dashed border-accent-primary/30 rounded-full bg-accent-primary/5 blur-sm pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-10 sm:h-14 -translate-y-5 sm:-translate-y-6 bg-accent-primary/10 blur-2xl rounded-full pointer-events-none" aria-hidden="true" />

        <div className="p-5 sm:p-7">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between mt-4 sm:mt-6 relative z-10">
            <div>
              <h2 id="dashboard-title" className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
                Unified Spend
              </h2>
              <p className="text-[13px] sm:text-sm text-text-secondary mt-0.5">
                Across your cloud infrastructure
              </p>
            </div>
            {/* Subtle hover feedback on the icon button */}
            <button aria-label="View Detailed Spend Analytics" className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary transition-all duration-200 hover:bg-accent-primary/20 hover:scale-105 hover:shadow-lg hover:shadow-accent-primary/20 active:scale-95 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent-primary">
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="relative z-10">
            {isLoading ? (
              /* Skeleton bars — animate-pulse, don't use jitter */
              <div className="w-full flex items-end justify-between h-[200px] sm:h-[260px] gap-2 sm:gap-3" aria-hidden="true">
                {[72, 88, 60, 95].map((h, i) => (
                  <div
                    key={i}
                    className="w-1/4 bg-bg-tertiary rounded-t-lg animate-pulse"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center h-[200px] sm:h-[260px] gap-3" role="alert">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-accent-error/10 flex items-center justify-center">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-accent-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-accent-error font-semibold text-[12px] sm:text-sm text-center">
                  Error Loading Infrastructure Data
                </span>
              </div>
            ) : (
              /* ── Unified Bar Graph ── */
              <div 
                className="h-[200px] sm:h-[260px] w-full border-b border-border-secondary flex items-end justify-between pb-0 gap-2 sm:gap-3"
                role="group"
                aria-label="Cloud Resource Spend Breakdown"
              >
                {chartData.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center w-1/4 h-full justify-end"
                  >
                    <div
                      role="img"
                      aria-label={`${item.label}: ${fmt(item.cost)}`}
                      tabIndex={0}
                      className={`
                        chart-bar w-full rounded-t-md opacity-0 cursor-pointer
                        transition-all duration-200
                        hover:scale-y-105 hover:origin-bottom
                        hover:shadow-lg ${item.shadowColor}
                        ${item.color} ${item.hoverColor}
                        outline-none focus-visible:ring-2 focus-visible:ring-white z-20
                      `}
                      data-height={getBarHeight(item.cost)}
                      style={{ height: "0%" }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bar labels + individual amounts — shown BELOW the chart */}
          {!isLoading && !isError && chartData.length > 0 && (
            <div className="flex items-start justify-between gap-1 sm:gap-3 mt-3" aria-hidden="true">
              {chartData.map((item, index) => (
                <div key={index} className="w-1/4 flex flex-col items-center gap-0.5">
                  <span className="text-[11px] sm:text-[11px] font-bold text-text-secondary uppercase tracking-wider text-center">
                    {item.label}
                  </span>
                  <span className={`bar-cost-display text-[10px] sm:text-[10px] font-semibold text-text-muted`}>
                    {fmt(item.cost)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Grand Total Footer */}
          <div className="mt-5 flex items-center justify-between border-t border-border-secondary pt-5">
            <span className="text-[13px] sm:text-sm font-medium text-text-secondary" id="total-cost-label">
              Master Total
            </span>
            <span 
              className="total-cost-display text-base sm:text-lg font-bold text-accent-success tabular-nums"
              aria-labelledby="total-cost-label"
              aria-live="polite"
            >
              {fmt(totalCost)}
            </span>
          </div>
        </div>
      </section>
    );
  }
);

MainDashboard.displayName = "MainDashboard";
export default MainDashboard;
