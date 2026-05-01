import { beforeEach, describe, expect, it, vi } from "vitest";

import { agreementsQueryKeys } from "@/lib/agreements/actions";
import type {
  MutationFunctionContext,
  QueryClient,
} from "@tanstack/react-query";

describe("agreement mutation options", () => {
  let mockQueryClient: QueryClient;
  const mutationContext = {} as MutationFunctionContext;

  beforeEach(() => {
    mockQueryClient = {
      invalidateQueries: vi.fn().mockResolvedValue(undefined),
      removeQueries: vi.fn(),
    } as unknown as QueryClient;
  });

  it("sendInviteMutationOptions invalidates list and detail keys", async () => {
    const { sendInviteMutationOptions } = await import(
      "@/lib/agreements/actions"
    );

    const options = sendInviteMutationOptions(mockQueryClient);

    await options.onSuccess?.(
      { id: "agr-1", status: "SENT" } as never,
      "agr-1",
      undefined,
      mutationContext,
    );

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: agreementsQueryKeys.lists(),
    });
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: agreementsQueryKeys.detail("agr-1"),
    });
  });

  it("activateAgreementMutationOptions invalidates list and detail keys", async () => {
    const { activateAgreementMutationOptions } = await import(
      "@/lib/agreements/actions"
    );

    const options = activateAgreementMutationOptions(mockQueryClient);

    await options.onSuccess?.(
      { id: "agr-1", status: "ACTIVE" } as never,
      "agr-1",
      undefined,
      mutationContext,
    );

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: agreementsQueryKeys.lists(),
    });
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: agreementsQueryKeys.detail("agr-1"),
    });
  });

  it("archiveAgreementMutationOptions invalidates list and detail keys", async () => {
    const { archiveAgreementMutationOptions } = await import(
      "@/lib/agreements/actions"
    );

    const options = archiveAgreementMutationOptions(mockQueryClient);

    await options.onSuccess?.(
      { id: "agr-1", status: "CANCELLED" } as never,
      "agr-1",
      undefined,
      mutationContext,
    );

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: agreementsQueryKeys.lists(),
    });
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: agreementsQueryKeys.detail("agr-1"),
    });
  });
});
