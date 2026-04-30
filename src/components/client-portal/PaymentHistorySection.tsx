import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Copy,
  DollarSign,
  Download,
  ExternalLink,
  LockKeyhole,
  Search,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import type React from "react";

import { Button } from "@/components/shared";
import { clientPortalContent } from "@/constants";
import { cn } from "@/lib/utils";

const heroActionStyles = {
  primary:
    "border-transparent bg-gradient-to-br from-[#6d5dfc] to-[#8f7bff] text-white shadow-[0_10px_24px_rgba(109,93,252,0.3)] hover:opacity-95",
  secondary:
    "border-white/[0.08] bg-[#232741] text-[#d5d8ee] hover:bg-[#292d49]",
  ghost:
    "border-white/[0.08] bg-transparent text-[#b6bddb] hover:bg-white/[0.04]",
} as const;

const summaryIconMap = {
  wallet: DollarSign,
  lock: LockKeyhole,
  check: Check,
  clock: Clock3,
} as const;

const summaryToneStyles = {
  purple: {
    value: "text-[#b58cff]",
    icon: "border-[#8d63ff]/25 bg-[#8d63ff]/10 text-[#b58cff]",
  },
  blue: {
    value: "text-[#67a8ff]",
    icon: "border-[#3b82f6]/25 bg-[#3b82f6]/10 text-[#67a8ff]",
  },
  green: {
    value: "text-[#46e28b]",
    icon: "border-emerald-400/25 bg-emerald-400/[0.10] text-[#46e28b]",
  },
  amber: {
    value: "text-[#f6c453]",
    icon: "border-amber-400/25 bg-amber-400/[0.10] text-[#f6c453]",
  },
} as const;

const paymentStatusStyles = {
  purple: "border-[#8d63ff]/25 bg-[#8d63ff]/12 text-[#b58cff]",
  blue: "border-[#3b82f6]/25 bg-[#3b82f6]/12 text-[#67a8ff]",
  amber: "border-amber-400/25 bg-amber-400/[0.12] text-[#f6c453]",
} as const;

const historyActionIcons = {
  arrow: ArrowLeft,
  download: Download,
  copy: Copy,
} as const;

const selectedReceiptActionIcons = {
  download: Download,
  copy: Copy,
  external: ExternalLink,
  arrow: ArrowLeft,
} as const;

function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-[22px] border border-white/[0.07] bg-[#15192d]",
        className,
      )}
    >
      {children}
    </section>
  );
}

function PanelHeader({
  title,
  trailing,
}: {
  title: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-start">
      <div className="flex items-center gap-2">
        <span className="flex size-[15px] items-center justify-center text-[#8b92b3]">
          <ShieldCheck className="size-[15px]" aria-hidden="true" />
        </span>
        <h2 className="text-[15px] font-extrabold leading-[22.5px] text-white">
          {title}
        </h2>
      </div>
      {trailing}
    </div>
  );
}

function SummaryCards() {
  const { summaryCards } = clientPortalContent.paymentHistory;

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {summaryCards.map((card) => {
        const Icon = summaryIconMap[card.icon];
        const tone = summaryToneStyles[card.tone];

        return (
          <Panel key={card.label} className="p-4 sm:p-[16.8px]">
            <div className="flex items-start justify-between gap-3">
              <div className="text-start">
                <p className={cn("text-[33px] font-black leading-[33px]", tone.value)}>
                  {card.value}
                </p>
                <h3 className="mt-5 text-[18px] font-extrabold leading-[18px] text-white">
                  {card.label}
                </h3>
                <p className="mt-2 text-[15px] leading-[15.4px] text-[#7f86a8]">
                  {card.description}
                </p>
              </div>

              <span className={cn("flex size-9 items-center justify-center rounded-[12px] border", tone.icon)}>
                <Icon className="size-[14px]" aria-hidden="true" />
              </span>
            </div>
          </Panel>
        );
      })}
    </div>
  );
}

