import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  acceptDelivery,
  approveAgreement,
  fundPayment,
  getPortalDelivery,
  getPortalInvite,
  getPortalPaymentHistory,
  getPortalPayments,
  getPortalTimeline,
  getPortalWorkspace,
  rejectAgreement,
  releasePayment,
  requestAgreementChanges,
  requestDeliveryChanges,
} from "@/lib/client-portal/actions";

const mockGet = vi.fn();
const mockPost = vi.fn();

vi.mock("@/lib/axios-instance", () => ({
  axiosInstance: {
    get: (...args: unknown[]) => mockGet(...args),
    post: (...args: unknown[]) => mockPost(...args),
  },
}));

vi.mock("@/lib/api-paths", () => ({
  API_PATHS: {
    PORTAL: {
      INVITE: (token: string) => `/portal/${token}/invite`,
      WORKSPACE: (token: string) => `/portal/${token}`,
      APPROVE: (token: string) => `/portal/${token}/approve`,
      REQUEST_CHANGES: (token: string) => `/portal/${token}/request-changes`,
      REJECT: (token: string) => `/portal/${token}/reject`,
      DELIVERY: (token: string, deliveryId: string) =>
        `/portal/${token}/deliveries/${deliveryId}`,
      DELIVERY_ACCEPT: (token: string, deliveryId: string) =>
        `/portal/${token}/deliveries/${deliveryId}/accept`,
      DELIVERY_REQUEST_CHANGES: (token: string, deliveryId: string) =>
        `/portal/${token}/deliveries/${deliveryId}/request-changes`,
      TIMELINE: (token: string) => `/portal/${token}/timeline`,
    },
    PORTAL_PAYMENTS: {
      LIST: (token: string) => `/portal/${token}/payments`,
      HISTORY: (token: string) => `/portal/${token}/payment-history`,
      FUND: (token: string, paymentId: string) =>
        `/portal/${token}/payments/${paymentId}/fund`,
      RELEASE: (token: string, paymentId: string) =>
        `/portal/${token}/payments/${paymentId}/release`,
    },
    CLIENT_PORTAL: {
      OVERVIEW: "/client-portal/overview",
      AGREEMENTS: "/client-portal/agreements",
    },
  },
}));

describe("client-portal.api", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls the invite endpoint with GET", async () => {
    mockGet.mockResolvedValueOnce({ data: { agreement: { id: "agr-1" } } });

    await expect(getPortalInvite("tok-1")).resolves.toEqual({
      agreement: { id: "agr-1" },
    });
    expect(mockGet).toHaveBeenCalledWith("/portal/tok-1/invite");
  });

  it("posts approve agreement to the approve endpoint", async () => {
    mockPost.mockResolvedValueOnce({ data: { agreementId: "agr-1", status: "APPROVED", message: "ok" } });

    await approveAgreement("tok-1");
    expect(mockPost).toHaveBeenCalledWith("/portal/tok-1/approve");
  });

  it("posts request changes payload to the agreement endpoint", async () => {
    const payload = { reason: "Need clearer scope" };
    mockPost.mockResolvedValueOnce({ data: { agreementId: "agr-1", status: "CHANGE_REQUESTED", message: "ok" } });

    await requestAgreementChanges("tok-1", payload);
    expect(mockPost).toHaveBeenCalledWith("/portal/tok-1/request-changes", payload);
  });

  it("posts reject payload to the reject endpoint", async () => {
    const payload = { reason: "Not aligned with requirements" };
    mockPost.mockResolvedValueOnce({ data: { agreementId: "agr-1", status: "CANCELLED", message: "ok" } });

    await rejectAgreement("tok-1", payload);
    expect(mockPost).toHaveBeenCalledWith("/portal/tok-1/reject", payload);
  });

  it("calls the workspace endpoint with GET", async () => {
    mockGet.mockResolvedValueOnce({ data: { agreement: { id: "agr-1" } } });

    await getPortalWorkspace("tok-1");
    expect(mockGet).toHaveBeenCalledWith("/portal/tok-1");
  });

  it("calls the delivery detail endpoint with GET", async () => {
    mockGet.mockResolvedValueOnce({ data: { id: "del-1" } });

    await getPortalDelivery("tok-1", "del-1");
    expect(mockGet).toHaveBeenCalledWith("/portal/tok-1/deliveries/del-1");
  });

  it("posts delivery acceptance to the accept endpoint", async () => {
    mockPost.mockResolvedValueOnce({ data: { agreementId: "agr-1", status: "ACCEPTED", message: "ok" } });

    await acceptDelivery("tok-1", "del-1");
    expect(mockPost).toHaveBeenCalledWith("/portal/tok-1/deliveries/del-1/accept");
  });

  it("posts delivery changes payload to the delivery changes endpoint", async () => {
    const payload = { reason: "Please revise the final section" };
    mockPost.mockResolvedValueOnce({ data: { agreementId: "agr-1", status: "CHANGES_REQUESTED", message: "ok" } });

    await requestDeliveryChanges("tok-1", "del-1", payload);
    expect(mockPost).toHaveBeenCalledWith(
      "/portal/tok-1/deliveries/del-1/request-changes",
      payload,
    );
  });

  it("calls portal payments with GET", async () => {
    mockGet.mockResolvedValueOnce({ data: [] });

    await getPortalPayments("tok-1");
    expect(mockGet).toHaveBeenCalledWith("/portal/tok-1/payments");
  });

  it("posts fund payment to the fund endpoint", async () => {
    mockPost.mockResolvedValueOnce({ data: { id: "pay-1", status: "RESERVED" } });

    await fundPayment("tok-1", "pay-1");
    expect(mockPost).toHaveBeenCalledWith("/portal/tok-1/payments/pay-1/fund");
  });

  it("posts release payment to the release endpoint", async () => {
    mockPost.mockResolvedValueOnce({ data: { id: "pay-1", status: "RELEASED" } });

    await releasePayment("tok-1", "pay-1");
    expect(mockPost).toHaveBeenCalledWith("/portal/tok-1/payments/pay-1/release");
  });

  it("calls portal payment history with GET", async () => {
    mockGet.mockResolvedValueOnce({ data: [] });

    await getPortalPaymentHistory("tok-1");
    expect(mockGet).toHaveBeenCalledWith("/portal/tok-1/payment-history");
  });

  it("calls portal timeline with GET", async () => {
    mockGet.mockResolvedValueOnce({ data: [] });

    await getPortalTimeline("tok-1");
    expect(mockGet).toHaveBeenCalledWith("/portal/tok-1/timeline");
  });
});
