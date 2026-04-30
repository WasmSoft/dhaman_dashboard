'use client';

import { useState } from 'react';
import { Bot } from 'lucide-react';
import { planGenerationSchema } from '@/lib/ai-plan/schemas';
import { useGeneratePlanMutation } from '@/hooks/ai-plan';
import { AiPlanForm } from './AiPlanForm';
import { AiPlanResult } from './AiPlanResult';
import type { GeneratedPlan } from '@/types';

interface AiPlanSectionProps {
  onIncorporate: (plan: GeneratedPlan) => void;
}

// AR: قسم توليد خطة الدفع بالذكاء الاصطناعي داخل منشئ الاتفاقيات.
// EN: AI payment plan generation section inside the Agreement Builder.
export function AiPlanSection({ onIncorporate }: AiPlanSectionProps) {
  const [description, setDescription] = useState('');
  const [totalBudget, setTotalBudget] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isIncorporated, setIsIncorporated] = useState(false);

  const mutation = useGeneratePlanMutation();

  function handleGenerate() {
    const result = planGenerationSchema.safeParse({
      projectDescription: description,
      totalBudget: totalBudget ? Number(totalBudget) : undefined,
    });

    if (!result.success) {
      setValidationError(result.error.issues[0]?.message ?? 'خطأ في البيانات');
      return;
    }

    setValidationError(null);
    setIsIncorporated(false);
    mutation.mutate({
      projectDescription: result.data.projectDescription,
      totalBudget: result.data.totalBudget,
      language: 'ar',
    });
  }

  function handleIncorporate() {
    if (!mutation.data) return;
    setIsIncorporated(true);
    onIncorporate(mutation.data);
  }

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
        onDescriptionChange={setDescription}
        totalBudget={totalBudget}
        onBudgetChange={setTotalBudget}
        validationError={validationError}
        apiError={mutation.error ? (mutation.error as Error).message : null}
        isPending={mutation.isPending}
        hasGeneratedPlan={!!mutation.data}
        onGenerate={handleGenerate}
      />

      {mutation.data && (
        <div className="mt-6 border-t border-[#252a42] pt-5">
          <AiPlanResult
            plan={mutation.data}
            isIncorporated={isIncorporated}
            onIncorporate={handleIncorporate}
          />
        </div>
      )}
    </section>
  );
}
