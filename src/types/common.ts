// AR: هذه الأنواع المشتركة تدعم placeholders البسيطة لحين بناء كل feature بشكل كامل.
// EN: These shared types support the minimal placeholders until each feature is fully built.
export interface FeaturePlaceholderContent {
  title: string;
  description: string;
}

export interface NotFoundStateContent {
  eyebrow: string;
  code: string;
  title: string;
  description: string;
  primaryActionLabel: string;
  primaryActionHref: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  highlights: readonly string[];
}

export interface ApiErrorShape {
  message: string;
  statusCode: number | null;
  code?: string;
  details?: unknown;
}

export interface ApiPaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiListResponse<TItem> {
  data: TItem[];
  meta: ApiPaginationMeta;
}

export interface ApiItemResponse<TItem> {
  data: TItem;
}

export interface PaginatedQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
