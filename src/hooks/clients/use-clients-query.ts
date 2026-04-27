"use client";

import { useQuery } from "@tanstack/react-query";

import { clientsListQueryOptions } from "@/lib/clients/actions";
import type { ClientListParams } from "@/types";

// AR: هذه hook تغلف query الخاصة بقائمة العملاء لاستخدامها من الـ client components فقط.
// EN: This hook wraps the clients-list query so it is consumed from client components only.
export function useClientsQuery(params?: ClientListParams) {
  return useQuery(clientsListQueryOptions(params));
}
