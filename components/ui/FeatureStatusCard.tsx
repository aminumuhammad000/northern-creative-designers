import React from "react";
import Link from "next/link";
import { Sparkles, Calendar, Clock, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FeatureStatusCardProps {
  phase: string;
  title: string;
  status: "active" | "forthcoming" | "scheduled";
  description: string;
  expectedDate?: string;
  primaryAction?: {
    text: string;
    href: string;
  };
}

export function FeatureStatusCard({
  phase,
  title,
  status,
  description,
  expectedDate = "Phase 2 Roadmap Milestone",
  primaryAction,
}: FeatureStatusCardProps) {
  return (
    <div className="max-w-3xl mx-auto my-12 p-8 sm:p-10 rounded-2xl bg-neutral-sand border border-neutral-border text-center space-y-6">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pine/5 text-pine text-xs font-semibold border border-pine/10">
        <span className="w-2 h-2 rounded-full bg-tangerine" />
        <span>{phase}</span>
        <span>•</span>
        <span className="capitalize">{status}</span>
      </div>

      <div className="space-y-3 max-w-xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold text-pine">{title}</h3>
        <p className="text-navy/75 text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </div>

      <div className="p-4 rounded-xl bg-white border border-neutral-border inline-flex items-center gap-3 text-xs text-navy/70">
        <Clock className="w-4 h-4 text-spring flex-shrink-0" />
        <span>Target Deployment: <strong className="text-pine">{expectedDate}</strong></span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-neutral-border">
        {primaryAction ? (
          <Button href={primaryAction.href} variant="primary" size="md">
            {primaryAction.text}
          </Button>
        ) : (
          <Button href="/" variant="outline" size="md" icon={<ArrowLeft className="w-4 h-4" />}>
            Back to Homepage
          </Button>
        )}
      </div>
    </div>
  );
}
