import { describe, expect, it } from "vitest";

import { formatAmountValue, formatClientDate, getClientErrorMessage, getClientInitials, getOptionalClientValue, isClientConflictError } from "@/lib/clients";

describe("clients display helpers", () => {
  it("formats names and optional values", () => {
    expect(getClientInitials({ name: "شركة التقنية" })).toBe("شا");
    expect(getOptionalClientValue(null)).toBe("-");
    expect(formatAmountValue(1000)).toBe("1000");
  });

  it("formats dates and errors safely", () => {
    expect(formatClientDate("2026-05-01T10:00:00.000Z")).toContain("2026");
    expect(isClientConflictError({ message: "dup", statusCode: 409, code: "CLIENT_EMAIL_ALREADY_EXISTS" })).toBe(true);
    expect(getClientErrorMessage({ message: "oops", statusCode: 401, code: "UNAUTHORIZED" })).toContain("سجّل الدخول");
  });
});
