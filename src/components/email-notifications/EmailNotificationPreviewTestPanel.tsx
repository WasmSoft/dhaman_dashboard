"use client";

import { useState } from "react";

import { Button, Input } from "@/components/shared";
import {
  usePreviewEmailNotificationMutation,
  useSendTestEmailNotificationMutation,
} from "@/hooks/email-notifications";
import { getTypeLabel } from "@/lib/email-notifications/helpers";
import type {
  EmailNotificationLocale,
  EmailNotificationType,
} from "@/types";

// AR: أنواع الإشعارات المدعومة للمعاينة والإرسال التجريبي.
// EN: Supported notification types for preview and test send.
const SUPPORTED_TYPES: EmailNotificationType[] = [
  "AGREEMENT_INVITE",
  "SYSTEM_TEST",
  "DELIVERY_SUBMITTED",
  "AI_REVIEW_READY",
  "PAYMENT_RESERVED",
  "PAYMENT_READY_TO_RELEASE",
];

// AR: مكون لوحة معاينة واختبار قوالب البريد الإلكتروني.
// EN: Email notification preview and test panel component.
interface EmailNotificationPreviewTestPanelProps {
  locale?: EmailNotificationLocale;
  className?: string;
}

export function EmailNotificationPreviewTestPanel({
  locale = "ar",
  className,
}: EmailNotificationPreviewTestPanelProps) {
  const dir = locale === "ar" ? "rtl" : "ltr";

  const [selectedType, setSelectedType] =
    useState<EmailNotificationType>("AGREEMENT_INVITE");
  const [agreementId, setAgreementId] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [selectedLocale, setSelectedLocale] =
    useState<EmailNotificationLocale>(locale);

  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);

  const [testFeedback, setTestFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const previewMutation = usePreviewEmailNotificationMutation();
  const testMutation = useSendTestEmailNotificationMutation();

  const handlePreview = async () => {
    setPreviewError(null);
    setPreviewHtml(null);

    try {
      const result = await previewMutation.mutateAsync({
        type: selectedType,
        agreementId: agreementId || crypto.randomUUID(),
        locale: selectedLocale,
      });
      setPreviewHtml(result.data.previewHtml);
    } catch (err) {
      setPreviewError(
        err instanceof Error
          ? err.message
          : locale === "ar"
            ? "فشلت معاينة القالب"
            : "Failed to preview template",
      );
    }
  };

  const handleSendTest = async () => {
    setTestFeedback(null);

    try {
      await testMutation.mutateAsync({
        type: selectedType,
        recipientEmail,
        agreementId: agreementId || undefined,
        locale: selectedLocale,
      });
      setTestFeedback({
        type: "success",
        message:
          locale === "ar"
            ? "تم إرسال البريد التجريبي بنجاح"
            : "Test email sent successfully",
      });
    } catch (err) {
      setTestFeedback({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : locale === "ar"
              ? "فشل إرسال البريد التجريبي"
              : "Failed to send test email",
      });
    }
  };

  const label = (ar: string, en: string) => (locale === "ar" ? ar : en);

  return (
    <section
      dir={dir}
      className={`flex flex-col gap-6 rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 md:p-6 ${className ?? ""}`}
    >
      <h2 className="text-[18px] font-bold text-white">
        {label("معاينة واختبار البريد", "Preview & Test Email")}
      </h2>

      {/* AR: اختيار نوع الإشعار. */}
      {/* EN: Notification type selection. */}
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-[#8b90a8]">
          {label("نوع الإشعار", "Notification Type")}
        </label>
        <select
          value={selectedType}
          onChange={(e) =>
            setSelectedType(e.target.value as EmailNotificationType)
          }
          className="rounded-lg border border-[#252a42] bg-[#0e1124] px-3 py-2 text-sm text-white focus:border-[#6f52ff] focus:outline-none"
        >
          {SUPPORTED_TYPES.map((type) => (
            <option key={type} value={type}>
              {getTypeLabel(type, locale)} ({type})
            </option>
          ))}
        </select>
      </div>

      {/* AR: اختيار اللغة. */}
      {/* EN: Locale selection. */}
      <div className="flex items-center gap-4">
        <span className="text-[13px] font-medium text-[#8b90a8]">
          {label("اللغة", "Locale")}
        </span>
        <div className="flex gap-2">
          {(["ar", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setSelectedLocale(l)}
              className={`rounded-full px-3 py-1 text-[12px] font-medium transition-colors ${
                selectedLocale === l
                  ? "bg-[#6f52ff] text-white"
                  : "bg-[#242a45] text-[#8a91ac] hover:bg-[#363b54]"
              }`}
            >
              {l === "ar" ? "العربية" : "English"}
            </button>
          ))}
        </div>
      </div>

      {/* AR: معرّف الاتفاقية (اختياري للإرسال التجريبي). */}
      {/* EN: Agreement ID (optional for test send). */}
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-[#8b90a8]">
          {label("معرّف الاتفاقية", "Agreement ID")}
        </label>
        <Input
          type="text"
          value={agreementId}
          onChange={(e) => setAgreementId(e.target.value)}
          placeholder={
            locale === "ar"
              ? "أدخل معرّف الاتفاقية..."
              : "Enter agreement ID..."
          }
          className="rounded-lg border-[#252a42] bg-[#0e1124] text-sm text-white placeholder:text-[#58607c]"
        />
      </div>

      {/* AR: البريد الإلكتروني للمستلم (مطلوب للإرسال التجريبي فقط). */}
      {/* EN: Recipient email (required for test send only). */}
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-[#8b90a8]">
          {label(
            "البريد الإلكتروني للمستلم (للإرسال التجريبي)",
            "Recipient Email (for test send)",
          )}
        </label>
        <Input
          type="email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          placeholder="client@example.com"
          className="rounded-lg border-[#252a42] bg-[#0e1124] text-sm text-white placeholder:text-[#58607c]"
        />
      </div>

      {/* AR: أزرار المعاينة والإرسال التجريبي. */}
      {/* EN: Preview and test send buttons. */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant="secondary"
          size="sm"
          disabled={previewMutation.isPending}
          onClick={handlePreview}
        >
          {previewMutation.isPending
            ? label("جاري المعاينة...", "Previewing...")
            : label("معاينة", "Preview")}
        </Button>
        <Button
          variant="default"
          size="sm"
          disabled={testMutation.isPending || !recipientEmail}
          onClick={handleSendTest}
        >
          {testMutation.isPending
            ? label("جاري الإرسال...", "Sending...")
            : label("إرسال تجريبي", "Send Test")}
        </Button>
      </div>

      {/* AR: رسالة خطأ المعاينة. */}
      {/* EN: Preview error message. */}
      {previewError && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3">
          <p className="text-[13px] text-red-400">{previewError}</p>
        </div>
      )}

      {/* AR: منطقة عرض معاينة القالب. */}
      {/* EN: Template preview display area. */}
      {previewHtml && (
        <div className="rounded-lg border border-[#252a42] bg-[#0e1124] p-4">
          <p className="mb-2 text-[12px] font-medium text-[#8b90a8]">
            {label("معاينة القالب", "Template Preview")}
          </p>
          <div
            className="prose prose-invert max-w-none text-[13px]"
            dir={selectedLocale === "ar" ? "rtl" : "ltr"}
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        </div>
      )}

      {/* AR: رسالة نتيجة الإرسال التجريبي. */}
      {/* EN: Test send result feedback. */}
      {testFeedback && (
        <div
          className={`rounded-lg border p-3 ${
            testFeedback.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10"
              : "border-red-500/30 bg-red-500/10"
          }`}
        >
          <p
            className={`text-[13px] ${
              testFeedback.type === "success" ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {testFeedback.message}
          </p>
        </div>
      )}
    </section>
  );
}
