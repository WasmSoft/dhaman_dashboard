type PathParam = string | number;

function encodePathParam(value: PathParam) {
  return encodeURIComponent(String(value));
}

// AR: هذا الكائن هو المصدر المركزي لكل endpoints حتى لا تتكرر المسارات داخل الـ actions أو الـ components.
// EN: This object is the central source of truth for endpoints so paths are not duplicated across actions or components.
export const API_PATHS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    CURRENT_USER: "/auth/me",
    LOGOUT: "/auth/logout",
  },
  DASHBOARD: {
    ROOT: "/dashboard",
    SUMMARY: "/dashboard/summary",
    METRICS: "/dashboard/metrics",
    OVERVIEW: "/dashboard/overview",
    ACTIONS_REQUIRED: "/dashboard/actions-required",
    RECENT_ACTIVITY: "/dashboard/recent-activity",
  },
  CLIENT_PORTAL: {
    ROOT: "/client-portal",
    OVERVIEW: "/client-portal/overview",
    AGREEMENTS: "/client-portal/agreements",
  },
  PORTAL: {
    TIMELINE: (token: PathParam) =>
      `/portal/${encodePathParam(token)}/timeline`,
  },
  TIMELINE: {
    AGREEMENT_TIMELINE: (agreementId: PathParam) =>
      `/agreements/${encodePathParam(agreementId)}/timeline`,
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
    RESEND_INVITE: (agreementId: PathParam) =>
      `/agreements/${encodePathParam(agreementId)}/resend-invite`,
  },
  MILESTONES: {
    LIST: (agreementId: PathParam) =>
      `/agreements/${encodePathParam(agreementId)}/milestones`,
    CREATE: (agreementId: PathParam) =>
      `/agreements/${encodePathParam(agreementId)}/milestones`,
    DETAILS: (milestoneId: PathParam) =>
      `/milestones/${encodePathParam(milestoneId)}`,
    UPDATE: (milestoneId: PathParam) =>
      `/milestones/${encodePathParam(milestoneId)}`,
    DELETE: (milestoneId: PathParam) =>
      `/milestones/${encodePathParam(milestoneId)}`,
    REORDER: (milestoneId: PathParam) =>
      `/milestones/${encodePathParam(milestoneId)}/reorder`,
  },
  CLIENTS: {
    ROOT: "/clients",
    LIST: "/clients",
    CREATE: "/clients",
    DETAILS: (clientId: PathParam) => `/clients/${encodePathParam(clientId)}`,
    UPDATE: (clientId: PathParam) => `/clients/${encodePathParam(clientId)}`,
    DELETE: (clientId: PathParam) => `/clients/${encodePathParam(clientId)}`,
  },
  AI_REVIEWS: {
    ROOT: "/ai-reviews",
    LIST: "/ai-reviews",
    DETAILS: (reviewId: PathParam) =>
      `/ai-reviews/${encodePathParam(reviewId)}`,
    ACCEPT_RECOMMENDATION: (reviewId: PathParam) =>
      `/ai-reviews/${encodePathParam(reviewId)}/accept-recommendation`,
    REVIEW_PAYMENT_RELEASE: "/ai/review-payment-release",
    PORTAL_OPEN_REVIEW: (token: PathParam, deliveryId: PathParam) =>
      `/portal/${encodePathParam(token)}/deliveries/${encodePathParam(deliveryId)}/open-ai-review`,
  },
  AI_PLAN: {
    GENERATE: "/ai/generate-payment-plan",
    GENERATE_FOR_AGREEMENT: (agreementId: PathParam) =>
      `/agreements/${encodePathParam(agreementId)}/generate-plan`,
  },
  PAYMENTS: {
    AGREEMENT_PAYMENTS: (agreementId: PathParam) =>
      `/agreements/${encodePathParam(agreementId)}/payments`,
    FUND_MILESTONE: "/payments/fund-milestone",
    RELEASE: "/payments/release",
    DETAILS: (paymentId: PathParam) =>
      `/payments/${encodePathParam(paymentId)}`,
    RECEIPT: (paymentId: PathParam) =>
      `/payments/${encodePathParam(paymentId)}/receipt`,
  },
  PORTAL_PAYMENTS: {
    LIST: (token: PathParam) =>
      `/portal/${encodePathParam(token)}/payments`,
    HISTORY: (token: PathParam) =>
      `/portal/${encodePathParam(token)}/payment-history`,
    FUND: (token: PathParam, paymentId: PathParam) =>
      `/portal/${encodePathParam(token)}/payments/${encodePathParam(paymentId)}/fund`,
    RELEASE_CONFIRMATION: (token: PathParam, paymentId: PathParam) =>
      `/portal/${encodePathParam(token)}/payments/${encodePathParam(paymentId)}/release-confirmation`,
  },
  CHANGE_REQUESTS: {
    LIST: (agreementId: PathParam) =>
      `/agreements/${encodePathParam(agreementId)}/change-requests`,
    CREATE: (agreementId: PathParam) =>
      `/agreements/${encodePathParam(agreementId)}/change-requests`,
    DETAILS: (id: PathParam) =>
      `/change-requests/${encodePathParam(id)}`,
    UPDATE: (id: PathParam) =>
      `/change-requests/${encodePathParam(id)}`,
    SEND: (id: PathParam) =>
      `/change-requests/${encodePathParam(id)}/send`,
    PORTAL_APPROVE: (token: PathParam, id: PathParam) =>
      `/portal/${encodePathParam(token)}/change-requests/${encodePathParam(id)}/approve`,
    PORTAL_DECLINE: (token: PathParam, id: PathParam) =>
      `/portal/${encodePathParam(token)}/change-requests/${encodePathParam(id)}/decline`,
    PORTAL_FUND: (token: PathParam, id: PathParam) =>
      `/portal/${encodePathParam(token)}/change-requests/${encodePathParam(id)}/fund`,
  },
  EMAIL_NOTIFICATIONS: {
    PREVIEW: "/email-notifications/preview",
    LOGS: "/emails/logs",
    SEND_TEST: "/notifications/test",
  },
} as const;
