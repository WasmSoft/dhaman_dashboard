import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";

import type { ApiErrorShape } from "@/types";

import { getAppLocale } from "@/lib/locale";

const ACCESS_TOKEN_STORAGE_KEY = "dhaman_access_token";
const API_PREFIX = "/api/v1";

// AR: هذه الدالة توحّد رابط الـ API حتى يعمل المشروع محليًا وفي الإنتاج سواء أُرسل الجذر فقط أو الجذر مع /api/v1.
// EN: This helper normalizes the API URL so the app works locally and in production whether the env provides just the backend root or the root with /api/v1.
export function normalizeApiBaseUrl(rawUrl: string) {
  const trimmedUrl = rawUrl.trim();

  if (!trimmedUrl) {
    return "";
  }

  try {
    const url = new URL(trimmedUrl);
    const normalizedPathname = url.pathname.replace(/\/+$/, "");

    if (!normalizedPathname || normalizedPathname === "/") {
      url.pathname = API_PREFIX;
      return url.toString();
    }

    if (normalizedPathname.endsWith(API_PREFIX)) {
      url.pathname = normalizedPathname;
      return url.toString();
    }

    url.pathname = `${normalizedPathname}${API_PREFIX}`;
    return url.toString();
  } catch {
    const normalizedPath = trimmedUrl.replace(/\/+$/, "");

    if (!normalizedPath || normalizedPath === "/") {
      return API_PREFIX;
    }

    if (normalizedPath.endsWith(API_PREFIX)) {
      return normalizedPath;
    }

    return `${normalizedPath}${API_PREFIX}`;
  }
}

function resolveApiBaseUrl() {
  const rawUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    process.env.API_BASE_URL ??
    "";

  return normalizeApiBaseUrl(rawUrl);
}

function resolveWithCredentials() {
  return process.env.NEXT_PUBLIC_API_WITH_CREDENTIALS === "true";
}

function resolveTimeout() {
  const timeout = Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS ?? 30_000);

  return Number.isFinite(timeout) ? timeout : 30_000;
}

function isBrowser() {
  return typeof window !== "undefined";
}

function isFormDataPayload(data: unknown): data is FormData {
  return typeof FormData !== "undefined" && data instanceof FormData;
}

// AR: هذه الدوال تدير التوكن في المتصفح فقط حتى يبقى server-side fetching آمنًا وواضحًا.
// EN: These helpers manage the token in the browser only so server-side fetching stays explicit and safe.
export function getAccessToken() {
  if (!isBrowser()) {
    return null;
  }

  return window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
}

export function setAccessToken(token: string) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
}

export function clearAccessToken() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
}

export class ApiError extends Error implements ApiErrorShape {
  statusCode: number | null;
  code?: string;
  details?: unknown;

  constructor({
    message,
    statusCode,
    code,
    details,
  }: ApiErrorShape) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

function normalizeApiError(error: unknown) {
  if (!axios.isAxiosError(error)) {
    return new ApiError({
      message: "Unexpected error",
      statusCode: null,
      details: error,
    });
  }

  const axiosError = error as AxiosError<{
    error?: {
      code?: string;
      details?: unknown;
      fieldErrors?: unknown;
      localizedMessage?: string;
      message?: string;
    };
    message?: string;
    code?: string;
    errors?: unknown;
  }>;

  const statusCode = axiosError.response?.status ?? null;
  const responseData = axiosError.response?.data;
  const responseError = responseData?.error;
  const message =
    responseError?.localizedMessage ??
    responseError?.message ??
    responseData?.message ??
    axiosError.message ??
    "Request failed";

  return new ApiError({
    message,
    statusCode,
    code: responseError?.code ?? responseData?.code,
    details:
      responseError?.fieldErrors ??
      responseError?.details ??
      responseData?.errors ??
      responseData,
  });
}

function applyRequestDefaults(config: InternalAxiosRequestConfig) {
  const headers = AxiosHeaders.from(config.headers);

  headers.set("Accept", "application/json");

  // AR: عند إرسال FormData نزيل Content-Type اليدوي حتى يضيف المتصفح الـ boundary الصحيح.
  // EN: For FormData payloads we remove the manual Content-Type so the browser can attach the correct boundary.
  if (isFormDataPayload(config.data)) {
    headers.delete("Content-Type");
  } else if (!headers.get("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const accessToken = getAccessToken();

  // AR: نضيف Bearer token تلقائيًا فقط إذا كان متاحًا ولم يتم تمرير Authorization يدويًا.
  // EN: We attach the Bearer token automatically only when available and not overridden manually.
  if (accessToken && !headers.get("Authorization")) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  // AR: نضيف Accept-Language من مصدر اللغة المركزي حتى يعيد الخادم الرسائل المترجمة.
  // EN: Attach Accept-Language from the central locale source so the backend returns localized messages.
  if (!headers.get("Accept-Language")) {
    headers.set("Accept-Language", getAppLocale());
  }

  config.headers = headers;

  return config;
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: resolveApiBaseUrl(),
  timeout: resolveTimeout(),
  withCredentials: resolveWithCredentials(),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => applyRequestDefaults(config),
  (error) => Promise.reject(normalizeApiError(error)),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = normalizeApiError(error);

    if (apiError.statusCode === 401) {
      clearAccessToken();
    }

    return Promise.reject(apiError);
  },
);

// AR: هذا helper يسمح بطلبات server-side المخصصة بدون إنشاء Axios instance إضافي.
// EN: This helper enables server-side custom requests without creating another Axios instance.
export function createAuthorizedRequestConfig(
  token?: string | null,
): AxiosRequestConfig {
  if (!token) {
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
