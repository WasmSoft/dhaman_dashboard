import type {
  ApiListResponse,
  FeaturePlaceholderContent,
  PaginatedQueryParams,
} from "@/types/common";

export interface ClientPortalContentMap {
  portal: FeaturePlaceholderContent;
}

export interface ClientPortalOverview {
  activeAgreements: number;
  pendingInvoices: number;
  unreadNotifications: number;
}

export interface ClientPortalAgreement {
  id: string;
  title: string;
  status: "draft" | "active" | "expired";
  updatedAt: string;
}

export type ClientPortalAgreementsParams = PaginatedQueryParams;

export type ClientPortalAgreementsResponse =
  ApiListResponse<ClientPortalAgreement>;
