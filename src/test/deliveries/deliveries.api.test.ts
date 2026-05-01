import { describe, it, expect, vi, beforeEach } from "vitest";

import { API_PATHS } from "@/lib/api-paths";
import type { Delivery, DeliveryListResponse } from "@/types";

import * as deliveriesApi from "@/lib/deliveries/actions/deliveries.api";

vi.mock("@/lib/axios-instance", () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

import { axiosInstance } from "@/lib/axios-instance";

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

const mockListResponse: DeliveryListResponse = {
  items: [mockDelivery],
  page: 1,
  limit: 10,
  total: 1,
  totalPages: 1,
};

describe("deliveries API actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getDeliveries", () => {
    it("calls GET /deliveries with filters", async () => {
      mockGet.mockResolvedValueOnce({ data: mockListResponse });
      const filters = { status: "DRAFT" as const, page: 1, limit: 10 };
      const result = await deliveriesApi.getDeliveries(filters);
      expect(mockGet).toHaveBeenCalledWith(API_PATHS.DELIVERIES.LIST, {
        params: filters,
      });
      expect(result).toEqual(mockListResponse);
    });

    it("calls GET /deliveries without filters", async () => {
      mockGet.mockResolvedValueOnce({ data: mockListResponse });
      const result = await deliveriesApi.getDeliveries();
      expect(mockGet).toHaveBeenCalledWith(API_PATHS.DELIVERIES.LIST, {
        params: undefined,
      });
      expect(result).toEqual(mockListResponse);
    });
  });

  describe("getDeliveryById", () => {
    it("calls GET /deliveries/:id with correct path", async () => {
      mockGet.mockResolvedValueOnce({ data: mockDelivery });
      const result = await deliveriesApi.getDeliveryById("delivery-001");
      expect(mockGet).toHaveBeenCalledWith(
        API_PATHS.DELIVERIES.DETAILS("delivery-001"),
      );
      expect(result).toEqual(mockDelivery);
    });
  });

  describe("createDelivery", () => {
    it("calls POST /milestones/:id/deliveries with payload", async () => {
      mockPost.mockResolvedValueOnce({ data: mockDelivery });
      const payload = { summary: "Test delivery", deliveryUrl: "https://example.com" };
      const result = await deliveriesApi.createDelivery("milestone-001", payload);
      expect(mockPost).toHaveBeenCalledWith(
        API_PATHS.DELIVERIES.CREATE_FOR_MILESTONE("milestone-001"),
        payload,
      );
      expect(result).toEqual(mockDelivery);
    });
  });

  describe("updateDelivery", () => {
    it("calls PATCH /deliveries/:id with payload", async () => {
      const updated = { ...mockDelivery, summary: "Updated" };
      mockPatch.mockResolvedValueOnce({ data: updated });
      const payload = { summary: "Updated" };
      const result = await deliveriesApi.updateDelivery("delivery-001", payload);
      expect(mockPatch).toHaveBeenCalledWith(
        API_PATHS.DELIVERIES.UPDATE("delivery-001"),
        payload,
      );
      expect(result).toEqual(updated);
    });
  });

  describe("submitDelivery", () => {
    it("calls POST /deliveries/:id/submit with payload", async () => {
      const submitted = { ...mockDelivery, status: "CLIENT_REVIEW" as const };
      mockPost.mockResolvedValueOnce({ data: submitted });
      const payload = { noteToClient: "Please review" };
      const result = await deliveriesApi.submitDelivery("delivery-001", payload);
      expect(mockPost).toHaveBeenCalledWith(
        API_PATHS.DELIVERIES.SUBMIT("delivery-001"),
        payload,
      );
      expect(result).toEqual(submitted);
    });

    it("calls POST /deliveries/:id/submit without payload", async () => {
      const submitted = { ...mockDelivery, status: "CLIENT_REVIEW" as const };
      mockPost.mockResolvedValueOnce({ data: submitted });
      const result = await deliveriesApi.submitDelivery("delivery-001");
      expect(mockPost).toHaveBeenCalledWith(
        API_PATHS.DELIVERIES.SUBMIT("delivery-001"),
        {},
      );
      expect(result).toEqual(submitted);
    });
  });
});