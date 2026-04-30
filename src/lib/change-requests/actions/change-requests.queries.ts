import { queryOptions } from "@tanstack/react-query";
import type { ChangeRequestListParams } from "@/types";
import {
  getChangeRequestById,
  getChangeRequests,
} from "./change-requests.api";
import { changeRequestsQueryKeys } from "./change-requests.keys";

export function changeRequestsListQueryOptions(
  agreementId: string,
  params?: ChangeRequestListParams,
) {
  return queryOptions({
    queryKey: changeRequestsQueryKeys.list(agreementId, params),
    queryFn: () => getChangeRequests(agreementId, params),
    enabled: Boolean(agreementId),
  });
}

export function changeRequestDetailsQueryOptions(id: string) {
  return queryOptions({
    queryKey: changeRequestsQueryKeys.detail(id),
    queryFn: () => getChangeRequestById(id),
    enabled: Boolean(id),
  });
}
