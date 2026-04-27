// AR: شريط نسبة التطابق مع شريط تقدم ملون ونسبة مئوية.
// EN: Match score bar with a colored progress bar and percentage label.
import { cn } from "@/lib/utils";

function getBarColor(score: number): string {
  if (score >= 80) return "bg-emerald-400";
  if (score >= 60) return "bg-amber-400";
  return "bg-red-400";
}

function getTextColor(score: number): string {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-amber-400";
  return "text-red-400";
}

interface ScoreBarProps {
  score: number;
  className?: string;
}

export function ScoreBar({ score, className }: ScoreBarProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <span className={cn("text-[14px] font-semibold leading-none", getTextColor(score))}>
        {score}%
      </span>
      <div className="mt-1 h-[3px] w-11 overflow-hidden rounded-full bg-[#1d2135]">
        <div
          className={cn("h-full rounded-full transition-all", getBarColor(score))}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}