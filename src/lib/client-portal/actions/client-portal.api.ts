import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type {
  ClientPortalAgreementsParams,
  ClientPortalAgreementsResponse,
  ClientPortalOverview,
  PortalActionResponse,
  PortalDelivery,
  PortalInviteResponse,
  PortalPayment,
  PortalPaymentHistoryItem,
  PortalRejectAgreementPayload,
  PortalRequestChangesPayload,
  PortalTimelineEvent,
  PortalWorkspaceResponse,
} from "@/types";

type ApiEnvelope<T> = {
  success: boolean;
  data: T;
};

type BackendPortalInviteResponse = {
  agreementId: string;
  title: string;
  description: string | null;
  serviceType: string | null;
  totalAmount: string;
  currency: string;
  expectedDeliveryDate?: string;
  status: string;
  sentAt?: string;
  freelancer: {
    name: string;
  };
  client: {
    name: string;
    email?: string;
  };
  policy?: {
    reviewPeriodDays: number;
    revisionLimit: number;
    lateDeliveryPenaltyPercent?: number;
    earlyDeliveryBonusPercent?: number | null;
  };
  milestones: Array<{
    id: string;
    title: string;
    description?: string;
    amount: string;
    currency: string;
  }>;
  paymentSchedule: Array<{
    milestoneId: string;
    milestoneTitle: string;
    amount: string;
    currency: string;
    status: string;
  }>;
};

type BackendPortalWorkspaceResponse = {
  agreementId: string;
  title: string;
  status: string;
  totalAmount: string;
  currency: string;
  freelancerName: string;
  clientName?: string;
  milestones: Array<{
    id: string;
    title: string;
    description?: string;
    amount: string;
    currency: string;
    status: string;
    dueDate?: string;
  }>;
  payments: Array<{
    id?: string;
    milestoneId: string;
    milestoneTitle: string;
    amount: string;
    currency: string;
    status: string;
  }>;
  deliveries: Array<{
    id: string;
    milestoneId: string;
    milestoneTitle: string;
    status: string;
    submittedAt?: string;
  }>;
  changeRequests: Array<{
    id: string;
    title: string;
    status: string;
    requestedAmount?: string;
  }>;
  aiReviews: Array<{
    id: string;
    status: string;
    conclusion?: string;
    createdAt: string;
  }>;
  timeline: Array<{
    id: string;
    eventType: string;
    actorRole: string;
    occurredAt: string;
    description?: string;
  }>;
};

function toNumber(value: string | number | null | undefined) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

function mapPortalInviteResponse(
  response: BackendPortalInviteResponse,
): PortalInviteResponse {
  const policies = response.policy
    ? [
        {
          title: "فترة المراجعة",
          description: `يملك العميل ${response.policy.reviewPeriodDays} يوم لمراجعة الاتفاق أو طلب التعديلات.`,
        },
        {
          title: "عدد جولات المراجعة",
          description: `الحد المتاح للمراجعة هو ${response.policy.revisionLimit} جولة.`,
        },
      ]
    : null;

  return {
    agreement: {
      id: response.agreementId,
      title: response.title,
      description: response.description,
      status: response.status,
      sentAt: response.sentAt ?? null,
    },
    freelancer: {
      name: response.freelancer.name,
      email: "",
    },
    client: {
      name: response.client.name,
      email: response.client.email ?? "",
    },
    milestones: response.milestones.map((milestone) => ({
      id: milestone.id,
      title: milestone.title,
      description: milestone.description ?? null,
      amount: toNumber(milestone.amount),
      currency: milestone.currency,
    })),
    policies,
    paymentPlan: response.paymentSchedule.map((payment, index) => ({
      id: `${payment.milestoneId || index}`,
      milestoneId: payment.milestoneId,
      milestoneName: payment.milestoneTitle,
      amount: toNumber(payment.amount),
      currency: payment.currency,
      status: payment.status,
    })),
  };
}

