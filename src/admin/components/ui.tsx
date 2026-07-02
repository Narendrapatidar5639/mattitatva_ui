import type { ReactNode } from "react";
import { Leaf } from "lucide-react";
import { FONT_BODY, FONT_DISPLAY, FONT_LABEL, G, PRIMARY, PRIMARY_LIGHT } from "../../constants/theme";

export function adminFieldClass(hasError = false) {
  return [
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-300",
    "placeholder:text-gray-400",
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-gray-200 focus:border-[#246841] focus:ring-2 focus:ring-[#e8f3ed]",
  ].join(" ");
}

export function AdminCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm ${className}`} style={{ borderColor: G[100] }}>
      {children}
    </div>
  );
}

export function AdminPageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] mb-1.5 font-medium" style={{ fontFamily: FONT_LABEL, color: PRIMARY }}>
          Maati Tatva Admin
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight" style={{ fontFamily: FONT_DISPLAY }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1.5" style={{ fontFamily: FONT_BODY }}>{subtitle}</p>
        )}
        <div className="flex items-center gap-3 mt-3">
          <span className="h-px w-10 sm:w-16" style={{ background: `linear-gradient(90deg, transparent, ${PRIMARY})` }} />
          <Leaf size={12} style={{ color: PRIMARY }} />
          <span className="h-px w-10 sm:w-16" style={{ background: `linear-gradient(90deg, ${PRIMARY}, transparent)` }} />
        </div>
      </div>
      {action}
    </div>
  );
}

export function StatusBadge({ label, tone = "green" }: { label: string; tone?: "green" | "amber" | "blue" | "red" | "gray" }) {
  const styles = {
    green: { bg: PRIMARY_LIGHT, color: PRIMARY },
    amber: { bg: "#fef3c7", color: "#b45309" },
    blue: { bg: "#dbeafe", color: "#1d4ed8" },
    red: { bg: "#fee2e2", color: "#b91c1c" },
    gray: { bg: G[100], color: G[700] },
  }[tone];

  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide"
      style={{ background: styles.bg, color: styles.color, fontFamily: FONT_LABEL }}
    >
      {label}
    </span>
  );
}

export function MetricCard({
  label,
  value,
  change,
  icon,
}: {
  label: string;
  value: string;
  change?: string;
  icon: ReactNode;
}) {
  return (
    <AdminCard className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1" style={{ fontFamily: FONT_LABEL }}>{label}</p>
          <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: FONT_DISPLAY }}>{value}</p>
          {change && <p className="text-[11px] text-green-700 mt-1 font-semibold">{change}</p>}
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: PRIMARY_LIGHT, color: PRIMARY }}>
          {icon}
        </div>
      </div>
    </AdminCard>
  );
}

export const ADMIN_CATEGORIES = [
  { id: "doctor", label: "Doctor Maatitatva" },
  { id: "organic", label: "Organic Maatitatva" },
  { id: "maatifresh", label: "Maatifresh" },
  { id: "ayurved", label: "Ayurved Maatitatva" },
];

export const CLAY_MATERIALS = [
  "Terracotta Red Clay",
  "Earthen Black Clay",
  "Natural River Clay",
  "Organic Compost Blend",
  "Herbal Pottery Mix",
  "Medicinal Clay Powder",
];
