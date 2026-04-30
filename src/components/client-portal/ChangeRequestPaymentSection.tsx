import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import type React from "react";

import { Button } from "@/components/shared";
import { clientPortalContent } from "@/constants";
import { cn } from "@/lib/utils";

const heroActionIcons = {
  check: CheckCircle2,
  reject: XCircle,
  arrow: ArrowLeft,
} as const;

const heroActionStyles = {
  primary:
    "border-transparent bg-gradient-to-br from-[#f6a91f] to-[#f2c84b] text-[#1b1300] shadow-[0_10px_24px_rgba(246,169,31,0.24)] hover:opacity-95",
  secondary:
    "border-red-400/20 bg-red-400/[0.08] text-[#f87171] hover:bg-red-400/[0.12]",
  ghost:
    "border-white/[0.08] bg-transparent text-[#b6bddb] hover:bg-white/[0.04]",
} as const;

const paymentBadgeStyles = {
  waiting: "border-amber-400/25 bg-amber-400/[0.12] text-[#f6c453]",
  reserved: "border-[#3b82f6]/25 bg-[#3b82f6]/12 text-[#67a8ff]",
  ready: "border-[#8d63ff]/25 bg-[#8d63ff]/12 text-[#b58cff]",
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

function SectionTitle({ title, trailing }: { title: string; trailing?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 text-start">
      <div className="flex items-center gap-2">
        <ShieldCheck className="size-[15px] text-[#8b92b3]" aria-hidden="true" />
        <h2 className="text-[15px] font-extrabold leading-[22.5px] text-white">{title}</h2>
      </div>
      {trailing}
    </div>
  );
}

function HeroSection() {
  const { hero } = clientPortalContent.changeRequestPayment;

  return (
    <Panel className="relative overflow-hidden bg-[linear-gradient(90deg,#2b1e08_0%,#231914_24%,#151a2d_100%)] px-6 py-7 sm:px-8 lg:px-10">
      <div
        className="pointer-events-none absolute -top-16 end-[-20px] size-60 rounded-full bg-[radial-gradient(circle,rgba(246,169,31,0.12)_0%,rgba(246,169,31,0.03)_40%,rgba(0,0,0,0)_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 start-[-24px] size-60 rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.08)_0%,rgba(239,68,68,0.02)_42%,rgba(0,0,0,0)_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 grid gap-6 lg:grid-cols-[190px_minmax(0,1fr)]">
        <div className="order-2 rounded-[18px] border border-amber-400/15 bg-amber-400/[0.06] px-5 py-5 text-start lg:order-1">
          <p className="text-[11px] text-[#7f86a8]">{hero.amountLabel}</p>
          <p className="mt-3 text-[42px] font-black leading-[51px] text-[#f6c453]">{hero.amount}</p>
          <div className={cn("mt-3 inline-flex rounded-full px-3 py-1 text-[12px] font-bold", paymentBadgeStyles.waiting)}>
            {hero.status}
          </div>
          <div className="mt-4 flex items-center gap-2 text-[12px] text-[#d5d8ee]">
            <Clock3 className="size-[11px] text-[#f6c453]" aria-hidden="true" />
            {hero.duration}
          </div>
          <div className="mt-5 border-t border-white/[0.08] pt-4 text-[12px] text-[#7f86a8]">
            <p>المرحلة الأصلية</p>
            <p className="mt-2 text-[#d5d8ee]">{hero.originalPayment}</p>
          </div>
        </div>

        <div className="order-1 text-start lg:order-2">
          <p className="text-[11px] text-[#7f86a8]">{hero.eyebrow}</p>
          <h2 className="mt-3 text-[22px] font-black leading-[29px] text-white">{hero.title}</h2>
          <p className="mt-2 text-[13px] text-[#7f86a8]">{hero.meta}</p>
          <p className="mt-2 text-[13px] text-[#7f86a8]">{hero.project}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {hero.badges.map((badge) => (
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

          <p className="mt-5 flex items-start gap-2 text-[12px] leading-5 text-[#b8bdd8]">
            <CheckCircle2 className="mt-0.5 size-[11px] shrink-0 text-[#f6c453]" aria-hidden="true" />
            <span>{hero.note}</span>
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {hero.actions.map((action) => {
              const Icon = heroActionIcons[action.icon];

              return (
                <Button
                  key={action.label}
                  type="button"
                  variant="outline"
                  className={cn(
                    "h-[39.5px] justify-center gap-2 rounded-[12px] px-5 text-[14px] font-bold",
                    action.variant === "primary" && "min-w-[223px]",
                    action.variant === "secondary" && "min-w-[121px]",
                    action.variant === "ghost" && "min-w-[132px]",
                    heroActionStyles[action.variant],
                  )}
                >
                  <Icon className="size-[12px]" aria-hidden="true" />
                  {action.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </Panel>
  );
}

function WhyChangeRequestSection() {
  const { whyChangeRequest } = clientPortalContent.changeRequestPayment;

  return (
    <Panel className="p-5">
      <SectionTitle
        title={whyChangeRequest.title}
        trailing={
          <span className="inline-flex items-center gap-2 rounded-full border border-[#8d63ff]/25 bg-[#8d63ff]/12 px-3 py-1 text-[11px] font-bold text-[#b58cff]">
            <ShieldCheck className="size-[10px]" aria-hidden="true" />
            {whyChangeRequest.aiLabel}
          </span>
        }
      />
      <p className="mt-4 text-[14px] leading-7 text-[#d5d8ee]">{whyChangeRequest.description}</p>
      <div className="mt-4 space-y-2">
        {whyChangeRequest.items.map((item) => (
          <div key={item} className="flex items-center justify-between gap-3 rounded-[12px] border border-white/[0.07] bg-[#101427] px-4 py-3 text-start">
            <span className="flex-1 text-[13px] text-[#d5d8ee]">{item}</span>
            <CheckCircle2 className="size-[11px] text-[#46e28b]" aria-hidden="true" />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function ScopeComparisonSection() {
  const { scopeComparison } = clientPortalContent.changeRequestPayment;

  return (
    <Panel className="p-5">
      <SectionTitle title={scopeComparison.title} />

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_56px_1fr]">
        <div className="rounded-[16px] border border-white/[0.07] bg-[#101427] p-4 text-start">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[18px] font-bold text-white">{scopeComparison.original.title}</h3>
              <p className="mt-1 text-[12px] text-[#7f86a8]">{scopeComparison.original.subtitle}</p>
            </div>
            <ShieldCheck className="size-5 text-[#46e28b]" aria-hidden="true" />
          </div>
          <div className="mt-4 space-y-2">
            {scopeComparison.original.items.map((item) => (
              <div key={item} className="flex items-center gap-2 text-[13px] text-[#d5d8ee]">
                <CheckCircle2 className="size-[11px] text-[#46e28b]" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between gap-3">
            <span className={cn("inline-flex rounded-full px-3 py-1 text-[12px] font-bold", paymentBadgeStyles.ready)}>
              {scopeComparison.original.status}
            </span>
            <span className="text-[30px] font-black text-[#d5d8ee]">{scopeComparison.original.amount}</span>
          </div>
        </div>

        <div className="hidden items-center justify-center lg:flex">
          <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[12px] font-bold text-[#b8bdd8]">
            VS
          </span>
        </div>

        <div className="rounded-[16px] border border-white/[0.07] bg-[#101427] p-4 text-start">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[18px] font-bold text-white">{scopeComparison.requested.title}</h3>
              <p className="mt-1 text-[12px] text-[#7f86a8]">{scopeComparison.requested.subtitle}</p>
            </div>
            <AlertTriangle className="size-5 text-[#f6c453]" aria-hidden="true" />
          </div>
          <div className="mt-4 space-y-2">
            {scopeComparison.requested.items.map((item) => (
              <div key={item} className="flex items-center gap-2 text-[13px] text-[#d5d8ee]">
                <CheckCircle2 className="size-[11px] text-[#67a8ff]" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between gap-3">
            <span className={cn("inline-flex rounded-full px-3 py-1 text-[12px] font-bold", paymentBadgeStyles.waiting)}>
              {scopeComparison.requested.status}
            </span>
            <div className="text-end">
              <p className="text-[30px] font-black text-[#d5d8ee]">{scopeComparison.requested.amount}</p>
              <p className="mt-1 text-[12px] text-[#f6c453]">{scopeComparison.requested.duration}</p>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function RequestDetailsSection() {
  const { requestDetails } = clientPortalContent.changeRequestPayment;

  return (
    <Panel className="p-5">
      <SectionTitle title={requestDetails.title} />

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {requestDetails.rows.map((row) => (
          <div key={row.label} className="rounded-[12px] border border-white/[0.07] bg-[#101427] px-4 py-3 text-start">
            <p className="text-[12px] text-[#7f86a8]">{row.label}</p>
            <p className="mt-2 text-[15px] font-medium text-[#d5d8ee]">{row.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-[12px] border border-white/[0.07] bg-[#101427] px-4 py-3 text-start">
        <p className="text-[12px] text-[#7f86a8]">سبب الطلب</p>
        <p className="mt-2 text-[14px] text-[#d5d8ee]">{requestDetails.reason}</p>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-[12px] border border-white/[0.07] bg-[#101427] p-4 text-start">
          <div className="flex items-center gap-2 text-[12px] text-[#7f86a8]">
            <FileText className="size-[12px]" aria-hidden="true" />
            <span>التسليمات</span>
          </div>
          <div className="mt-3 space-y-2">
            {requestDetails.deliveries.map((item) => (
              <div key={item} className="flex items-center gap-2 text-[13px] text-[#d5d8ee]">
                <CheckCircle2 className="size-[10px] text-[#67a8ff]" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[12px] border border-white/[0.07] bg-[#101427] p-4 text-start">
          <div className="flex items-center gap-2 text-[12px] text-[#7f86a8]">
            <ShieldCheck className="size-[12px]" aria-hidden="true" />
            <span>شروط القبول</span>
          </div>
          <div className="mt-3 space-y-2">
            {requestDetails.acceptanceCriteria.map((item) => (
              <div key={item} className="flex items-center gap-2 text-[13px] text-[#d5d8ee]">
                <CheckCircle2 className="size-[10px] text-[#46e28b]" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

function PaymentSummarySection() {
  const { paymentSummary } = clientPortalContent.changeRequestPayment;

  return (
    <Panel className="p-5">
      <SectionTitle title={paymentSummary.title} />

      <div className="mt-4 rounded-[16px] border border-white/[0.07] bg-[#101427] px-4 py-3">
        <dl className="divide-y divide-white/[0.07]">
          {paymentSummary.rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4 py-3 text-start text-[13px]">
              <dt className="text-[#7f86a8]">{row.label}</dt>
              <dd className="font-medium text-[#d5d8ee]">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-4 rounded-[16px] border border-amber-400/15 bg-amber-400/[0.06] px-4 py-4 text-center">
        <p className="text-[12px] text-[#7f86a8]">{paymentSummary.totalLabel}</p>
        <p className="mt-2 text-[33px] font-black text-[#f6c453]">{paymentSummary.total}</p>
      </div>

      <p className="mt-4 flex items-start gap-2 text-[12px] leading-5 text-[#7f86a8]">
        <AlertTriangle className="mt-0.5 size-[11px] shrink-0" aria-hidden="true" />
        <span>{paymentSummary.note}</span>
      </p>
    </Panel>
  );
}

function PaymentMethodSection() {
  const { paymentMethod } = clientPortalContent.changeRequestPayment;

  return (
    <Panel className="p-5">
      <SectionTitle title={paymentMethod.title} />
      <p className="mt-3 text-[13px] text-[#7f86a8]">{paymentMethod.description}</p>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_160px]">
        <div className="rounded-[16px] border border-white/[0.07] bg-[#101427] px-4 py-3">
          <div className="space-y-3 text-start text-[13px]">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#7f86a8]">طريقة الدفع</span>
              <span className="text-[#d5d8ee]">{paymentMethod.method}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#7f86a8]">رقم البطاقة</span>
              <span className="text-[#d5d8ee]">{paymentMethod.cardNumber}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#7f86a8]">حامل البطاقة</span>
              <span className="text-[#d5d8ee]">{paymentMethod.cardHolder}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#7f86a8]">الحالة</span>
              <span className="text-[#46e28b]">{paymentMethod.status}</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="mt-4 h-[32.1px] w-full rounded-[10px] border-white/[0.08] bg-white/[0.03] px-4 text-[12px] font-bold text-[#b8bdd8] hover:bg-white/[0.05]"
          >
            <CreditCard className="size-[11px]" aria-hidden="true" />
            {paymentMethod.action}
          </Button>
        </div>

        <div className="rounded-[16px] border border-white/[0.07] bg-[linear-gradient(180deg,#203355_0%,#1d2a46_100%)] p-4 text-start">
          <p className="text-[21px] font-black tracking-[0.08em] text-white">{paymentMethod.cardPreview.brand}</p>
          <p className="mt-10 text-[14px] text-white/90">{paymentMethod.cardPreview.maskedNumber}</p>
          <p className="mt-8 text-[12px] text-white/80">{paymentMethod.cardPreview.holder}</p>
        </div>
      </div>

      <p className="mt-4 flex items-start gap-2 text-[12px] leading-5 text-[#7f86a8]">
        <AlertTriangle className="mt-0.5 size-[11px] shrink-0" aria-hidden="true" />
        <span>{paymentMethod.note}</span>
      </p>
    </Panel>
  );
}

function FlowSection() {
  const { flow } = clientPortalContent.changeRequestPayment;

  return (
    <Panel className="p-5">
      <SectionTitle title={flow.title} />
      <p className="mt-3 text-[14px] leading-7 text-[#d5d8ee]">{flow.description}</p>

      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {flow.steps.map((step, index) => (
          <div key={step} className="flex items-center gap-3 rounded-[12px] border border-white/[0.07] bg-[#101427] px-4 py-3 text-start">
            <span className="inline-flex size-7 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[12px] font-black text-[#d5d8ee]">
              {index + 1}
            </span>
            <span className="text-[13px] text-[#d5d8ee]">{step}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function StatusUpdateSection() {
  const { statusUpdate } = clientPortalContent.changeRequestPayment;

  return (
    <Panel className="p-5">
      <SectionTitle title={statusUpdate.title} />
      <div className="mt-4 rounded-[16px] border border-white/[0.07] bg-[#101427] px-5 py-5">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="text-center">
            <p className="text-[11px] text-[#7f86a8]">{statusUpdate.beforeLabel}</p>
            <span className={cn("mt-2 inline-flex rounded-[12px] px-5 py-2 text-[18px] font-bold", paymentBadgeStyles.waiting)}>
              {statusUpdate.beforeStatus}
            </span>
          </div>

          <ArrowLeft className="size-5 text-[#7f86a8]" aria-hidden="true" />

          <div className="text-center">
            <p className="text-[11px] text-[#7f86a8]">{statusUpdate.afterLabel}</p>
            <span className={cn("mt-2 inline-flex rounded-[12px] px-5 py-2 text-[18px] font-bold", paymentBadgeStyles.reserved)}>
              {statusUpdate.afterStatus}
            </span>
          </div>

          <span className="text-[33px] font-black text-[#f6c453]">{statusUpdate.amount}</span>
        </div>
      </div>

      <p className="mt-4 flex items-start gap-2 text-[12px] leading-5 text-[#7f86a8]">
        <AlertTriangle className="mt-0.5 size-[11px] shrink-0" aria-hidden="true" />
        <span>{statusUpdate.note}</span>
      </p>
    </Panel>
  );
}

function ChecklistSection() {
  const { checklist } = clientPortalContent.changeRequestPayment;

  return (
    <Panel className="p-5">
      <SectionTitle title={checklist.title} />

      <div className="mt-4 space-y-3">
        {checklist.items.map((item) => (
          <label key={item} className="flex items-center justify-between gap-3 text-start">
            <span className="flex size-5 shrink-0 rounded-[4px] border border-white/[0.12] bg-white/[0.03]" aria-hidden="true" />
            <span className="flex-1 text-[13px] text-[#d5d8ee]">{item}</span>
          </label>
        ))}
      </div>

      <div className="mt-5 rounded-[14px] border border-white/[0.07] bg-[#101427] px-4 py-4 text-start">
        <label className="flex items-start justify-between gap-3">
          <span className="flex size-[22px] shrink-0 rounded-[4px] border border-white/[0.12] bg-white/[0.03]" aria-hidden="true" />
          <span className="flex-1 text-[14px] font-medium text-[#d5d8ee]">{checklist.confirmation}</span>
        </label>
      </div>
    </Panel>
  );
}

function ConfirmPaymentSection() {
  const { confirmPayment } = clientPortalContent.changeRequestPayment;

  return (
    <Panel className="p-5">
      <SectionTitle title={confirmPayment.title} />

      <div className="mt-4 grid gap-px overflow-hidden rounded-[16px] border border-white/[0.07] bg-white/[0.07] md:grid-cols-2">
        {confirmPayment.rows.map((row) => (
          <div key={row.label} className="bg-[#101427] px-4 py-4 text-start">
            <p className="text-[12px] text-[#7f86a8]">{row.label}</p>
            <p className="mt-2 text-[18px] font-medium text-[#d5d8ee]">{row.value}</p>
          </div>
        ))}
      </div>

      <Button
        type="button"
        className="mt-4 h-[49px] w-full rounded-[14px] bg-gradient-to-br from-[#f6a91f] to-[#f2c84b] text-[18px] font-black text-[#1b1300] shadow-[0_10px_24px_rgba(246,169,31,0.24)] hover:opacity-95"
      >
        <CheckCircle2 className="size-[15px]" aria-hidden="true" />
        {confirmPayment.primaryAction}
      </Button>

      <div className="mt-3 flex flex-wrap gap-2">
        {confirmPayment.secondaryActions.map((action) => (
          <Button
            key={action}
            type="button"
            variant="outline"
            className="h-[34.1px] rounded-[10px] border-white/[0.08] bg-white/[0.03] px-4 text-[12px] font-bold text-[#b8bdd8] hover:bg-white/[0.05]"
          >
            <ArrowLeft className="size-[11px]" aria-hidden="true" />
            {action}
          </Button>
        ))}
      </div>
    </Panel>
  );
}

function AfterPaymentSection() {
  const { afterPayment } = clientPortalContent.changeRequestPayment;

  return (
    <Panel className="p-5">
      <SectionTitle title={afterPayment.title} />
      <div className="mt-4 space-y-3">
        {afterPayment.steps.map((step, index) => (
          <div key={step} className="flex items-center gap-3 rounded-[12px] border border-white/[0.07] bg-[#101427] px-4 py-3 text-start">
            <span className="inline-flex size-7 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[12px] font-black text-[#d5d8ee]">
              {index + 1}
            </span>
            <span className="text-[13px] text-[#d5d8ee]">{step}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function FooterNoticeSection() {
  const { footerNotice } = clientPortalContent.changeRequestPayment;

  return (
    <>
      <section className="rounded-[18px] border border-emerald-400/15 bg-emerald-400/[0.06] px-6 py-5 text-start">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 size-[18px] shrink-0 text-[#46e28b]" aria-hidden="true" />
          <div>
            <h2 className="text-[20px] font-extrabold text-[#46e28b]">{footerNotice.title}</h2>
            <p className="mt-2 text-[14px] leading-6 text-[#c7cce0]">{footerNotice.description}</p>
            <p className="mt-2 text-[12px] leading-5 text-[#7f86a8]">{footerNotice.disclaimer}</p>
          </div>
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 pt-2 text-[11px] text-[#7f86a8]">
        {footerNotice.links.map((link, index) => (
          <span key={link} className="contents">
            <a href="#" className="transition-colors hover:text-[#b8bdd8]">
              {link}
            </a>
            {index < footerNotice.links.length - 1 ? <span>·</span> : null}
          </span>
        ))}
        <span>·</span>
        <span>{footerNotice.copyright}</span>
      </footer>
    </>
  );
}

function RecapSection() {
  const { recap } = clientPortalContent.changeRequestPayment;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel className="p-5">
        <SectionTitle title={recap.requestSummary.title} />
        <dl className="mt-4 space-y-2 text-start text-[14px] text-[#d5d8ee]">
          {recap.requestSummary.rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4">
              <dt className="text-[#7f86a8]">{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </Panel>

      <Panel className="p-5">
        <SectionTitle title={recap.originalPayment.title} />
        <dl className="mt-4 space-y-2 text-start text-[14px] text-[#d5d8ee]">
          {recap.originalPayment.rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4">
              <dt className="text-[#7f86a8]">{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 inline-flex rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[12px] font-bold text-[#b8bdd8]">
          {recap.originalPayment.badge}
        </div>
      </Panel>

      <Panel className="p-5">
        <SectionTitle title={recap.afterPayment.title} />
        <div className="mt-4 space-y-3 text-start text-[14px] text-[#d5d8ee]">
          {recap.afterPayment.items.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 size-[11px] shrink-0 text-[#46e28b]" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="p-5">
        <SectionTitle title={recap.policy.title} />
        <p className="mt-4 text-[14px] leading-6 text-[#d5d8ee]">{recap.policy.description}</p>
      </Panel>

      <Panel className="p-5 lg:col-span-2">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[18px] font-extrabold text-[#f2c84b]">{recap.demo.title}</h3>
          <Clock3 className="size-[13px] text-[#f2c84b]" aria-hidden="true" />
        </div>
        <p className="mt-3 text-[14px] leading-6 text-[#d5d8ee]">{recap.demo.description}</p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.08] px-3 py-1 text-[12px] font-bold text-[#f2c84b]">
          <Clock3 className="size-[10px]" aria-hidden="true" />
          {recap.demo.badge}
        </div>
      </Panel>
    </div>
  );
}

// AR: صفحة دفع طلب التغيير توضح الفارق بين النطاق الأصلي والطلب الجديد وتربط الدفعة الإضافية بتسليم مستقل.
// EN: The change request payment page clarifies the scope difference and ties the additional payment to a separate deliverable.
export function ChangeRequestPaymentSection() {
  const { changeRequestPayment } = clientPortalContent;

  return (
    <div dir="rtl" className="min-h-screen bg-[#0d0f1a] text-white">
      <main className="mx-auto w-full max-w-[1040px] px-4 py-8 sm:px-6 lg:px-8">
        <section className="text-center">
          <h1 className="text-[26px] font-black leading-[39px] text-white">{changeRequestPayment.title}</h1>
          <p className="mt-1.5 text-[13px] leading-[19.5px] text-[#7f86a8]">{changeRequestPayment.description}</p>
        </section>

        <div className="mt-6 space-y-5">
          <HeroSection />
          <WhyChangeRequestSection />
          <ScopeComparisonSection />
          <RequestDetailsSection />
          <PaymentSummarySection />
          <PaymentMethodSection />
          <FlowSection />
          <StatusUpdateSection />
          <ChecklistSection />
          <ConfirmPaymentSection />
          <AfterPaymentSection />
          <FooterNoticeSection />
          <RecapSection />
        </div>
      </main>
    </div>
  );
}
