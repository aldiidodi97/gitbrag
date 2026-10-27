import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  hint,
  Icon,
  children,
  className,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  Icon?: LucideIcon;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("bg-card flex flex-col gap-1 px-5 py-4", className)}>
      <div className="flex items-center justify-between">
        <span className="label">{label}</span>
        {Icon ? <Icon className="text-muted-foreground size-3.5" /> : null}
      </div>
      <div className="flex items-end justify-between gap-3">
        <div className="tabular font-mono text-3xl font-medium tracking-tight">
          {value}
        </div>
        {children}
      </div>
      {hint ? (
        <div className="text-muted-foreground font-mono text-[11px]">
          {hint}
        </div>
      ) : null}
    </div>
  );
}

export function Sparkline({
  values,
  className,
}: {
  values: number[];
  className?: string;
}) {
  if (values.length < 2) return null;
  const w = 72;
  const h = 24;
  const max = Math.max(...values, 1);
  const step = w / (values.length - 1);
  const points = values.map(
    (v, i) =>
      `${(i * step).toFixed(1)},${(h - (v / max) * (h - 2) - 1).toFixed(1)}`,
  );
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className={cn("text-accent", className)}
      aria-hidden
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        points={points.join(" ")}
      />
    </svg>
  );
}
