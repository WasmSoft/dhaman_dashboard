import { describe, expect, it, vi } from "vitest";

import {
  acceptDeliveryMutationOptions,
  approveAgreementMutationOptions,
  fundPaymentMutationOptions,
  portalQueryKeys,
  releasePaymentMutationOptions,
  rejectAgreementMutationOptions,
  requestAgreementChangesMutationOptions,
  requestDeliveryChangesMutationOptions,
} from "@/lib/client-portal/actions";

function createQueryClientMock() {
  return {
    invalidateQueries: vi.fn().mockResolvedValue(undefined),
  };
}

describe("client-portal.mutations", () => {
  it("invalidates invite and workspace after approve", async () => {
    const queryClient = createQueryClientMock();
    const options = approveAgreementMutationOptions(queryClient as never, "tok-1");

    await options.onSuccess();

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: portalQueryKeys.invite("tok-1") });
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: portalQueryKeys.workspace("tok-1") });
  });

  it("invalidates invite and workspace after request changes", async () => {
    const queryClient = createQueryClientMock();
    const options = requestAgreementChangesMutationOptions(queryClient as never, "tok-1");

    await options.onSuccess();

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: portalQueryKeys.invite("tok-1") });
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: portalQueryKeys.workspace("tok-1") });
  });

  it("invalidates invite and workspace after reject", async () => {
    const queryClient = createQueryClientMock();
    const options = rejectAgreementMutationOptions(queryClient as never, "tok-1");

    await options.onSuccess();

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: portalQueryKeys.invite("tok-1") });
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: portalQueryKeys.workspace("tok-1") });
  });

  it("invalidates delivery and workspace after accept delivery", async () => {
    const queryClient = createQueryClientMock();
    const options = acceptDeliveryMutationOptions(
      queryClient as never,
      "tok-1",
      "del-1",
    );

    await options.onSuccess();

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: portalQueryKeys.delivery("tok-1", "del-1") });
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: portalQueryKeys.workspace("tok-1") });
  });

  it("invalidates delivery and workspace after requesting delivery changes", async () => {
    const queryClient = createQueryClientMock();
    const options = requestDeliveryChangesMutationOptions(
      queryClient as never,
      "tok-1",
      "del-1",
    );

    await options.onSuccess();

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: portalQueryKeys.delivery("tok-1", "del-1") });
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: portalQueryKeys.workspace("tok-1") });
  });

  it("invalidates payments, payment history, and workspace after funding", async () => {
    const queryClient = createQueryClientMock();
    const options = fundPaymentMutationOptions(queryClient as never, "tok-1");

    await options.onSuccess();

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: portalQueryKeys.payments("tok-1") });
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: portalQueryKeys.paymentHistory("tok-1") });
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: portalQueryKeys.workspace("tok-1") });
  });

  it("invalidates payments, payment history, and workspace after releasing", async () => {
    const queryClient = createQueryClientMock();
    const options = releasePaymentMutationOptions(queryClient as never, "tok-1");

    await options.onSuccess();

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: portalQueryKeys.payments("tok-1") });
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: portalQueryKeys.paymentHistory("tok-1") });
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: portalQueryKeys.workspace("tok-1") });
  });
});
