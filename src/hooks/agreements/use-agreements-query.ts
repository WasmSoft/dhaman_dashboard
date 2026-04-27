"use client";

import { useQuery } from "@tanstack/react-query";

import { agreementsListQueryOptions } from "@/lib/agreements/actions";
import type { AgreementListParams } from "@/types";

// AR: هذه hook تغلف query الخاصة بقائمة الاتفاقيات وتبقي params في طبقة hooks.
// EN: This hook wraps the agreements-list query and keeps params usage inside the hooks layer.
export function useAgreementsQuery(params?: AgreementListParams) {
  return useQuery(agreementsListQueryOptions(params));
}
