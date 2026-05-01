// AR: هذا النموذج ينشئ أو يعدل العميل مع التحقق عبر React Hook Form وZod.
// EN: This form creates or edits a client with React Hook Form and Zod validation.
"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input } from "@/components/shared";
import { clientFormSchema } from "@/lib/clients";
import type { ClientFormValues } from "@/types";

type ClientFormProps = {
  defaultValues?: Partial<ClientFormValues>;
  submitLabel: string;
  conflictMessage?: string | null;
  onSubmit: (values: ClientFormValues) => Promise<void> | void;
  onCancel?: () => void;
  isPending?: boolean;
};

function FormField({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[12px] font-bold text-[#a7aecb]">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-[11px] text-red-300">{error}</span> : null}
    </label>
  );
}

export function ClientForm({
  defaultValues,
  submitLabel,
  conflictMessage,
  onSubmit,
  onCancel,
  isPending,
}: ClientFormProps) {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      companyName: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        name: defaultValues.name ?? "",
        email: defaultValues.email ?? "",
        phone: defaultValues.phone ?? "",
        companyName: defaultValues.companyName ?? "",
      });
    }
  }, [defaultValues, form]);

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(async (values) => {
        await onSubmit(values);
      })}
      dir="rtl"
    >
      {conflictMessage ? (
        <div className="rounded-[12px] border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-[12px] leading-6 text-amber-100">
          {conflictMessage}
        </div>
      ) : null}
      <FormField label="الاسم" error={form.formState.errors.name?.message}>
        <Input className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white placeholder:text-[#58607c]" {...form.register("name")} />
      </FormField>
      <FormField label="البريد الإلكتروني" error={form.formState.errors.email?.message}>
        <Input className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white placeholder:text-[#58607c]" {...form.register("email")} />
      </FormField>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="الهاتف" error={form.formState.errors.phone?.message}>
          <Input className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white placeholder:text-[#58607c]" {...form.register("phone")} />
        </FormField>
        <FormField label="اسم الشركة" error={form.formState.errors.companyName?.message}>
          <Input className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white placeholder:text-[#58607c]" {...form.register("companyName")} />
        </FormField>
      </div>
      <div className="flex flex-wrap gap-2 pt-1">
        <Button type="submit" className="h-10 rounded-[10px] bg-[#6f52ff] px-4 text-[13px] font-bold text-white hover:bg-[#7b63ff]" disabled={isPending}>
          {isPending ? "جارٍ الحفظ..." : submitLabel}
        </Button>
        {onCancel ? (
          <Button type="button" variant="secondary" className="h-10 rounded-[10px] border border-[#252a42] bg-[#1d2135] px-4 text-[13px] font-bold text-[#c7cce0] hover:bg-[#262b49] hover:text-white" onClick={onCancel}>
            إلغاء
          </Button>
        ) : null}
      </div>
    </form>
  );
}
