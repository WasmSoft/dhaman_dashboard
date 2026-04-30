"use client";

// AR: نافذة حوارية لإنشاء طلب تغيير جديد باستخدام React Hook Form و Zod للتحقق.
// EN: Dialog for creating a new change request using React Hook Form and Zod validation.
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, X, Loader2 } from "lucide-react";
import { Button } from "@/components/shared";
import {
  createChangeRequestSchema,
  type CreateChangeRequestFormValues,
} from "@/lib/change-requests/schemas";
import { useCreateChangeRequestMutation } from "@/hooks/change-requests";
import { changeRequestsContent } from "@/constants";

interface CreateChangeRequestDialogProps {
  agreementId: string;
  trigger: React.ReactNode;
}

export function CreateChangeRequestDialog({
  agreementId,
  trigger,
}: CreateChangeRequestDialogProps) {
  const [open, setOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [criteria, setCriteria] = useState<string[]>([""]);
  const locale = "ar";

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateChangeRequestFormValues>({
    defaultValues: {
      title: "",
      description: "",
      amount: "",
      currency: "USD",
      acceptanceCriteria: [""],
      timelineDays: undefined,
    },
  });

  const createMutation = useCreateChangeRequestMutation(agreementId);

  const onSubmit = async (data: CreateChangeRequestFormValues) => {
    data.acceptanceCriteria = criteria.filter((c) => c.trim().length > 0);
    const result = createChangeRequestSchema.safeParse(data);
    if (!result.success) {
      const errors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const path = issue.path.join(".");
        if (path && !errors[path]) {
          errors[path] = issue.message;
        }
      }
      setFormErrors(errors);
      return;
    }

    try {
      await createMutation.mutateAsync(result.data);
      reset();
      setFormErrors({});
      setCriteria([""]);
      setOpen(false);
    } catch {
      // Error handled by TanStack Query
    }
  };

  const addCriterion = () => setCriteria((prev) => [...prev, ""]);
  const removeCriterion = (idx: number) =>
    setCriteria((prev) => prev.filter((_, i) => i !== idx));
  const updateCriterion = (idx: number, value: string) =>
    setCriteria((prev) => prev.map((c, i) => (i === idx ? value : c)));

  const ct = changeRequestsContent;

  return (
    <>
      <div onClick={() => { setFormErrors({}); setCriteria([""]); setOpen(true); }} className="inline-flex">
        {trigger}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="relative z-10 w-full max-w-lg rounded-[14px] border border-[#252a42] bg-[#15192b] p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white text-start">
                {ct.createForm.title[locale]}
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-[#8b90a8] transition-colors hover:bg-[#252a42] hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5 text-start">
                <label className="text-[13px] font-medium text-[#8b90a8]">
                  {ct.createForm.titleLabel[locale]}
                </label>
                <input
                  {...register("title")}
                  className="rounded-[10px] border border-[#252a42] bg-[#1a1f37] px-3 py-2 text-sm text-white placeholder:text-[#5a5f7a] focus:border-[#6f52ff] focus:outline-none"
                  placeholder="Enter title"
                />
                {formErrors.title && (
                  <span className="text-[12px] text-red-400">{formErrors.title}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5 text-start">
                <label className="text-[13px] font-medium text-[#8b90a8]">
                  {ct.createForm.descriptionLabel[locale]}
                </label>
                <textarea
                  {...register("description")}
                  rows={4}
                  className="rounded-[10px] border border-[#252a42] bg-[#1a1f37] px-3 py-2 text-sm text-white placeholder:text-[#5a5f7a] focus:border-[#6f52ff] focus:outline-none resize-none"
                  placeholder="Enter description"
                />
                {formErrors.description && (
                  <span className="text-[12px] text-red-400">{formErrors.description}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5 text-start">
                  <label className="text-[13px] font-medium text-[#8b90a8]">
                    {ct.createForm.amountLabel[locale]}
                  </label>
                  <input
                    {...register("amount")}
                    className="rounded-[10px] border border-[#252a42] bg-[#1a1f37] px-3 py-2 text-sm text-white placeholder:text-[#5a5f7a] focus:border-[#6f52ff] focus:outline-none"
                    placeholder="0.00"
                  />
                  {formErrors.amount && (
                    <span className="text-[12px] text-red-400">{formErrors.amount}</span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5 text-start">
                  <label className="text-[13px] font-medium text-[#8b90a8]">
                    {ct.createForm.currencyLabel[locale]}
                  </label>
                  <input
                    {...register("currency")}
                    className="rounded-[10px] border border-[#252a42] bg-[#1a1f37] px-3 py-2 text-sm text-white placeholder:text-[#5a5f7a] focus:border-[#6f52ff] focus:outline-none"
                    placeholder="USD"
                  />
                  {formErrors.currency && (
                    <span className="text-[12px] text-red-400">{formErrors.currency}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-start">
                <label className="text-[13px] font-medium text-[#8b90a8]">
                  {ct.createForm.acceptanceCriteriaLabel[locale]}
                </label>
                {criteria.map((value, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      value={value}
                      onChange={(e) => updateCriterion(idx, e.target.value)}
                      className="flex-1 rounded-[10px] border border-[#252a42] bg-[#1a1f37] px-3 py-2 text-sm text-white placeholder:text-[#5a5f7a] focus:border-[#6f52ff] focus:outline-none"
                      placeholder={`${ct.createForm.acceptanceCriteriaLabel[locale]} ${idx + 1}`}
                    />
                    {criteria.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCriterion(idx)}
                        className="rounded-md p-1.5 text-[#8b90a8] hover:bg-[#252a42] hover:text-red-400 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                {formErrors.acceptanceCriteria && (
                  <span className="text-[12px] text-red-400">{formErrors.acceptanceCriteria}</span>
                )}
                <button
                  type="button"
                  onClick={addCriterion}
                  className="flex items-center gap-1 self-start rounded-md px-2 py-1 text-[13px] text-[#6f52ff] hover:bg-[#6f52ff]/10 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  {ct.createForm.addCriterion[locale]}
                </button>
              </div>

              <div className="flex flex-col gap-1.5 text-start">
                <label className="text-[13px] font-medium text-[#8b90a8]">
                  {ct.createForm.timelineDaysLabel[locale]}
                </label>
                <input
                  type="number"
                  {...register("timelineDays", { valueAsNumber: true })}
                  className="rounded-[10px] border border-[#252a42] bg-[#1a1f37] px-3 py-2 text-sm text-white placeholder:text-[#5a5f7a] focus:border-[#6f52ff] focus:outline-none"
                  placeholder="7"
                />
                {formErrors.timelineDays && (
                  <span className="text-[12px] text-red-400">{formErrors.timelineDays}</span>
                )}
              </div>

              <div className="mt-2 flex items-center justify-end gap-3">
                <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                  {ct.createForm.cancel[locale]}
                </Button>
                <Button type="submit" disabled={isSubmitting || createMutation.isPending}>
                  {(isSubmitting || createMutation.isPending) && (
                    <Loader2 className="me-2 h-4 w-4 animate-spin" />
                  )}
                  {ct.createForm.submit[locale]}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
