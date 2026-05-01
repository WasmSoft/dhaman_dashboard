import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/hooks/clients", () => ({
  useClientListState: () => ({
    search: "",
    params: { page: 1, limit: 20 },
    setSearch: vi.fn(),
  }),
  useClientsQuery: () => ({
    data: { data: [], total: 0, page: 1, limit: 20, totalPages: 1 },
    isLoading: false,
    isError: false,
  }),
  useCreateClientMutation: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
}));

describe("ClientPicker", () => {
  it("renders the picker shell", async () => {
    const { ClientPicker } = await import("@/components/clients");

    render(<ClientPicker selectedClient={null} onSelectClient={vi.fn()} />);

    expect(screen.getByText(/بيانات العميل/)).toBeInTheDocument();
  });
});
