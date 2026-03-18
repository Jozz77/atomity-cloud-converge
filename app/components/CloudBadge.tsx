"use client";
import { CLOUD_LOGOS } from "../constants/icons";

interface CloudBadgeProps {
  type: "AWS" | "Azure" | "Google" | "On-Premise";
  className?: string;
}

const config = {
  AWS: { label: "AWS", color: "bg-accent-aws", icon: CLOUD_LOGOS.AWS },
  Azure: { label: "Azure", color: "bg-accent-primary", icon: CLOUD_LOGOS.Azure },
  Google: { label: "Google Cloud", color: "bg-accent-google", icon: CLOUD_LOGOS.Google },
  "On-Premise": { label: "On-Prem", color: "bg-text-muted", icon: CLOUD_LOGOS.OnPremise },
};

export default function CloudBadge({ type, className = "" }: CloudBadgeProps) {
  const { label, color, icon } = config[type];
  
  return (
    <div className={`flex items-center gap-3 rounded-full border border-border-primary bg-bg-secondary p-1 pr-4 shadow-xl shadow-black/50 transition-all hover:border-text-muted ${className}`}>
      <div className={`flex aspect-square h-8 items-center justify-center rounded-full font-bold text-bg-primary ${color}`}>
        {icon}
      </div>
      <span className="text-xs font-semibold tracking-wide text-text-primary">{label}</span>
    </div>
  );
}