function mapPortalWorkspaceResponse(
  response: BackendPortalWorkspaceResponse,
): PortalWorkspaceResponse {
  return {
    agreement: {
      id: response.agreementId,
      title: response.title,
      status: response.status,
      approvedAt: null,
    },
    freelancer: {
      name: response.freelancerName,
    },
    client: {
      name: response.clientName ?? "",
    },
    milestones: response.milestones.map((milestone) => ({
      id: milestone.id,
      title: milestone.title,
      description: milestone.description ?? null,
      amount: toNumber(milestone.amount),
      currency: milestone.currency,
      status: milestone.status,
      progress: null,
    })),
    payments: response.payments.map((payment, index) => ({
      id: payment.id ?? `${payment.milestoneId || index}`,
      milestoneId: payment.milestoneId,
      milestoneName: payment.milestoneTitle,
      amount: toNumber(payment.amount),
      currency: payment.currency,
      status: payment.status,
    })),
    deliveries: response.deliveries.map((delivery) => ({
      id: delivery.id,
      milestoneId: delivery.milestoneId,
      milestoneName: delivery.milestoneTitle,
      status: delivery.status,
      submittedAt: delivery.submittedAt ?? "",
    })),
    changeRequests: response.changeRequests.map((request) => ({
      id: request.id,
      title: request.title,
      status: request.status,
      amount: request.requestedAmount ? toNumber(request.requestedAmount) : null,
    })),
    timelineSummary: response.timeline.map((event) => ({
      id: event.id,
      eventType: event.eventType,
      actorRole: event.actorRole,
      occurredAt: event.occurredAt,
      description: event.description ?? null,
    })),
  };
}

// AR: تجلب نظرة عامة سريعة لبوابة العميل لاستخدامها في الصفحة الرئيسية والـ widgets.
// EN: Fetches the client portal overview for the main page and related widgets.
export async function getClientPortalOverview() {
  const response = await axiosInstance.get<ClientPortalOverview>(
    API_PATHS.CLIENT_PORTAL.OVERVIEW,
  );

  return response.data;
}

// AR: تجلب اتفاقيات العميل مع دعم params الخاصة بالبحث والصفحات.
// EN: Fetches client agreements with query params for search and pagination.
export async function getClientPortalAgreements(
  params?: ClientPortalAgreementsParams,
) {
  const response = await axiosInstance.get<ClientPortalAgreementsResponse>(
    API_PATHS.CLIENT_PORTAL.AGREEMENTS,
    {
      params,
    },
  );

  return response.data;
}

// AR: تجلب ملخص دعوة الاتفاق عبر رمز البوابة لإظهار تفاصيل المراجعة قبل أي إجراء.
// EN: Fetches the agreement invite summary via the portal token before any client action.
export async function getPortalInvite(token: string) {
  const response = await axiosInstance.get<ApiEnvelope<BackendPortalInviteResponse>>(
    API_PATHS.PORTAL.INVITE(token),
  );

  return mapPortalInviteResponse(response.data.data);
}

// AR: تعتمد الاتفاق مباشرة من بوابة العميل باستخدام رمز الوصول فقط.
// EN: Approves the agreement directly from the client portal using only the access token.
export async function approveAgreement(token: string) {
  const response = await axiosInstance.post<ApiEnvelope<PortalActionResponse>>(
    API_PATHS.PORTAL.APPROVE(token),
  );

  return response.data.data;
}

// AR: ترسل طلب تعديلات على الاتفاق قبل الموافقة مع سبب واضح للعميل والفريلانسر.
// EN: Sends an agreement change request before approval with a clear client reason.
export async function requestAgreementChanges(
  token: string,
  payload: PortalRequestChangesPayload,
) {
  const response = await axiosInstance.post<ApiEnvelope<PortalActionResponse>>(
    API_PATHS.PORTAL.REQUEST_CHANGES(token),
    payload,
  );

  return response.data.data;
}

// AR: ترفض الدعوة الحالية من البوابة مع سبب مختصر موثق.
// EN: Rejects the current invite from the portal with a documented reason.
export async function rejectAgreement(
  token: string,
  payload: PortalRejectAgreementPayload,
) {
  const response = await axiosInstance.post<ApiEnvelope<PortalActionResponse>>(
    API_PATHS.PORTAL.REJECT(token),
    payload,
  );

  return response.data.data;
}

// AR: تجلب مساحة عمل العميل الكاملة مع المراحل والدفعات والتسليمات ضمن نفس الاتفاق فقط.
// EN: Fetches the full client workspace scoped to the same agreement only.
export async function getPortalWorkspace(token: string) {
  const response = await axiosInstance.get<
    ApiEnvelope<BackendPortalWorkspaceResponse>
  >(
    API_PATHS.PORTAL.WORKSPACE(token),
  );

  return mapPortalWorkspaceResponse(response.data.data);
}

