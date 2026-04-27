// AR: مكون شارة الحالة الملونة المستخدم في صفحة مراجعات AI وجداول الدفعات.
// EN: Colored status badge component used in AI Review page and payment tables.
import { cn } from "@/lib/utils";

type StatusTone =
  | "success"
  | "purple"
  | "blue"
  | "amber"
  | "red"
  | "muted"
  | "cyan";

const toneClasses: Record<StatusTone, string> = {
  success: "bg-emerald-500/15 text-emerald-400",
  purple: "bg-violet-500/15 text-violet-400",
  blue: "bg-blue-500/15 text-blue-400",
  amber: "bg-amber-500/15 text-amber-400",
  red: "bg-red-500/15 text-red-400",
  muted: "bg-[#363b54]/60 text-[#8b90a8]",
  cyan: "bg-cyan-500/15 text-cyan-400",
};

interface StatusBadgeProps {
  label: string;
  tone: StatusTone;
  className?: string;
  icon?: React.ReactNode;
}

export function StatusBadge({ label, tone, className, icon }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[13px] font-medium leading-none",
        toneClasses[tone],
        className,
      )}
    >
      {label}
      {icon}
    </span>
  );
}