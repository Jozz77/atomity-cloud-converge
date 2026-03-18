"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCloudData, type Post } from "@/app/hooks/useCloudData";
import { tokens } from "@/app/tokens";
import CloudBadge from "./CloudBadge";
import MainDashboard from "./MainDashboard";

// ─── Types ──────────────────────────────────────────────────────────────────

interface ProcessedCloudData {
  costs: {
    AWS: number;
    Azure: number;
    Google: number;
    OnPremise: number;
  };
  totalCost: number;
}

interface BadgeConfig {
  type: "AWS" | "Azure" | "Google" | "On-Premise";
  costKey: keyof ProcessedCloudData["costs"];
  /** Initial scattered CSS position — inline styles so GSAP can tween them */
  initStyle: React.CSSProperties;
}

// ─── Badge scattered positions ("Data Chaos") ────────────────────────────────

const BADGE_CONFIGS: BadgeConfig[] = [
  {
    type: "AWS",
    costKey: "AWS",
    initStyle: { top: "10%", left: "8%", transform: "rotate(12deg)" },
  },
  {
    type: "Azure",
    costKey: "Azure",
    initStyle: { top: "6%", left: "42%", transform: "rotate(-8deg)" },
  },
  {
    type: "Google",
    costKey: "Google",
    initStyle: { top: "14%", right: "8%", transform: "rotate(18deg)" },
  },
  {
    type: "On-Premise",
    costKey: "OnPremise",
    initStyle: { top: "9%", right: "34%", transform: "rotate(-12deg)" },
  },
];

// ─── Data processing helper ──────────────────────────────────────────────────

function processData(data: Post[]): ProcessedCloudData {
  const calc = (slice: Post[]) =>
    slice.reduce((sum, p) => sum + p.price, 0) * 124.5;

  const costs = {
    AWS: calc(data.slice(0, 3)),
    Azure: calc(data.slice(3, 6)),
    Google: calc(data.slice(6, 9)),
    OnPremise: calc(data.slice(9, 12)),
  };

  return {
    costs,
    totalCost: Object.values(costs).reduce((a, b) => a + b, 0),
  };
}

// ─── ConvergenceSection ──────────────────────────────────────────────────────

export default function ConvergenceSection() {
  const { data, isLoading, isError } = useCloudData();
  const processed = data && data.length >= 12 ? processData(data) : null;

  const sectionRef = useRef<HTMLElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!processed || isLoading || isError) return;

    gsap.registerPlugin(ScrollTrigger);

    // ── Accessibility ─────────────────────────────────────────────────────────
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const badges = badgeRefs.current.filter(Boolean) as HTMLDivElement[];
      const chartBars =
        dashboardRef.current?.querySelectorAll<HTMLDivElement>(".chart-bar");
      const totalEl = dashboardRef.current?.querySelector<HTMLSpanElement>(
        ".total-cost-display"
      );

      if (prefersReduced) {
        // Skip all movement — instantly show the final state
        gsap.set(badges, { opacity: 0, scale: 0 });
        chartBars?.forEach((bar) => {
          gsap.set(bar, {
            height: bar.getAttribute("data-height") ?? "10%",
            opacity: 1,
          });
        });
        if (totalEl) {
          totalEl.textContent = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(processed.totalCost);
        }
        return;
      }

      // ── Full ScrollTrigger timeline ───────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%", // Reduced slightly for a snappier transition
          toggleActions: "play none none reverse",
          pin: true,
          anticipatePin: 1,
        },
      });

      // Phase 1 (t=0–0.5): Badges converge toward the dashboard receiver
      tl.to(
        badges,
        {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          xPercent: -50,
          yPercent: -50,
          rotate: 0,
          ease: "power3.inOut",
          stagger: { each: 0.05, from: "random" },
          duration: 0.5,
        },
        0
      );

      // Phase 2 (t=0.4–0.6): Badges shrink & fade
      tl.to(
        badges,
        {
          scale: 0,
          opacity: 0,
          ease: "power2.in",
          stagger: { each: 0.04, from: "random" },
          duration: 0.2,
        },
        0.4
      );

      // Phase 3 (t=0.5–0.8): Bars rise
      if (chartBars && chartBars.length) {
        tl.to(
          chartBars,
          {
            height: (_i, el) => el.getAttribute("data-height") ?? "10%",
            opacity: 1,
            ease: "power4.out",
            stagger: { each: 0.08, from: "start" },
            duration: 0.4,
          },
          0.5
        );
      }

      // Phase 4 (t=0.6–0.9): Total cost count-up
      if (totalEl) {
        const counter = { val: 0 };
        tl.to(
          counter,
          {
            val: processed.totalCost,
            duration: 0.6,
            ease: "power2.out",
            onUpdate() {
              totalEl.textContent = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(counter.val);
            },
          },
          0.6
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [processed, isLoading, isError]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: tokens.colors.bgPrimary,
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }}
    >
      {/* Ambient glow stays behind everything */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
        style={{ background: `${tokens.colors.accentPrimary}1a` }}
      />

      {/* ── Scattered Cloud Badges ("Data Chaos" input sources) ── */}
      {!isLoading && !isError && processed && (
        <div className="absolute inset-0 pointer-events-none">
          {BADGE_CONFIGS.map((cfg, idx) => (
            <div
              key={cfg.type}
              ref={(el) => {
                badgeRefs.current[idx] = el;
              }}
              className="absolute pointer-events-auto"
              style={cfg.initStyle}
            >
              <CloudBadge
                type={cfg.type}
                cost={processed.costs[cfg.costKey]}
              />
            </div>
          ))}
        </div>
      )}

      {/* ── Central Processor — the "Master View" dashboard ── */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <MainDashboard
          ref={dashboardRef}
          isLoading={isLoading}
          isError={isError}
          totalCost={processed?.totalCost ?? 0}
          costs={processed?.costs}
        />
      </div>
    </section>
  );
}
