import type {
  AgreementWorkspaceMilestone,
  AgreementWorkspacePaymentRow,
  AgreementWorkspacePaymentSummary,
  Milestone,
} from "@/types";

const milestoneStatusLabels: Record<Milestone["status"], string> = {
  DRAFT: "مسودة",
  ACTIVE: "قيد التنفيذ",
  IN_REVIEW: "تحت المراجعة",
  ACCEPTED: "مقبولة",
  CHANGES_REQUESTED: "تحتاج تعديلات",
  CANCELLED: "ملغاة",
};

const paymentStatusLabels: Record<Milestone["paymentStatus"], string> = {
  WAITING: "بانتظار التمويل",
  RESERVED: "محجوزة",
  CLIENT_REVIEW: "مراجعة العميل",
  AI_REVIEW: "مراجعة AI",
  READY_TO_RELEASE: "جاهزة للصرف",
  RELEASED: "تم الصرف",
  ON_HOLD: "معلقة",
  FAILED: "فشلت",
  REFUNDED: "مستردة",
  NOT_REQUIRED: "غير مطلوبة",
};

const deliveryStatusLabels: Record<Milestone["deliveryStatus"], string> = {
  DRAFT: "مسودة",
<<<<<<< HEAD
  SUBMITTED: "تم الإرسال",
  CLIENT_REVIEW: "تحت مراجعة العميل",
  CHANGES_REQUESTED: "طُلبت تعديلات",
  ACCEPTED: "تم القبول",
  DISPUTED: "نزاع",
=======
  NOT_SUBMITTED: "بانتظار التسليم",
  SUBMITTED: "تم التسليم",
  CLIENT_REVIEW: "مراجعة العميل",
  IN_REVIEW: "تحت المراجعة",
  ACCEPTED: "تم القبول",
  CHANGES_REQUESTED: "طُلبت تعديلات",
  DISPUTED: "اعتراض",
>>>>>>> 376aec6939d214e5014cc9fa065f5e9a54ce38a7
};

// AR: تنسق هذه الدالة مبلغ المرحلة بنفس أسلوب الواجهة الحالية مع حماية من القيم غير الصالحة.
// EN: This function formats the milestone amount using the current UI style with safe fallbacks.
export function formatMilestoneAmount(amount: string, currency: string) {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return `${amount} ${currency}`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);
}

// AR: تحول هذه الدالة كائن المرحلة الخام إلى بطاقة العرض المستخدمة في مساحة العمل.
// EN: This function maps the raw milestone entity into the workspace milestone card model.
export function mapMilestoneToWorkspaceMilestone(
  milestone: Milestone,
): AgreementWorkspaceMilestone {
  const isActiveMilestone =
    milestone.status === "ACTIVE" ||
    milestone.status === "IN_REVIEW" ||
    milestone.status === "CHANGES_REQUESTED";

  return {
    id: milestone.id,
    number: String(milestone.orderIndex),
    title: milestone.title,
    amount: formatMilestoneAmount(milestone.amount, milestone.currency),
    due: milestone.dueDate
      ? new Date(milestone.dueDate).toLocaleDateString("ar-SA")
      : "بدون موعد محدد",
    status: milestoneStatusLabels[milestone.status],
    paymentStatus: paymentStatusLabels[milestone.paymentStatus],
    active: isActiveMilestone,
    acceptanceCriteria: milestone.acceptanceCriteria.map(
      (criterion) => criterion.description,
    ),
    revisionLimit: `حد التعديلات: ${milestone.revisionLimit}`,
    operationStatus: deliveryStatusLabels[milestone.deliveryStatus],
  };
}

// AR: تبني هذه الدالة صفوف جدول الدفعات مباشرة من المراحل المرتبطة بها.
// EN: This function builds the payment table rows directly from the linked milestones.
export function buildAgreementWorkspacePaymentRows(
  milestones: Milestone[],
): AgreementWorkspacePaymentRow[] {
  return milestones.map((milestone) => ({
    milestone: milestone.title,
    amount: formatMilestoneAmount(milestone.amount, milestone.currency),
    status: paymentStatusLabels[milestone.paymentStatus],
    operation: deliveryStatusLabels[milestone.deliveryStatus],
    tone: mapPaymentTone(milestone.paymentStatus),
  }));
}

// AR: تلخص هذه الدالة إجماليات حالات الدفع لبطاقات الملخص المالي في مساحة العمل.
// EN: This function summarizes payment status totals for the workspace financial cards.
export function buildAgreementWorkspacePaymentSummary(
  milestones: Milestone[],
): AgreementWorkspacePaymentSummary[] {
  const currency = milestones[0]?.currency ?? "USD";
  const totals = {
    reserved: 0,
    review: 0,
    released: 0,
    held: 0,
  };

  for (const milestone of milestones) {
    const numericAmount = Number(milestone.amount);

    if (!Number.isFinite(numericAmount)) {
      continue;
    }

    const tone = mapPaymentTone(milestone.paymentStatus);
    totals[tone] += numericAmount;
  }

  return [
    {
      label: "محجوز",
      value: formatMilestoneAmount(String(totals.reserved), currency),
      tone: "reserved",
    },
    {
      label: "تحت المراجعة",
      value: formatMilestoneAmount(String(totals.review), currency),
      tone: "review",
    },
    {
      label: "مصروف",
      value: formatMilestoneAmount(String(totals.released), currency),
      tone: "released",
    },
    {
      label: "بانتظار التمويل",
      value: formatMilestoneAmount(String(totals.held), currency),
      tone: "held",
    },
  ];
}

function mapPaymentTone(
  paymentStatus: Milestone["paymentStatus"],
): AgreementWorkspacePaymentSummary["tone"] {
  if (paymentStatus === "RESERVED") {
    return "reserved";
  }

  if (paymentStatus === "CLIENT_REVIEW" || paymentStatus === "AI_REVIEW") {
    return "review";
  }

  if (paymentStatus === "RELEASED") {
    return "released";
  }

  return "held";
}

export function getMilestoneStatusLabel(status: Milestone["status"]) {
  return milestoneStatusLabels[status];
}

export function getMilestonePaymentStatusLabel(
  paymentStatus: Milestone["paymentStatus"],
) {
  return paymentStatusLabels[paymentStatus];
}

export function getMilestoneDeliveryStatusLabel(
  deliveryStatus: Milestone["deliveryStatus"],
) {
  return deliveryStatusLabels[deliveryStatus];
}
