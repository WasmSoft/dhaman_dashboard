"use client";

import { useQuery } from "@tanstack/react-query";

import { clientPortalOverviewQueryOptions } from "@/lib/client-portal/actions";

// AR: هذه hook تغلف query الخاصة بملخص بوابة العميل داخل طبقة hooks القابلة لإعادة الاستخدام.
// EN: This hook wraps the client-portal overview query inside the reusable hooks layer.
export function useClientPortalOverviewQuery() {
  return useQuery(clientPortalOverviewQueryOptions());
}
