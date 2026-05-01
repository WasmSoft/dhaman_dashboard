import { describe, expect, it } from "vitest";

import { clientFormSchema, clientListParamsSchema, createClientSchema, updateClientSchema } from "@/lib/clients";

describe("clients schemas", () => {
  it("normalizes list params", () => {
    expect(clientListParamsSchema.parse({ search: "  hello  ", page: "2", limit: "10" })).toEqual({
      search: "hello",
      page: 2,
      limit: 10,
    });
  });

  it("validates create form values", () => {
    expect(createClientSchema.safeParse({ name: "A", email: "a@example.com", phone: "", companyName: "" }).success).toBe(true);
    expect(clientFormSchema.safeParse({ name: "", email: "bad" }).success).toBe(false);
  });

  it("supports partial update values", () => {
    expect(updateClientSchema.safeParse({ name: "Updated", phone: null }).success).toBe(true);
  });
});
