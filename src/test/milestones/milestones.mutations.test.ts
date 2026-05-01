import { beforeEach, describe, expect, it, vi } from "vitest";

import { milestonesQueryKeys } from "@/lib/milestones/actions";
import type {
  MutationFunctionContext,
  QueryClient,
} from "@tanstack/react-query";

describe("milestone mutation options", () => {
  let mockQueryClient: QueryClient;
  const mutationContext = {} as MutationFunctionContext;

  beforeEach(() => {
    mockQueryClient = {
      invalidateQueries: vi.fn().mockResolvedValue(undefined),
      removeQueries: vi.fn(),
    } as unknown as QueryClient;
  });

  it("createMilestoneMutationOptions invalidates agreement milestone state", async () => {
    const { createMilestoneMutationOptions } = await import(
      "@/lib/milestones/actions"
    );

    const options = createMilestoneMutationOptions(mockQueryClient, "agr-1");

    await options.onSuccess?.(
      { data: { agreementId: "agr-1" } } as never,
      {
        title: "Phase 1",
        amount: "150.00",
        orderIndex: 1,
        acceptanceCriteria: [{ description: "Wireframe delivered" }],
      },
      undefined,
      mutationContext,
    );

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: milestonesQueryKeys.list("agr-1"),
    });
  });

  it("updateMilestoneMutationOptions invalidates the milestone detail key", async () => {
    const { updateMilestoneMutationOptions } = await import(
      "@/lib/milestones/actions"
    );

    const options = updateMilestoneMutationOptions(mockQueryClient);

    await options.onSuccess?.(
      { data: { agreementId: "agr-1" } } as never,
      {
        milestoneId: "mil-1",
        payload: { title: "Updated" },
      },
      undefined,
      mutationContext,
    );

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: milestonesQueryKeys.detail("mil-1"),
    });
  });

  it("deleteMilestoneMutationOptions removes the stale detail cache", async () => {
    const { deleteMilestoneMutationOptions } = await import(
      "@/lib/milestones/actions"
    );

    const options = deleteMilestoneMutationOptions(mockQueryClient);

    await options.onSuccess?.(
      { success: true },
      {
        milestoneId: "mil-1",
        agreementId: "agr-1",
      },
      undefined,
      mutationContext,
    );

    expect(mockQueryClient.removeQueries).toHaveBeenCalledWith({
      queryKey: milestonesQueryKeys.detail("mil-1"),
    });
  });
});
