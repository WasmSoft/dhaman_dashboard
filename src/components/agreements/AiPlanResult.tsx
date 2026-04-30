import { CheckCircle2, AlertTriangle, CheckCheck } from 'lucide-react';
import { Button } from '@/components/shared';
import type { GeneratedPlan } from '@/types';

interface AiPlanResultProps {
  plan: GeneratedPlan;
  isIncorporated: boolean;
  onIncorporate: () => void;
}

function scoreColorClass(score: number) {
  if (score >= 80) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25';
  if (score >= 50) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/25';
  return 'text-red-400 bg-red-500/10 border-red-500/25';
}

// AR: يعرض الخطة المُولَّدة: المراحل والسياسات والتنبيهات ودرجة الوضوح.
// EN: Displays the generated plan: milestones, policies, warnings, and clarity score.
export function AiPlanResult({ plan, isIncorporated, onIncorporate }: AiPlanResultProps) {
  return (
    <div dir="rtl" className="space-y-5">
      {/* Clarity score */}
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-bold text-white">درجة الوضوح</span>
        <span className={`rounded-full border px-3 py-1 text-[12px] font-bold ${scoreColorClass(plan.clarityScore)}`}>
          {plan.clarityScore} / 100
        </span>
      </div>

      {/* Ambiguity warnings — hidden when empty */}
      {plan.ambiguityWarnings.length > 0 && (
        <div className="rounded-[10px] border border-yellow-500/20 bg-yellow-500/10 p-4">
          <p className="mb-2 text-[12px] font-bold text-yellow-400">تنبيهات</p>
          <ul className="space-y-1">
            {plan.ambiguityWarnings.map((warning, i) => (
              <li key={i} className="flex items-start gap-2 text-[12px] leading-6 text-yellow-300">
                <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
                {warning}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Milestones */}
      <div>
        <p className="mb-3 text-[13px] font-bold text-white">مراحل الدفع</p>
        <div className="space-y-3 overflow-x-auto">
          {plan.milestones.map((m, i) => (
            <div key={i} className="rounded-[10px] border border-[#252a42] bg-[#1d2135] p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[12px] text-[#737b99]">{m.dueInDays} يوم</span>
                <span className="text-[14px] font-extrabold text-white">{m.title}</span>
              </div>
              <div className="mb-2 flex items-center justify-between text-[12px]">
                <span className="rounded-full border border-[#6f52ff]/30 bg-[#6f52ff]/10 px-2 py-0.5 text-[#a898ff]">
                  {m.revisionLimit} مراجعة
                </span>
                <span className="font-bold text-emerald-400">{m.amount.toLocaleString('ar-SA')} ر.س</span>
              </div>
              <ul className="space-y-1">
                {m.acceptanceCriteria.map((c, ci) => (
                  <li key={ci} className="flex items-start gap-2 text-[11px] leading-5 text-[#737b99]">
                    <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-emerald-400/60" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Policies */}
      <div>
        <p className="mb-3 text-[13px] font-bold text-white">السياسات</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: 'سياسة التأخير', text: plan.policies.delay },
            { label: 'سياسة الإلغاء', text: plan.policies.cancellation },
            { label: 'الطلبات الإضافية', text: plan.policies.extraRequest },
            { label: 'سياسة المراجعة', text: plan.policies.review },
          ].map((p) => (
            <div key={p.label} className="rounded-[10px] border border-[#252a42] bg-[#1d2135] p-3">
              <p className="mb-1 text-[11px] font-bold text-[#a7aecb]">{p.label}</p>
              <p className="text-[12px] leading-6 text-[#737b99]">{p.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Incorporate button */}
      <Button
        type="button"
        onClick={onIncorporate}
        disabled={isIncorporated}
        className="h-10 w-full rounded-[10px] bg-emerald-600 text-[13px] font-bold text-white hover:bg-emerald-700 disabled:opacity-60 sm:w-auto"
      >
        <CheckCheck className="size-4" />
        {isIncorporated ? 'تم استخدام الخطة ✓' : 'استخدام هذه الخطة'}
      </Button>
    </div>
  );
}
