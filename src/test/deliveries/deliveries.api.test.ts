import { beforeEach, describe, expect, it, vi } from "vitest";

import { API_PATHS } from "@/lib/api-paths";
import { axiosInstance } from "@/lib/axios-instance";
import type { Delivery, DeliveryListResponse } from "@/types";

import * as deliveriesApi from "@/lib/deliveries/actions/deliveries.api";

vi.mock("@/lib/axios-instance", () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

const mockGet = vi.mocked(axiosInstance.get);
const mockPost = vi.mocked(axiosInstance.post);
const mockPatch = vi.mocked(axiosInstance.patch);

const mockDelivery: Delivery = {
  id: "delivery-001",
  agreementId: "agreement-001",
  milestoneId: "milestone-001",
  agreementTitle: "Landing Page",
  milestoneName: "Phase 1",
  summary: "Initial delivery",
  status: "DRAFT",
  createdAt: "2026-05-01T00:00:00.000Z",
  updatedAt: "2026-05-01T00:00:00.000Z",
};

const mockListResponse = {
  deliveries: [
    {
      id: "delivery-001",
      agreementId: "agreement-001",
      milestoneId: "milestone-001",
      submittedById: "user-1",
      summary: "Initial delivery",
      status: "DRAFT",
      deliveryUrl: "https://example.com/review",
      fileUrl: null,
      fileName: null,
      fileType: null,
      notes: null,
      submittedAt: null,
      acceptedAt: null,
      changesRequestedAt: null,
      clientFeedback: null,
      milestone: {
        id: "milestone-001",
        title: "Phase 1",
        status: "ACTIVE",
        paymentStatus: "RESERVED",
        deliveryStatus: "DRAFT",
        revisionLimit: 2,
      },
      payment: null,
      timeline: {
        agreementId: "agreement-001",
        milestoneId: "milestone-001",
      },
      createdAt: "2026-05-01T00:00:00.000Z",
      updatedAt: "2026-05-01T00:00:00.000Z",
    },
  ],
  page: 1,
  limit: 10,
  total: 1,
};

describe("deliveries API actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls GET /deliveries with filters", async () => {
    mockGet.mockResolvedValueOnce({ data: mockListResponse });
    const filters = { status: "DRAFT" as const, page: 1, limit: 10 };

    const result = await deliveriesApi.getDeliveries(filters);

    expect(mockGet).toHaveBeenCalledWith(API_PATHS.DELIVERIES.LIST, {
      params: filters,
    });
    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.milestone.title).toBe("Phase 1");
    expect(result.totalPages).toBe(1);
  });

  it("calls GET /deliveries/:id with correct path", async () => {
    mockGet.mockResolvedValueOnce({ data: mockDelivery });

    const result = await deliveriesApi.getDeliveryById("delivery-001");

    expect(mockGet).toHaveBeenCalledWith(
      API_PATHS.DELIVERIES.DETAILS("delivery-001"),
    );
    expect(result).toEqual(mockDelivery);
  });

  it("calls POST milestone delivery endpoint with payload", async () => {
    mockPost.mockResolvedValueOnce({ data: mockDelivery });
    const payload = { summary: "Test delivery", deliveryUrl: "https://example.com" };

    const result = await deliveriesApi.createDelivery("milestone-001", payload);

    expect(mockPost).toHaveBeenCalledWith(
      API_PATHS.DELIVERIES.CREATE_FOR_MILESTONE("milestone-001"),
      payload,
    );
    expect(result).toEqual(mockDelivery);
  });

  it("calls PATCH /deliveries/:id with payload", async () => {
    const updated = { ...mockDelivery, summary: "Updated" };
    mockPatch.mockResolvedValueOnce({ data: updated });

    const result = await deliveriesApi.updateDelivery("delivery-001", { summary: "Updated" });

    expect(mockPatch).toHaveBeenCalledWith(
      API_PATHS.DELIVERIES.UPDATE("delivery-001"),
      { summary: "Updated" },
    );
    expect(result).toEqual(updated);
  });

  it("calls POST /deliveries/:id/submit without payload fallback", async () => {
    const submitted = { ...mockDelivery, status: "CLIENT_REVIEW" as const };
    mockPost.mockResolvedValueOnce({ data: submitted });

    const result = await deliveriesApi.submitDelivery("delivery-001");

    expect(mockPost).toHaveBeenCalledWith(
      API_PATHS.DELIVERIES.SUBMIT("delivery-001"),
      {},
    );
    expect(result).toEqual(submitted);
  });

  it("calls token-scoped portal delivery details endpoint", async () => {
    mockGet.mockResolvedValueOnce({ data: { data: { id: "delivery-001" } } });

    await deliveriesApi.getPortalDeliveryById("tok-1", "delivery-001");

    expect(mockGet).toHaveBeenCalledWith(
      API_PATHS.PORTAL_DELIVERIES.DETAILS("tok-1", "delivery-001"),
    );
  });
});
