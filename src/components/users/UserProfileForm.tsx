"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button, Input } from "@/components/shared";
import { USERS_COPY, USERS_CURRENCY_OPTIONS, USERS_LOCALE_OPTIONS } from "@/constants";
import { createCurrentUserProfilePayload, usersProfileUpdateSchema } from "@/lib/users";
import type { UsersProfileResponse } from "@/types";

type UserProfileFormInput = z.input<typeof usersProfileUpdateSchema>;

interface UserProfileFormProps {
  profile: UsersProfileResponse;
  onSave: (payload: ReturnType<typeof createCurrentUserProfilePayload>) => Promise<unknown> | unknown;
  isSaving?: boolean;
  successMessage?: string;
}

// AR: هذا النموذج يدير الملف المهني مع React Hook Form وZod واحترام RTL.
// EN: This form manages the professional profile with React Hook Form, Zod, and RTL-friendly layout.
export function UserProfileForm({ profile, onSave, isSaving = false, successMessage }: UserProfileFormProps) {
  const form = useForm<
    UserProfileFormInput,
    undefined,
    z.output<typeof usersProfileUpdateSchema>
  >({
    resolver: zodResolver(usersProfileUpdateSchema) as never,
    defaultValues: {
      businessName: profile.businessName ?? "",
      bio: profile.bio ?? "",
      specialization: profile.specialization ?? "",
      preferredCurrency: profile.preferredCurrency ?? "",
      locale: profile.locale ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      businessName: profile.businessName ?? "",
      bio: profile.bio ?? "",
      specialization: profile.specialization ?? "",
      preferredCurrency: profile.preferredCurrency ?? "",
      locale: profile.locale ?? "",
    });
  }, [form, profile]);

  return (
    <section className="rounded-2xl border border-white/10 bg-[#12162a] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.24)] md:p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-white">{USERS_COPY.profileTitle}</h2>
        <p className="text-sm text-[#a7aecb]">{USERS_COPY.profileDescription}</p>
      </div>

      <form
        className="mt-5 grid gap-4"
        onSubmit={form.handleSubmit(async (values) => {
          await onSave(createCurrentUserProfilePayload(values));
        })}
      >
        <label className="grid gap-2 text-sm text-[#d6dbef]">
          <span>{USERS_COPY.businessNameLabel}</span>
          <Input {...form.register("businessName")} placeholder={USERS_COPY.businessNameLabel} />
          {form.formState.errors.businessName?.message ? (
            <span className="text-xs text-red-300">{form.formState.errors.businessName.message}</span>
          ) : null}
        </label>

        <label className="grid gap-2 text-sm text-[#d6dbef]">
          <span>{USERS_COPY.bioLabel}</span>
          <textarea
            {...form.register("bio")}
            rows={4}
            className="min-h-28 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
            placeholder={USERS_COPY.bioLabel}
          />
          {form.formState.errors.bio?.message ? (
            <span className="text-xs text-red-300">{form.formState.errors.bio.message}</span>
          ) : null}
        </label>

        <label className="grid gap-2 text-sm text-[#d6dbef]">
          <span>{USERS_COPY.specializationLabel}</span>
          <Input {...form.register("specialization")} placeholder={USERS_COPY.specializationLabel} />
          {form.formState.errors.specialization?.message ? (
            <span className="text-xs text-red-300">{form.formState.errors.specialization.message}</span>
          ) : null}
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm text-[#d6dbef]">
            <span>{USERS_COPY.preferredCurrencyLabel}</span>
            <select
              {...form.register("preferredCurrency")}
              className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
            >
              <option value="">--</option>
              {USERS_CURRENCY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {form.formState.errors.preferredCurrency?.message ? (
              <span className="text-xs text-red-300">{form.formState.errors.preferredCurrency.message}</span>
            ) : null}
          </label>

          <label className="grid gap-2 text-sm text-[#d6dbef]">
            <span>{USERS_COPY.localeLabel}</span>
            <select
              {...form.register("locale")}
              className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
            >
              <option value="">--</option>
              {USERS_LOCALE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {form.formState.errors.locale?.message ? (
              <span className="text-xs text-red-300">{form.formState.errors.locale.message}</span>
            ) : null}
          </label>
        </div>

        {successMessage ? <p className="text-sm text-emerald-300">{successMessage}</p> : null}

        <div className="flex items-center justify-start gap-3">
          <Button type="submit" disabled={isSaving} className="min-w-28">
            {isSaving ? "..." : USERS_COPY.saveProfileLabel}
          </Button>
        </div>
      </form>
    </section>
  );
}
