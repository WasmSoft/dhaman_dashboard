// AR: اختبارات دوال API للمراحل — تتحقق من المسارات وطرق HTTP والـ payloads المتوقعة.
// EN: Milestones API tests — verify paths, HTTP methods, and expected payloads.
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  createMilestone,
  deleteMilestone,
  getAgreementMilestones,
  getMilestoneById,
  reorderMilestones,
  updateMilestone,
} from "@/lib/milestones/actions";

const mockGet = vi.fn();
const mockPost = vi.fn();
const mockPatch = vi.fn();
const mockDelete = vi.fn();

vi.mock("@/lib/axios-instance", () => ({
  axiosInstance: {
    get: (...args: unknown[]) => mockGet(...args),
    post: (...args: unknown[]) => mockPost(...args),
    patch: (...args: unknown[]) => mockPatch(...args),
    delete: (...args: unknown[]) => mockDelete(...args),
  },
}));

vi.mock("@/lib/api-paths", () => ({
  API_PATHS: {
    MILESTONES: {
      LIST: (agreementId: string) =>
        `/agreements/${encodeURIComponent(agreementId)}/milestones`,
      CREATE: (agreementId: string) =>
        `/agreements/${encodeURIComponent(agreementId)}/milestones`,
      DETAILS: (milestoneId: string) =>
        `/milestones/${encodeURIComponent(milestoneId)}`,
      UPDATE: (milestoneId: string) =>
        `/milestones/${encodeURIComponent(milestoneId)}`,
      DELETE: (milestoneId: string) =>
        `/milestones/${encodeURIComponent(milestoneId)}`,
      REORDER: (milestoneId: string) =>
        `/milestones/${encodeURIComponent(milestoneId)}/reorder`,
    },
  },
}));

describe("milestones API functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getAgreementMilestones calls GET with the agreement milestones path", async () => {
    mockGet.mockResolvedValueOnce({ data: { data: { milestones: [] } } });

    await getAgreementMilestones("agr-1");

    expect(mockGet).toHaveBeenCalledWith("/agreements/agr-1/milestones");
  });

  it("getMilestoneById calls GET with the milestone detail path", async () => {
    mockGet.mockResolvedValueOnce({ data: { data: { id: "mil-1" } } });

    await getMilestoneById("mil-1");

    expect(mockGet).toHaveBeenCalledWith("/milestones/mil-1");
  });

  it("createMilestone calls POST with the agreement path and payload", async () => {
    mockPost.mockResolvedValueOnce({ data: { data: { id: "mil-1" } } });

    const payload = {
      title: "Phase 1",
      amount: "150.00",
      orderIndex: 1,
      acceptanceCriteria: [{ description: "Wireframe delivered", required: true }],
    };

    await createMilestone("agr-1", payload);

    expect(mockPost).toHaveBeenCalledWith(
      "/agreements/agr-1/milestones",
      payload,
    );
  });

  it("updateMilestone calls PATCH with the milestone path and payload", async () => {
    mockPatch.mockResolvedValueOnce({ data: { data: { id: "mil-1" } } });

    await updateMilestone("mil-1", { title: "Updated title" });

    expect(mockPatch).toHaveBeenCalledWith("/milestones/mil-1", {
      title: "Updated title",
    });
  });

  it("deleteMilestone calls DELETE with the milestone path", async () => {
    mockDelete.mockResolvedValueOnce({ data: { success: true } });

    await deleteMilestone("mil-1");

    expect(mockDelete).toHaveBeenCalledWith("/milestones/mil-1");
  });

  it("reorderMilestones calls PATCH with the reorder path and payload", async () => {
    mockPatch.mockResolvedValueOnce({ data: { data: [] } });

    const payload = {
      milestones: [
        { milestoneId: "mil-2", orderIndex: 1 },
        { milestoneId: "mil-1", orderIndex: 2 },
      ],
    };

    await reorderMilestones("mil-1", payload);

    expect(mockPatch).toHaveBeenCalledWith(
      "/milestones/mil-1/reorder",
      payload,
    );
  });
});
