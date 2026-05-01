"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, X } from "lucide-react";

import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared";
import {
  type CreateMilestoneFormValues,
  createMilestoneSchema,
} from "@/lib/milestones/schemas/milestone-form.schema";
import {
  mapCreateFormToPayload,
  getCreateMilestoneDefaults,
} from "@/lib/milestones/helpers/milestone-builder.helper";
import { useCreateMilestoneMutation } from "@/hooks/milestones";
import type { MilestoneAcceptanceCriterion } from "@/types";

interface MilestoneDraftFormProps {
  agreementId: string;
  nextOrderIndex: number;
  onSaved: () => void;
  onCancel: () => void;
}

// AR: نموذج إنشاء أو تعديل مرحلة — يستخدم React Hook Form و Zod مع مساعدات الباني.
// EN: Milestone create/edit form — uses React Hook Form, Zod, and builder helpers.
export function MilestoneDraftForm({
  agreementId,
  nextOrderIndex,
  onSaved,
  onCancel,
}: MilestoneDraftFormProps) {
  const [criteria, setCriteria] = useState<MilestoneAcceptanceCriterion[]>([
    { description: "", required: true },
  ]);

  const createMutation = useCreateMilestoneMutation(agreementId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateMilestoneFormValues>({
    resolver: zodResolver(createMilestoneSchema),
    defaultValues: getCreateMilestoneDefaults(nextOrderIndex),
  });

  function addCriterion() {
    setCriteria((prev) => [...prev, { description: "", required: true }]);
  }

  function removeCriterion(index: number) {
    setCriteria((prev) => prev.filter((_, i) => i !== index));
  }

  function updateCriterion(index: number, value: string) {
    setCriteria((prev) =>
      prev.map((c, i) => (i === index ? { ...c, description: value } : c)),
    );
  }

  async function onSubmit(values: CreateMilestoneFormValues) {
    const payload = mapCreateFormToPayload({
      ...values,
      acceptanceCriteria: criteria.filter((c) => c.description.trim().length > 0),
    });

    await createMutation.mutateAsync(payload);
    onSaved();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 md:p-6"
      dir="rtl"
    >
      <h2 className="mb-5 text-[18px] font-extrabold text-white">
        إضافة مرحلة جديدة
      </h2>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-[12px] font-bold text-[#a7aecb]">
            عنوان المرحلة
          </label>
          <Input
            {...register("title")}
            placeholder="مثال: التخطيط والوايرفريم الأولي"
            className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white placeholder:text-[#58607c] focus-visible:ring-[#6f52ff]/20"
          />
          {errors.title ? (
            <p className="mt-1 text-[11px] text-red-300">
              {errors.title.message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-[12px] font-bold text-[#a7aecb]">
              المبلغ
            </label>
            <Input
              {...register("amount")}
              placeholder="150.00"
              className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white placeholder:text-[#58607c] focus-visible:ring-[#6f52ff]/20"
            />
            {errors.amount ? (
              <p className="mt-1 text-[11px] text-red-300">
                {errors.amount.message}
              </p>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-[12px] font-bold text-[#a7aecb]">
              تاريخ التسليم (اختياري)
            </label>
            <Input
              {...register("dueDate")}
              type="date"
              className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white focus-visible:ring-[#6f52ff]/20"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-[12px] font-bold text-[#a7aecb]">
              شروط القبول
            </label>
            <Button
              type="button"
              variant="secondary"
              className="h-7 rounded-[7px] border border-[#252a42] bg-[#1d2135] px-2 text-[11px] font-bold text-[#a898ff] hover:bg-[#252a42]"
              onClick={addCriterion}
            >
              إضافة شرط
            </Button>
          </div>
          <div className="space-y-2">
            {criteria.map((criterion, index) => (
              <div
                key={index}
                className="flex items-center gap-2"
              >
                <Input
                  value={criterion.description}
                  onChange={(event) =>
                    updateCriterion(index, event.target.value)
                  }
                  placeholder="وصف شرط القبول"
                  className="h-10 flex-1 rounded-[9px] border-[#252a42] bg-[#1d2135] text-right text-[12px] text-white placeholder:text-[#58607c] focus-visible:ring-[#6f52ff]/20"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="shrink-0 rounded-[7px] bg-[#101323] text-[#8a91ac] hover:bg-red-500/20 hover:text-red-300"
                  onClick={() => removeCriterion(index)}
                  aria-label="حذف شرط القبول"
                >
                  <X className="size-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-[12px] font-bold text-[#a7aecb]">
              ترتيب المرحلة
            </label>
            <Input
              type="number"
              {...register("orderIndex", { valueAsNumber: true })}
              className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white focus-visible:ring-[#6f52ff]/20"
            />
            {errors.orderIndex ? (
              <p className="mt-1 text-[11px] text-red-300">
                {errors.orderIndex.message}
              </p>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-[12px] font-bold text-[#a7aecb]">
              حد المراجعات (اختياري)
            </label>
            <Input
              type="number"
              {...register("revisionLimit", { valueAsNumber: true })}
              className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white focus-visible:ring-[#6f52ff]/20"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="secondary"
          className="h-10 rounded-[10px] border border-[#252a42] bg-[#15192b] px-4 text-[13px] font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white"
          onClick={onCancel}
        >
          <X className="size-4" />
          إلغاء
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-10 rounded-[10px] bg-[#6f52ff] px-5 text-[13px] font-bold text-white shadow-[0_12px_28px_rgba(111,82,255,0.26)] hover:bg-[#7b63ff]"
        >
          <Save className="size-4" />
          {isSubmitting ? "جاري الحفظ..." : "حفظ المرحلة"}
        </Button>
      </div>

      {createMutation.isError ? (
        <p className="mt-4 rounded-[10px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-[12px] leading-6 text-red-100/85">
          {(createMutation.error as Error).message}
        </p>
      ) : null}
    </form>
  );
}
