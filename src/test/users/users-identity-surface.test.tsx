import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { UserIdentityBadge } from "@/components/users";

describe("UserIdentityBadge", () => {
  it("renders the display name and fallback initial", () => {
    render(<UserIdentityBadge user={{ name: "Sara Ali", email: "sara@example.com" }} />);

    expect(screen.getByText("Sara Ali")).toBeInTheDocument();
    expect(screen.getByText("sara@example.com")).toBeInTheDocument();
  });

  it("falls back to the safe Arabic initial when the name is missing", () => {
    render(<UserIdentityBadge user={{ name: "", email: "" }} />);

    expect(screen.getByText("المستخدم")).toBeInTheDocument();
  });
});
