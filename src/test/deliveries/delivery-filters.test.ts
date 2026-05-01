import { describe, it, expect } from "vitest";

import { renderHook, act } from "@testing-library/react";

import { useDeliveryFilters } from "@/hooks/deliveries/use-delivery-filters";

describe("useDeliveryFilters", () => {
  it("initializes with default values", () => {
    const { result } = renderHook(() => useDeliveryFilters());
    expect(result.current.agreementId).toBe("");
    expect(result.current.milestoneId).toBe("");
    expect(result.current.status).toBe("");
    expect(result.current.page).toBe(1);
    expect(result.current.limit).toBe(10);
  });

  it("accepts default option values", () => {
    const { result } = renderHook(() =>
      useDeliveryFilters({ defaultAgreementId: "a1", defaultStatus: "DRAFT" as const }),
    );
    expect(result.current.agreementId).toBe("a1");
    expect(result.current.status).toBe("DRAFT");
  });

  it("updates agreementId", () => {
    const { result } = renderHook(() => useDeliveryFilters());
    act(() => {
      result.current.setAgreementId("agreement-123");
    });
    expect(result.current.agreementId).toBe("agreement-123");
  });

  it("updates milestoneId", () => {
    const { result } = renderHook(() => useDeliveryFilters());
    act(() => {
      result.current.setMilestoneId("milestone-456");
    });
    expect(result.current.milestoneId).toBe("milestone-456");
  });

  it("updates status", () => {
    const { result } = renderHook(() => useDeliveryFilters());
    act(() => {
      result.current.setStatus("CLIENT_REVIEW");
    });
    expect(result.current.status).toBe("CLIENT_REVIEW");
  });

  it("updates page", () => {
    const { result } = renderHook(() => useDeliveryFilters());
    act(() => {
      result.current.setPage(3);
    });
    expect(result.current.page).toBe(3);
  });

  it("builds filters object omitting empty values", () => {
    const { result } = renderHook(() => useDeliveryFilters());
    act(() => {
      result.current.setAgreementId("a1");
      result.current.setStatus("DRAFT");
    });
    expect(result.current.filters).toEqual({
      agreementId: "a1",
      milestoneId: undefined,
      status: "DRAFT",
      page: 1,
      limit: 10,
    });
  });

  it("resets all filters to defaults", () => {
    const { result } = renderHook(() => useDeliveryFilters());
    act(() => {
      result.current.setAgreementId("a1");
      result.current.setStatus("ACCEPTED");
      result.current.setPage(5);
    });
    act(() => {
      result.current.resetFilters();
    });
    expect(result.current.agreementId).toBe("");
    expect(result.current.milestoneId).toBe("");
    expect(result.current.status).toBe("");
    expect(result.current.page).toBe(1);
  });
});