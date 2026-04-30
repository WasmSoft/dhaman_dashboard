import React from "react";
import { vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// AR: يُنشئ QueryClient جديد للاختبار مع عدم إعادة المحاولة في الوضع الافتراضي.
// EN: Creates a new QueryClient for testing with no retry by default.
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
}

// AR: غلاف اختبار يلف المكون بـ QueryClientProvider لاختبار hooks وreact-query.
// EN: Test wrapper that wraps components with QueryClientProvider for testing hooks and react-query.
export function createTestWrapper() {
  const queryClient = createTestQueryClient();

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  }

  return { wrapper: Wrapper, queryClient };
}

// AR: mock axiosInstance الافتراضي للاختبار — يُرجع بيانات فارغة.
// EN: Default mock axiosInstance for testing — returns empty data.
export const mockAxiosInstance = {
  get: vi.fn(() => Promise.resolve({ data: {} })),
  post: vi.fn(() => Promise.resolve({ data: {} })),
  put: vi.fn(() => Promise.resolve({ data: {} })),
  patch: vi.fn(() => Promise.resolve({ data: {} })),
  delete: vi.fn(() => Promise.resolve({ data: {} })),
};