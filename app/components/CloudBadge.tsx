"use client";
import { CLOUD_LOGOS } from "../constants/icons";

import { useState, useEffect } from "react";

interface CloudBadgeProps {
  type: "AWS" | "Azure" | "Google" | "On-Premise";
  className?: string;
  cost?: number;
}

const config = {
  AWS: { label: "AWS", color: "bg-accent-aws", icon: CLOUD_LOGOS.AWS },
  Azure: { label: "Azure", color: "bg-accent-primary", icon: CLOUD_LOGOS.Azure },
  Google: { label: "Google", color: "bg-accent-google", icon: CLOUD_LOGOS.Google },
  "On-Premise": { label: "On-Prem", color: "bg-text-muted", icon: CLOUD_LOGOS.OnPremise },
};

export default function CloudBadge({ type, className = "", cost }: CloudBadgeProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { label, color, icon } = config[type];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Ensure server-client consistency for the initial frame
  
  const formattedCost = cost ? new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(cost) : null;
  
  return (
    <div className={`flex items-center gap-3 rounded-full border border-border-primary bg-bg-secondary p-1 pr-4 shadow-xl shadow-black/50 transition-all hover:border-accent-primary/50 group ${className}`}>
      <div className={`flex aspect-square h-8 items-center justify-center rounded-full font-bold text-bg-primary transition-transform group-hover:scale-110 ${color}`}>
        <div className="w-4 h-4">{icon}</div>
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary leading-none mb-0.5">{label}</span>
        {formattedCost && (
          <span className="text-xs font-bold text-text-primary leading-none">{formattedCost}</span>
        )}
      </div>
    </div>
  );
}
