import { Bot, CheckCircle2, Clock3, Info, TriangleAlert } from "lucide-react";

import { Button } from "@/components/shared";
import { clientPortalContent } from "@/constants";
import { cn } from "@/lib/utils";
import type { PortalDeliveryPreviewHero } from "@/types";

const badgeClassNames = {
  warning: "border-amber-400/30 bg-amber-400/15 text-[#fbbf24]",
  blue: "border-[#2f80ed]/30 bg-[#2f80ed]/15 text-[#60a5fa]",
  green: "border-emerald-400/25 bg-emerald-400/[0.12] text-[#4ade80]",
  purple: "border-[#6d5dfc]/30 bg-[#6d5dfc]/15 text-[#a78bfa]",
} as const;

const actionClassNames = {
  accept:
    "border-transparent bg-gradient-to-br from-[#16a34a] to-[#22c55e] text-white shadow-[0_2px_6px_rgba(34,197,94,0.3)] hover:from-[#15803d] hover:to-[#16a34a]",
  secondary:
    "border-white/[0.12] bg-[#1a1d2e] text-[#b8bdd8] hover:bg-[#20243a] hover:text-white",
  ai: "border-[#6d5dfc]/30 bg-[#6d5dfc]/[0.12] text-[#a78bfa] hover:bg-[#6d5dfc]/20 hover:text-[#c4b5fd]",
} as const;

const actionIcons = {
  check: CheckCircle2,
  bot: Bot,
} as const;

export function DeliveryPreviewSection() {
  const { deliveryPreview } = clientPortalContent;

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#0d0f1a] px-4 py-8 text-[#f1f3fc] sm:px-6 sm:py-10"
      aria-labelledby="delivery-preview-title"
    >
      <section className="mx-auto w-full max-w-[992px]">
        <header className="text-center">
          <h1
            id="delivery-preview-title"
            className="text-[26px] font-black leading-[1.5] tracking-normal text-white"
          >
            {deliveryPreview.title}
          </h1>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-[#7f86a8]">
            {deliveryPreview.description}
          </p>
        </header>

        <DeliveryHero hero={deliveryPreview.hero} />
      </section>
    </main>
  );
}

function DeliveryHero({ hero }: { hero: PortalDeliveryPreviewHero }) {
  return (
    <article className="relative mt-6 overflow-hidden rounded-[18px] border border-amber-400/25 bg-[linear-gradient(164deg,#1a1440_0%,#141729_55%,#0f1222_100%)] p-5 text-start sm:mt-9 sm:p-7">
      <div
        className="pointer-events-none absolute -top-16 end-[-58px] size-60 rounded-full bg-[#6d5dfc]/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_8.15rem] lg:items-start">
        <ValueCard hero={hero} />

        <div className="space-y-6 lg:order-first">
          <div className="space-y-3">
            <p className="text-[10px] leading-[1.5] tracking-[0.06em] text-[#7f86a8]">
              {hero.eyebrow}
            </p>
            <div className="space-y-1">
              <h2 className="text-[19px] font-black leading-[1.5] text-white">
                {hero.title}
              </h2>
              <p className="text-xs leading-[1.5] text-[#b8bdd8]">{hero.meta}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {hero.badges.map((badge) => (
                <span
                  key={badge.label}
                  className={cn(
                    "inline-flex min-h-6 items-center rounded-full border px-2.5 text-[11px] font-bold leading-none",
                    badgeClassNames[badge.tone],
                  )}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-start">
            {hero.actions.map((action) => {
              const Icon = action.icon ? actionIcons[action.icon] : null;

              return (
                <Button
                  key={action.label}
                  type="button"
                  variant="outline"
                  className={cn(
                    "h-[42px] rounded-[10px] px-5 text-[13px] font-extrabold",
                    action.variant === "accept" && "sm:min-w-[226px]",
                    actionClassNames[action.variant],
                  )}
                >
                  {Icon ? <Icon className="size-3.5" aria-hidden="true" /> : null}
                  {action.label}
                </Button>
              );
            })}
          </div>

          <p className="flex items-center gap-1.5 text-[11px] leading-[1.5] text-[#7f86a8]">
            <Info className="size-[11px] shrink-0" aria-hidden="true" />
            {hero.note}
          </p>
        </div>
      </div>
    </article>
  );
}

function ValueCard({ hero }: { hero: PortalDeliveryPreviewHero }) {
  return (
    <aside className="w-full rounded-[14px] border border-amber-400/20 bg-amber-400/[0.08] p-5 text-center sm:max-w-[130px] lg:justify-self-end">
      <p className="text-[28px] font-black leading-[1.5] text-[#4ade80]">
        {hero.amount}
      </p>
      <p className="mt-1 text-[10px] leading-[1.5] text-[#7f86a8]">
        {hero.amountLabel}
      </p>
      <div className="mt-4 space-y-2 text-[10px] leading-[1.5]">
        <p className="flex items-center justify-center gap-1.5 text-[#7f86a8]">
          <Clock3 className="size-2.5" aria-hidden="true" />
          {hero.uploadedAt}
        </p>
        <p className="flex items-center justify-center gap-1.5 font-bold text-[#fbbf24]">
          <TriangleAlert className="size-2.5" aria-hidden="true" />
          {hero.reviewDeadline}
        </p>
      </div>
    </aside>
  );
}
