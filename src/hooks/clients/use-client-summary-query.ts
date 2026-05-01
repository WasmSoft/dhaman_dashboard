"use client";

import { useQuery } from "@tanstack/react-query";

import { clientSummaryQueryOptions } from "@/lib/clients/actions";

// AR: هذه hook تجلب ملخص العميل داخل مكونات العميل فقط.
// EN: This hook fetches the client summary inside client components only.
export function useClientSummaryQuery(clientId: string) {
  return useQuery(clientSummaryQueryOptions(clientId));
}
