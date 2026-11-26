import React from "react";
import { Lock } from "lucide-react";

interface RegistrationClosedBannerProps {
  title?: string;
  message: string;
}

export function RegistrationClosedBanner({
  title = "Registration is Currently Closed",
  message,
}: RegistrationClosedBannerProps) {
  return (
    <div
      role="alert"
      className="p-5 sm:p-6 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 flex items-start gap-3.5 shadow-2xs"
    >
      <div className="w-10 h-10 rounded-xl bg-amber-200/70 text-amber-900 flex items-center justify-center flex-shrink-0">
        <Lock className="w-5 h-5" />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm sm:text-base font-extrabold text-amber-950">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
}
