type PathParam = string | number;

function encodePathParam(value: PathParam) {
  return encodeURIComponent(String(value));
}

// AR: هذا الكائن هو المصدر المركزي لكل endpoints حتى لا تتكرر المسارات داخل الـ actions أو الـ components.
// EN: This object is the central source of truth for endpoints so paths are not duplicated across actions or components.
export const API_PATHS = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGN_UP: "/auth/sign-up",
    LOGOUT: "/auth/logout",
    CURRENT_USER: "/auth/me",
    REFRESH: "/auth/refresh",
  },
  DASHBOARD: {
    ROOT: "/dashboard",
    SUMMARY: "/dashboard/summary",
    METRICS: "/dashboard/metrics",
  },
  CLIENT_PORTAL: {
    ROOT: "/client-portal",
    OVERVIEW: "/client-portal/overview",
    AGREEMENTS: "/client-portal/agreements",
  },
  AGREEMENTS: {
    ROOT: "/agreements",
    LIST: "/agreements",
    CREATE: "/agreements",
    DETAILS: (agreementId: PathParam) =>
      `/agreements/${encodePathParam(agreementId)}`,
    UPDATE: (agreementId: PathParam) =>
      `/agreements/${encodePathParam(agreementId)}`,
    DELETE: (agreementId: PathParam) =>
      `/agreements/${encodePathParam(agreementId)}`,
  },
  CLIENTS: {
    ROOT: "/clients",
    LIST: "/clients",
    CREATE: "/clients",
    DETAILS: (clientId: PathParam) => `/clients/${encodePathParam(clientId)}`,
    UPDATE: (clientId: PathParam) => `/clients/${encodePathParam(clientId)}`,
    DELETE: (clientId: PathParam) => `/clients/${encodePathParam(clientId)}`,
  },
  USERS: {
    CURRENT_USER: "/api/v1/users/me",
    CURRENT_USER_PROFILE: "/api/v1/users/me/profile",
  },
} as const;
