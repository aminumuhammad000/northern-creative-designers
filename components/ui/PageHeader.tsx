import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  tag?: string;
  title: string;
  description?: string;
  breadcrumbs?: { title: string; href?: string }[];
}

export function PageHeader({
  tag,
  title,
  description,
  breadcrumbs = [{ title: "Home", href: "/" }],
}: PageHeaderProps) {
  return (
    <div className="bg-neutral-sand border-b border-neutral-border py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-navy/60 mb-4" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-pine transition-colors font-medium"
                >
                  {crumb.title}
                </Link>
              ) : (
                <span className="text-pine font-semibold">{crumb.title}</span>
              )}
              {idx < breadcrumbs.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-navy/40" />
              )}
            </React.Fragment>
          ))}
          <ChevronRight className="w-3.5 h-3.5 text-navy/40" />
          <span className="text-pine font-semibold truncate max-w-[200px]">
            {title}
          </span>
        </nav>

        {tag && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 bg-pine/5 text-pine border border-pine/15">
            <span className="w-1.5 h-1.5 rounded-full bg-spring" />
            {tag}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-pine leading-tight">
          {title}
        </h1>

        {description && (
          <p className="mt-4 text-base sm:text-lg text-navy/75 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
