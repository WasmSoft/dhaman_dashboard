import { describe, expect, it } from "vitest";

import {
  buildPortalPath,
  buildPortalUrl,
  resolveClientPortalToken,
} from "@/lib/client-portal/helpers";

describe("portal-url.helper", () => {
  it("prefers portalToken over legacy inviteToken", () => {
    expect(
      resolveClientPortalToken({ portalToken: "portal-1", inviteToken: "invite-1" }),
    ).toBe("portal-1");
  });

  it("builds the required client portal email-link paths", () => {
    expect(buildPortalPath("tok 1")).toBe("/portal/tok%201");
    expect(buildPortalPath("tok-1", "deliveryPreview")).toBe(
      "/portal/tok-1/delivery-preview",
    );
    expect(buildPortalPath("tok-1", "tracking")).toBe(
      "/portal/tok-1/tracking",
    );
    expect(buildPortalPath("tok-1", "changeRequests")).toBe(
      "/portal/tok-1/change-requests",
    );
    expect(buildPortalPath("tok-1", "changeRequestPayment")).toBe(
      "/portal/tok-1/change-request-payment",
    );
    expect(buildPortalPath("tok-1", "paymentSetup")).toBe(
      "/portal/tok-1/payment-setup",
    );
    expect(buildPortalPath("tok-1", "paymentConfirmation")).toBe(
      "/portal/tok-1/payment-confirmation",
    );
    expect(buildPortalPath("tok-1", "paymentHistory")).toBe(
      "/portal/tok-1/payment-History",
    );
    expect(buildPortalPath("tok-1", "fundMilestone")).toBe(
      "/portal/tok-1/fund-milestone",
    );
    expect(buildPortalPath("tok-1", "releasePayment")).toBe(
      "/portal/tok-1/release-payment",
    );
  });

  it("builds full portal URLs without duplicating slashes", () => {
    expect(buildPortalUrl("tok-1", "tracking", "https://app.example.com/")).toBe(
      "https://app.example.com/portal/tok-1/tracking",
    );
  });
});
