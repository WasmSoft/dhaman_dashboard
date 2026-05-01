import type {
  CreateMilestonePayload,
  Milestone,
  MilestoneReorderItem,
  ReorderMilestonesPayload,
  UpdateMilestonePayload,
} from "@/types";

// AR: تعيد هذه الدالة القيم الافتراضية لنموذج إنشاء مرحلة جديدة مكتملة قابلة للإرسال.
// EN: Returns default form values for creating a new milestone, ready to submit.
export function getCreateMilestoneDefaults(orderIndex: number) {
  return {
    title: "",
    description: "",
    amount: "",
    dueDate: "",
    orderIndex,
    acceptanceCriteria: [{ description: "", required: true }],
    revisionLimit: 3,
  };
}

// AR: تعيد هذه الدالة القيم الافتراضية لنموذج تحديث مرحلة موجودة.
// EN: Returns default form values for updating an existing milestone.
export function getUpdateMilestoneDefaults(
  milestone: Milestone,
): Record<string, unknown> {
  return {
    title: milestone.title,
    description: milestone.description ?? "",
    amount: milestone.amount,
    dueDate: milestone.dueDate ?? "",
    acceptanceCriteria: milestone.acceptanceCriteria,
    revisionLimit: milestone.revisionLimit,
  };
}

// AR: تحول هذه الدالة قيم نموذج إنشاء مرحلة إلى payload متوافق مع الـ API.
// EN: Converts create milestone form values into the API-compatible payload.
export function mapCreateFormToPayload(
  values: Record<string, unknown>,
): CreateMilestonePayload {
  return {
    title: String(values.title),
    description: values.description ? String(values.description) : undefined,
    amount: String(values.amount),
    dueDate: values.dueDate ? String(values.dueDate) : undefined,
    orderIndex: Number(values.orderIndex),
    acceptanceCriteria: (values.acceptanceCriteria as Array<Record<string, unknown>>).map((criterion) => ({
      description: String(criterion.description),
      required: criterion.required === false ? false : true,
    })),
    revisionLimit: values.revisionLimit != null ? Number(values.revisionLimit) : undefined,
  };
}

// AR: تحول هذه الدالة قيم نموذج تحديث مرحلة إلى payload جزئي متوافق مع الـ API.
// EN: Converts update milestone form values into a partial API-compatible payload.
export function mapUpdateFormToPayload(
  values: Record<string, unknown>,
): UpdateMilestonePayload {
  const payload: UpdateMilestonePayload = {};

  if (values.title != null) {
    payload.title = String(values.title);
  }
  if (values.description !== undefined) {
    payload.description = values.description ? String(values.description) : undefined;
  }
  if (values.amount != null) {
    payload.amount = String(values.amount);
  }
  if (values.dueDate !== undefined) {
    payload.dueDate = values.dueDate ? String(values.dueDate) : undefined;
  }
  if (values.acceptanceCriteria != null) {
    payload.acceptanceCriteria = (values.acceptanceCriteria as Array<Record<string, unknown>>).map((criterion) => ({
      description: String(criterion.description),
      required: criterion.required === false ? false : true,
    }));
  }
  if (values.revisionLimit != null) {
    payload.revisionLimit = Number(values.revisionLimit);
  }

  return payload;
}

// AR: تبني هذه الدالة payload إعادة ترتيب كامل متجاورة انطلاقاً من 1.
// EN: Builds a full contiguous reorder payload starting from 1.
export function buildReorderPayload(
  orderedMilestoneIds: string[],
): ReorderMilestonesPayload {
  const milestones: MilestoneReorderItem[] = orderedMilestoneIds.map(
    (milestoneId, index) => ({
      milestoneId,
      orderIndex: index + 1,
    }),
  );

  return { milestones };
}
