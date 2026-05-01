import type {
  QueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

import type {
  CreateAgreementPayload,
  UpdateAgreementPayload,
} from "@/types";

import {
  activateAgreement,
  archiveAgreement,
  createAgreement,
  deleteAgreement,
  sendInvite,
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
  CreateAgreementPayload
> {
  return {
    mutationFn: (payload: CreateAgreementPayload) => createAgreement(payload),
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
    payload: UpdateAgreementPayload;
  }
> {
  return {
    mutationFn: ({
      agreementId,
      payload,
    }: {
      agreementId: string;
      payload: UpdateAgreementPayload;
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

// AR: تبني هذه الدالة mutation خاصة بإرسال الدعوة مع تحديث الكاش للقائمة والتفاصيل معًا.
// EN: This function builds the send-invite mutation and refreshes both list and detail caches.
export function sendInviteMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  Awaited<ReturnType<typeof sendInvite>>,
  Error,
  string
> {
  return {
    mutationFn: (agreementId: string) => sendInvite(agreementId),
    onSuccess: async (_, agreementId) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: agreementsQueryKeys.lists(),
        }),
        queryClient.invalidateQueries({
          queryKey: agreementsQueryKeys.detail(agreementId),
        }),
      ]);
    },
  };
}

// AR: تبني هذه الدالة mutation خاصة بتفعيل الاتفاقية مع تحديث كاش القوائم والتفاصيل بعد النجاح.
// EN: This function builds the activate-agreement mutation and refreshes list/detail cache after success.
export function activateAgreementMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  Awaited<ReturnType<typeof activateAgreement>>,
  Error,
  string
> {
  return {
    mutationFn: (agreementId: string) => activateAgreement(agreementId),
    onSuccess: async (_, agreementId) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: agreementsQueryKeys.lists(),
        }),
        queryClient.invalidateQueries({
          queryKey: agreementsQueryKeys.detail(agreementId),
        }),
      ]);
    },
  };
}

// AR: تبني هذه الدالة mutation خاصة بأرشفة الاتفاقية مع تحديث كاش القوائم والتفاصيل فورًا.
// EN: This function builds the archive-agreement mutation and refreshes list/detail cache immediately.
export function archiveAgreementMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  Awaited<ReturnType<typeof archiveAgreement>>,
  Error,
  string
> {
  return {
    mutationFn: (agreementId: string) => archiveAgreement(agreementId),
    onSuccess: async (_, agreementId) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: agreementsQueryKeys.lists(),
        }),
        queryClient.invalidateQueries({
          queryKey: agreementsQueryKeys.detail(agreementId),
        }),
      ]);
    },
  };
}
