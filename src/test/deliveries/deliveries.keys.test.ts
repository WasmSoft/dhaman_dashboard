import { describe, expect, it } from "vitest";

import { deliveriesQueryKeys } from "@/lib/deliveries/actions";

describe("deliveries.keys", () => {
  it("builds stable list keys with filter params", () => {
    expect(
      deliveriesQueryKeys.list({ status: "DRAFT", page: 1, limit: 20 }),
    ).toEqual(["deliveries", "list", { status: "DRAFT", page: 1, limit: 20 }]);
  });

  it("builds stable portal detail keys", () => {
    expect(deliveriesQueryKeys.portalDetail("tok-1", "del-1")).toEqual([
      "deliveries",
      "portal-detail",
      "tok-1",
      "del-1",
    ]);
  });
});
