"use client";

// AR: قسم بوابة العميل لإدارة طلب التغيير — موافقة، رفض، وتمويل.
// EN: Client portal section for managing a change request — approve, decline, or fund.
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, FileText, Check, X, Wallet, ShieldAlert } from "lucide-react";
import { Button } from "@/components/shared";
import {
  declineChangeRequestSchema,
  type DeclineChangeRequestFormValues,
} from "@/lib/change-requests/schemas";
import {
  useChangeRequestDetailsQuery,
  useApproveChangeRequestMutation,
  useDeclineChangeRequestMutation,
  useFundChangeRequestMutation,
} from "@/hooks/change-requests";
import { ChangeRequestStatusBadge } from "@/components/change-requests/ChangeRequestStatusBadge";
import { changeRequestsContent } from "@/constants";

interface ChangeRequestPortalSectionProps {
  token: string;
  id: string;
}

export function ChangeRequestPortalSection({
  token,
  id,
}: ChangeRequestPortalSectionProps) {
  const [showDecline, setShowDecline] = useState(false);
  const [declineErrors, setDeclineErrors] = useState<Record<string, string>>({});
  const locale = "ar";
  const ct = changeRequestsContent;

  const { data, isLoading, isError, error } = useChangeRequestDetailsQuery(id);
  const approveMutation = useApproveChangeRequestMutation(token, id);
  const declineMutation = useDeclineChangeRequestMutation(token, id);
  const fundMutation = useFundChangeRequestMutation(token, id);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<DeclineChangeRequestFormValues>({
    defaultValues: { reason: "" },
  });

  // Invalid token
  const isTokenError =
    isError && (error as { code?: string })?.code === "PORTAL_TOKEN_INVALID";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-[#6f52ff]" />
      </div>
    );
  }

  if (isTokenError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <ShieldAlert className="h-12 w-12 text-red-400" />
        <p className="text-[15px] font-medium text-white">
          {ct.portal.invalidToken[locale]}
        </p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <FileText className="h-12 w-12 text-[#5a5f7a]" />
        <p className="text-[15px] font-medium text-[#8b90a8]">
          {ct.detail.error[locale]}
        </p>
      </div>
    );
  }

  const changeRequest = data!;
  const status = changeRequest.status;

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: changeRequest.currency || "USD",
    minimumFractionDigits: 2,
  }).format(Number(changeRequest.amount));

  const onDecline = async (formData: DeclineChangeRequestFormValues) => {
    const result = declineChangeRequestSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const path = issue.path.join(".");
        if (path && !errors[path]) {
          errors[path] = issue.message;
        }
      }
      setDeclineErrors(errors);
      return;
    }

    try {
      await declineMutation.mutateAsync(result.data);
      setShowDecline(false);
      reset();
      setDeclineErrors({});
    } catch {
      // Error handled by TanStack Query
    }
  };

  const onApprove = async () => {
    try {
      await approveMutation.mutateAsync();
    } catch {
      // Error handled by TanStack Query
    }
  };

  const onFund = async () => {
    try {
      await fundMutation.mutateAsync({ amount: changeRequest.amount });
    } catch {
      // Error handled by TanStack Query
    }
  };

  const isPending =
    approveMutation.isPending ||
    declineMutation.isPending ||
    fundMutation.isPending;

  return (
    <section dir="rtl" className="flex flex-col gap-6 text-start">
      {/* Title & Status */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-white">
            {changeRequest.title}
          </h1>
          <ChangeRequestStatusBadge status={status} />
        </div>
      </div>

      {/* Amount */}
      <div className="rounded-[12px] border border-[#252a42] bg-[#1a1f37] p-4">
        <span className="text-[13px] font-medium text-[#8b90a8]">
          {ct.detail.amount[locale]}
        </span>
        <p className="mt-1 text-2xl font-bold text-[#6f52ff]">
          {formattedAmount}
        </p>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[13px] font-medium text-[#8b90a8]">
          {ct.detail.description[locale]}
        </span>
        <p className="text-[15px] leading-relaxed text-white whitespace-pre-wrap">
          {changeRequest.description}
        </p>
      </div>

      {/* Acceptance Criteria */}
      {changeRequest.acceptanceCriteria &&
        changeRequest.acceptanceCriteria.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-[#8b90a8]">
              {ct.detail.acceptanceCriteria[locale]}
            </span>
            <ol className="list-inside list-decimal space-y-1 text-[15px] text-white">
              {changeRequest.acceptanceCriteria.map((criterion, idx) => (
                <li key={idx}>{criterion}</li>
              ))}
            </ol>
          </div>
        )}

      {/* Actions */}
      <div className="rounded-[14px] border border-[#252a42] bg-[#1a1f37]/50 p-5">
        {status === "SENT" && (
          <div className="flex flex-col gap-4">
            <p className="text-[14px] text-[#8b90a8]">
              {locale === "ar"
                ? "يرجى مراجعة طلب التغيير واختيار القبول أو الرفض."
                : "Please review the change request and choose to approve or decline."}
            </p>

            {!showDecline ? (
              <div className="flex flex-wrap gap-3">
                <Button onClick={onApprove} disabled={isPending}>
                  {approveMutation.isPending && (
                    <Loader2 className="me-2 h-4 w-4 animate-spin" />
                  )}
                  <Check className="me-2 h-4 w-4" />
                  {ct.approve.confirm[locale]}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setShowDecline(true)}
                  disabled={isPending}
                >
                  <X className="me-2 h-4 w-4" />
                  {ct.decline.confirm[locale]}
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onDecline)}
                className="flex flex-col gap-3"
              >
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#8b90a8]">
                    {ct.decline.reasonLabel[locale]}
                  </label>
                  <textarea
                    {...register("reason")}
                    rows={3}
                    className="rounded-[10px] border border-[#252a42] bg-[#1a1f37] px-3 py-2 text-sm text-white placeholder:text-[#5a5f7a] focus:border-[#6f52ff] focus:outline-none resize-none"
                    placeholder={
                      locale === "ar" ? "اذكر سبب الرفض..." : "Enter decline reason..."
                    }
                  />
                  {declineErrors.reason && (
                    <span className="text-[12px] text-red-400">{declineErrors.reason}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    type="submit"
                    variant="destructive"
                    disabled={isPending}
                  >
                    {declineMutation.isPending && (
                      <Loader2 className="me-2 h-4 w-4 animate-spin" />
                    )}
                    {ct.decline.confirm[locale]}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => { setShowDecline(false); setDeclineErrors({}); }}
                    disabled={isPending}
                  >
                    {ct.sendConfirm.cancel[locale]}
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}

        {status === "APPROVED" && (
          <div className="flex flex-col gap-4">
            <p className="text-[14px] text-[#8b90a8]">
              {locale === "ar"
                ? "تم قبول طلب التغيير. يمكنك الآن تمويله للمتابعة."
                : "The change request has been approved. You can now fund it to proceed."}
            </p>
            <Button onClick={onFund} disabled={isPending}>
              {fundMutation.isPending && (
                <Loader2 className="me-2 h-4 w-4 animate-spin" />
              )}
              <Wallet className="me-2 h-4 w-4" />
              {ct.fund.confirm[locale]}
            </Button>
          </div>
        )}

        {status === "DECLINED" && (
          <div className="flex flex-col gap-2">
            <p className="text-[14px] text-red-400">
              {ct.portal.declined[locale]}
            </p>
          </div>
        )}

        {status === "FUNDED" && (
          <div className="flex flex-col gap-2">
            <p className="text-[14px] text-purple-400">
              {ct.portal.funded[locale]}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