// AR: تجلب تفاصيل تسليم واحد داخل نطاق الاتفاق المرتبط برمز البوابة.
// EN: Fetches a single delivery detail scoped to the agreement behind the portal token.
export async function getPortalDelivery(token: string, deliveryId: string) {
  const response = await axiosInstance.get<PortalDelivery>(
    API_PATHS.PORTAL.DELIVERY(token, deliveryId),
  );

  return response.data;
}

// AR: تعتمد التسليم الحالي من البوابة وتعيد الحالة الجديدة للتسليم/الاتفاق.
// EN: Accepts the current delivery from the portal and returns the updated status payload.
export async function acceptDelivery(token: string, deliveryId: string) {
  const response = await axiosInstance.post<PortalActionResponse>(
    API_PATHS.PORTAL.DELIVERY_ACCEPT(token, deliveryId),
  );

  return response.data;
}

// AR: ترسل طلب تعديلات على التسليم الحالي مع ملاحظات العميل المطلوبة.
// EN: Sends a delivery change request with the client's requested revisions.
export async function requestDeliveryChanges(
  token: string,
  deliveryId: string,
  payload: PortalRequestChangesPayload,
) {
  const response = await axiosInstance.post<PortalActionResponse>(
    API_PATHS.PORTAL.DELIVERY_REQUEST_CHANGES(token, deliveryId),
    payload,
  );

  return response.data;
}

// AR: تجلب قائمة دفعات الاتفاق الخاصة بالعميل عبر رابط البوابة.
// EN: Fetches the agreement payment list for the client through the portal link.
export async function getPortalPayments(token: string) {
  const response = await axiosInstance.get<PortalPayment[]>(
    API_PATHS.PORTAL_PAYMENTS.LIST(token),
  );

  return response.data;
}

// AR: تموّل دفعة محددة في وضع البوابة دون الحاجة لأي جسم طلب إضافي في الـ MVP.
// EN: Funds a specific payment from the portal without an additional request body in the MVP.
export async function fundPayment(token: string, paymentId: string) {
  // AR: تمويل الدفعة إجراء يغيّر الحالة، لذلك نثبت method=POST صراحة ولا نسمح بأي GET ضمني.
  // EN: Funding changes state, so force method=POST explicitly and avoid any implicit GET path.
  const response = await axiosInstance.request<PortalPayment>({
    method: "POST",
    url: API_PATHS.PORTAL_PAYMENTS.FUND(token, paymentId),
  });

  return response.data;
}

// AR: تطلق دفعة جاهزة للإطلاق من بوابة العميل عبر مسار الإصدار النهائي.
// EN: Releases a payment that is ready to release through the final portal release endpoint.
export async function releasePayment(token: string, paymentId: string) {
  const response = await axiosInstance.post<PortalPayment>(
    API_PATHS.PORTAL_PAYMENTS.RELEASE(token, paymentId),
  );

  return response.data;
}

// AR: تجلب سجل دفعات الاتفاق بترتيب زمني آمن للعميل.
// EN: Fetches client-safe agreement payment history in chronological order.
export async function getPortalPaymentHistory(token: string) {
  const response = await axiosInstance.get<PortalPaymentHistoryItem[]>(
    API_PATHS.PORTAL_PAYMENTS.HISTORY(token),
  );

  return response.data;
}

// AR: تجلب الخط الزمني الخاص بالاتفاق كما يظهر للعميل داخل البوابة.
// EN: Fetches the agreement timeline as exposed to the client inside the portal.
export async function getPortalTimeline(token: string) {
  const response = await axiosInstance.get<
    ApiEnvelope<{
      items: Array<{
        id: string;
        type: string;
        actorRole: string;
        createdAt: string;
        description?: string | null;
      }>;
    }>
  >(
    API_PATHS.PORTAL.TIMELINE(token),
  );

  return response.data.data.items.map((event) => ({
    id: event.id,
    eventType: event.type,
    actorRole: event.actorRole,
    occurredAt: event.createdAt,
    description: event.description ?? null,
  }));
}
