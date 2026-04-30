"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Check, Eye, Shield } from "lucide-react";

import { Button } from "@/components/shared";
import { authContent } from "@/constants";
import { useLoginMutation } from "@/hooks/auth";
import { cn } from "@/lib/utils";
import type { AuthField, LoginActivityItem, LoginMetric } from "@/types";

const metricAccentClasses: Record<LoginMetric["accent"], string> = {
  violet: "text-violet-300",
  emerald: "text-emerald-300",
  blue: "text-sky-300",
};

const activityAccentClasses: Record<LoginActivityItem["accent"], string> = {
  emerald: "bg-emerald-400 text-emerald-300",
  blue: "bg-sky-400 text-sky-300",
  violet: "bg-violet-400 text-violet-300",
  amber: "bg-amber-400 text-amber-300",
};

function LoginBrandMark() {
  return (
    <div className="flex items-center gap-3" dir="ltr">
      <span
        className="grid size-9 shrink-0 place-items-center rounded-xl bg-violet-500 text-white shadow-[0_0_28px_rgba(124,88,255,0.55)]"
        aria-hidden="true"
      >
        <Shield className="size-5" fill="currentColor" />
      </span>
      <span className="flex flex-col text-start">
        <span className="text-lg font-bold leading-tight text-white">{authContent.login.brandName}</span>
        <span className="text-xs leading-5 text-slate-500">{authContent.login.tagline}</span>
      </span>
    </div>
  );
}

function LoginInput({ field }: { field: AuthField }) {
  const isPassword = field.type === "password";

  return (
    <label className="flex flex-col gap-2 text-start text-sm font-medium text-slate-300" htmlFor={field.id}>
      {field.label}
      <span className="relative block">
        <input
          id={field.id}
          name={field.id}
          required
          type={field.type}
          placeholder={field.placeholder}
          className={cn(
            "h-11 w-full rounded-xl border border-white/5 bg-[#232642] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/70 focus:ring-2 focus:ring-violet-500/20",
            isPassword && "ps-11",
          )}
        />
        {isPassword ? (
          <span className="pointer-events-none absolute inset-y-0 start-3 grid place-items-center text-slate-500">
            <Eye className="size-4" />
          </span>
        ) : null}
      </span>
    </label>
  );
}

function LoginPreview() {
  const { preview } = authContent.login;

  return (
    <section className="relative hidden min-h-[46rem] overflow-hidden bg-[#272c4d] px-8 py-12 text-white lg:flex lg:w-[59.3%] lg:flex-col lg:items-center lg:justify-center">
      <div className="absolute -start-24 top-12 size-96 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="absolute bottom-0 end-6 size-72 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="relative z-10 mb-9 flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-3" dir="ltr">
          <Shield className="size-6 text-white" fill="currentColor" />
          <span className="text-2xl font-bold">{authContent.login.brandName}</span>
        </div>
        <p className="text-sm text-slate-500">{authContent.login.tagline}</p>
      </div>

      {/* AR: لوحة المعاينة تعرض مؤشرات الحساب والدفعات كما في تصميم Figma. EN: The preview dashboard presents account and payment signals from the Figma design. */}
      <div className="relative z-10 w-full max-w-[420px] rounded-3xl border border-white/5 bg-[#1e2140]/90 p-5 shadow-[0_28px_90px_rgba(8,12,35,0.55)] backdrop-blur">
        <div className="absolute -top-7 start-6 flex items-center gap-3 rounded-xl border border-white/5 bg-[#202344] px-4 py-3 shadow-xl">
          <span className="grid size-7 place-items-center rounded-lg bg-violet-500/20 text-violet-200">
            <Shield className="size-4" />
          </span>
          <span className="text-start">
            <strong className="block text-xs text-white">{preview.protectionTitle}</strong>
            <span className="text-[11px] text-slate-500">{preview.protectionDescription}</span>
          </span>
        </div>

        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-400">{preview.liveLabel}</span>
          <h2 className="text-sm font-bold text-white">{preview.title}</h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {preview.metrics.map((metric) => (
            <article key={metric.label} className="rounded-xl bg-white/[0.035] p-4 text-center">
              <strong className={cn("block text-lg font-extrabold", metricAccentClasses[metric.accent])}>{metric.value}</strong>
              <span className="mt-1 block text-xs text-slate-500">{metric.label}</span>
            </article>
          ))}
        </div>

        <div className="mt-5 flex h-14 items-end gap-1.5 border-b border-white/5 pb-1">
          {preview.chartBars.map((barHeight, index) => (
            <span
              key={`${barHeight}-${index}`}
              className={cn(
                "flex-1 rounded-t-md bg-violet-500/35",
                index === 2 && "bg-violet-400 shadow-[0_0_22px_rgba(139,92,246,0.6)]",
              )}
              style={{ height: `${barHeight}%` }}
            />
          ))}
        </div>

        <div className="mt-3 space-y-2">
          {preview.activity.map((item) => (
            <article key={item.label} className="flex items-center justify-between gap-4 rounded-xl bg-[#222641] px-4 py-3 text-sm">
              <strong className={cn("text-sm", item.value.startsWith("$") ? "text-emerald-300" : activityAccentClasses[item.accent].split(" ")[1])}>
                {item.value}
              </strong>
              <span className="flex items-center gap-2 text-slate-400">
                <span className={cn("size-1.5 rounded-full", activityAccentClasses[item.accent].split(" ")[0])} />
                {item.label}
              </span>
            </article>
          ))}
        </div>

        <div className="absolute -bottom-6 end-4 flex items-center gap-3 rounded-xl border border-white/5 bg-[#10182d] px-4 py-3 shadow-xl">
          <span className="grid size-7 place-items-center rounded-lg bg-emerald-500/20 text-emerald-300">
            <Check className="size-4" />
          </span>
          <span className="text-start">
            <strong className="block text-xs text-white">{preview.completedPaymentTitle}</strong>
            <span className="text-[11px] text-emerald-300">{preview.completedPaymentDescription}</span>
          </span>
        </div>
      </div>
    </section>
  );
}

