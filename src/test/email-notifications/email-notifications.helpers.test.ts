import { describe, expect, it } from "vitest";

import {
  formatEmailDate,
  getStatusLabel,
  getStatusTone,
  getTypeLabel,
  safeDisplayValue,
  truncateEmail,
} from "@/lib/email-notifications/helpers";

describe("email notification display helpers", () => {
  describe("getStatusLabel", () => {
    it("returns Arabic label for PENDING", () => {
      expect(getStatusLabel("PENDING", "ar")).toBe("قيد الانتظار");
    });

    it("returns English label for PENDING", () => {
      expect(getStatusLabel("PENDING", "en")).toBe("Pending");
    });

    it("returns Arabic label for SENT", () => {
      expect(getStatusLabel("SENT", "ar")).toBe("تم الإرسال");
    });

    it("returns English label for SENT", () => {
      expect(getStatusLabel("SENT", "en")).toBe("Sent");
    });

    it("returns Arabic label for FAILED", () => {
      expect(getStatusLabel("FAILED", "ar")).toBe("فشل");
    });

    it("returns English label for FAILED", () => {
      expect(getStatusLabel("FAILED", "en")).toBe("Failed");
    });

    it("defaults to Arabic when locale is not provided", () => {
      expect(getStatusLabel("FAILED")).toBe("فشل");
    });
  });

  describe("getTypeLabel", () => {
    it("returns Arabic label for AGREEMENT_INVITE", () => {
      expect(getTypeLabel("AGREEMENT_INVITE", "ar")).toBe("دعوة اتفاق");
    });

    it("returns English label for AGREEMENT_INVITE", () => {
      expect(getTypeLabel("AGREEMENT_INVITE", "en")).toBe("Agreement Invite");
    });

    it("returns Arabic label for SYSTEM_TEST", () => {
      expect(getTypeLabel("SYSTEM_TEST", "ar")).toBe("اختبار نظام");
    });

    it("returns English label for SYSTEM_TEST", () => {
      expect(getTypeLabel("SYSTEM_TEST", "en")).toBe("System Test");
    });

    it("defaults to Arabic when locale is not provided", () => {
      expect(getTypeLabel("PAYMENT_RELEASED")).toBe("دفعة مفرج عنها");
    });
  });

  describe("getStatusTone", () => {
    it("returns amber for PENDING", () => {
      expect(getStatusTone("PENDING")).toBe("amber");
    });

    it("returns success for SENT", () => {
      expect(getStatusTone("SENT")).toBe("success");
    });

    it("returns red for FAILED", () => {
      expect(getStatusTone("FAILED")).toBe("red");
    });
  });

  describe("safeDisplayValue", () => {
    it("returns the value when it is a non-empty string", () => {
      expect(safeDisplayValue("hello")).toBe("hello");
    });

    it("returns fallback when value is null", () => {
      expect(safeDisplayValue(null)).toBe("—");
    });

    it("returns fallback when value is undefined", () => {
      expect(safeDisplayValue(undefined)).toBe("—");
    });

    it("returns fallback when value is empty string", () => {
      expect(safeDisplayValue("")).toBe("—");
    });

    it("returns fallback when value is whitespace only", () => {
      expect(safeDisplayValue("   ")).toBe("—");
    });

    it("returns custom fallback when provided", () => {
      expect(safeDisplayValue(null, "N/A")).toBe("N/A");
    });
  });

  describe("formatEmailDate", () => {
    it("returns fallback for null input", () => {
      expect(formatEmailDate(null)).toBe("—");
    });

    it("returns fallback for undefined input", () => {
      expect(formatEmailDate(undefined)).toBe("—");
    });

    it("formats Arabic date correctly", () => {
      const date = "2026-04-15T14:30:00.000Z";
      const result = formatEmailDate(date, "ar");
      expect(result).toContain("٢٠٢٦");
    });

    it("formats English date correctly", () => {
      const date = "2026-04-15T14:30:00.000Z";
      const result = formatEmailDate(date, "en");
      expect(result).toContain("2026");
    });

    it("returns original string for invalid date input", () => {
      expect(formatEmailDate("not-a-date")).toBe("not-a-date");
    });
  });

  describe("truncateEmail", () => {
    it("returns short email unchanged", () => {
      expect(truncateEmail("a@b.com")).toBe("a@b.com");
    });

    it("truncates long email with default max length", () => {
      const longEmail = "very.long.email.address@example.com";
      const result = truncateEmail(longEmail);
      expect(result.length).toBeLessThanOrEqual(28);
      expect(result.endsWith("...")).toBe(true);
    });

    it("truncates long email with custom max length", () => {
      const result = truncateEmail("very.long.email.address@example.com", 10);
      expect(result.length).toBeLessThanOrEqual(10);
      expect(result.endsWith("...")).toBe(true);
    });
  });
});
