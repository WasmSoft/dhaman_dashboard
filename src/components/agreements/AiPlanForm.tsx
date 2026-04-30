'use client';

import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/shared';
import { Sparkles, RefreshCw } from 'lucide-react';

interface AiPlanFormProps {
  description: string;
  onDescriptionChange: (value: string) => void;
  totalBudget: string;
  onBudgetChange: (value: string) => void;
  validationError: string | null;
  apiError: string | null;
  isPending: boolean;
  hasGeneratedPlan: boolean;
  onGenerate: () => void;
}

// AR: نموذج إدخال وصف المشروع لتوليد خطة الدفع بالذكاء الاصطناعي.
// EN: Project description form for AI payment plan generation.
export function AiPlanForm({
  description,
  onDescriptionChange,
  totalBudget,
  onBudgetChange,
  validationError,
  apiError,
  isPending,
  hasGeneratedPlan,
  onGenerate,
}: AiPlanFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-[12px] font-bold text-[#a7aecb]">
          وصف المشروع
        </label>
        <textarea
          dir="rtl"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="اكتب وصفاً تفصيلياً للمشروع... (20 حرف على الأقل)"
          className="min-h-[120px] w-full resize-none rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3 py-3 text-right text-[13px] leading-6 text-white outline-none placeholder:text-[#58607c] focus:border-[#6f52ff]/60 focus:ring-2 focus:ring-[#6f52ff]/20"
          maxLength={5000}
          disabled={isPending}
        />
        <div className="mt-1 flex items-center justify-between">
          {validationError ? (
            <p className="text-[11px] text-red-400">{validationError}</p>
          ) : (
            <span />
          )}
          <span className="text-[11px] text-[#58607c]">
            {description.length} / 5000
          </span>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-[12px] font-bold text-[#a7aecb]">
          الميزانية الإجمالية (اختياري)
        </label>
        <input
          type="number"
          dir="rtl"
          value={totalBudget}
          onChange={(e) => onBudgetChange(e.target.value)}
          placeholder="مثال: 5000"
          className="h-11 w-full rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3 text-right text-[13px] text-white outline-none placeholder:text-[#58607c] focus:border-[#6f52ff]/60 focus:ring-2 focus:ring-[#6f52ff]/20"
          disabled={isPending}
        />
      </div>

      {apiError && (
        <div className="flex items-start gap-2 rounded-[10px] border border-red-500/20 bg-red-500/10 px-4 py-3">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-400" />
          <p className="text-[12px] leading-6 text-red-300">{apiError} — حاول مجدداً</p>
        </div>
      )}

      <Button
        type="button"
        onClick={onGenerate}
        disabled={isPending}
        className="h-10 w-full rounded-[10px] bg-[#6f52ff] text-[13px] font-bold text-white shadow-[0_12px_28px_rgba(111,82,255,0.26)] hover:bg-[#7b63ff] disabled:opacity-60 sm:w-auto"
      >
        {isPending ? (
          <RefreshCw className="size-4 animate-spin" />
        ) : (
          <Sparkles className="size-4" />
        )}
        {isPending
          ? 'جارٍ التوليد...'
          : hasGeneratedPlan
            ? 'إعادة التوليد'
            : 'توليد خطة الدفع'}
      </Button>
    </div>
  );
}
