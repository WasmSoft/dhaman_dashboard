import type { PaymentHistoryEvent, TimelineEvent } from "@/types";
import { getPaymentStatusLabel } from "./payment-display.helper";

// AR: تمثيل صف واحد في سجل الدفعات للعرض.
// EN: UI row representation for one payment history entry.
export interface PaymentHistoryRow {
  eventId: string;
  eventType: string;
  previousStatusLabel: string;
  newStatusLabel: string;
  actorRole: string | null;
  happenedAt: string;
  notes: string | null;
}

// AR: حدث زمني عام يقبل الحقول من السجل الزمني أو سجل الدفعات.
// EN: Generic history event shape accepting timeline or payment history fields.
type HistoryEventInput = TimelineEvent | PaymentHistoryEvent;

function isTimelineEvent(
  event: HistoryEventInput,
): event is TimelineEvent {
  return "type" in event && "title" in event;
}

function extractFields(event: HistoryEventInput) {
  if (isTimelineEvent(event)) {
    const meta = event.metadata as Record<string, unknown> | null;
    return {
      eventId: event.id,
      eventType: event.type,
      paymentId: (meta?.paymentId as string) ?? null,
      previousStatus: (meta?.previousStatus as string) ?? null,
      newStatus: (meta?.newStatus as string) ?? null,
      actorRole: event.actorRole,
      happenedAt: event.createdAt,
      notes: (meta?.notes as string) ?? (meta?.reason as string) ?? null,
    };
  }

  return {
    eventId: event.eventId,
    eventType: event.eventType,
    paymentId: event.paymentId,
    previousStatus: event.previousStatus,
    newStatus: event.newStatus,
    actorRole: event.actorRole,
    happenedAt: event.happenedAt,
    notes: event.notes,
  };
}

// AR: تبني صفوف عرض من أحداث السجل الزمني أو سجل الدفعات.
// EN: Builds display rows from timeline or payment history event data.
export function buildPaymentHistoryRows(
  events: HistoryEventInput[],
  locale: "en" | "ar" = "en",
  paymentId?: string,
): PaymentHistoryRow[] {
  const extracted = events.map(extractFields);

  const filtered = paymentId
    ? extracted.filter((e) => e.paymentId === paymentId)
    : extracted;

  const sorted = [...filtered].sort(
    (a, b) =>
      new Date(b.happenedAt).getTime() - new Date(a.happenedAt).getTime(),
  );

  return sorted.map((item) => ({
    eventId: item.eventId,
    eventType: item.eventType,
    previousStatusLabel: item.previousStatus
      ? getPaymentStatusLabel(item.previousStatus as never, locale)
      : "--",
    newStatusLabel: item.newStatus
      ? getPaymentStatusLabel(item.newStatus as never, locale)
      : "--",
    actorRole: item.actorRole,
    happenedAt: item.happenedAt,
    notes: item.notes,
  }));
}

// AR: تبني ملخص مبالغ سجل الدفعات.
// EN: Builds summary totals from portal payment history response.
export function buildPaymentHistorySummary(
  totalFunded: string,
  totalReleased: string,
  currency: string,
) {
  return {
    totalFunded,
    totalReleased,
    currency,
  };
}
