import type { EmailNotificationStatus, EmailNotificationType } from "@/types";

// AR: خريطة تسميات حالة الإشعار بالعربية.
// EN: Arabic label map for notification statuses.
const statusLabelAr: Record<EmailNotificationStatus, string> = {
  PENDING: "قيد الانتظار",
  SENT: "تم الإرسال",
  FAILED: "فشل",
};

// AR: خريطة تسميات حالة الإشعار بالإنجليزية.
// EN: English label map for notification statuses.
const statusLabelEn: Record<EmailNotificationStatus, string> = {
  PENDING: "Pending",
  SENT: "Sent",
  FAILED: "Failed",
};

// AR: خريطة تسميات نوع الإشعار بالعربية.
// EN: Arabic label map for notification types.
const typeLabelAr: Record<EmailNotificationType, string> = {
  AGREEMENT_INVITE: "دعوة اتفاق",
  AGREEMENT_APPROVED: "موافقة على الاتفاق",
  AGREEMENT_CHANGE_REQUESTED: "طلب تغيير في الاتفاق",
  DELIVERY_SUBMITTED: "تسليم مقدم",
  DELIVERY_CHANGES_REQUESTED: "طلب تغييرات في التسليم",
  AI_REVIEW_READY: "مراجعة AI جاهزة",
  CHANGE_REQUEST_CREATED: "طلب تغيير منشأ",
  CHANGE_REQUEST_APPROVED: "موافقة على طلب تغيير",
  PAYMENT_RESERVED: "دفعة محجوزة",
  PAYMENT_READY_TO_RELEASE: "دفعة جاهزة للإفراج",
  PAYMENT_RELEASED: "دفعة مفرج عنها",
  SYSTEM_TEST: "اختبار نظام",
};

// AR: خريطة تسميات نوع الإشعار بالإنجليزية.
// EN: English label map for notification types.
const typeLabelEn: Record<EmailNotificationType, string> = {
  AGREEMENT_INVITE: "Agreement Invite",
  AGREEMENT_APPROVED: "Agreement Approved",
  AGREEMENT_CHANGE_REQUESTED: "Agreement Change Requested",
  DELIVERY_SUBMITTED: "Delivery Submitted",
  DELIVERY_CHANGES_REQUESTED: "Delivery Changes Requested",
  AI_REVIEW_READY: "AI Review Ready",
  CHANGE_REQUEST_CREATED: "Change Request Created",
  CHANGE_REQUEST_APPROVED: "Change Request Approved",
  PAYMENT_RESERVED: "Payment Reserved",
  PAYMENT_READY_TO_RELEASE: "Payment Ready to Release",
  PAYMENT_RELEASED: "Payment Released",
  SYSTEM_TEST: "System Test",
};

// AR: نغمة شارة الحالة لكل حالة إشعار.
// EN: Status badge tone for each notification status.
const statusTone: Record<EmailNotificationStatus, "success" | "amber" | "red"> = {
  PENDING: "amber",
  SENT: "success",
  FAILED: "red",
};

// AR: تعيد تسمية الحالة بالعربية أو الإنجليزية حسب اللغة المطلوبة.
// EN: Returns the status label in Arabic or English based on the requested locale.
export function getStatusLabel(
  status: EmailNotificationStatus,
  locale: "ar" | "en" = "ar",
): string {
  return locale === "ar" ? statusLabelAr[status] : statusLabelEn[status];
}

// AR: تعيد تسمية نوع الإشعار بالعربية أو الإنجليزية حسب اللغة المطلوبة.
// EN: Returns the notification type label in Arabic or English based on the requested locale.
export function getTypeLabel(
  type: EmailNotificationType,
  locale: "ar" | "en" = "ar",
): string {
  return locale === "ar" ? typeLabelAr[type] : typeLabelEn[type];
}

// AR: تعيد نغمة شارة الحالة المناسبة لعرضها في الواجهة.
// EN: Returns the appropriate badge tone for displaying the status in the UI.
export function getStatusTone(
  status: EmailNotificationStatus,
): "success" | "amber" | "red" {
  return statusTone[status];
}

// AR: تعيد قيمة آمنة للعرض، وتستبدل القيم الخالية بنص بديل.
// EN: Returns a safe display value, replacing nullish values with a fallback.
export function safeDisplayValue(
  value: string | null | undefined,
  fallback: string = "—",
): string {
  if (value === null || value === undefined || value.trim() === "") {
    return fallback;
  }
  return value;
}

// AR: تنسّق تاريخ ISO إلى تنسيق محلي للعرض.
// EN: Formats an ISO date string to a locale-aware display format.
export function formatEmailDate(
  dateString: string | null | undefined,
  locale: "ar" | "en" = "ar",
): string {
  if (!dateString) {
    return "—";
  }

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    return date.toLocaleDateString(
      locale === "ar" ? "ar-SA" : "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      },
    );
  } catch {
    return dateString;
  }
}

// AR: تقصّر البريد الإلكتروني للعرض عندما يكون طويلاً جداً.
// EN: Truncates an email address for display when it is too long.
export function truncateEmail(email: string, maxLength: number = 28): string {
  if (email.length <= maxLength) {
    return email;
  }
  return `${email.slice(0, maxLength - 3)}...`;
}
