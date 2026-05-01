"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button, Input } from "@/components/shared";
import { USERS_COPY } from "@/constants";
import { createCurrentUserPayload, usersAccountUpdateSchema } from "@/lib/users";
import type { UsersAccountResponse } from "@/types";

type UserAccountCardFormInput = z.input<typeof usersAccountUpdateSchema>;

interface UserAccountCardProps {
  user: UsersAccountResponse;
  onSave: (payload: ReturnType<typeof createCurrentUserPayload>) => Promise<unknown> | unknown;
  isSaving?: boolean;
  successMessage?: string;
}

// AR: هذه البطاقة تعرض الحساب مع حقول قابلة للتعديل فقط وحقول مرجعية للقراءة فقط.
// EN: This card shows the account with only editable fields and read-only reference fields.
export function UserAccountCard({ user, onSave, isSaving = false, successMessage }: UserAccountCardProps) {
  const form = useForm<
    UserAccountCardFormInput,
    undefined,
    z.output<typeof usersAccountUpdateSchema>
  >({
    resolver: zodResolver(usersAccountUpdateSchema),
    defaultValues: {
      name: user.name ?? "",
      avatarUrl: user.avatarUrl ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      name: user.name ?? "",
      avatarUrl: user.avatarUrl ?? "",
    });
  }, [form, user]);

  return (
    <section className="rounded-2xl border border-white/10 bg-[#12162a] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.24)] md:p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-white">{USERS_COPY.accountTitle}</h2>
        <p className="text-sm text-[#a7aecb]">{USERS_COPY.accountDescription}</p>
      </div>

      <form
        className="mt-5 grid gap-4"
        onSubmit={form.handleSubmit(async (values) => {
          await onSave(createCurrentUserPayload(values));
        })}
      >
        <label className="grid gap-2 text-sm text-[#d6dbef]">
          <span>{USERS_COPY.nameLabel}</span>
          <Input {...form.register("name")} placeholder={USERS_COPY.nameLabel} />
          {form.formState.errors.name?.message ? (
            <span className="text-xs text-red-300">{form.formState.errors.name.message}</span>
          ) : null}
        </label>

        <label className="grid gap-2 text-sm text-[#d6dbef]">
          <span>{USERS_COPY.avatarUrlLabel}</span>
          <Input {...form.register("avatarUrl")} placeholder="https://example.com/avatar.png" />
          {form.formState.errors.avatarUrl?.message ? (
            <span className="text-xs text-red-300">{form.formState.errors.avatarUrl.message}</span>
          ) : null}
        </label>

        <div className="grid gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-[#d6dbef] md:grid-cols-2">
          <div>
            <div className="text-xs uppercase tracking-wide text-[#8189a8]">{USERS_COPY.emailLabel}</div>
            <div className="mt-1 break-all text-white">{user.email}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-[#8189a8]">{USERS_COPY.roleLabel}</div>
            <div className="mt-1 text-white">{user.role}</div>
          </div>
          {user.createdAt ? (
            <div>
              <div className="text-xs uppercase tracking-wide text-[#8189a8]">Created</div>
              <div className="mt-1 text-white">{user.createdAt}</div>
            </div>
          ) : null}
          {user.updatedAt ? (
            <div>
              <div className="text-xs uppercase tracking-wide text-[#8189a8]">Updated</div>
              <div className="mt-1 text-white">{user.updatedAt}</div>
            </div>
          ) : null}
        </div>

        {successMessage ? <p className="text-sm text-emerald-300">{successMessage}</p> : null}

        <div className="flex items-center justify-start gap-3">
          <Button type="submit" disabled={isSaving} className="min-w-28">
            {isSaving ? "..." : USERS_COPY.saveAccountLabel}
          </Button>
        </div>
      </form>
    </section>
  );
}
