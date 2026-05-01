import { afterEach, describe, expect, it, vi } from "vitest";

import { API_PATHS } from "@/lib/api-paths";
import { axiosInstance } from "@/lib/axios-instance";
import { createClient, getClientById, getClientSummary, getClients, updateClient } from "@/lib/clients";

vi.mock("@/lib/axios-instance", () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

describe("clients api", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.mocked(axiosInstance.get).mockReset();
    vi.mocked(axiosInstance.post).mockReset();
    vi.mocked(axiosInstance.patch).mockReset();
  });

  it("uses backend endpoints for list, detail, create, update, and summary", async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: { data: [], total: 0, page: 1, limit: 20, totalPages: 1 } });
    vi.mocked(axiosInstance.post).mockResolvedValue({ data: { id: "cl_1" } });
    vi.mocked(axiosInstance.patch).mockResolvedValue({ data: { id: "cl_1" } });

    await getClients({ search: "  مد  ", page: 2, limit: 10 });
    await getClientById("cl_1");
    await createClient({ name: "Client", email: "client@example.com" });
    await updateClient("cl_1", { name: "Updated" });
    await getClientSummary("cl_1");

    expect(axiosInstance.get).toHaveBeenNthCalledWith(1, API_PATHS.CLIENTS.LIST, {
      params: { search: "  مد  ", page: 2, limit: 10 },
    });
    expect(axiosInstance.get).toHaveBeenNthCalledWith(2, API_PATHS.CLIENTS.DETAILS("cl_1"));
    expect(axiosInstance.post).toHaveBeenCalledWith(API_PATHS.CLIENTS.CREATE, {
      name: "Client",
      email: "client@example.com",
    });
    expect(axiosInstance.patch).toHaveBeenCalledWith(API_PATHS.CLIENTS.UPDATE("cl_1"), {
      name: "Updated",
    });
    expect(axiosInstance.get).toHaveBeenNthCalledWith(3, API_PATHS.CLIENTS.SUMMARY("cl_1"));
  });
});
