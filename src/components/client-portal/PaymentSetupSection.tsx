import { ArrowRight, FileText, Info, LockKeyhole } from "lucide-react";

import { Button } from "@/components/shared/button";
import { PaymentSetupDetailsSection } from "@/components/client-portal/PaymentSetupDetailsSection";
import { PaymentSetupOutcomeSection } from "@/components/client-portal/PaymentSetupOutcomeSection";
import { clientPortalContent } from "@/constants";
import { cn } from "@/lib/utils";
import type { PortalPaymentSetupAction } from "@/types";

const actionIcons = {
  lock: LockKeyhole,
  file: FileText,
  arrow: ArrowRight,
} as const;

const actionClassNames: Record<PortalPaymentSetupAction["variant"], string> = {
  primary:
    "border-transparent bg-gradient-to-br from-[#6d5dfc] to-[#7c6cff] text-white shadow-[0_2px_14px_rgba(109,93,252,0.35)] hover:opacity-95",
  secondary:
    "border-white/[0.12] bg-[#1a1d2e] text-[#b8bdd8] hover:bg-[#20243a] hover:text-white",
  ghost:
    "border-white/[0.07] bg-transparent text-[#7f86a8] hover:bg-white/[0.04] hover:text-[#b8bdd8]",
};

export function PaymentSetupSection() {
  const { paymentSetup } = clientPortalContent;

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#0d0f1a] px-4 py-8 text-white sm:px-6 lg:px-8"
      aria-labelledby="payment-setup-title"
    >
      <section className="mx-auto w-full max-w-[992px]">
        <div className="text-center">
          <h1
            id="payment-setup-title"
            className="text-[26px] font-black leading-[39px]"
          >
            {paymentSetup.title}
          </h1>
          <p className="mt-1.5 text-[13px] leading-[19.5px] text-[#7f86a8]">
            {paymentSetup.description}
          </p>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-[18px] border border-emerald-400/20 bg-[linear-gradient(166deg,#0f1f14_0%,#13162a_50%,#0f1222_100%)] px-5 py-6 sm:px-7 lg:min-h-[255px]">
          <div
            className="pointer-events-none absolute -top-16 end-[-76px] size-60 rounded-full bg-[radial-gradient(circle,rgba(109,93,252,0.18)_0%,rgba(55,47,126,0.09)_35%,rgba(0,0,0,0)_70%)]"
            aria-hidden="true"
          />
          <p className="relative z-10 text-start text-[10px] uppercase leading-[15px] tracking-[0.6px] text-[#7f86a8]">
            {paymentSetup.eyebrow}
          </p>

          <div className="boxs relative z-10 mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_230px] lg:items-start">
            

            <div className="text-start lg:pt-5 w-full">
              <h2 className="text-xl font-black leading-[30px] text-white">
                {paymentSetup.project.title}
              </h2>
              <p className="mt-2 text-xs leading-[18px] text-[#7f86a8]">
                {paymentSetup.project.meta}
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-start gap-1.5">
                {paymentSetup.badges.map((badge) => (
                  <span
                    key={badge.label}
                    className={cn(
                      "inline-flex min-h-6 items-center rounded-full border px-3 py-1 text-[11px] font-bold leading-none",
                      badge.className,
                    )}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                {paymentSetup.actions.map((action) => {
                  const Icon = actionIcons[action.icon];

                  return (
                    <Button
                      key={action.label}
                      type="button"
                      variant="outline"
                      className={cn(
                        "h-[41.5px] justify-center gap-2 rounded-[10px] px-5 text-xs font-bold",
                        action.variant === "primary" &&
                          "min-w-[166px] text-[13px] font-extrabold",
                        action.variant === "secondary" && "min-w-[168px]",
                        action.variant === "ghost" && "min-w-[124px]",
                        actionClassNames[action.variant],
                      )}
                    >
                      <Icon className="size-3.5" aria-hidden="true" />
                      {action.label}
                    </Button>
                  );
                })}
              </div>

              <p className="mt-4 flex items-start gap-1.5 text-[11px] leading-[16.5px] text-[#7f86a8]">
                <Info className="mt-0.5 size-3 shrink-0" aria-hidden="true" />
                <span>{paymentSetup.notice}</span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:w-[230px]">
              {paymentSetup.stats.map((stat) => (
                <article
                  key={stat.label}
                  className={cn(
                    "min-h-[102px] rounded-[14px] border px-3 py-3 text-center",
                    stat.tone === "green"
                      ? "border-emerald-400/25 bg-emerald-400/[0.08]"
                      : "border-white/[0.08] bg-white/[0.04]",
                  )}
                >
                  <p className="text-[10px] leading-[15px] text-[#7f86a8]">
                    {stat.label}
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-[22px] font-black leading-[33px]",
                      stat.tone === "green" ? "text-[#4ade80]" : "text-white",
                    )}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[10px] leading-[15px] text-[#7f86a8]">
                    {stat.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <PaymentSetupDetailsSection details={paymentSetup.details} />
        <PaymentSetupOutcomeSection outcome={paymentSetup.paymentOutcome} />
      </section>
    </main>
  );
}
