"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcw, Save } from "lucide-react";

import { Button, Input, Skeleton } from "@/components/shared";
import { useAgreementPolicyQuery, useUpsertPolicyMutation } from "@/hooks/agreement-policies";
import { ApiError } from "@/lib/axios-instance";
import { policyMutationSchema } from "@/lib/agreement-policies";
import type { AgreementPolicy, PolicyMutationPayload } from "@/types";

interface AgreementPoliciesSectionProps {
  agreementId: string;
  isDraft: boolean;
}

const textFieldNames = [
  "delayPolicy",
  "cancellationPolicy",
  "extraRequestPolicy",
  "reviewPolicy",
] as const;

const numberFieldNames = [
  "clientReviewPeriodDays",
  "freelancerDelayGraceDays",
] as const;

function getFormDefaults(policy: AgreementPolicy | null): PolicyMutationPayload {
  return {
    delayPolicy: policy?.delayPolicy ?? "",
    cancellationPolicy: policy?.cancellationPolicy ?? "",
    extraRequestPolicy: policy?.extraRequestPolicy ?? "",
    reviewPolicy: policy?.reviewPolicy ?? "",
    clientReviewPeriodDays: policy?.clientReviewPeriodDays,
    freelancerDelayGraceDays: policy?.freelancerDelayGraceDays,
  };
}

function getErrorMessage(error: unknown) {
  const apiError = error as ApiError;

  return (
    apiError.message ||
    "تعذر تحميل سياسات الاتفاق الآن / Could not load agreement policies right now"
  );
}

function PolicySkeleton() {
  return (
    <section className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 md:p-6">
      <Skeleton className="h-6 w-44 bg-[#252a42]" />
      <Skeleton className="mt-3 h-4 w-full bg-[#252a42]" />
      <Skeleton className="mt-2 h-4 w-3/4 bg-[#252a42]" />
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Skeleton className="h-28 w-full bg-[#252a42]" />
        <Skeleton className="h-28 w-full bg-[#252a42]" />
        <Skeleton className="h-28 w-full bg-[#252a42]" />
        <Skeleton className="h-28 w-full bg-[#252a42]" />
        <Skeleton className="h-11 w-full bg-[#252a42]" />
        <Skeleton className="h-11 w-full bg-[#252a42]" />
      </div>
    </section>
  );
}

