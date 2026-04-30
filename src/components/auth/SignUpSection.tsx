"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import {
  Check,
  Eye,
  Shield,
  UserRound,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/shared";
import { authContent } from "@/constants";
import { useSignUpMutation } from "@/hooks/auth";
import { cn } from "@/lib/utils";
import type { AuthField, SignUpTrustCard } from "@/types";

const trustCardAccentClasses: Record<SignUpTrustCard["accent"], string> = {
  violet: "text-violet-300",
  blue: "text-sky-300",
  emerald: "text-emerald-300",
  amber: "text-amber-300",
};

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3" dir="ltr">
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-xl bg-violet-500 text-white shadow-[0_0_28px_rgba(124,88,255,0.55)]",
          compact ? "size-9" : "size-8",
        )}
        aria-hidden="true"
      >
        <Shield className={compact ? "size-5" : "size-4"} fill="currentColor" />
      </span>
      <span className="flex flex-col text-start">
        <span className="text-lg font-bold leading-tight text-white">{authContent.signUp.brandName}</span>
        <span className="text-xs leading-5 text-slate-500">{authContent.signUp.tagline}</span>
      </span>
    </div>
  );
}

function SignUpInput({
  field,
  required = true,
}: {
  field: AuthField;
  required?: boolean;
}) {
  const isPassword = field.type === "password";

  return (
    <label className="flex flex-col gap-2 text-start text-sm font-medium text-slate-300" htmlFor={field.id}>
      {field.label}
      <span className="relative block">
        <input
          id={field.id}
          name={field.id}
          required={required}
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
      {field.helper ? <span className="text-xs font-normal text-slate-500">{field.helper}</span> : null}
    </label>
  );
}

