import type { Delivery, DeliveryListResponse, DeliveryRecordDto, DeliveryRecordStatus, PaymentStatus } from "@/types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isLegacyDeliveryLike(value: unknown): value is Delivery {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.agreementId === "string" &&
    typeof value.milestoneId === "string" &&
    typeof value.summary === "string"
  );
}

function isDeliveryRecordLike(value: unknown): value is DeliveryRecordDto {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.agreementId === "string" &&
    typeof value.milestoneId === "string" &&
    typeof value.summary === "string" &&
    isRecord(value.milestone) &&
    typeof value.milestone.title === "string"
  );
}

function isDeliveryRecordArray(value: unknown): value is DeliveryRecordDto[] {
  return Array.isArray(value) && value.every(isDeliveryRecordLike);
}

function isLegacyDeliveryArray(value: unknown): value is Delivery[] {
  return Array.isArray(value) && value.every(isLegacyDeliveryLike);
}

function resolvePageValue(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

// AR: توحّد هذه الدالة استجابة قائمة التسليمات مهما اختلف تغليف الخادم بين items أو data.deliveries.
// EN: This function normalizes the deliveries list response whether the backend returns items or data.deliveries.
export function resolveDeliveryListResponse(input: unknown): DeliveryListResponse {
  if (isRecord(input) && isDeliveryRecordArray(input.items)) {
    return {
      items: input.items,
      page: resolvePageValue(input.page, 1),
      limit: resolvePageValue(input.limit, input.items.length || 10),
      total: resolvePageValue(input.total, input.items.length),
      totalPages: resolvePageValue(input.totalPages, 1),
    };
  }

  if (isRecord(input) && isLegacyDeliveryArray(input.items)) {
    const items = input.items.map(mapLegacyDeliveryToRecord);

    return {
      items,
      page: resolvePageValue(input.page, 1),
      limit: resolvePageValue(input.limit, items.length || 10),
      total: resolvePageValue(input.total, items.length),
      totalPages: resolvePageValue(input.totalPages, 1),
    };
  }

  if (isRecord(input) && isDeliveryRecordArray(input.deliveries)) {
    const deliveries = input.deliveries;

    return {
      items: deliveries,
      page: resolvePageValue(input.page, 1),
      limit: resolvePageValue(input.limit, deliveries.length || 10),
      total: resolvePageValue(input.total, deliveries.length),
      totalPages: resolvePageValue(input.totalPages, Math.max(1, Math.ceil(resolvePageValue(input.total, deliveries.length) / Math.max(resolvePageValue(input.limit, deliveries.length || 10), 1)))),
    };
  }

  if (isRecord(input) && "data" in input && isRecord(input.data) && isDeliveryRecordArray(input.data.deliveries)) {
    const deliveries = input.data.deliveries;

    return {
      items: deliveries,
      page: resolvePageValue(input.data.page, 1),
      limit: resolvePageValue(input.data.limit, deliveries.length || 10),
      total: resolvePageValue(input.data.total, deliveries.length),
      totalPages: resolvePageValue(input.data.totalPages, 1),
    };
  }

  return {
    items: [],
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };
}

// AR: توحّد هذه الدالة استجابة تفاصيل التسليم لتدعم الشكل القديم والشكل الحي القادم من قائمة وتسلسل التسليمات.
// EN: This function normalizes delivery detail responses so the detail page works with both legacy and live record payloads.
export function resolveDeliveryDetail(input: unknown): Delivery | null {
  if (isLegacyDeliveryLike(input)) {
    return input;
  }

  if (isDeliveryRecordLike(input)) {
    return mapDeliveryRecordToDetail(input);
  }

  if (isRecord(input) && "data" in input) {
    return resolveDeliveryDetail(input.data);
  }

  return null;
}

function mapLegacyDeliveryToRecord(delivery: Delivery): DeliveryRecordDto {
  return {
    id: delivery.id,
    agreementId: delivery.agreementId,
    milestoneId: delivery.milestoneId,
    submittedById: "",
    deliveryUrl: delivery.deliveryUrl ?? null,
    fileUrl: delivery.fileUrl ?? null,
    fileName: delivery.fileName ?? null,
    fileType: delivery.fileType ?? null,
    summary: delivery.summary,
    notes: delivery.notes ?? null,
    status: normalizeDeliveryRecordStatus(delivery.status),
    submittedAt: delivery.submittedAt ?? null,
    acceptedAt: delivery.acceptedAt ?? null,
    changesRequestedAt: delivery.changesRequestedAt ?? null,
    clientFeedback: delivery.clientFeedback ?? null,
    milestone: {
      id: delivery.milestoneId,
      title: delivery.milestoneName,
      status: "ACTIVE",
      paymentStatus: (delivery.payment?.status as PaymentStatus | undefined) ?? "NOT_REQUIRED",
      deliveryStatus: delivery.status,
      revisionLimit: delivery.requestedCriteria?.length ?? 0,
    },
    payment: delivery.payment?.status
      ? {
          status: delivery.payment.status as PaymentStatus,
          demoMode: false,
          reservedAt: null,
          releasedAt: null,
        }
      : null,
    timeline: {
      agreementId: delivery.agreementId,
      milestoneId: delivery.milestoneId,
    },
    createdAt: delivery.createdAt,
    updatedAt: delivery.updatedAt,
  };
}

function normalizeDeliveryRecordStatus(status: Delivery["status"]): DeliveryRecordStatus {
  if (status === "NOT_SUBMITTED") {
    return "DRAFT";
  }

  if (status === "IN_REVIEW") {
    return "SUBMITTED";
  }

  return status;
}

function mapDeliveryRecordToDetail(delivery: DeliveryRecordDto): Delivery {
  return {
    id: delivery.id,
    agreementId: delivery.agreementId,
    milestoneId: delivery.milestoneId,
    agreementTitle: `اتفاق ${delivery.agreementId.slice(0, 8)}`,
    milestoneName: delivery.milestone.title,
    deliveryUrl: delivery.deliveryUrl ?? null,
    fileUrl: delivery.fileUrl ?? null,
    fileName: delivery.fileName ?? null,
    fileType: delivery.fileType ?? null,
    summary: delivery.summary,
    notes: delivery.notes ?? null,
    status: delivery.status,
    submittedAt: delivery.submittedAt ?? null,
    acceptedAt: delivery.acceptedAt ?? null,
    changesRequestedAt: delivery.changesRequestedAt ?? null,
    clientFeedback: delivery.clientFeedback ?? null,
    requestedCriteria: [],
    payment: delivery.payment
      ? {
          id: "",
          status: delivery.payment.status,
          amount: null,
          currency: null,
        }
      : null,
    createdAt: delivery.createdAt,
    updatedAt: delivery.updatedAt,
  };
}
