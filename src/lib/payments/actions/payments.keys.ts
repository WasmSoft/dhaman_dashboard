// AR: مفاتيح استعلام مستقرة للدفعات لتجنب التعارض في الكاش.
// EN: Stable query keys for payments to avoid cache collisions.
export const paymentsQueryKeys = {
  all: ["payments"] as const,

  // AR: مفاتيح الدفعات المرتبطة باتفاقية (واجهة المستخدم الداخلية).
  // EN: Agreement-scoped payment keys (authenticated dashboard).
  agreementLists: () => [...paymentsQueryKeys.all, "agreement-list"] as const,
  agreementList: (agreementId: string) =>
    [...paymentsQueryKeys.agreementLists(), agreementId] as const,

  // AR: مفاتيح تفاصيل الدفعة.
  // EN: Payment detail keys.
  details: () => [...paymentsQueryKeys.all, "detail"] as const,
  detail: (paymentId: string) =>
    [...paymentsQueryKeys.details(), paymentId] as const,

  // AR: مفاتيح إيصال الدفعة.
  // EN: Payment receipt keys.
  receipts: () => [...paymentsQueryKeys.all, "receipt"] as const,
  receipt: (paymentId: string) =>
    [...paymentsQueryKeys.receipts(), paymentId] as const,

  // AR: مفاتيح سجل الدفعات المرتبط باتفاقية.
  // EN: Agreement-scoped payment history keys.
  agreementHistory: () => [...paymentsQueryKeys.all, "agreement-history"] as const,
  agreementHistoryList: (agreementId: string) =>
    [...paymentsQueryKeys.agreementHistory(), agreementId] as const,

  // AR: مفاتيح بوابة الدفعات.
  // EN: Portal payment keys.
  portalLists: () => [...paymentsQueryKeys.all, "portal-list"] as const,
  portalList: (token: string) =>
    [...paymentsQueryKeys.portalLists(), token] as const,

  portalHistory: () => [...paymentsQueryKeys.all, "portal-history"] as const,
  portalHistoryList: (token: string) =>
    [...paymentsQueryKeys.portalHistory(), token] as const,
} as const;