function SignUpPreview() {
  const { preview } = authContent.signUp;

  return (
    <section className="relative hidden min-h-[46rem] overflow-hidden bg-[#272c4d] px-8 py-12 text-white lg:flex lg:w-[59.3%] lg:flex-col lg:items-center lg:justify-center">
      <div className="absolute -start-24 top-14 size-96 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="absolute bottom-0 end-4 size-72 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="relative z-10 mb-10 flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-3" dir="ltr">
          <Shield className="size-6 text-white" fill="currentColor" />
          <span className="text-2xl font-bold">{authContent.signUp.brandName}</span>
        </div>
        <p className="text-sm text-slate-500">{authContent.signUp.tagline}</p>
      </div>

      {/* AR: بطاقة المعاينة توضح رحلة إنشاء الحساب وثقة المنصة كما في تصميم Figma. EN: The preview card mirrors the Figma account setup journey and trust cues. */}
      <div className="relative z-10 w-full max-w-[420px] rounded-3xl border border-white/5 bg-[#1e2140]/90 p-5 shadow-[0_28px_90px_rgba(8,12,35,0.55)] backdrop-blur">
        <div className="absolute -top-5 end-5 rounded-full border border-violet-400/25 bg-[#151936] px-4 py-2 text-xs font-semibold text-violet-300 shadow-xl">
          <span className="me-2 inline-block size-1.5 rounded-full bg-violet-300" />
          {preview.topBadge}
        </div>

        <div className="mb-4 flex items-center justify-between gap-4 text-sm">
          <span className="text-slate-400">{preview.stepLabel}</span>
          <strong className="text-white">{preview.title}</strong>
        </div>

        <div className="mb-5 space-y-3 border-b border-white/5 pb-5">
          {preview.steps.map((step, index) => (
            <div key={step.label} className="flex items-center justify-between gap-4 text-sm">
              <div className="h-1 w-10 overflow-hidden rounded-full bg-slate-700/50">
                {step.status === "active" ? <div className="h-full w-5 rounded-full bg-violet-400" /> : null}
              </div>
              <span className={cn("flex-1 text-start", step.status === "pending" ? "text-slate-500" : "text-white")}>{step.label}</span>
              <span
                className={cn(
                  "grid size-6 place-items-center rounded-full text-xs font-bold",
                  step.status === "done" && "bg-emerald-500 text-white",
                  step.status === "active" && "bg-violet-500 text-white",
                  step.status === "pending" && "bg-slate-700/70 text-slate-400",
                )}
              >
                {step.status === "done" ? <Check className="size-3.5" /> : index + 1}
              </span>
            </div>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {preview.cards.map((card) => (
            <article key={card.label} className="rounded-xl border border-white/5 bg-white/[0.035] p-4 text-start">
              <p className="text-xs text-slate-500">{card.label}</p>
              <h3 className={cn("mt-1 text-lg font-bold", trustCardAccentClasses[card.accent])}>{card.value}</h3>
              <p className="mt-1 text-xs text-slate-400">{card.caption}</p>
            </article>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4 rounded-xl border border-violet-400/25 bg-violet-500/10 p-4">
          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-violet-500/15 text-violet-200">
            <Shield className="size-5" />
          </div>
          <div className="min-w-0 flex-1 text-start">
            <h3 className="text-sm font-bold text-white">{preview.secureTitle}</h3>
            <p className="mt-1 text-xs text-slate-400">{preview.secureDescription}</p>
          </div>
          <strong className="text-sm text-violet-200">{preview.securePercent}</strong>
        </div>

        <div className="absolute -bottom-5 start-5 rounded-full border border-emerald-400/20 bg-[#10182d] px-4 py-2 text-xs font-bold text-emerald-400 shadow-xl">
          <span className="me-2 inline-block size-1.5 rounded-full bg-emerald-400" />
          {preview.bottomBadge}
        </div>
      </div>
    </section>
  );
}

export function SignUpSection() {
  const { signUp } = authContent;
  const router = useRouter();
  const signUpMutation = useSignUpMutation();
  const [formError, setFormError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setFormError("كلمة المرور وتأكيدها غير متطابقين.");
      return;
    }

    setFormError(null);
    signUpMutation.mutate(
      {
        businessName: String(formData.get("businessName") ?? "").trim(),
        confirmPassword,
        email: String(formData.get("email") ?? "").trim(),
        fullName: String(formData.get("fullName") ?? "").trim(),
        password,
      },
      {
        onError: (error) => {
          setFormError(error.message || "تعذر إنشاء الحساب. حاول مرة أخرى.");
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
      
      
        {/* AR: نموذج التسجيل يحافظ على محاذاة عربية يمينية مع نفس طبقات اللون والتباعد في Figma. EN: The registration form keeps RTL Arabic alignment while matching the Figma spacing and color layers. */}
        <section className="flex w-full items-center justify-center bg-[#10142c] px-5 py-8 sm:px-8 lg:w-[40.7%] lg:px-12 lg:py-4">
          <div className="w-full max-w-md">
            <BrandMark compact />

            <div className="mt-8 space-y-3">
              <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-white sm:text-3xl">{signUp.title}</h1>
              <p className="max-w-sm text-sm leading-7 text-slate-500">{signUp.description}</p>
            </div>

            <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="نوع الحساب">
                {signUp.roleOptions.map((option) => {
                  const isActive = "active" in option && option.active;
                  const isDisabled = option.value !== "freelancer";

                  return (
                    <button
                      key={option.value}
                      type="button"
                      disabled={isDisabled}
                      className={cn(
                        "inline-flex h-9 items-center gap-1.5 rounded-full border px-4 text-sm transition",
                        isActive
                          ? "border-violet-400 bg-violet-500/10 text-violet-200"
                          : "border-white/5 bg-transparent text-slate-500 hover:border-white/15 hover:text-slate-300",
                        isDisabled && "cursor-not-allowed opacity-50 hover:border-white/5 hover:text-slate-500",
                      )}
                      aria-pressed={isActive ? "true" : "false"}
                      title={isDisabled ? "العميل يدخل عبر رابط البوابة ولا يحتاج حساباً." : undefined}
                    >
                      {option.value === "freelancer" ? <UserRound className="size-4" /> : <UsersRound className="size-4" />}
                      {option.label}
                    </button>
                  );
                })}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <SignUpInput field={signUp.fields.fullName} />
                <SignUpInput field={signUp.fields.businessName} required={false} />
              </div>

              <SignUpInput field={signUp.fields.email} />

              <div className="grid gap-4 sm:grid-cols-2">
                <SignUpInput field={signUp.fields.password} />
                <SignUpInput field={signUp.fields.confirmPassword} />
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-400">
                <input
                  type="checkbox"
                  required
                  className="size-4 rounded border-white/10 bg-[#232642] accent-violet-500"
                />
                <span>{signUp.termsLabel}</span>
              </label>

              {formError ? (
                <p className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200" role="alert">
                  {formError}
                </p>
              ) : null}

              <Button
                type="submit"
                disabled={signUpMutation.isPending}
                className="h-12 w-full rounded-xl bg-violet-500 text-base font-bold text-white shadow-[0_16px_35px_rgba(111,82,255,0.35)] hover:bg-violet-400"
              >
                {signUpMutation.isPending ? "جاري إنشاء الحساب..." : signUp.submitLabel}
              </Button>
            </form>

            <div className="my-5 flex items-center gap-3 text-xs text-slate-600">
              <span className="h-px flex-1 bg-white/5" />
              <span>{signUp.dividerLabel}</span>
              <span className="h-px flex-1 bg-white/5" />
            </div>

            <Button
              type="button"
              variant="secondary"
              className="h-11 w-full rounded-xl border border-white/5 bg-[#232642] text-sm font-medium text-slate-300 hover:bg-[#292d4b] hover:text-white"
            >
              <span className="grid size-5 place-items-center rounded-full bg-slate-500/30 text-xs font-bold text-white">G</span>
              {signUp.googleLabel}
            </Button>

            <p className="mt-6 text-center text-sm text-slate-500">
              {signUp.loginPrompt}{" "}
              <Link href="/login" className="font-semibold text-violet-300 hover:text-violet-200">
                {signUp.loginLabel}
              </Link>
            </p>
          </div>
        </section>
      
        <SignUpPreview />

      </div>
    </main>
  );
}
