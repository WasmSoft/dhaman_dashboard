import { describe, it, expect } from "vitest";

import type { DeliveryStatus } from "@/types";

import {
  getDeliveryStatusLabel,
  getDeliveryStatusTone,
  isDeliveryEditable,
  isDeliverySubmittable,
  isEvidenceRequired,
  getDeliveryErrorMessage,
} from "@/lib/deliveries/helpers/delivery-status.helper";

describe("getDeliveryStatusLabel", () => {
  it.each([
    ["DRAFT", "مسودة"],
    ["SUBMITTED", "تم الإرسال"],
    ["CLIENT_REVIEW", "تحت مراجعة العميل"],
    ["CHANGES_REQUESTED", "طلب تعديل"],
    ["ACCEPTED", "مقبولة"],
    ["DISPUTED", "نزاع"],
  ] as [DeliveryStatus, string][])(
    "returns Arabic label for %s",
    (status, label) => {
      expect(getDeliveryStatusLabel(status)).toBe(label);
    },
  );

  it("returns fallback label for unknown status", () => {
    expect(getDeliveryStatusLabel("UNKNOWN")).toBe("غير معروف");
  });
});

describe("getDeliveryStatusTone", () => {
  it("returns tone string for known statuses", () => {
    expect(getDeliveryStatusTone("DRAFT")).toContain("bg-");
  });

  it("returns fallback tone for unknown status", () => {
    const tone = getDeliveryStatusTone("UNKNOWN");
    expect(tone).toContain("bg-gray");
  });
});

describe("isDeliveryEditable", () => {
  it("returns true for DRAFT", () => {
    expect(isDeliveryEditable("DRAFT")).toBe(true);
  });

  it("returns true for CHANGES_REQUESTED", () => {
    expect(isDeliveryEditable("CHANGES_REQUESTED")).toBe(true);
  });

  it("returns false for SUBMITTED", () => {
    expect(isDeliveryEditable("SUBMITTED")).toBe(false);
  });

  it("returns false for CLIENT_REVIEW", () => {
    expect(isDeliveryEditable("CLIENT_REVIEW")).toBe(false);
  });

  it("returns false for ACCEPTED", () => {
    expect(isDeliveryEditable("ACCEPTED")).toBe(false);
  });

  it("returns false for DISPUTED", () => {
    expect(isDeliveryEditable("DISPUTED")).toBe(false);
  });
});

describe("isDeliverySubmittable", () => {
  it("returns true for DRAFT", () => {
    expect(isDeliverySubmittable("DRAFT")).toBe(true);
  });

  it("returns true for CHANGES_REQUESTED", () => {
    expect(isDeliverySubmittable("CHANGES_REQUESTED")).toBe(true);
  });

  it("returns false for ACCEPTED", () => {
    expect(isDeliverySubmittable("ACCEPTED")).toBe(false);
  });
});

describe("isEvidenceRequired", () => {
  it("returns true when deliveryUrl and fileUrl are both missing", () => {
    expect(isEvidenceRequired({ deliveryUrl: null, fileUrl: null })).toBe(true);
  });

  it("returns true when deliveryUrl and fileUrl are both undefined", () => {
    expect(isEvidenceRequired({})).toBe(true);
  });

  it("returns false when deliveryUrl is present", () => {
    expect(isEvidenceRequired({ deliveryUrl: "https://example.com" })).toBe(false);
  });

  it("returns false when fileUrl is present", () => {
    expect(isEvidenceRequired({ fileUrl: "https://example.com/file.zip" })).toBe(false);
  });
});

describe("getDeliveryErrorMessage", () => {
  it.each([
    ["DELIVERY_NOT_FOUND", "لم يتم العثور على التسليم."],
    ["DELIVERY_ALREADY_EXISTS", "يوجد تسليم مسودة لهذه المرحلة بالفعل."],
    ["DELIVERY_NOT_EDITABLE", "لا يمكن تعديل التسليم في حالته الحالية."],
    ["DELIVERY_NOT_SUBMITTABLE", "لا يمكن إرسال التسليم في حالته الحالية."],
    ["DELIVERY_EVIDENCE_REQUIRED", "يجب إرفاق رابط أو ملف كدليل قبل الإرسال."],
    ["MILESTONE_NOT_FOUND", "لم يتم العثور على المرحلة."],
    ["AGREEMENT_NOT_ACTIVE", "لا يمكن إنشاء تسليم لاتفاقية غير فعالة."],
    ["PAYMENT_NOT_RESERVED", "يجب حجز الدفعة قبل إرسال التسليم."],
    ["VALIDATION_ERROR", "بيانات الطلب غير صالحة."],
    ["UNAUTHORIZED", "يجب تسجيل الدخول أولاً."],
    ["FORBIDDEN", "ليس لديك صلاحية الوصول إلى هذا التسليم."],
  ] as [string, string][])(
    "returns Arabic error message for %s",
    (code, message) => {
      expect(getDeliveryErrorMessage(code)).toBe(message);
    },
  );

  it("returns fallback for unknown error code", () => {
    expect(getDeliveryErrorMessage("UNKNOWN_ERROR")).toContain("حدث خطأ");
  });
});