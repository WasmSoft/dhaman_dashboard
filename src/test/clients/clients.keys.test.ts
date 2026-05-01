import { describe, expect, it } from "vitest";

import { clientsQueryKeys } from "@/lib/clients";

describe("clients query keys", () => {
  it("includes search and pagination values in list keys", () => {
    expect(clientsQueryKeys.list({ search: "abc", page: 2, limit: 10 })).toEqual(["clients", "list", "abc", 2, 10]);
  });

  it("separates detail and summary keys", () => {
    expect(clientsQueryKeys.detail("cl_1")).toEqual(["clients", "detail", "cl_1"]);
    expect(clientsQueryKeys.summary("cl_1")).toEqual(["clients", "summary", "cl_1"]);
  });
});
