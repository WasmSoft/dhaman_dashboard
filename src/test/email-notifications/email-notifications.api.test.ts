import { beforeEach, describe, expect, it, vi } from "vitest";

const mockGet = vi.fn();
const mockPost = vi.fn();

vi.mock("@/lib/axios-instance", () => ({
  axiosInstance: {
    get: (...args: unknown[]) => mockGet(...args),
    post: (...args: unknown[]) => mockPost(...args),
  },
}));

describe("email notification API actions", () => {
  beforeEach(() => {
    mockGet.mockReset();
    mockPost.mockReset();
  });

  it("previews an email notification through the centralized preview path", async () => {
    const response = {
      data: {
        data: {
          type: "AGREEMENT_INVITE",
          recipientEmail: "client@example.com",
          subject: "دعوة اتفاق",
          previewHtml: "<p>مرحبا</p>",
          locale: "ar",
        },
      },
    };
    const payload = {
      type: "AGREEMENT_INVITE" as const,
      agreementId: "agreement-1",
      locale: "ar" as const,
    };

    mockPost.mockResolvedValueOnce(response);

    const { previewEmailNotification } = await import(
      "@/lib/email-notifications/actions"
    );

    await expect(previewEmailNotification(payload)).resolves.toEqual(
      response.data,
    );
    expect(mockPost).toHaveBeenCalledWith(
      "/email-notifications/preview",
      payload,
    );
  });

  it("fetches email logs with query params", async () => {
    const params = { status: "FAILED" as const, page: 2, limit: 10 };
    const response = {
      data: {
        data: {
          items: [],
          pagination: { page: 2, limit: 10, total: 0, totalPages: 0 },
        },
      },
    };

    mockGet.mockResolvedValueOnce(response);

    const { getEmailNotificationLogs } = await import(
      "@/lib/email-notifications/actions"
    );

    await expect(getEmailNotificationLogs(params)).resolves.toEqual(
      response.data,
    );
    expect(mockGet).toHaveBeenCalledWith("/emails/logs", { params });
  });

  it("sends a test notification through the centralized test path", async () => {
    const payload = {
      type: "SYSTEM_TEST" as const,
      recipientEmail: "client@example.com",
    };
    const response = { data: { data: { id: "email-1" } } };

    mockPost.mockResolvedValueOnce(response);

    const { sendTestEmailNotification } = await import(
      "@/lib/email-notifications/actions"
    );

    await expect(sendTestEmailNotification(payload)).resolves.toEqual(
      response.data,
    );
    expect(mockPost).toHaveBeenCalledWith("/notifications/test", payload);
  });

  it("resends an agreement invite through the agreement endpoint", async () => {
    const response = { data: { data: { id: "email-1" } } };

    mockPost.mockResolvedValueOnce(response);

    const { resendAgreementInvite } = await import(
      "@/lib/email-notifications/actions"
    );

    await expect(resendAgreementInvite("agreement 1")).resolves.toEqual(
      response.data,
    );
    expect(mockPost).toHaveBeenCalledWith(
      "/agreements/agreement%201/resend-invite",
    );
  });
});
