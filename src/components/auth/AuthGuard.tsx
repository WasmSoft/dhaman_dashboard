"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { useCurrentUserQuery } from "@/hooks/auth";
import { getAccessToken } from "@/lib/axios-instance";

type AuthGuardProps = {
  children: ReactNode;
};

// AR: يحمي صفحات لوحة التحكم عبر التحقق من الجلسة الحالية قبل عرض المحتوى.
// EN: Protects dashboard pages by validating the current session before rendering content.
export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const currentUserQuery = useCurrentUserQuery();

  useEffect(() => {
    if (!getAccessToken() || currentUserQuery.isError) {
      router.replace("/login");
    }
  }, [currentUserQuery.isError, router]);

  if (currentUserQuery.isPending) {
    return (
      <main dir="rtl" className="grid min-h-screen place-items-center bg-[#10142c] px-4 text-center text-white">
        <div className="rounded-3xl border border-white/5 bg-[#1e2140] px-6 py-5 shadow-[0_24px_80px_rgba(5,8,25,0.35)]">
          <p className="text-sm font-semibold text-violet-200">جاري التحقق من الجلسة...</p>
          <p className="mt-2 text-xs text-slate-500">نؤكد صلاحية الدخول قبل فتح لوحة التحكم.</p>
        </div>
      </main>
    );
  }

  if (currentUserQuery.isError) {
    return null;
  }

  return <>{children}</>;
}
