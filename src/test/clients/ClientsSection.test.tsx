import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/hooks/clients", () => ({
  useClientListState: () => ({
    search: "",
    page: 1,
    limit: 20,
    params: { page: 1, limit: 20 },
    setSearch: vi.fn(),
    setPage: vi.fn(),
  }),
  useClientsQuery: () => ({
    data: { data: [], total: 0, page: 1, limit: 20, totalPages: 1 },
    isLoading: false,
    isError: false,
    error: null,
    refetch: vi.fn(),
  }),
}));

describe("ClientsSection", () => {
  it("shows the empty state when there are no clients", async () => {
    const { ClientsSection } = await import("@/components/clients");

    render(<ClientsSection />);

    expect(screen.getByText(/لا يوجد عملاء بعد/)).toBeInTheDocument();
  });
});
