export type TimelineEventType =
  | "AGREEMENT_CREATED"
  | "AGREEMENT_SENT"
  | "AGREEMENT_APPROVED"
  | "AGREEMENT_CHANGES_REQUESTED"
  | "MILESTONE_CREATED"
  | "PAYMENT_RESERVED"
  | "PAYMENT_CLIENT_REVIEW"
  | "PAYMENT_READY_TO_RELEASE"
  | "PAYMENT_RELEASED"
  | "DELIVERY_SUBMITTED"
  | "DELIVERY_ACCEPTED"
  | "DELIVERY_CHANGES_REQUESTED"
  | "AI_REVIEW_REQUESTED"
  | "AI_REVIEW_COMPLETED"
  | "CHANGE_REQUEST_CREATED"
  | "CHANGE_REQUEST_APPROVED"
  | "CHANGE_REQUEST_DECLINED"
  | "CHANGE_REQUEST_FUNDED"
  | "EMAIL_SENT";

export type TimelineActorRole = "FREELANCER" | "CLIENT" | "SYSTEM" | "AI";

export interface TimelineEvent {
  id: string;
  agreementId: string;
  milestoneId: string | null;
  actorRole: TimelineActorRole;
  actorName?: string;
  type: TimelineEventType;
  title: string;
  description: string;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

export interface TimelineQueryParams {
  type?: TimelineEventType;
  milestoneId?: string;
  actorRole?: TimelineActorRole;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

export interface TimelineResponse {
  items: TimelineEvent[];
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
}

export interface TimelineDisplayItem {
  id: string;
  agreementId: string;
  milestoneId: string | null;
  actorRole?: TimelineActorRole;
  actorRoleLabel: string;
  actorName?: string;
  type: TimelineEventType;
  typeLabel: string;
  title: string;
  description: string;
  safeMetadata: Record<string, unknown> | null;
  createdAt: string;
  formattedDate: string;
}

export type TimelineState =
  | { status: "loading" }
  | { status: "data"; items: TimelineDisplayItem[]; hasMore: boolean; total: number }
  | { status: "empty" }
  | { status: "no-results" }
  | { status: "error"; code: string; message: string }
  | { status: "access-denied"; message: string };

export interface TimelineFilterValues {
  type?: TimelineEventType;
  actorRole?: TimelineActorRole;
  milestoneId?: string;
  from?: string;
  to?: string;
}
