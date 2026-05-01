import type {
  QueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

import type {
  CreateMilestonePayload,
  DeleteMilestoneResponse,
  MilestoneMutationResponse,
  ReorderMilestonesPayload,
  ReorderMilestonesResponse,
  UpdateMilestonePayload,
} from "@/types";

import { agreementsQueryKeys } from "@/lib/agreements/actions";
import { timelineQueryKeys } from "@/lib/timeline-events/actions";

import {
  createMilestone,
  deleteMilestone,
  reorderMilestones,
  updateMilestone,
} from "./milestones.api";
import { milestonesQueryKeys } from "./milestones.keys";

async function invalidateAgreementMilestoneState(
  queryClient: QueryClient,
  agreementId: string,
) {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: milestonesQueryKeys.list(agreementId),
    }),
    queryClient.invalidateQueries({
      queryKey: agreementsQueryKeys.lists(),
    }),
    queryClient.invalidateQueries({
      queryKey: agreementsQueryKeys.detail(agreementId),
    }),
    queryClient.invalidateQueries({
      queryKey: timelineQueryKeys.agreementTimelines(),
    }),
  ]);
}

// AR: خيارات mutation لإنشاء مرحلة جديدة وتحديث الكاشات المرتبطة بالاتفاقية.
// EN: Mutation options for creating a milestone and refreshing agreement-related caches.
export function createMilestoneMutationOptions(
  queryClient: QueryClient,
  agreementId: string,
): UseMutationOptions<
  MilestoneMutationResponse,
  Error,
  CreateMilestonePayload
> {
  return {
    mutationFn: (payload: CreateMilestonePayload) =>
      createMilestone(agreementId, payload),
    onSuccess: async () => {
      await invalidateAgreementMilestoneState(queryClient, agreementId);
    },
  };
}

// AR: خيارات mutation لتحديث مرحلة موجودة مع إعادة مزامنة التفاصيل والقوائم.
// EN: Mutation options for updating an existing milestone and syncing list/detail caches.
export function updateMilestoneMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  MilestoneMutationResponse,
  Error,
  {
    milestoneId: string;
    payload: UpdateMilestonePayload;
  }
> {
  return {
    mutationFn: ({ milestoneId, payload }) => updateMilestone(milestoneId, payload),
    onSuccess: async (result, variables) => {
      await Promise.all([
        invalidateAgreementMilestoneState(queryClient, result.data.agreementId),
        queryClient.invalidateQueries({
          queryKey: milestonesQueryKeys.detail(variables.milestoneId),
        }),
      ]);
    },
  };
}

// AR: خيارات mutation لحذف مرحلة مع إزالة كاش التفاصيل القديمة.
// EN: Mutation options for deleting a milestone and removing stale detail cache.
export function deleteMilestoneMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  DeleteMilestoneResponse,
  Error,
  {
    milestoneId: string;
    agreementId: string;
  }
> {
  return {
    mutationFn: ({ milestoneId }) => deleteMilestone(milestoneId),
    onSuccess: async (_, variables) => {
      await Promise.all([
        invalidateAgreementMilestoneState(queryClient, variables.agreementId),
        queryClient.removeQueries({
          queryKey: milestonesQueryKeys.detail(variables.milestoneId),
        }),
      ]);
    },
  };
}

// AR: خيارات mutation لإعادة ترتيب المراحل وتحديث العرض الزمني والقوائم.
// EN: Mutation options for reordering milestones and refreshing timeline/list views.
export function reorderMilestonesMutationOptions(
  queryClient: QueryClient,
  agreementId: string,
): UseMutationOptions<
  ReorderMilestonesResponse,
  Error,
  {
    milestoneId: string;
    payload: ReorderMilestonesPayload;
  }
> {
  return {
    mutationFn: ({ milestoneId, payload }) => reorderMilestones(milestoneId, payload),
    onSuccess: async () => {
      await invalidateAgreementMilestoneState(queryClient, agreementId);
    },
  };
}
