// AR: اختبارات دوال API للاتفاقيات — تتحقق من المسارات وطرق HTTP والنتائج المتوقعة للعقود الجديدة.
// EN: Agreements API tests — verify paths, HTTP methods, and expected results for the new contracts.
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  activateAgreement,
  archiveAgreement,
  createAgreement,
  getAgreementById,
  getAgreements,
  sendInvite,
  updateAgreement,
} from "@/lib/agreements/actions";

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

vi.mock("@/lib/api-paths", () => ({
  API_PATHS: {
    AGREEMENTS: {
      LIST: "/agreements",
      CREATE: "/agreements",
      DETAILS: (agreementId: string) =>
        `/agreements/${encodeURIComponent(agreementId)}`,
      UPDATE: (agreementId: string) =>
        `/agreements/${encodeURIComponent(agreementId)}`,
      SEND_INVITE: (agreementId: string) =>
        `/agreements/${encodeURIComponent(agreementId)}/send-invite`,
      ACTIVATE: (agreementId: string) =>
        `/agreements/${encodeURIComponent(agreementId)}/activate`,
      ARCHIVE: (agreementId: string) =>
        `/agreements/${encodeURIComponent(agreementId)}/archive`,
    },
  },
}));

describe("agreements API functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getAgreements sends a GET request with query params", async () => {
    const params = { search: "landing", status: "DRAFT" as const, page: 2 };
    const response = {
      data: {
        data: [],
        total: 0,
        page: 2,
        limit: 20,
        totalPages: 0,
      },
    };

    mockGet.mockResolvedValueOnce(response);

    await expect(getAgreements(params)).resolves.toEqual(response.data);
    expect(mockGet).toHaveBeenCalledWith("/agreements", { params });
  });

  it("getAgreementById sends a GET request to the detail path", async () => {
    const response = { data: { id: "agr-1", title: "Agreement" } };

    mockGet.mockResolvedValueOnce(response);

    await expect(getAgreementById("agr-1")).resolves.toEqual(response.data);
    expect(mockGet).toHaveBeenCalledWith("/agreements/agr-1");
  });

  it("createAgreement sends a POST request with the payload", async () => {
    const payload = { title: "Landing page" };
    const response = { data: { id: "agr-1", title: "Landing page" } };

    mockPost.mockResolvedValueOnce(response);

    await expect(createAgreement(payload)).resolves.toEqual(response.data);
    expect(mockPost).toHaveBeenCalledWith("/agreements", payload);
  });

  it("updateAgreement sends a PATCH request to the detail path", async () => {
    const payload = { title: "Updated title" };
    const response = { data: { id: "agr-1", title: "Updated title" } };

    mockPatch.mockResolvedValueOnce(response);

    await expect(updateAgreement("agr-1", payload)).resolves.toEqual(
      response.data,
    );
    expect(mockPatch).toHaveBeenCalledWith("/agreements/agr-1", payload);
  });

  it("sendInvite posts to the send-invite path", async () => {
    const response = { data: { id: "agr-1", status: "SENT" } };

    mockPost.mockResolvedValueOnce(response);

    await expect(sendInvite("agr-1")).resolves.toEqual(response.data);
    expect(mockPost).toHaveBeenCalledWith("/agreements/agr-1/send-invite");
  });

  it("activateAgreement posts to the activate path", async () => {
    const response = { data: { id: "agr-1", status: "ACTIVE" } };

    mockPost.mockResolvedValueOnce(response);

    await expect(activateAgreement("agr-1")).resolves.toEqual(response.data);
    expect(mockPost).toHaveBeenCalledWith("/agreements/agr-1/activate");
  });

  it("archiveAgreement posts to the archive path", async () => {
    const response = { data: { id: "agr-1", status: "CANCELLED" } };

    mockPost.mockResolvedValueOnce(response);

    await expect(archiveAgreement("agr-1")).resolves.toEqual(response.data);
    expect(mockPost).toHaveBeenCalledWith("/agreements/agr-1/archive");
  });
});
