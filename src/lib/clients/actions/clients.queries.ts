import { queryOptions } from "@tanstack/react-query";

import type { ClientListParams } from "@/types";

import { getClientById, getClients } from "./clients.api";
import { clientsQueryKeys } from "./clients.keys";

// AR: تبني هذه الدالة query options لقائمة العملاء مع key ثابت للبحث والفلاتر والصفحات.
// EN: This function builds clients-list query options with a stable key for filters, search, and pagination.
export function clientsListQueryOptions(params?: ClientListParams) {
  return queryOptions({
    queryKey: clientsQueryKeys.list(params),
    queryFn: () => getClients(params),
  });
}

// AR: تبني هذه الدالة query options لتفاصيل العميل مع تعطيل الطلب عند غياب المعرف.
// EN: This function builds client-details query options and disables the request when the identifier is missing.
export function clientDetailsQueryOptions(clientId: string) {
  return queryOptions({
    queryKey: clientsQueryKeys.detail(clientId),
    queryFn: () => getClientById(clientId),
    enabled: Boolean(clientId),
  });
}
