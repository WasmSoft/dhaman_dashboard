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
    INVITE: (token: PathParam) =>
      `/portal/${encodePathParam(token)}/invite`,
    WORKSPACE: (token: PathParam) => `/portal/${encodePathParam(token)}`,
    APPROVE: (token: PathParam) =>
      `/portal/${encodePathParam(token)}/approve`,
    REQUEST_CHANGES: (token: PathParam) =>
      `/portal/${encodePathParam(token)}/request-changes`,
    REJECT: (token: PathParam) =>
      `/portal/${encodePathParam(token)}/reject`,
    DELIVERY: (token: PathParam, deliveryId: PathParam) =>
      `/portal/${encodePathParam(token)}/deliveries/${encodePathParam(deliveryId)}`,
    DELIVERY_ACCEPT: (token: PathParam, deliveryId: PathParam) =>
      `/portal/${encodePathParam(token)}/deliveries/${encodePathParam(deliveryId)}/accept`,
    DELIVERY_REQUEST_CHANGES: (token: PathParam, deliveryId: PathParam) =>
      `/portal/${encodePathParam(token)}/deliveries/${encodePathParam(deliveryId)}/request-changes`,
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
    SEND_INVITE: (agreementId: PathParam) =>
      `/agreements/${encodePathParam(agreementId)}/send-invite`,
    ACTIVATE: (agreementId: PathParam) =>
      `/agreements/${encodePathParam(agreementId)}/activate`,
    ARCHIVE: (agreementId: PathParam) =>
      `/agreements/${encodePathParam(agreementId)}/archive`,
  },
  AGREEMENT_POLICIES: {
    BY_AGREEMENT: (agreementId: PathParam) =>
      `/agreements/${encodePathParam(agreementId)}/policies`,
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
  DELIVERIES: {
    LIST: "/deliveries",
    DETAILS: (deliveryId: PathParam) =>
      `/deliveries/${encodePathParam(deliveryId)}`,
    CREATE: (milestoneId: PathParam) =>
      `/milestones/${encodePathParam(milestoneId)}/deliveries`,
    CREATE_FOR_MILESTONE: (milestoneId: PathParam) =>
      `/milestones/${encodePathParam(milestoneId)}/deliveries`,
    UPDATE: (deliveryId: PathParam) =>
      `/deliveries/${encodePathParam(deliveryId)}`,
    SUBMIT: (deliveryId: PathParam) =>
      `/deliveries/${encodePathParam(deliveryId)}/submit`,
  },
  PORTAL_DELIVERIES: {
    DETAILS: (token: PathParam, deliveryId: PathParam) =>
      `/portal/${encodePathParam(token)}/deliveries/${encodePathParam(deliveryId)}`,
    ACCEPT: (token: PathParam, deliveryId: PathParam) =>
      `/portal/${encodePathParam(token)}/deliveries/${encodePathParam(deliveryId)}/accept`,
    REQUEST_CHANGES: (token: PathParam, deliveryId: PathParam) =>
      `/portal/${encodePathParam(token)}/deliveries/${encodePathParam(deliveryId)}/request-changes`,
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
    RELEASE: (token: PathParam, paymentId: PathParam) =>
      `/portal/${encodePathParam(token)}/payments/${encodePathParam(paymentId)}/release`,
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
  SETTINGS: {
    ROOT: "/settings",
    DEFAULT_POLICIES: "/settings/default-policies",
  },
  USERS: {
    CURRENT_USER: "/api/v1/users/me",
    CURRENT_USER_PROFILE: "/api/v1/users/me/profile",
  },
} as const;
