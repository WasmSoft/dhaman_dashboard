"use client";

import { useMemo, useState } from "react";

import type { ClientListParams } from "@/types";

// AR: تدير هذه hook حالة البحث والصفحة لعرض قائمة العملاء بشكل متسق.
// EN: This hook manages search and pagination state for the clients list.
export function useClientListState(initialLimit = 20) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);

  const params = useMemo<ClientListParams>(
    () => ({
      search: search.trim() || undefined,
      page,
      limit,
    }),
    [limit, page, search],
  );

  function updateSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  return {
    search,
    page,
    limit,
    params,
    setPage,
    setLimit,
    setSearch: updateSearch,
  };
}
