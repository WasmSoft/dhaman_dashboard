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