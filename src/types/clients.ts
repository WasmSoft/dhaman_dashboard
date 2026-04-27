import type {
  ApiItemResponse,
  ApiListResponse,
  PaginatedQueryParams,
} from "@/types/common";

export interface Client {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
}

export interface ClientListParams extends PaginatedQueryParams {
  status?: "active" | "inactive";
}

export interface ClientMutationPayload {
  name: string;
  email: string;
  status?: "active" | "inactive";
}

export type ClientsListResponse = ApiListResponse<Client>;
export type ClientDetailsResponse = ApiItemResponse<Client>;
