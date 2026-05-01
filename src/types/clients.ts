import type { ApiItemResponse } from "@/types/common";

// AR: أنواع بيانات العملاء — تشمل أنواع API و أنواع صفحة العملاء.
// EN: Client data types — includes API types and client page UI types.
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

export type ClientStatus = "نشط" | "يحتاج متابعة" | "مكتمل" | "معلّق";

export type ClientFilterTab =
  | "الكل"
  | "مكتملون"
  | "لديهم مراجعات AI"
  | "بانتظار إجراء"
  | "نشطون";

export type ClientActionBadge =
  | "بانتظار مراجعة تسليم"
  | "طلب تعديل مفتوح"
  | "لا يوجد"
  | "مراجعة AI مفتوحة"
  | "بانتظار AI";

export interface ClientStat {
  key: string;
  value: string;
  label: string;
  description: string;
  trend?: string;
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
  createLabel?: string;
  editLabel?: string;
  saveLabel?: string;
  cancelLabel?: string;
  deleteLabel?: string;
  nameLabel?: string;
  emailLabel?: string;
  phoneLabel: string;
  companyLabel: string;
  agreementsLabel?: string;
  totalPaymentsLabel?: string;
  pageLabel: string;
  ofLabel: string;
  detailsLabel: string;
  createdLabel: string;
  updatedLabel: string;
}
