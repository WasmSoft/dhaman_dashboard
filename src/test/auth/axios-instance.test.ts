import { describe, expect, it } from "vitest";

import { normalizeApiBaseUrl } from "@/lib/axios-instance";

describe("normalizeApiBaseUrl", () => {
  it("appends /api/v1 when the env points to the backend root", () => {
    expect(normalizeApiBaseUrl("http://localhost:8080")).toBe(
      "http://localhost:8080/api/v1",
    );
  });

  it("keeps /api/v1 when it already exists", () => {
    expect(normalizeApiBaseUrl("https://backend.dhaman.wasmsoft.com/api/v1")).toBe(
      "https://backend.dhaman.wasmsoft.com/api/v1",
    );
  });

  it("removes a trailing slash before preserving /api/v1", () => {
    expect(normalizeApiBaseUrl("https://backend.dhaman.wasmsoft.com/api/v1/")).toBe(
      "https://backend.dhaman.wasmsoft.com/api/v1",
    );
  });
});
