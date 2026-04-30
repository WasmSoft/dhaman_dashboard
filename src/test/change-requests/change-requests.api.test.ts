// AR: اختبارات دوال الـ API الخاصة بطلبات التغيير — التأكد من المسارات وطرق HTTP.
// EN: Tests for change request API functions — verifying paths and HTTP methods.
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getChangeRequests,
  createChangeRequest,
  getChangeRequestById,
  updateChangeRequest,
  sendChangeRequest,
  approveChangeRequestFromPortal,
  declineChangeRequestFromPortal,
  fundChangeRequestFromPortal,
} from "@/lib/change-requests/actions";

const mockGet = vi.fn();
const mockPost = vi.fn();
const mockPatch = vi.fn();

vi.mock("@/lib/axios-instance", () => ({
  axiosInstance: {
    get: (...args: unknown[]) => mockGet(...args),
    post: (...args: unknown[]) => mockPost(...args),
    patch: (...args: unknown[]) => mockPatch(...args),
  },
}));

// Mock API_PATHS for stable path assertions
vi.mock("@/lib/api-paths", () => ({
  API_PATHS: {
    CHANGE_REQUESTS: {
      LIST: (agreementId: string) =>
        `/agreements/${encodeURIComponent(agreementId)}/change-requests`,
      CREATE: (agreementId: string) =>
        `/agreements/${encodeURIComponent(agreementId)}/change-requests`,
      DETAILS: (id: string) => `/change-requests/${encodeURIComponent(id)}`,
      UPDATE: (id: string) => `/change-requests/${encodeURIComponent(id)}`,
      SEND: (id: string) => `/change-requests/${encodeURIComponent(id)}/send`,
      PORTAL_APPROVE: (token: string, id: string) =>
        `/portal/${encodeURIComponent(token)}/change-requests/${encodeURIComponent(id)}/approve`,
      PORTAL_DECLINE: (token: string, id: string) =>
        `/portal/${encodeURIComponent(token)}/change-requests/${encodeURIComponent(id)}/decline`,
      PORTAL_FUND: (token: string, id: string) =>
        `/portal/${encodeURIComponent(token)}/change-requests/${encodeURIComponent(id)}/fund`,
    },
  },
}));

describe("change-requests API functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getChangeRequests", () => {
    it("calls GET with correct path and params", async () => {
      mockGet.mockResolvedValueOnce({ data: { data: [], total: 0 } });

      await getChangeRequests("agr-1", { status: "DRAFT" });

      expect(mockGet).toHaveBeenCalledWith(
        "/agreements/agr-1/change-requests",
        { params: { status: "DRAFT" } },
      );
    });

    it("returns response.data", async () => {
      const mockResponse = { data: [{ id: "1" }], total: 1 };
      mockGet.mockResolvedValueOnce({ data: mockResponse });

      const result = await getChangeRequests("agr-1");
      expect(result).toEqual(mockResponse);
    });
  });

  describe("createChangeRequest", () => {
    it("calls POST with correct path and payload", async () => {
      mockPost.mockResolvedValueOnce({ data: { id: "cr-1" } });
      const payload = {
        title: "Test",
        description: "Description text here.",
        amount: "100",
        currency: "USD",
        acceptanceCriteria: ["Done"],
      };

      await createChangeRequest("agr-1", payload);

      expect(mockPost).toHaveBeenCalledWith(
        "/agreements/agr-1/change-requests",
        payload,
      );
    });
  });

  describe("getChangeRequestById", () => {
    it("calls GET with correct detail path", async () => {
      mockGet.mockResolvedValueOnce({ data: { id: "cr-1" } });

      await getChangeRequestById("cr-1");

      expect(mockGet).toHaveBeenCalledWith("/change-requests/cr-1");
    });
  });

  describe("updateChangeRequest", () => {
    it("calls PATCH with correct path and payload", async () => {
      mockPatch.mockResolvedValueOnce({ data: { id: "cr-1" } });

      await updateChangeRequest("cr-1", { title: "Updated" });

      expect(mockPatch).toHaveBeenCalledWith("/change-requests/cr-1", {
        title: "Updated",
      });
    });
  });

  describe("sendChangeRequest", () => {
    it("calls POST with correct send path", async () => {
      mockPost.mockResolvedValueOnce({ data: { id: "cr-1" } });

      await sendChangeRequest("cr-1");

      expect(mockPost).toHaveBeenCalledWith("/change-requests/cr-1/send");
    });
  });

  describe("portal functions", () => {
    it("approveChangeRequestFromPortal calls POST with portal token in URL", async () => {
      mockPost.mockResolvedValueOnce({ data: { status: "APPROVED" } });

      await approveChangeRequestFromPortal("portal-tkn-1", "cr-1");

      expect(mockPost).toHaveBeenCalledWith(
        "/portal/portal-tkn-1/change-requests/cr-1/approve",
      );
    });

    it("declineChangeRequestFromPortal calls POST with payload and portal token", async () => {
      mockPost.mockResolvedValueOnce({ data: { status: "DECLINED" } });

      await declineChangeRequestFromPortal("portal-tkn-1", "cr-1", {
        reason: "Not needed anymore, thanks.",
      });

      expect(mockPost).toHaveBeenCalledWith(
        "/portal/portal-tkn-1/change-requests/cr-1/decline",
        { reason: "Not needed anymore, thanks." },
      );
    });

    it("fundChangeRequestFromPortal calls POST with fund payload and portal token", async () => {
      mockPost.mockResolvedValueOnce({ data: { status: "FUNDED" } });

      await fundChangeRequestFromPortal("portal-tkn-1", "cr-1", {
        amount: "500",
      });

      expect(mockPost).toHaveBeenCalledWith(
        "/portal/portal-tkn-1/change-requests/cr-1/fund",
        { amount: "500" },
      );
    });
  });
});
