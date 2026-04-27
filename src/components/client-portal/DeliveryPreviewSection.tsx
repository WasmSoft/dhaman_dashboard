import {
  Bot,
  CheckCircle2,
  Clock3,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Info,
  Layers3,
  MessageSquareText,
  TriangleAlert,
} from "lucide-react";

import { Button } from "@/components/shared";
import { clientPortalContent } from "@/constants";
import { cn } from "@/lib/utils";
import type {
  PortalDeliveryPreviewHero,
  PortalDeliveryPreviewStageDetails,
  PortalDeliveryPreviewSubmission,
} from "@/types";

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
        <div className="mt-5 overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#111426] text-start shadow-[0_10px_40px_rgba(0,0,0,0.22)]">
          <StageDetailsCard details={deliveryPreview.stageDetails} />
          <SubmissionCard submission={deliveryPreview.submission} />
        </div>
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

function StageDetailsCard({
  details,
}: {
  details: PortalDeliveryPreviewStageDetails;
}) {
  return (
    <section className="border-b border-white/[0.08] p-5 sm:p-6">
      <SectionTitle icon={Layers3} title={details.title} iconClassName="text-[#a78bfa]" />

      <dl className="mt-5 divide-y divide-white/[0.07]">
        {details.rows.map((row) => (
          <div
            key={row.label}
            className="grid gap-1 py-2.5 text-[12px] leading-[1.5] sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-center sm:gap-6"
          >
            <dt className="text-[#7f86a8]">{row.label}</dt>
            <dd
              className={cn(
                "font-extrabold text-[#d8dcf0] sm:order-first",
                row.tone === "green" && "text-[#4ade80]",
                row.tone === "purple" && "text-[#a78bfa]",
                row.tone === "warning" && "text-[#fbbf24]",
              )}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 flex items-center gap-2 rounded-[8px] border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-[11px] leading-[1.7] text-[#b8bdd8]">
        <Info className="size-3 shrink-0 text-[#7f86a8]" aria-hidden="true" />
        {details.note}
      </p>
    </section>
  );
}

function SubmissionCard({
  submission,
}: {
  submission: PortalDeliveryPreviewSubmission;
}) {
  return (
    <section className="p-5 sm:p-6">
      <div className="flex flex-col gap-4  sm:items-start sm:justify-between">
        <div>
          <SectionTitle
            icon={FileText}
            title={submission.title}
            iconClassName="text-[#60a5fa]"
          />
          <p className="mt-3 text-[12px] leading-[1.7] text-[#7f86a8]">
            {submission.description}
          </p>
        </div>

        <div className="flex items-center gap-3 sm:flex-row-reverse">
          <div className="flex size-9 items-center justify-center rounded-[10px] bg-[#6d5dfc]/35 text-sm font-black text-[#c4b5fd]">
            {submission.freelancer.avatarLabel}
          </div>
          <div className="text-start sm:text-end">
            <p className="text-[13px] font-black text-white">
              {submission.freelancer.name}
            </p>
            <p className="text-[11px] leading-[1.5] text-[#7f86a8]">
              {submission.freelancer.uploadedAt}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {submission.attachments.map((attachment) => (
          <AttachmentRow key={attachment.title} attachment={attachment} />
        ))}
      </div>

      <TextPanel label={submission.summary.label} text={submission.summary.text} />
      <TextPanel
        label={submission.notes.label}
        text={submission.notes.text}
        icon={MessageSquareText}
        className="border-[#2f80ed]/15 bg-[#2f80ed]/[0.06]"
      />
    </section>
  );
}

function AttachmentRow({
  attachment,
}: {
  attachment: PortalDeliveryPreviewSubmission["attachments"][number];
}) {
  const isLink = attachment.kind === "link";

  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-[10px] border p-4 sm:flex-row sm:items-center sm:justify-between",
        isLink
          ? "border-[#2f80ed]/20 bg-[#2f80ed]/[0.06]"
          : "border-red-400/15 bg-red-400/[0.04]",
      )}
    >
      <div className="min-w-0 sm:order-last sm:text-start">
        <h3 className="text-[12px] font-black leading-[1.5] text-white">
          {attachment.title}
        </h3>
        <p
          className={cn(
            "mt-1 truncate text-[10px] leading-[1.5]",
            isLink ? "text-[#60a5fa]" : "text-[#7f86a8]",
          )}
        >
          {attachment.meta}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {attachment.actions.map((action) => (
          <Button
            key={action.label}
            type="button"
            variant="outline"
            size="sm"
            className="h-8 rounded-[8px] border-white/[0.08] bg-[#0f1222] px-3 text-[11px] font-bold text-[#d8dcf0] hover:bg-[#1a1d2e] hover:text-white"
          >
            <AttachmentActionIcon icon={action.icon} />
            {action.label}
          </Button>
        ))}
      </div>

      <div
        className={cn(
          "hidden size-9 items-center justify-center rounded-[10px] border sm:flex",
          isLink
            ? "border-[#2f80ed]/25 bg-[#2f80ed]/15 text-[#60a5fa]"
            : "border-red-400/25 bg-red-400/15 text-red-300",
        )}
        aria-hidden="true"
      >
        {isLink ? <ExternalLink className="size-4" /> : <FileText className="size-4" />}
      </div>
    </article>
  );
}

function TextPanel({
  label,
  text,
  icon: Icon,
  className,
}: {
  label: string;
  text: string;
  icon?: typeof MessageSquareText;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "mt-3 rounded-[10px] border border-white/[0.08] bg-white/[0.03] p-4 text-[12px] leading-[1.7]",
        className,
      )}
    >
      <h3 className="flex items-center gap-1.5 text-[11px] font-black text-[#7f86a8]">
        {Icon ? <Icon className="size-3" aria-hidden="true" /> : null}
        {label}
      </h3>
      <p className="mt-3 text-[#d8dcf0]">{text}</p>
    </article>
  );
}

function SectionTitle({
  icon: Icon,
  title,
  iconClassName,
}: {
  icon: typeof Layers3;
  title: string;
  iconClassName?: string;
}) {
  return (
    <h2 className="flex items-center gap-2 text-[17px] font-black leading-[1.5] text-white">
      <Icon className={cn("size-4", iconClassName)} aria-hidden="true" />
      {title}
    </h2>
  );
}

function AttachmentActionIcon({
  icon,
}: {
  icon: PortalDeliveryPreviewSubmission["attachments"][number]["actions"][number]["icon"];
}) {
  if (icon === "copy") {
    return <Copy className="size-3" aria-hidden="true" />;
  }

  if (icon === "download") {
    return <Download className="size-3" aria-hidden="true" />;
  }

  return <ExternalLink className="size-3" aria-hidden="true" />;
}
