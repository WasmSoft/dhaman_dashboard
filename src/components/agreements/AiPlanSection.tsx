'use client';

import { Bot } from 'lucide-react';

import { AiPlanForm } from './AiPlanForm';
import { AiPlanResult } from './AiPlanResult';

import type { GeneratedPlan } from '@/types';

interface AiPlanSectionProps {
  description: string;
  onDescriptionChange: (value: string) => void;
  totalBudget: string;
  onBudgetChange: (value: string) => void;
  validationError: string | null;
  apiError: string | null;
  isPending: boolean;
  generatedPlan: GeneratedPlan | null;
  isIncorporated: boolean;
  onGenerate: () => void;
  onIncorporate: (plan: GeneratedPlan) => void;
}

// AR: قسم توليد خطة الدفع بالذكاء الاصطناعي داخل منشئ الاتفاقيات.
// EN: AI payment plan generation section inside the Agreement Builder.
export function AiPlanSection({
  description,
  onDescriptionChange,
  totalBudget,
  onBudgetChange,
  validationError,
  apiError,
  isPending,
  generatedPlan,
  isIncorporated,
  onGenerate,
  onIncorporate,
}: AiPlanSectionProps) {
  return (
    <section className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 shadow-[0_18px_45px_rgba(4,7,20,0.18)] md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="text-start">
          <h2 className="text-[17px] font-extrabold text-white">توليد خطة الدفع</h2>
          <p className="mt-1 text-[12px] leading-6 text-[#737b99]">
            أدخل وصف مشروعك وسيقوم الذكاء الاصطناعي بإنشاء خطة مراحل دفع مخصصة لك.
          </p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-[#6f52ff]/20 text-[#a898ff]">
          <Bot className="size-4" />
        </span>
      </div>

      <AiPlanForm
        description={description}
        onDescriptionChange={onDescriptionChange}
        totalBudget={totalBudget}
        onBudgetChange={onBudgetChange}
        validationError={validationError}
        apiError={apiError}
        isPending={isPending}
        hasGeneratedPlan={!!generatedPlan}
        onGenerate={onGenerate}
      />

      {generatedPlan ? (
        <div className="mt-6 border-t border-[#252a42] pt-5">
          <AiPlanResult
            plan={generatedPlan}
            isIncorporated={isIncorporated}
            onIncorporate={() => onIncorporate(generatedPlan)}
          />
        </div>
      ) : null}
    </section>
  );
}
