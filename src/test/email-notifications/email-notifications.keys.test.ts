import { describe, expect, it } from "vitest";

import { emailNotificationsQueryKeys } from "@/lib/email-notifications/actions";

describe("email notification query keys", () => {
  it("builds stable keys for all logs", () => {
    expect(emailNotificationsQueryKeys.logs()).toEqual([
      "email-notifications",
      "logs",
    ]);
  });

  it("includes filters in the log list key", () => {
    const params = { status: "FAILED" as const, page: 1, limit: 20 };

    expect(emailNotificationsQueryKeys.logList(params)).toEqual([
      "email-notifications",
      "logs",
      params,
    ]);
  });
});
