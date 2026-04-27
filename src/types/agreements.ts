import type {
  ApiItemResponse,
  ApiListResponse,
  PaginatedQueryParams,
} from "@/types/common";

export type AgreementStatus = "draft" | "active" | "expired" | "cancelled";

export interface Agreement {
  id: string;
  clientId: string;
  title: string;
  status: AgreementStatus;
  startDate?: string;
  endDate?: string;
}

export interface AgreementListParams extends PaginatedQueryParams {
  status?: AgreementStatus;
  clientId?: string;
}

export interface AgreementMutationPayload {
  clientId: string;
  title: string;
  status?: AgreementStatus;
  startDate?: string;
  endDate?: string;
}

export type AgreementsListResponse = ApiListResponse<Agreement>;
export type AgreementDetailsResponse = ApiItemResponse<Agreement>;
