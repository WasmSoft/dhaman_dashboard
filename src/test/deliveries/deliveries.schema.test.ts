import { describe, it, expect } from "vitest";

import {
  createDeliverySchema,
  updateDeliverySchema,
  submitDeliverySchema,
  deliveryFilterSchema,
} from "@/lib/deliveries/schemas/delivery.schema";

describe("createDeliverySchema", () => {
  it("validates valid creation payload", () => {
    const result = createDeliverySchema.safeParse({
      summary: "This is a valid summary",
      deliveryUrl: "https://example.com/work",
    });
    expect(result.success).toBe(true);
  });

  it("rejects summary shorter than 10 chars", () => {
    const result = createDeliverySchema.safeParse({
      summary: "short",
    });
    expect(result.success).toBe(false);
  });

  it("rejects summary longer than 2000 chars", () => {
    const result = createDeliverySchema.safeParse({
      summary: "x".repeat(2001),
      deliveryUrl: "https://example.com",
    });
    expect(result.success).toBe(false);
  });

  it("rejects payload without any evidence", () => {
    const result = createDeliverySchema.safeParse({
      summary: "Valid summary text",
    });
    expect(result.success).toBe(false);
  });

  it("accepts fileUrl as evidence", () => {
    const result = createDeliverySchema.safeParse({
      summary: "Valid summary text here",
      fileUrl: "https://example.com/file.zip",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid URL format", () => {
    const result = createDeliverySchema.safeParse({
      summary: "Valid summary text here",
      deliveryUrl: "not-a-url",
    });
    expect(result.success).toBe(false);
  });

  it("accepts empty string URLs as optional", () => {
    const result = createDeliverySchema.safeParse({
      summary: "Valid summary text here",
      deliveryUrl: "",
      fileUrl: "https://example.com/file.zip",
    });
    expect(result.success).toBe(true);
  });

  it("accepts notes and file metadata", () => {
    const result = createDeliverySchema.safeParse({
      summary: "Valid summary text here",
      deliveryUrl: "https://example.com/work",
      notes: "Some review notes",
      fileName: "file.zip",
      fileType: "application/zip",
    });
    expect(result.success).toBe(true);
  });
});

describe("updateDeliverySchema", () => {
  it("validates partial update", () => {
    const result = updateDeliverySchema.safeParse({
      summary: "Updated summary text",
    });
    expect(result.success).toBe(true);
  });

  it("rejects summary shorter than 10 chars", () => {
    const result = updateDeliverySchema.safeParse({
      summary: "short",
    });
    expect(result.success).toBe(false);
  });

  it("accepts empty partial payload", () => {
    const result = updateDeliverySchema.safeParse({});
    expect(result.success).toBe(true);
  });
});

describe("submitDeliverySchema", () => {
  it("accepts empty payload", () => {
    const result = submitDeliverySchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it("accepts payload with noteToClient", () => {
    const result = submitDeliverySchema.safeParse({
      noteToClient: "Please review the delivery.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects noteToClient exceeding 2000 chars", () => {
    const result = submitDeliverySchema.safeParse({
      noteToClient: "x".repeat(2001),
    });
    expect(result.success).toBe(false);
  });
});

describe("deliveryFilterSchema", () => {
  it("applies default page and limit", () => {
    const result = deliveryFilterSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(1);
      expect(result.data.limit).toBe(10);
    }
  });

  it("coerces page string to number", () => {
    const result = deliveryFilterSchema.safeParse({ page: "3" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(3);
    }
  });

  it("accepts valid status filter", () => {
    const result = deliveryFilterSchema.safeParse({ status: "DRAFT" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid status value", () => {
    const result = deliveryFilterSchema.safeParse({ status: "INVALID" });
    expect(result.success).toBe(false);
  });
});