export function LoginSection() {
  const { login } = authContent;
  const router = useRouter();
  const loginMutation = useLoginMutation();
  const [formError, setFormError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    setFormError(null);
    loginMutation.mutate(
      { email, password },
      {
        onError: (error) => {
          setFormError(error.message || "تعذر تسجيل الدخول. حاول مرة أخرى.");
        },
        onSuccess: () => {
          router.push("/dashboard");
        },
      },
    );
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#262b49] px-4 py-6 text-start text-white sm:px-6 lg:p-0">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[1179px] overflow-hidden rounded-[2rem] bg-[#12162f] shadow-[0_34px_120px_rgba(5,8,25,0.38)] lg:min-h-[730px] lg:rounded-none">
      
       {/* AR: نموذج الدخول يطابق شاشة Figma مع الحفاظ على ترتيب RTL وحالات الوصول الأساسية. EN: The login form matches the Figma screen while preserving RTL order and basic accessibility states. */}
        <section className="flex w-full items-center justify-center bg-[#10142c] px-5 py-8 sm:px-8 lg:w-[40.7%] lg:px-10 lg:py-4">
          <div className="w-full max-w-[399px]">
            <LoginBrandMark />

            <div className="mt-12 space-y-3">
              <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-white sm:text-3xl">{login.title}</h1>
              <p className="text-sm leading-7 text-slate-500">{login.description}</p>
            </div>

            <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
              <LoginInput field={login.fields.email} />
              <LoginInput field={login.fields.password} />

              <div className="flex items-center justify-between gap-4 text-sm">
                <label className="flex items-center gap-2 text-slate-400">
                  <input
                    type="checkbox"
                    className="size-4 rounded border-white/10 bg-[#232642] accent-violet-500"
                  />
                  <span>{login.rememberLabel}</span>
                </label>
                <Link href="/" className="font-medium text-violet-300 hover:text-violet-200">
                  {login.forgotPasswordLabel}
                </Link>
              </div>

              {formError ? (
                <p className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200" role="alert">
                  {formError}
                </p>
              ) : null}

              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="h-12 w-full rounded-xl bg-violet-500 text-base font-bold text-white shadow-[0_16px_35px_rgba(111,82,255,0.35)] hover:bg-violet-400"
              >
                {loginMutation.isPending ? "جاري تسجيل الدخول..." : login.submitLabel}
              </Button>
            </form>

            <div className="my-5 flex items-center gap-3 text-xs text-slate-600">
              <span className="h-px flex-1 bg-white/5" />
              <span>{login.dividerLabel}</span>
              <span className="h-px flex-1 bg-white/5" />
            </div>

            <Button
              type="button"
              variant="secondary"
              className="h-11 w-full rounded-xl border border-white/5 bg-[#232642] text-sm font-medium text-slate-300 hover:bg-[#292d4b] hover:text-white"
            >
              <span className="grid size-5 place-items-center rounded-full bg-slate-500/30 text-xs font-bold text-white">G</span>
              {login.googleLabel}
            </Button>

            <p className="mt-6 text-center text-sm text-slate-500">
              {login.signUpPrompt}{" "}
              <Link href="/sign-up" className="font-semibold text-violet-300 hover:text-violet-200">
                {login.signUpLabel}
              </Link>
            </p>
          </div>
        </section>
        <LoginPreview />

       
      </div>
    </main>
  );
}
