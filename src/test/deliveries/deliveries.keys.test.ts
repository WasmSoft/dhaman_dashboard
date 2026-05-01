<<<<<<< HEAD
import { describe, it, expect } from "vitest";

import { deliveriesQueryKeys } from "@/lib/deliveries/actions/deliveries.keys";

describe("deliveriesQueryKeys", () => {
  it("renders all key correctly", () => {
    expect(deliveriesQueryKeys.all).toEqual(["deliveries"]);
  });

  it("renders lists key correctly", () => {
    expect(deliveriesQueryKeys.lists()).toEqual(["deliveries", "list"]);
  });

  it("renders list key with filters", () => {
    const filters = { status: "DRAFT" as const, page: 1, limit: 10 };
    const key = deliveriesQueryKeys.list(filters);
    expect(key).toEqual(["deliveries", "list", filters]);
  });

  it("renders list key without filters", () => {
    const key = deliveriesQueryKeys.list();
    expect(key).toEqual(["deliveries", "list", {}]);
  });

  it("renders details key correctly", () => {
    expect(deliveriesQueryKeys.details()).toEqual(["deliveries", "detail"]);
  });

  it("renders detail key with ID", () => {
    expect(deliveriesQueryKeys.detail("abc-123")).toEqual([
      "deliveries",
      "detail",
      "abc-123",
    ]);
  });

  it("list key changes when filters change", () => {
    const key1 = deliveriesQueryKeys.list({ status: "DRAFT" });
    const key2 = deliveriesQueryKeys.list({ status: "ACCEPTED" });
    expect(key1).not.toEqual(key2);
  });

  it("detail key changes when ID changes", () => {
    const key1 = deliveriesQueryKeys.detail("id-1");
    const key2 = deliveriesQueryKeys.detail("id-2");
    expect(key1).not.toEqual(key2);
  });
});
=======
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
>>>>>>> 376aec6939d214e5014cc9fa065f5e9a54ce38a7