// AR: هذا القسم يعرض سياسات الاتفاق بشكل قابل للتحرير في المسودة وقراءة فقط بعد الإرسال.
// EN: This section shows agreement policies as editable in draft mode and read-only after sending.
export function AgreementPoliciesSection({
  agreementId,
  isDraft,
}: AgreementPoliciesSectionProps) {
  const policyQuery = useAgreementPolicyQuery(agreementId);
  const upsertMutation = useUpsertPolicyMutation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<PolicyMutationPayload>({
    resolver: zodResolver(policyMutationSchema),
    defaultValues: getFormDefaults(null),
  });

  useEffect(() => {
    if (!policyQuery.data) {
      reset(getFormDefaults(null));
      return;
    }

    reset(getFormDefaults(policyQuery.data));
  }, [policyQuery.data, reset]);

  async function onSubmit(values: PolicyMutationPayload) {
    setSuccessMessage(null);
    setSubmitError(null);

    try {
      await upsertMutation.mutateAsync({
        agreementId,
        payload: values,
      });

      setSuccessMessage("تم حفظ السياسات بنجاح / Policies saved successfully");
    } catch (error) {
      const apiError = error as ApiError;

      if (apiError.code === "POLICY_INVALID_CONTENT") {
        for (const fieldName of textFieldNames) {
          setError(fieldName, {
            type: "server",
            message: "لا يمكن أن يكون النص فارغًا / Policy text cannot be empty",
          });
        }
      }

      if (apiError.code === "POLICY_INVALID_REVIEW_PERIOD") {
        for (const fieldName of numberFieldNames) {
          setError(fieldName, {
            type: "server",
            message:
              "القيمة يجب أن تكون ضمن الحدود المسموحة / Value must stay within the allowed range",
          });
        }
      }

      setSubmitError(
        apiError.message ||
          "تعذر حفظ السياسات الآن / Could not save the policies right now",
      );
    }
  }

  if (policyQuery.isLoading) {
    return <PolicySkeleton />;
  }

  if (policyQuery.isError) {
    return (
      <section className="rounded-[14px] border border-red-500/20 bg-red-500/10 px-5 py-6 text-start text-[13px] text-red-100/90">
        <p>{getErrorMessage(policyQuery.error)}</p>
        <Button
          type="button"
          variant="secondary"
          className="mt-4 h-9 rounded-[10px] border border-red-500/20 bg-red-500/10 px-4 text-[12px] font-bold text-red-50 hover:bg-red-500/20"
          onClick={() => policyQuery.refetch()}
        >
          <RefreshCcw className="size-3.5" />
          إعادة المحاولة
        </Button>
      </section>
    );
  }

  if (!isDraft) {
    return (
      <section className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 md:p-6" dir="rtl">
        <div className="flex items-start justify-between gap-4">
          <div className="text-start">
            <h2 className="text-[18px] font-extrabold text-white">سياسات الاتفاق</h2>
            <p className="mt-2 text-[13px] leading-6 text-[#8b90a8]">
              هذه الشروط أصبحت جزءًا من الاتفاق الحالي وتظهر هنا للقراءة فقط.
            </p>
          </div>
        </div>

        {policyQuery.data ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <article className="rounded-[12px] border border-[#252a42] bg-[#1d2135] p-4 text-start md:col-span-2">
              <h3 className="text-[13px] font-bold text-white">سياسة التأخير</h3>
              <p className="mt-2 whitespace-pre-wrap text-[12px] leading-6 text-[#cbd1e8]">
                {policyQuery.data.delayPolicy ?? "لم يتم تحديدها / Not configured"}
              </p>
            </article>
            <article className="rounded-[12px] border border-[#252a42] bg-[#1d2135] p-4 text-start">
              <h3 className="text-[13px] font-bold text-white">سياسة الإلغاء</h3>
              <p className="mt-2 whitespace-pre-wrap text-[12px] leading-6 text-[#cbd1e8]">
                {policyQuery.data.cancellationPolicy ?? "لم يتم تحديدها / Not configured"}
              </p>
            </article>
            <article className="rounded-[12px] border border-[#252a42] bg-[#1d2135] p-4 text-start">
              <h3 className="text-[13px] font-bold text-white">سياسة الطلبات الإضافية</h3>
              <p className="mt-2 whitespace-pre-wrap text-[12px] leading-6 text-[#cbd1e8]">
                {policyQuery.data.extraRequestPolicy ?? "لم يتم تحديدها / Not configured"}
              </p>
            </article>
            <article className="rounded-[12px] border border-[#252a42] bg-[#1d2135] p-4 text-start md:col-span-2">
              <h3 className="text-[13px] font-bold text-white">سياسة المراجعة</h3>
              <p className="mt-2 whitespace-pre-wrap text-[12px] leading-6 text-[#cbd1e8]">
                {policyQuery.data.reviewPolicy ?? "لم يتم تحديدها / Not configured"}
              </p>
            </article>
            <article className="rounded-[12px] border border-[#252a42] bg-[#1d2135] p-4 text-start">
              <h3 className="text-[13px] font-bold text-white">مدة مراجعة العميل</h3>
              <p className="mt-2 text-[12px] text-[#cbd1e8]">
                {policyQuery.data.clientReviewPeriodDays} يوم
              </p>
            </article>
            <article className="rounded-[12px] border border-[#252a42] bg-[#1d2135] p-4 text-start">
              <h3 className="text-[13px] font-bold text-white">مهلة تأخير الفريلانسر</h3>
              <p className="mt-2 text-[12px] text-[#cbd1e8]">
                {policyQuery.data.freelancerDelayGraceDays} يوم
              </p>
            </article>
          </div>
        ) : (
          <section className="mt-5 rounded-[12px] border border-[#252a42] bg-[#1d2135] px-4 py-4 text-start text-[12px] leading-6 text-[#a7aecb]">
            لم يتم تحديد السياسات بعد / Policies not configured yet.
          </section>
        )}
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 md:p-6"
      dir="rtl"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="text-start">
          <h2 className="text-[18px] font-extrabold text-white">سياسات الاتفاق</h2>
          <p className="mt-2 text-[13px] leading-6 text-[#8b90a8]">
            حدّد سياسات التأخير والإلغاء والطلبات الإضافية والمراجعة قبل إرسال الدعوة للعميل.
          </p>
        </div>
        {successMessage ? (
          <span className="inline-flex h-fit rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-bold text-emerald-300">
            {successMessage}
          </span>
        ) : null}
      </div>

      {!policyQuery.data ? (
        <section className="mt-4 rounded-[12px] border border-[#252a42] bg-[#1d2135] px-4 py-4 text-start text-[12px] leading-6 text-[#a7aecb]">
          لا توجد سياسات محفوظة بعد. يمكنك البدء من حقول فارغة وحفظها كسياسات أولية لهذا الاتفاق.
        </section>
      ) : null}

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <label className="block text-[12px] font-bold text-[#cbd1e8]">سياسة التأخير</label>
          <textarea
            {...register("delayPolicy", {
              setValueAs: (value) => (value === "" ? null : value),
            })}
            rows={4}
            className="min-h-[110px] w-full resize-none rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3 py-2.5 text-[12px] leading-6 text-white outline-none placeholder:text-[#636b8a]"
            placeholder="اكتب شروط التأخير وحدود المعالجة"
          />
          {errors.delayPolicy ? (
            <p className="text-[11px] text-red-300">{errors.delayPolicy.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="block text-[12px] font-bold text-[#cbd1e8]">سياسة الإلغاء</label>
          <textarea
            {...register("cancellationPolicy", {
              setValueAs: (value) => (value === "" ? null : value),
            })}
            rows={4}
            className="min-h-[110px] w-full resize-none rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3 py-2.5 text-[12px] leading-6 text-white outline-none placeholder:text-[#636b8a]"
            placeholder="اكتب شروط الإلغاء وآثارها المالية"
          />
          {errors.cancellationPolicy ? (
            <p className="text-[11px] text-red-300">{errors.cancellationPolicy.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="block text-[12px] font-bold text-[#cbd1e8]">سياسة الطلبات الإضافية</label>
          <textarea
            {...register("extraRequestPolicy", {
              setValueAs: (value) => (value === "" ? null : value),
            })}
            rows={4}
            className="min-h-[110px] w-full resize-none rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3 py-2.5 text-[12px] leading-6 text-white outline-none placeholder:text-[#636b8a]"
            placeholder="اكتب كيفية التعامل مع العمل خارج النطاق"
          />
          {errors.extraRequestPolicy ? (
            <p className="text-[11px] text-red-300">{errors.extraRequestPolicy.message}</p>
          ) : null}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-[12px] font-bold text-[#cbd1e8]">سياسة المراجعة</label>
          <textarea
            {...register("reviewPolicy", {
              setValueAs: (value) => (value === "" ? null : value),
            })}
            rows={4}
            className="min-h-[110px] w-full resize-none rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3 py-2.5 text-[12px] leading-6 text-white outline-none placeholder:text-[#636b8a]"
            placeholder="اكتب آلية المراجعة وحدود الاعتراض"
          />
          {errors.reviewPolicy ? (
            <p className="text-[11px] text-red-300">{errors.reviewPolicy.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="block text-[12px] font-bold text-[#cbd1e8]">مدة مراجعة العميل بالأيام</label>
          <Input
            type="number"
            min={1}
            max={90}
            {...register("clientReviewPeriodDays", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
            className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white focus-visible:ring-[#6f52ff]/20"
          />
          {errors.clientReviewPeriodDays ? (
            <p className="text-[11px] text-red-300">
              {errors.clientReviewPeriodDays.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="block text-[12px] font-bold text-[#cbd1e8]">مهلة تأخير الفريلانسر بالأيام</label>
          <Input
            type="number"
            min={0}
            max={30}
            {...register("freelancerDelayGraceDays", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
            className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white focus-visible:ring-[#6f52ff]/20"
          />
          {errors.freelancerDelayGraceDays ? (
            <p className="text-[11px] text-red-300">
              {errors.freelancerDelayGraceDays.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Button
          type="button"
          variant="secondary"
          className="h-10 rounded-[10px] border border-[#252a42] bg-[#15192b] px-4 text-[13px] font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white"
          onClick={() => reset(getFormDefaults(policyQuery.data ?? null))}
        >
          <RefreshCcw className="size-4" />
          إعادة الضبط
        </Button>
        <Button
          type="submit"
          disabled={upsertMutation.isPending}
          className="h-10 rounded-[10px] bg-[#6f52ff] px-5 text-[13px] font-bold text-white shadow-[0_12px_28px_rgba(111,82,255,0.26)] hover:bg-[#7b63ff]"
        >
          <Save className="size-4" />
          {upsertMutation.isPending ? "جارٍ الحفظ..." : "حفظ السياسات"}
        </Button>
      </div>

      {submitError ? (
        <p className="mt-4 rounded-[10px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-[12px] leading-6 text-red-100/85">
          {submitError}
        </p>
      ) : null}
    </form>
  );
}
