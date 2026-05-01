import type { ApiErrorShape, Client, ClientProfileSummary } from "@/types";

const FALLBACK_VALUE = "-";

export function getClientInitials(client: Pick<Client, "name">) {
  const parts = client.name.trim().split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0]).join("");

  return initials || "?";
}

export function getOptionalClientValue(value?: string | null) {
  return value?.trim() ? value : FALLBACK_VALUE;
}

export function formatClientDate(value?: string | null) {
  if (!value) {
    return FALLBACK_VALUE;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return FALLBACK_VALUE;
  }

  return date.toISOString().slice(0, 10);
}

export function formatClientStatusLabel(status?: string | null) {
  return status?.trim() || "غير محدد";
}

export function formatAmountValue(value?: number | string | null) {
  if (value === null || value === undefined || value === "") {
    return FALLBACK_VALUE;
  }

  return String(value);
}

export function formatCurrencyValue(amount: number | string, currency: string) {
  return `${formatAmountValue(amount)} ${currency}`;
}

export function getClientErrorMessage(error: ApiErrorShape) {
  const code = error.code ?? "";

  if (error.statusCode === 401 || code === "UNAUTHORIZED") {
    return "انتهت الجلسة. سجّل الدخول مرة أخرى.";
  }

  if (error.statusCode === 404 || code === "CLIENT_NOT_FOUND") {
    return "العميل غير موجود أو لا يمكن الوصول إليه.";
  }

  if (error.statusCode === 409 || code === "CLIENT_EMAIL_ALREADY_EXISTS") {
    return "يوجد عميل بنفس البريد الإلكتروني.";
  }

  if (error.statusCode === 400) {
    return error.message || "تحقق من البيانات المدخلة.";
  }

  return error.message || "تعذر تحميل بيانات العميل.";
}

export function isClientNotFoundError(error: ApiErrorShape) {
  return error.statusCode === 404 || error.code === "CLIENT_NOT_FOUND";
}

export function isClientConflictError(error: ApiErrorShape) {
  return error.statusCode === 409 || error.code === "CLIENT_EMAIL_ALREADY_EXISTS";
}

export function isClientUnauthorizedError(error: ApiErrorShape) {
  return error.statusCode === 401 || error.code === "UNAUTHORIZED";
}

export function getClientSummaryMetricValue(summary: ClientProfileSummary, key: "totalAmount" | "releasedAmount" | "pendingAmount") {
  return formatAmountValue(summary.payments[key]);
}
