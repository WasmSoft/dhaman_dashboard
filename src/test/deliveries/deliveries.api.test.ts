import { describe, expect, it, vi } from "vitest";
import { axiosInstance } from "@/lib/axios-instance";

vi.mock("@/lib/axios-instance", () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

describe("deliveries.api", () => {
  it("calls getDeliveries with the supported server filters", async () => {
    const mockGet = vi.mocked(axiosInstance.get);
    mockGet.mockResolvedValueOnce({
      data: {
        data: {
          deliveries: [],
          page: 1,
          limit: 20,
          total: 0,
        },
      },
    });

    const { getDeliveries } = await import("@/lib/deliveries/actions/deliveries.api");
    await getDeliveries({ milestoneId: "mil-1", status: "DRAFT", page: 1, limit: 20 });

    expect(mockGet).toHaveBeenCalledWith(
      expect.stringContaining("/deliveries"),
      expect.objectContaining({
        params: expect.objectContaining({ milestoneId: "mil-1", status: "DRAFT" }),
      }),
    );
  });

  it("posts createDelivery to the milestone-scoped endpoint", async () => {
    const mockPost = vi.mocked(axiosInstance.post);
    mockPost.mockResolvedValueOnce({
      data: {
        data: {
          id: "del-1",
          agreementId: "agr-1",
          milestoneId: "mil-1",
        },
      },
    });

    const { createDelivery } = await import("@/lib/deliveries/actions/deliveries.api");
    await createDelivery("mil-1", {
      summary: "Valid delivery summary text.",
    });

    expect(mockPost).toHaveBeenCalledWith(
      expect.stringContaining("/milestones/mil-1/deliveries"),
      expect.objectContaining({ summary: "Valid delivery summary text." }),
    );
  });

  it("posts submitDelivery to the delivery submit endpoint", async () => {
    const mockPost = vi.mocked(axiosInstance.post);
    mockPost.mockResolvedValueOnce({
      data: {
        data: {
          id: "del-1",
          status: "SUBMITTED",
        },
      },
    });

    const { submitDelivery } = await import("@/lib/deliveries/actions/deliveries.api");
    await submitDelivery("del-1", { noteToClient: "راجع القسم الأخير أولاً." });

    expect(mockPost).toHaveBeenCalledWith(
      expect.stringContaining("/deliveries/del-1/submit"),
      expect.objectContaining({ noteToClient: "راجع القسم الأخير أولاً." }),
    );
  });

  it("gets portal delivery details with token-scoped path", async () => {
    const mockGet = vi.mocked(axiosInstance.get);
    mockGet.mockResolvedValueOnce({
      data: {
        data: {
          id: "del-1",
          milestoneId: "mil-1",
          milestoneTitle: "Design phase",
          status: "SUBMITTED",
        },
      },
    });

    const { getPortalDeliveryById } = await import("@/lib/deliveries/actions/deliveries.api");
    await getPortalDeliveryById("tok-1", "del-1");

    expect(mockGet).toHaveBeenCalledWith(
      expect.stringContaining("/portal/tok-1/deliveries/del-1"),
    );
  });
});
