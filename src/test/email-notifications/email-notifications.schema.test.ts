import { describe, expect, it } from "vitest";

import { emailLogFilterSchema } from "@/lib/email-notifications/schemas";
import { previewEmailSchema, sendTestNotificationSchema } from "@/lib/email-notifications/schemas";

describe("email notification schemas", () => {
  describe("emailLogFilterSchema", () => {
    it("accepts valid filter params", () => {
      const result = emailLogFilterSchema.safeParse({
        status: "FAILED",
        page: 2,
        limit: 10,
      });

      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        status: "FAILED",
        page: 2,
        limit: 10,
      });
    });

    it("rejects invalid notification status", () => {
      const result = emailLogFilterSchema.safeParse({
        status: "INVALID_STATUS",
      });

      expect(result.success).toBe(false);
    });

    it("rejects invalid notification type", () => {
      const result = emailLogFilterSchema.safeParse({
        type: "INVALID_TYPE",
      });

      expect(result.success).toBe(false);
    });

    it("rejects invalid recipient email", () => {
      const result = emailLogFilterSchema.safeParse({
        recipientEmail: "not-an-email",
      });

      expect(result.success).toBe(false);
    });

    it("rejects invalid from date format", () => {
      const result = emailLogFilterSchema.safeParse({
        from: "yesterday",
      });

      expect(result.success).toBe(false);
    });

    it("rejects invalid to date format", () => {
      const result = emailLogFilterSchema.safeParse({
        to: "not-a-date",
      });

      expect(result.success).toBe(false);
    });

    it("rejects invalid agreementId format", () => {
      const result = emailLogFilterSchema.safeParse({
        agreementId: "not-a-uuid",
      });

      expect(result.success).toBe(false);
    });

    it("rejects page less than 1", () => {
      const result = emailLogFilterSchema.safeParse({
        page: 0,
      });

      expect(result.success).toBe(false);
    });

    it("rejects limit greater than 100", () => {
      const result = emailLogFilterSchema.safeParse({
        limit: 101,
      });

      expect(result.success).toBe(false);
    });

    it("provides default page and limit when omitted", () => {
      const result = emailLogFilterSchema.safeParse({});

      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        page: 1,
        limit: 20,
      });
    });
  });

  describe("previewEmailSchema", () => {
    it("accepts valid preview payload", () => {
      const result = previewEmailSchema.safeParse({
        type: "AGREEMENT_INVITE",
        agreementId: "550e8400-e29b-41d4-a716-446655440000",
        locale: "ar",
      });

      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        type: "AGREEMENT_INVITE",
        agreementId: "550e8400-e29b-41d4-a716-446655440000",
        locale: "ar",
      });
    });

    it("rejects invalid notification type", () => {
      const result = previewEmailSchema.safeParse({
        type: "INVALID",
        agreementId: "550e8400-e29b-41d4-a716-446655440000",
      });

      expect(result.success).toBe(false);
    });

    it("rejects invalid agreementId format", () => {
      const result = previewEmailSchema.safeParse({
        type: "AGREEMENT_INVITE",
        agreementId: "not-a-uuid",
      });

      expect(result.success).toBe(false);
    });

    it("requires agreementId", () => {
      const result = previewEmailSchema.safeParse({
        type: "AGREEMENT_INVITE",
      });

      expect(result.success).toBe(false);
    });

    it("accepts optional metadata", () => {
      const result = previewEmailSchema.safeParse({
        type: "AGREEMENT_INVITE",
        agreementId: "550e8400-e29b-41d4-a716-446655440000",
        metadata: { milestoneId: "m-1" },
      });

      expect(result.success).toBe(true);
      if (!result.success) {
        throw new Error("Expected preview email payload to be valid");
      }

      expect(result.data.metadata).toEqual({ milestoneId: "m-1" });
    });

    it("rejects invalid locale value", () => {
      const result = previewEmailSchema.safeParse({
        type: "AGREEMENT_INVITE",
        agreementId: "550e8400-e29b-41d4-a716-446655440000",
        locale: "fr",
      });

      expect(result.success).toBe(false);
    });
  });

  describe("sendTestNotificationSchema", () => {
    it("accepts valid test notification payload", () => {
      const result = sendTestNotificationSchema.safeParse({
        type: "SYSTEM_TEST",
        recipientEmail: "test@example.com",
        locale: "en",
      });

      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        type: "SYSTEM_TEST",
        recipientEmail: "test@example.com",
        locale: "en",
      });
    });

    it("rejects missing recipient email", () => {
      const result = sendTestNotificationSchema.safeParse({
        type: "SYSTEM_TEST",
      });

      expect(result.success).toBe(false);
    });

    it("rejects invalid recipient email", () => {
      const result = sendTestNotificationSchema.safeParse({
        type: "SYSTEM_TEST",
        recipientEmail: "not-an-email",
      });

      expect(result.success).toBe(false);
    });

    it("accepts optional agreementId", () => {
      const result = sendTestNotificationSchema.safeParse({
        type: "SYSTEM_TEST",
        recipientEmail: "test@example.com",
        agreementId: "550e8400-e29b-41d4-a716-446655440000",
      });

      expect(result.success).toBe(true);
    });

    it("rejects invalid agreementId format", () => {
      const result = sendTestNotificationSchema.safeParse({
        type: "SYSTEM_TEST",
        recipientEmail: "test@example.com",
        agreementId: "bad-uuid",
      });

      expect(result.success).toBe(false);
    });
  });
});
