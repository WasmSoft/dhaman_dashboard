import type {
  QueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

import type { AgreementMutationPayload } from "@/types";

import {
  createAgreement,
  deleteAgreement,
  updateAgreement,
} from "./agreements.api";
import { agreementsQueryKeys } from "./agreements.keys";

// AR: تبني هذه الدالة create mutation options مع invalidation موحد لقائمة الاتفاقيات.
// EN: This function builds create-agreement mutation options with unified invalidation for agreement lists.
export function createAgreementMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  Awaited<ReturnType<typeof createAgreement>>,
  Error,
  AgreementMutationPayload
> {
  return {
    mutationFn: (payload: AgreementMutationPayload) => createAgreement(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: agreementsQueryKeys.lists(),
      });
    },
  };
}

// AR: تبني هذه الدالة update mutation options وتحدث list/detail keys المناسبة بعد النجاح.
// EN: This function builds update-agreement mutation options and refreshes the relevant list and detail keys after success.
export function updateAgreementMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  Awaited<ReturnType<typeof updateAgreement>>,
  Error,
  {
    agreementId: string;
    payload: AgreementMutationPayload;
  }
> {
  return {
    mutationFn: ({
      agreementId,
      payload,
    }: {
      agreementId: string;
      payload: AgreementMutationPayload;
    }) => updateAgreement(agreementId, payload),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: agreementsQueryKeys.lists(),
        }),
        queryClient.invalidateQueries({
          queryKey: agreementsQueryKeys.detail(variables.agreementId),
        }),
      ]);
    },
  };
}

// AR: تبني هذه الدالة delete mutation options مع حذف كاش التفاصيل بعد حذف السجل من الخادم.
// EN: This function builds delete-agreement mutation options and removes stale detail cache after deletion.
export function deleteAgreementMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<void, Error, string> {
  return {
    mutationFn: (agreementId: string) => deleteAgreement(agreementId),
    onSuccess: async (_, agreementId) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: agreementsQueryKeys.lists(),
        }),
        queryClient.removeQueries({
          queryKey: agreementsQueryKeys.detail(agreementId),
        }),
      ]);
    },
  };
}
