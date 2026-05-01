"use client";

import { AlertTriangle, ShieldX } from "lucide-react";

import { Button } from "@/components/shared";
import { portalCopy } from "@/constants";

interface PortalErrorSectionProps {
  errorCode?: string;
  message?: string;
  onReset?: () => void;
}

export function PortalErrorSection({
  errorCode,
  message,
  onReset,
}: PortalErrorSectionProps) {
  const copy =
    portalCopy.errors[
      (errorCode as keyof typeof portalCopy.errors) || "generic"
    ] ?? portalCopy.errors.generic;

  return (
    <section
      dir="rtl"
      className="mx-auto flex min-h-[50vh] w-full max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center"
    >
      <div className="rounded-full border border-red-500/20 bg-red-500/10 p-4 text-red-300">
        {errorCode?.startsWith("PORTAL_TOKEN") ? (
          <ShieldX className="size-8" />
        ) : (
          <AlertTriangle className="size-8" />
        )}
      </div>
      <h2 className="text-2xl font-black text-white">{copy.ar}</h2>
      <p className="max-w-xl text-sm leading-7 text-[#aeb5d1]">
        {message || copy.en}
      </p>
      {onReset ? (
        <Button
          onClick={onReset}
          className="rounded-xl bg-[#6f52ff] px-5 text-white hover:bg-[#7b63ff]"
        >
          {portalCopy.actions.reset.ar}
        </Button>
      ) : null}
    </section>
  );
}
