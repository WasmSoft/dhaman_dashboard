"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/shared";
import { useLogoutMutation } from "@/hooks/auth";

// AR: تنفذ هذه الشاشة تسجيل الخروج ثم تعيد المستخدم إلى صفحة الدخول.
// EN: This screen performs logout and returns the user to the login page.
export function LogoutSection() {
  const router = useRouter();
  const { mutate, isError, isPending } = useLogoutMutation();

  useEffect(() => {
    mutate(undefined, {
      onSettled: () => {
        router.replace("/login");
      },
    });
  }, [mutate, router]);

  return (
    <main dir="rtl" className="grid min-h-[70vh] place-items-center px-4 text-center text-white">
      <section className="w-full max-w-md rounded-3xl border border-white/5 bg-[#1e2140] p-6 shadow-[0_24px_80px_rgba(5,8,25,0.35)]">
        <p className="text-sm font-semibold text-violet-200">
          {isPending ? "جاري تسجيل الخروج..." : "تم إنهاء الجلسة"}
        </p>
        <h1 className="mt-3 text-2xl font-extrabold">إعادة توجيهك إلى تسجيل الدخول</h1>
        <p className="mt-3 text-sm leading-7 text-slate-400">
          {isError
            ? "تعذر تأكيد الخروج من الخادم، لكن تم تنظيف الجلسة محلياً."
            : "نقوم بتنظيف جلسة المصادقة وحماية لوحة التحكم."}
        </p>
        <Button asChild className="mt-5 h-11 rounded-xl bg-violet-500 px-5 text-white hover:bg-violet-400">
          <Link href="/login">الذهاب إلى تسجيل الدخول</Link>
        </Button>
      </section>
    </main>
  );
}
