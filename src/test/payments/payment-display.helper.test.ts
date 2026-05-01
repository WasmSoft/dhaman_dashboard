import { describe, it, expect } from "vitest";
import {
  getPaymentStatusLabel,
  formatPaymentAmount,
  formatReceiptNumber,
  isPaymentFundable,
  isPaymentReleasable,
  isPaymentReceiptAvailable,
} from "@/lib/payments/helpers/payment-display.helper";

describe("payment-display.helper", () => {
  it("returns correct English status label", () => {
    expect(getPaymentStatusLabel("WAITING", "en")).toBe("Waiting");
    expect(getPaymentStatusLabel("RESERVED", "en")).toBe("Reserved");
    expect(getPaymentStatusLabel("RELEASED", "en")).toBe("Released");
  });

  it("returns correct Arabic status label", () => {
    expect(getPaymentStatusLabel("WAITING", "ar")).toBe("في الانتظار");
    expect(getPaymentStatusLabel("RESERVED", "ar")).toBe("محجوزة");
    expect(getPaymentStatusLabel("RELEASED", "ar")).toBe("تم الإصدار");
  });

  it("preserves amount string exactly", () => {
    expect(formatPaymentAmount("100.00")).toBe("100.00");
    expect(formatPaymentAmount("9999999.9999999999")).toBe(
      "9999999.9999999999",
    );
  });

  it("formats receipt number — returns '--' for null", () => {
    expect(formatReceiptNumber(null)).toBe("--");
    expect(formatReceiptNumber("DHM-20260401-ABC123")).toBe(
      "DHM-20260401-ABC123",
    );
  });

  it("correctly identifies fundable status", () => {
    expect(isPaymentFundable("WAITING")).toBe(true);
    expect(isPaymentFundable("RESERVED")).toBe(false);
    expect(isPaymentFundable("RELEASED")).toBe(false);
  });

  it("correctly identifies releasable status", () => {
    expect(isPaymentReleasable("READY_TO_RELEASE")).toBe(true);
    expect(isPaymentReleasable("RESERVED")).toBe(false);
    expect(isPaymentReleasable("RELEASED")).toBe(false);
  });

  it("correctly identifies receipt-available status", () => {
    expect(isPaymentReceiptAvailable("WAITING")).toBe(false);
    expect(isPaymentReceiptAvailable("RESERVED")).toBe(true);
    expect(isPaymentReceiptAvailable("RELEASED")).toBe(true);
    expect(isPaymentReceiptAvailable("NOT_REQUIRED")).toBe(false);
  });
});
