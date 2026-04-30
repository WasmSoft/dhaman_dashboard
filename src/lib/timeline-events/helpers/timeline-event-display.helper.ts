import type { TimelineDisplayItem, TimelineEvent } from "@/types";
import {
  TIMELINE_ACTOR_LABELS,
  TIMELINE_EVENT_TYPE_LABELS,
  TIMELINE_FALLBACK_LABEL,
  TIMELINE_FALLBACK_ACTOR_LABEL,
  TIMELINE_INVALID_DATE_LABEL,
  PORTAL_FORBIDDEN_METADATA_KEYS,
} from "@/constants";

// AR: تُنسّق تاريخ الحدث ليكون قابلاً للقراءة بالعربية.
// EN: Formats an event timestamp into a human-readable Arabic date string.
export function formatTimelineDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return TIMELINE_INVALID_DATE_LABEL;
    }
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return TIMELINE_INVALID_DATE_LABEL;
  }
}

// AR: تُعيد تسمية مقروءة لدور الجهة الفاعلة مع تسمية احتياطية للأدوار غير المعروفة.
// EN: Returns a readable label for an actor role with fallback for unknown roles.
export function getActorRoleLabel(role: string): string {
  return TIMELINE_ACTOR_LABELS[role as keyof typeof TIMELINE_ACTOR_LABELS] ?? TIMELINE_FALLBACK_ACTOR_LABEL;
}

// AR: تُعيد تسمية مقروءة لنوع الحدث مع تسمية احتياطية للأنواع غير المعروفة.
// EN: Returns a readable label for an event type with fallback for unknown types.
export function getEventTypeLabel(type: string): string {
  return TIMELINE_EVENT_TYPE_LABELS[type as keyof typeof TIMELINE_EVENT_TYPE_LABELS] ?? TIMELINE_FALLBACK_LABEL;
}

// AR: تُصفّي البيانات الوصفية لإزالة الحقول الحساسة قبل عرضها في بوابة العميل.
// EN: Sanitizes metadata to remove sensitive fields before client portal display.
export function filterPortalSafeMetadata(
  metadata: Record<string, unknown> | null
): Record<string, unknown> | null {
  if (!metadata || typeof metadata !== "object") {
    return null;
  }

  const safe: Record<string, unknown> = {};
  for (const key of Object.keys(metadata)) {
    if (PORTAL_FORBIDDEN_METADATA_KEYS.has(key)) {
      continue;
    }
    safe[key] = metadata[key];
  }

  return Object.keys(safe).length > 0 ? safe : null;
}

// AR: تُحوّل حدث السجل الزمني الخام إلى عنصر عرض جاهز للواجهة.
// EN: Transforms a raw timeline event into a display-ready item.
export function toTimelineDisplayItem(
  event: TimelineEvent,
  options?: { portalSafe?: boolean }
): TimelineDisplayItem {
  const safeMetadata = options?.portalSafe
    ? filterPortalSafeMetadata(event.metadata)
    : (event.metadata as Record<string, unknown> | null);

  return {
    id: event.id,
    agreementId: event.agreementId,
    milestoneId: event.milestoneId,
    actorRole: event.actorRole,
    actorRoleLabel: getActorRoleLabel(event.actorRole),
    actorName: event.actorName,
    type: event.type,
    typeLabel: getEventTypeLabel(event.type),
    title: event.title,
    description: event.description,
    safeMetadata,
    createdAt: event.createdAt,
    formattedDate: formatTimelineDate(event.createdAt),
  };
}

// AR: تُحوّل قائمة أحداث إلى عناصر عرض.
// EN: Transforms a list of events into display items.
export function toTimelineDisplayItems(
  events: TimelineEvent[],
  options?: { portalSafe?: boolean }
): TimelineDisplayItem[] {
  return events.map((event) => toTimelineDisplayItem(event, options));
}
