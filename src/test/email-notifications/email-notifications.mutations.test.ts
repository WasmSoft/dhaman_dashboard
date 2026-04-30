import { beforeEach, describe, expect, it, vi } from "vitest";

import { emailNotificationsQueryKeys } from "@/lib/email-notifications/actions";
import type { EmailNotification, EmailNotificationResponse, SendTestNotificationPayload } from "@/types";
import type { QueryClient } from "@tanstack/react-query";

// AR: اختبارات طفرات سجلات البريد الإلكتروني (إعادة الإرسال، المعاينة، الإرسال التجريبي).
// EN: Email notification mutation tests (resend, preview, test send).
describe("email notification mutation options", () => {
  let mockQueryClient: QueryClient;

  beforeEach(() => {
    mockQueryClient = {
      invalidateQueries: vi.fn().mockResolvedValue(undefined),
    } as unknown as QueryClient;
  });

  describe("resendAgreementInviteMutationOptions", () => {
    it("invalidates email logs and agreement detail cache on success", async () => {
      const { resendAgreementInviteMutationOptions } = await import(
        "@/lib/email-notifications/actions"
      );

      const options = resendAgreementInviteMutationOptions(mockQueryClient);
      const agreementId = "agreement-1";

      const notificationResponse: EmailNotificationResponse = {
        data: { id: "email-1" } as EmailNotification,
      };

      await options.onSuccess?.(
        notificationResponse,
        agreementId,
        undefined,
      );

      expect(mockQueryClient.invalidateQueries).toHaveBeenCalledTimes(2);
    });

    it("sets mutationFn as resendAgreementInvite", async () => {
      const { resendAgreementInviteMutationOptions } = await import(
        "@/lib/email-notifications/actions"
      );

      const options = resendAgreementInviteMutationOptions(mockQueryClient);

      expect(options.mutationFn).toBeDefined();
      expect(typeof options.mutationFn).toBe("function");
    });
  });

  describe("previewEmailNotificationMutationOptions", () => {
    it("sets mutationFn as previewEmailNotification without cache invalidation", async () => {
      const { previewEmailNotificationMutationOptions } = await import(
        "@/lib/email-notifications/actions"
      );

      const options = previewEmailNotificationMutationOptions();

      expect(options.mutationFn).toBeDefined();
      expect(typeof options.mutationFn).toBe("function");
      expect(options.onSuccess).toBeUndefined();
    });
  });

  describe("sendTestEmailNotificationMutationOptions", () => {
    it("invalidates email logs cache on success", async () => {
      const { sendTestEmailNotificationMutationOptions } = await import(
        "@/lib/email-notifications/actions"
      );

      const options = sendTestEmailNotificationMutationOptions(mockQueryClient);

      const testPayload: SendTestNotificationPayload = {
        type: "SYSTEM_TEST",
        recipientEmail: "test@example.com",
      };

      await options.onSuccess?.(
        { data: { id: "email-1" } } as EmailNotificationResponse,
        testPayload,
        undefined,
      );

      expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: emailNotificationsQueryKeys.logs(),
      });
    });

    it("sets mutationFn as sendTestEmailNotification", async () => {
      const { sendTestEmailNotificationMutationOptions } = await import(
        "@/lib/email-notifications/actions"
      );

      const options = sendTestEmailNotificationMutationOptions(mockQueryClient);

      expect(options.mutationFn).toBeDefined();
      expect(typeof options.mutationFn).toBe("function");
    });
  });
});
