import {
  buildMilestoneDeliveryHref,
  buildMilestoneDetailHref,
} from "@/lib/milestones/helpers";
import type {
  DeliveryMetricCard,
  DeliveryRecordDto,
  DeliverySelectedSummary,
  DeliveryStatusValue,
  DeliveryTableItem,
  PortalWorkspaceMilestoneDto,
} from "@/types";

import {
  getDeliveryPaymentStatusLabel,
  getDeliveryPaymentTone,
  getDeliveryStatusLabel,
  getDeliveryStatusToneValue,
  isEditableDeliveryStatus,
} from "./delivery-status.helper";

function formatRelativeDate(value?: string | null) {
  if (!value) {
    return "غير متاح";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "غير متاح";
  }

  return date.toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function buildDeliveryEvidenceLabel(delivery: DeliveryRecordDto) {
  if (delivery.fileName) {
    return delivery.fileName;
  }

  if (delivery.deliveryUrl) {
    try {
      const url = new URL(delivery.deliveryUrl);
      return url.hostname.replace(/^www\./, "");
    } catch {
      return "رابط التسليم";
    }
  }

  if (delivery.fileUrl) {
    return "ملف مرفق";
  }

  return "ملخص التسليم";
}

// AR: تختار أحدث تسليم قابل للتعديل من قائمة التسليمات الخاصة بنفس المرحلة.
// EN: This function picks the latest editable delivery from a milestone-scoped delivery list.
export function findLatestEditableDelivery(deliveries: DeliveryRecordDto[]) {
  return [...deliveries]
    .filter((delivery) => isEditableDeliveryStatus(delivery.status))
    .sort((left, right) =>
      new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime(),
    )[0];
}

// AR: تختار أحدث تسليم لمرحلة معينة بصرف النظر عن حالته.
// EN: This function picks the latest delivery for a specific milestone regardless of status.
export function findLatestMilestoneDelivery(deliveries: DeliveryRecordDto[]) {
  return [...deliveries].sort(
    (left, right) =>
      new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime(),
  )[0];
}

// AR: تبني بطاقات الإحصاءات العليا لصفحة التسليمات من البيانات الحية.
// EN: This function builds the top metric cards for the deliveries page from live data.
export function buildDeliveryMetrics(deliveries: DeliveryRecordDto[]): DeliveryMetricCard[] {
  const counts = {
    pending: deliveries.filter((delivery) => delivery.status === "DRAFT").length,
    review: deliveries.filter(
      (delivery) =>
        delivery.status === "SUBMITTED" || delivery.status === "CLIENT_REVIEW",
    ).length,
    accepted: deliveries.filter((delivery) => delivery.status === "ACCEPTED").length,
    action: deliveries.filter(
      (delivery) =>
        delivery.status === "CHANGES_REQUESTED" || delivery.status === "DISPUTED",
    ).length,
  };

  return [
    {
      label: "مسودات قابلة للإرسال",
      value: String(counts.pending),
      helper: "تحتاج إكمال الأدلة أو الإرسال",
      badge: "بانتظار",
      tone: "amber",
    },
    {
      label: "تحت مراجعة العميل",
      value: String(counts.review),
      helper: "تم إرسالها وتنتظر القرار",
      badge: "نشط",
      tone: "violet",
    },
    {
      label: "مقبولة",
      value: String(counts.accepted),
      helper: "مراحل وصلت إلى حالة قبول",
      badge: "مكتمل",
      tone: "emerald",
    },
    {
      label: "تحتاج إجراء",
      value: String(counts.action),
      helper: "تعديلات أو اعتراضات تحتاج متابعة",
      badge: "مهم",
      tone: "red",
    },
  ];
}

// AR: تحول التسليمات الخام إلى صفوف الجدول المستخدم في صفحة التسليمات.
// EN: This function maps raw delivery records into the table rows used by the deliveries page.
export function buildDeliveryTableItems(deliveries: DeliveryRecordDto[]): DeliveryTableItem[] {
  return deliveries.map((delivery, index) => {
    const actionLabel = isEditableDeliveryStatus(delivery.status)
      ? "متابعة التسليم"
      : delivery.status === "ACCEPTED"
        ? "عرض المرحلة"
        : "عرض التفاصيل";

    return {
      id: delivery.id,
      agreementId: delivery.agreementId,
      milestoneId: delivery.milestoneId,
      project: `اتفاق ${delivery.agreementId.slice(0, 8)}`,
      client: `مرحلة ${delivery.milestone.title}`,
      milestone: delivery.milestone.title,
      delivery: buildDeliveryEvidenceLabel(delivery),
      deliveryStatus: getDeliveryStatusLabel(delivery.status),
      deliveryTone: getDeliveryStatusToneValue(delivery.status),
      paymentStatus: getDeliveryPaymentStatusLabel(
        delivery.payment?.status ?? delivery.milestone.paymentStatus,
      ),
      paymentTone: getDeliveryPaymentTone(
        delivery.payment?.status ?? delivery.milestone.paymentStatus,
      ),
      amount: delivery.payment?.status
        ? delivery.payment.status === "RELEASED"
          ? "تم الصرف"
          : getDeliveryPaymentStatusLabel(delivery.payment.status)
        : getDeliveryPaymentStatusLabel(delivery.milestone.paymentStatus),
      lastUpdate: formatRelativeDate(delivery.updatedAt),
      actionLabel,
      actionHref: buildMilestoneDeliveryHref(
        delivery.agreementId,
        delivery.milestoneId,
      ),
      detailHref: buildMilestoneDetailHref(
        delivery.agreementId,
        delivery.milestoneId,
      ),
      active: index === 0,
    };
  });
}

// AR: تبني بطاقة الملخص الجانبي من تفاصيل التسليم الحالية.
// EN: This function builds the sidebar summary card from the current delivery detail.
export function buildDeliverySelectedSummary(
  delivery: DeliveryRecordDto,
  milestoneCriteria: readonly string[] = [],
): DeliverySelectedSummary {
  return {
    title: "ملخص التسليم الحالي",
    project: `اتفاق ${delivery.agreementId.slice(0, 8)}`,
    milestone: delivery.milestone.title,
    statusLabel: "الحالة",
    status: getDeliveryStatusLabel(delivery.status),
    paymentLabel: "الدفعة",
    payment: getDeliveryPaymentStatusLabel(
      delivery.payment?.status ?? delivery.milestone.paymentStatus,
    ),
    amount: delivery.payment?.status
      ? getDeliveryPaymentStatusLabel(delivery.payment.status)
      : getDeliveryPaymentStatusLabel(delivery.milestone.paymentStatus),
    deliveryTimeLabel: "آخر تحديث",
    deliveryTime: formatRelativeDate(delivery.updatedAt),
    reviewDueLabel: "وقت الإرسال",
    reviewDue: formatRelativeDate(delivery.submittedAt ?? delivery.createdAt),
    criteriaTitle: "شروط القبول",
    criteria: milestoneCriteria,
    note:
      delivery.clientFeedback ??
      delivery.notes ??
      "لا توجد ملاحظات إضافية على هذا التسليم حالياً.",
  };
}

// AR: تبني عناوين سريعة للانتقال حسب المرحلة وحالة التسليم.
// EN: This function builds quick navigation labels based on the milestone and delivery status.
export function buildMilestoneDeliveryAction(
  agreementId: string,
  milestoneId: string,
  status: DeliveryStatusValue,
) {
  return {
    href: buildMilestoneDeliveryHref(agreementId, milestoneId),
    label:
      status === "ACCEPTED"
        ? "عرض المرحلة"
        : status === "CHANGES_REQUESTED" || status === "DRAFT"
          ? "متابعة التسليم"
          : "عرض التسليم",
  };
}

// AR: تختار شروط القبول الخاصة بمرحلة البوابة عند توفرها.
// EN: This function resolves portal milestone acceptance context when it is available.
export function findPortalMilestone(
  milestones: PortalWorkspaceMilestoneDto[],
  milestoneId: string,
) {
  return milestones.find((milestone) => milestone.id === milestoneId);
}
