"use client";

import { useState } from "react";

import { Button } from "@/components/shared";
import { useResendAgreementInviteMutation } from "@/hooks/email-notifications";
import type { EmailNotification, EmailNotificationLocale } from "@/types";

// AR: مكون زر إعادة إرسال دعوة الاتفاقية مع حالات التحميل والنجاح والفشل والأخطاء المترجمة.
// EN: Resend agreement invite button component with loading, success, failed, and localized error states.
interface ResendAgreementInviteButtonProps {
  agreementId: string;
  locale?: EmailNotificationLocale;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "xs" | "sm" | "lg";
  onSuccess?: (notification: EmailNotification) => void;
  onError?: (error: Error) => void;
}

export function ResendAgreementInviteButton({
  agreementId,
  locale = "ar",
  className,
  variant = "outline",
  size = "sm",
  onSuccess,
  onError,
}: ResendAgreementInviteButtonProps) {
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const mutation = useResendAgreementInviteMutation();

  const handleResend = async () => {
    setFeedback(null);

    try {
      const result = await mutation.mutateAsync(agreementId);
      const notification = result.data;
      setFeedback({
        type: "success",
        message:
          locale === "ar"
            ? "تم إعادة إرسال الدعوة بنجاح"
            : "Invitation resent successfully",
      });
      onSuccess?.(notification);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : locale === "ar"
            ? "فشل إعادة إرسال الدعوة"
            : "Failed to resend invitation";
      setFeedback({ type: "error", message });
      onError?.(err instanceof Error ? err : new Error(message));
    }
  };

  const isLoading = mutation.isPending;

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant={variant}
        size={size}
        className={className}
        disabled={isLoading}
        onClick={handleResend}
      >
        {isLoading
          ? locale === "ar"
            ? "جاري الإرسال..."
            : "Sending..."
          : locale === "ar"
            ? "إعادة إرسال الدعوة"
            : "Resend Invite"}
      </Button>

      {feedback && (
        <p
          className={`text-[12px] ${
            feedback.type === "success" ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {feedback.message}
        </p>
      )}
    </div>
  );
}