function Sidebar() {
  const { sidebar } = clientPortalContent.paymentHistory;

  return (
    <aside className="space-y-4 xl:col-span-3">
      <Panel className="p-6">
        <PanelHeader title={sidebar.financialSummary.title} />
        <div className="mt-4 space-y-1 text-start text-[24px] leading-[24px] text-[#d5d8ee]">
          {sidebar.financialSummary.rows.map((row) => (
            <p key={row.label}>
              <span className="text-white">{row.label}</span>
              <span className="text-[#8b92b3]"> </span>
              <span className="text-[#8f7bff]">{row.value}</span>
            </p>
          ))}
        </div>

        <div className="mt-5 h-[5px] overflow-hidden rounded-full bg-white/[0.12]">
          <div
            className="h-full rounded-full bg-[#59a7ff]"
            style={{ width: `${sidebar.financialSummary.progress.reservedPercent}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-[15px] text-[#8b92b3]">
          <span>{sidebar.financialSummary.progress.remainingLabel}</span>
          <span className="text-[#59a7ff]">{sidebar.financialSummary.progress.reservedLabel}</span>
        </div>
      </Panel>

      <Panel className="p-6">
        <PanelHeader title={sidebar.currentStatus.title} />
        <p className="mt-4 text-[18px] leading-[36px] text-[#d5d8ee]">
          {sidebar.currentStatus.description}
        </p>
        <div className="mt-5 inline-flex rounded-full border border-[#8d63ff]/25 bg-[#8d63ff]/12 px-3 py-1 text-[15px] font-bold text-[#a78bfa]">
          {sidebar.currentStatus.badge}
        </div>
        <Button
          type="button"
          className="mt-6 h-[36.5px] w-full rounded-[12px] bg-gradient-to-br from-[#6d5dfc] to-[#8f7bff] text-[18px] font-black text-white hover:opacity-95"
        >
          <ExternalLink className="size-3.5" aria-hidden="true" />
          {sidebar.currentStatus.actionLabel}
        </Button>
      </Panel>

      <Panel className="p-6">
        <PanelHeader title={sidebar.receiptShortcuts.title} />
        <div className="mt-4 space-y-2.5">
          {sidebar.receiptShortcuts.items.map((item) => {
            const Icon = item.icon === "copy" ? Copy : Download;

            return (
              <Button
                key={item.label}
                type="button"
                variant="outline"
                className="h-[34.1px] w-full justify-between rounded-[10px] border-white/[0.08] bg-transparent px-3 text-[15px] font-medium text-[#b8bdd8] hover:bg-white/[0.03]"
              >
                <Icon className="size-[11px]" aria-hidden="true" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </Panel>

      <Panel className="p-6">
        <PanelHeader title={sidebar.releaseRules.title} />
        <div className="mt-4 space-y-3 text-start text-[17px] leading-[17px] text-[#b8bdd8]">
          {sidebar.releaseRules.items.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="mt-[6px] size-1.5 shrink-0 rounded-full bg-[#3b82f6]" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[20px] font-extrabold text-[#f2c84b]">{sidebar.demoNote.title}</h3>
          <Clock3 className="size-[13px] text-[#f2c84b]" aria-hidden="true" />
        </div>
        <p className="mt-4 text-[18px] leading-[32px] text-[#d5d8ee]">
          {sidebar.demoNote.description}
        </p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.08] px-3 py-1 text-[15px] font-bold text-[#f2c84b]">
          <Clock3 className="size-[9px]" aria-hidden="true" />
          {sidebar.demoNote.badge}
        </div>
      </Panel>
    </aside>
  );
}

function PaymentsWorkspace() {
  const { paymentsWorkspace } = clientPortalContent.paymentHistory;

  return (
    <div className="space-y-4 xl:col-span-9">
      <Panel className="p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">
          {paymentsWorkspace.filters.chips.map((chip, index) => (
            <button
              key={chip}
              type="button"
              className={cn(
                "rounded-full border px-3 py-1 text-[13px] font-bold transition-colors",
                index === 0
                  ? "border-[#6d5dfc]/35 bg-[#6d5dfc]/15 text-[#a78bfa]"
                  : "border-white/[0.08] bg-transparent text-[#b8bdd8] hover:bg-white/[0.04]",
              )}
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_repeat(4,minmax(0,96px))]">
          <div className="flex h-[35.6px] items-center justify-between rounded-[10px] border border-white/[0.08] bg-[#111528] px-3 text-[12px] text-[#7f86a8]">
            <Search className="size-[13px]" aria-hidden="true" />
            <span>{paymentsWorkspace.filters.searchPlaceholder}</span>
          </div>

          {paymentsWorkspace.filters.selects.map((select) => (
            <div
              key={select}
              className="flex h-[34.1px] items-center justify-between rounded-[10px] border border-white/[0.08] bg-[#111528] px-3 text-[12px] text-[#b8bdd8]"
            >
              <ChevronDown className="size-[11px] text-[#7f86a8]" aria-hidden="true" />
              <span>{select}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-5 py-5">
          <PanelHeader
            title={paymentsWorkspace.operations.title}
            trailing={
              <span className="rounded-full border border-white/[0.07] bg-[#1a1f36] px-2.5 py-1 text-[11px] font-bold text-[#b8bdd8]">
                {paymentsWorkspace.operations.count}
              </span>
            }
          />
        </div>

        <div className="hidden border-y border-white/[0.07] bg-white/[0.02] px-5 py-3 xl:grid xl:grid-cols-[90px_110px_65px_105px_105px_135px_90px_100px] xl:gap-4">
          {paymentsWorkspace.operations.columns.map((column) => (
            <p key={column} className="text-[12px] font-bold text-[#7f86a8]">
              {column}
            </p>
          ))}
        </div>

        <div className="divide-y divide-white/[0.07]">
          {paymentsWorkspace.operations.rows.map((row) => (
            <div
              key={`${row.action}-${row.stage}`}
              className="px-5 py-4 xl:grid xl:grid-cols-[90px_110px_65px_105px_105px_135px_90px_100px] xl:items-center xl:gap-4"
            >
              <div className="mb-3 grid gap-3 text-start xl:mb-0 xl:contents">
                <div className="xl:order-8">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-[34px] min-w-[100px] rounded-[10px] border-white/[0.08] bg-white/[0.03] px-3 text-[12px] font-bold text-[#b8bdd8] hover:bg-white/[0.05]"
                  >
                    {row.actionLabel}
                  </Button>
                </div>
                <p className="text-[12px] text-[#b8bdd8] xl:order-7">{row.date}</p>
                <p className="text-[12px] text-[#d5d8ee] xl:order-6">{row.receipt}</p>
                <p className="text-[12px] text-[#d5d8ee] xl:order-5">{row.paymentMethod}</p>
                <div className="xl:order-4">
                  <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold", paymentStatusStyles[row.statusTone])}>
                    {row.status}
                  </span>
                </div>
                <p className="text-[12px] font-bold text-white xl:order-3">{row.amount}</p>
                <p className="text-[12px] leading-6 text-[#b8bdd8] xl:order-2">{row.stage}</p>
                <div className="flex items-center gap-2 text-[12px] font-bold text-[#d5d8ee] xl:order-1">
                  <span className="flex size-6 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04]">
                    <WalletCards className="size-[11px]" aria-hidden="true" />
                  </span>
                  <span>{row.action}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="p-5">
        <PanelHeader
          title={paymentsWorkspace.selectedReceipt.title}
          trailing={
            <span className="rounded-full border border-white/[0.07] bg-[#1a1f36] px-2.5 py-1 text-[11px] font-bold text-[#b8bdd8]">
              {paymentsWorkspace.selectedReceipt.selectedLabel}
            </span>
          }
        />

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {paymentsWorkspace.selectedReceipt.rows.map((row) => (
            <div key={row.label} className="rounded-[12px] border border-white/[0.07] bg-[#101427] px-4 py-3 text-start">
              <p className="text-[12px] text-[#7f86a8]">{row.label}</p>
              <p className="mt-2 text-[15px] font-medium text-[#d5d8ee]">{row.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 rounded-[14px] border border-emerald-400/15 bg-emerald-400/[0.08] px-4 py-4 text-center">
          <span className="text-[15px] text-[#7f86a8]">{paymentsWorkspace.selectedReceipt.amountLabel}</span>
          <span className="text-[30px] font-black leading-[39px] text-[#43ea80]">{paymentsWorkspace.selectedReceipt.amount}</span>
        </div>

        <p className="mt-3 flex items-start gap-2 text-[12px] leading-[17px] text-[#b8bdd8]">
          <CheckCircle2 className="mt-0.5 size-[11px] shrink-0 text-[#46e28b]" aria-hidden="true" />
          <span>{paymentsWorkspace.selectedReceipt.note}</span>
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {paymentsWorkspace.selectedReceipt.actions.map((action) => {
            const Icon = selectedReceiptActionIcons[action.icon];

            return (
              <Button
                key={action.label}
                type="button"
                variant="outline"
                className="h-[34.1px] rounded-[10px] border-white/[0.08] bg-white/[0.03] px-4 text-[12px] font-bold text-[#b8bdd8] hover:bg-white/[0.05]"
              >
                <Icon className="size-[11px]" aria-hidden="true" />
                {action.label}
              </Button>
            );
          })}
        </div>

        <p className="mt-3 flex items-start gap-2 text-[11px] leading-[15px] text-[#7f86a8]">
          <Clock3 className="mt-0.5 size-[10px] shrink-0" aria-hidden="true" />
          <span>{paymentsWorkspace.selectedReceipt.disclaimer}</span>
        </p>
      </Panel>

      <Panel className="p-5">
        <PanelHeader title={paymentsWorkspace.stageStatuses.title} />
        <p className="mt-3 text-[13px] leading-[19px] text-[#7f86a8]">
          {paymentsWorkspace.stageStatuses.description}
        </p>

        <div className="mt-4 space-y-3">
          {paymentsWorkspace.stageStatuses.items.map((item) => (
            <div key={item.order} className="rounded-[14px] border border-white/[0.07] bg-[#101427] p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="text-start">
                  <h3 className="text-[15px] font-bold text-white">{item.stage}</h3>
                  <p className="mt-1 text-[12px] text-[#7f86a8]">{item.description}</p>
                </div>
                <span className="flex size-8 items-center justify-center rounded-[10px] bg-[#221c48] text-[13px] font-black text-[#a78bfa]">
                  {item.order}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-[24px] font-black text-white">{item.amount}</span>
                <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold", paymentStatusStyles[item.statusTone])}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="p-5">
        <PanelHeader title={paymentsWorkspace.timeline.title} />

        <div className="mt-5 space-y-0">
          {paymentsWorkspace.timeline.items.map((item, index) => (
            <div key={item.title} className="flex gap-4 text-start">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full border text-[11px] font-bold",
                    item.state === "completed" && "border-emerald-400/25 bg-emerald-400/[0.12] text-[#46e28b]",
                    item.state === "current" && "border-[#8d63ff]/25 bg-[#8d63ff]/12 text-[#a78bfa]",
                    item.state === "upcoming" && "border-white/[0.08] bg-white/[0.04] text-[#7f86a8]",
                  )}
                >
                  {item.state === "completed" ? <Check className="size-3.5" aria-hidden="true" /> : index + 1}
                </span>
                {index < paymentsWorkspace.timeline.items.length - 1 ? (
                  <span className="mt-2 h-[49px] w-px bg-white/[0.08]" aria-hidden="true" />
                ) : null}
              </div>

              <div className="pb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-[15px] font-bold text-white">{item.title}</h3>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-bold",
                      item.state === "completed" && "bg-emerald-400/[0.12] text-[#46e28b]",
                      item.state === "current" && "bg-[#8d63ff]/12 text-[#a78bfa]",
                      item.state === "upcoming" && "bg-white/[0.04] text-[#7f86a8]",
                    )}
                  >
                    {item.state === "completed" ? "مكتمل" : item.state === "current" ? "الحالي" : "قادم"}
                  </span>
                </div>
                <p className="mt-1 text-[12px] text-[#b8bdd8]">{item.description}</p>
                <p className="mt-1 text-[11px] text-[#7f86a8]">{item.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <section className="rounded-[18px] border border-emerald-400/15 bg-emerald-400/[0.06] px-6 py-5 text-start">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 size-[18px] shrink-0 text-[#46e28b]" aria-hidden="true" />
          <div>
            <h2 className="text-[20px] font-extrabold text-[#46e28b]">
              {paymentsWorkspace.footerNotice.title}
            </h2>
            <p className="mt-2 text-[14px] leading-6 text-[#c7cce0]">
              {paymentsWorkspace.footerNotice.description}
            </p>
            <p className="mt-2 text-[12px] leading-5 text-[#7f86a8]">
              {paymentsWorkspace.footerNotice.disclaimer}
            </p>
          </div>
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 pt-2 text-[11px] text-[#7f86a8]">
        {paymentsWorkspace.footerNotice.links.map((link) => (
          <span key={link} className="contents">
            <a href="#" className="transition-colors hover:text-[#b8bdd8]">
              {link}
            </a>
            <span>·</span>
          </span>
        ))}
        <span>{paymentsWorkspace.footerNotice.copyright}</span>
      </footer>
    </div>
  );
}

// AR: صفحة سجل الدفعات تعرض نظرة شاملة على حالة الدفعات والإيصالات وتسلسل الأحداث المرتبط بالاتفاق.
// EN: The payment history page presents a complete view of payment status, receipts, and agreement-linked payment events.
export function PaymentHistorySection() {
  const { paymentHistory } = clientPortalContent;

  return (
    <div dir="rtl" className="min-h-screen bg-[#0d0f1a] text-white">
      <main className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
        <section className="text-center">
          <h1 className="text-[26px] font-black leading-[39px] text-white">
            {paymentHistory.title}
          </h1>
          <p className="mt-1.5 text-[13px] leading-[19.5px] text-[#7f86a8]">
            {paymentHistory.description}
          </p>
        </section>

        <Panel className="mt-6 overflow-hidden bg-[linear-gradient(90deg,#181332_0%,#17162d_30%,#131a2c_100%)] px-6 py-6 sm:px-7 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
            <div className="grid grid-cols-2 gap-0 overflow-hidden rounded-[16px] border border-white/[0.07] bg-white/[0.03] lg:grid-cols-4">
              {paymentHistory.hero.stats.map((stat) => {
                const tone = summaryToneStyles[stat.tone];

                return (
                  <div key={stat.label} className="border-white/[0.07] p-4 text-start not-last:border-s">
                    <p className={cn("text-[33px] font-black leading-[33px]", tone.value)}>{stat.value}</p>
                    <p className="mt-3 text-[15px] text-[#7f86a8]">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="text-start">
              <p className="text-[11px] text-[#7f86a8]">{paymentHistory.hero.eyebrow}</p>
              <h2 className="mt-3 text-[22px] font-black leading-[33px] text-white">
                {paymentHistory.hero.projectTitle}
              </h2>
              <p className="mt-2 text-[13px] leading-[18px] text-[#7f86a8]">
                {paymentHistory.hero.parties}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {paymentHistory.hero.badges.map((badge) => (
                  <span
                    key={badge.label}
                    className={cn(
                      "inline-flex h-[30px] items-center rounded-full border px-3.5 text-[12px] font-bold",
                      badge.className,
                    )}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {paymentHistory.hero.actions.map((action) => {
                  const Icon = historyActionIcons[action.icon];

                  return (
                    <Button
                      key={action.label}
                      type="button"
                      variant="outline"
                      className={cn(
                        "h-[39.5px] justify-center gap-2 rounded-[12px] px-5 text-[14px] font-bold",
                        action.variant === "primary" && "h-[43px] min-w-[212px] text-[18px] font-black",
                        heroActionStyles[action.variant],
                      )}
                    >
                      <Icon className={cn(action.variant === "primary" ? "size-[13px]" : "size-3")} aria-hidden="true" />
                      {action.label}
                    </Button>
                  );
                })}
              </div>

              <p className="mt-4 flex items-start gap-2 text-[11px] leading-[16.5px] text-[#7f86a8]">
                <Clock3 className="mt-0.5 size-[11px] shrink-0" aria-hidden="true" />
                <span>{paymentHistory.hero.note}</span>
              </p>
            </div>
          </div>
        </Panel>

        <div className="mt-4">
          <SummaryCards />
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-12">
          <Sidebar />
          <PaymentsWorkspace />
        </div>
      </main>
    </div>
  );
}
