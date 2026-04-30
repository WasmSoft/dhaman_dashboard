import type {
  QueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

import type {
  CreateChangeRequestPayload,
  DeclineChangeRequestPayload,
  FundChangeRequestPayload,
  UpdateChangeRequestPayload,
} from "@/types";

import {
  approveChangeRequestFromPortal,
  createChangeRequest,
  declineChangeRequestFromPortal,
  fundChangeRequestFromPortal,
  sendChangeRequest,
  updateChangeRequest,
} from "./change-requests.api";
import { changeRequestsQueryKeys } from "./change-requests.keys";

// AR: خيارات mutation لإنشاء طلب تغيير داخل اتفاقية.
// EN: Mutation options for creating a change request inside an agreement.
export function createChangeRequestMutationOptions(
  queryClient: QueryClient,
  agreementId: string,
): UseMutationOptions<
  Awaited<ReturnType<typeof createChangeRequest>>,
  Error,
  CreateChangeRequestPayload
> {
  return {
    mutationFn: (payload: CreateChangeRequestPayload) =>
      createChangeRequest(agreementId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: changeRequestsQueryKeys.list(agreementId),
      });
    },
  };
}

// AR: خيارات mutation لتحديث طلب تغيير.
// EN: Mutation options for updating a change request.
export function updateChangeRequestMutationOptions(
  queryClient: QueryClient,
  id: string,
): UseMutationOptions<
  Awaited<ReturnType<typeof updateChangeRequest>>,
  Error,
  UpdateChangeRequestPayload
> {
  return {
    mutationFn: (payload: UpdateChangeRequestPayload) =>
      updateChangeRequest(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: changeRequestsQueryKeys.detail(id),
      });
    },
  };
}

// AR: خيارات mutation لإرسال طلب التغيير إلى العميل.
// EN: Mutation options for sending a change request to the client.
export function sendChangeRequestMutationOptions(
  queryClient: QueryClient,
  id: string,
): UseMutationOptions<
  Awaited<ReturnType<typeof sendChangeRequest>>,
  Error,
  void
> {
  return {
    mutationFn: () => sendChangeRequest(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: changeRequestsQueryKeys.detail(id),
      });
    },
  };
}

// AR: خيارات mutation لموافقة العميل على طلب التغيير عبر البوابة.
// EN: Mutation options for client approving a change request via the portal.
export function approveChangeRequestMutationOptions(
  queryClient: QueryClient,
  token: string,
  id: string,
): UseMutationOptions<
  Awaited<ReturnType<typeof approveChangeRequestFromPortal>>,
  Error,
  void
> {
  return {
    mutationFn: () => approveChangeRequestFromPortal(token, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: changeRequestsQueryKeys.detail(id),
      });
    },
  };
}

// AR: خيارات mutation لرفض العميل لطلب التغيير عبر البوابة.
// EN: Mutation options for client declining a change request via the portal.
export function declineChangeRequestMutationOptions(
  queryClient: QueryClient,
  token: string,
  id: string,
): UseMutationOptions<
  Awaited<ReturnType<typeof declineChangeRequestFromPortal>>,
  Error,
  DeclineChangeRequestPayload
> {
  return {
    mutationFn: (payload: DeclineChangeRequestPayload) =>
      declineChangeRequestFromPortal(token, id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: changeRequestsQueryKeys.detail(id),
      });
    },
  };
}

// AR: خيارات mutation لتمويل العميل لطلب التغيير عبر البوابة.
// EN: Mutation options for client funding a change request via the portal.
export function fundChangeRequestMutationOptions(
  queryClient: QueryClient,
  token: string,
  id: string,
): UseMutationOptions<
  Awaited<ReturnType<typeof fundChangeRequestFromPortal>>,
  Error,
  FundChangeRequestPayload
> {
  return {
    mutationFn: (payload: FundChangeRequestPayload) =>
      fundChangeRequestFromPortal(token, id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: changeRequestsQueryKeys.detail(id),
      });
    },
  };
}
