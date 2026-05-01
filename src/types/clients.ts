import type { ApiItemResponse } from "@/types/common";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  companyName: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ClientListParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface ClientListResponse {
  data: Client[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateClientPayload {
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
}

export interface UpdateClientPayload {
  name?: string;
  email?: string;
  phone?: string | null;
  companyName?: string | null;
}

export interface AgreementReference {
  id: string;
  title: string;
  status: string;
  totalAmount: number | string;
  createdAt: string;
}

export interface PaymentSummary {
  totalAmount: number | string;
  releasedAmount: number | string;
  pendingAmount: number | string;
  currency: string;
}

export interface ClientProfileSummary {
  client: Client;
  agreements: {
    total: number;
    byStatus: Record<string, number>;
  };
  payments: PaymentSummary;
  recentAgreements: AgreementReference[];
}

export type ClientProfileSummaryResponse = ApiItemResponse<ClientProfileSummary>;

export interface ClientFormValues {
  name: string;
  email: string;
  phone: string;
  companyName: string;
}

export interface ClientPickerSelection {
  selectedClientId: string | null;
  selectedClient: Client | null;
  search: string;
  mode: "search" | "create";
}

export interface ClientPageLabels {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  emptyTitle: string;
  emptyDescription: string;
  noResultsTitle: string;
  noResultsDescription: string;
  retryLabel: string;
  pageLabel: string;
  ofLabel: string;
  detailsLabel: string;
  phoneLabel: string;
  companyLabel: string;
  createdLabel: string;
  updatedLabel: string;
}
