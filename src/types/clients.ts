// AR: أنواع بيانات العملاء — تشمل أنواع API و أنواع صفحة العملاء.
// EN: Client data types — includes API types and client page UI types.
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

// AR: أنواع واجهة صفحة العملاء.
// EN: Client page UI types.

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

export interface ClientFilterDropdown {
  key: string;
  label: string;
}

export interface ClientRow {
  id: string;
  name: string;
  email: string;
  avatarInitial: string;
  agreementCount: number;
  agreementLabel: string;
  latestAgreement: string;
  totalValue: string;
  status: ClientStatus;
  statusBadge: "نشط" | "يحتاج متابعة" | "مكتمل" | "معلّق";
  portalActive: boolean;
  actionBadge: ClientActionBadge;
  lastActivity: string;
}

export interface ClientContentMap {
  clients: {
    pageTitle: string;
    pageDescription: string;
    addClientLabel: string;
    exportLabel: string;
    searchPlaceholder: string;
    stats: ClientStat[];
    filterTabs: { label: ClientFilterTab; count: number }[];
    filterDropdowns: ClientFilterDropdown[];
    tableHeaders: string[];
    rows: ClientRow[];
  };
}