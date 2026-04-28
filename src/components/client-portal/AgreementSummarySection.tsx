import {
  CircleDollarSign,
  FileText,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import type {
  PortalAgreement,
  PortalParty,
  PortalPayment,
  PortalProjectSummary,
} from "@/types";

interface AgreementSummarySectionProps {
  agreement: PortalAgreement;
  parties: PortalParty[];
  project: PortalProjectSummary;
  payments: PortalPayment[];
}

export function AgreementSummarySection({
  agreement,
  parties,
  project,
  payments,
}: AgreementSummarySectionProps) {
  return (
    <section
      aria-label="ملخص الاتفاق"
      className="section-wrapper grid gap-4 lg:grid-cols-[360px_1fr] lg:items-start"
    >
      

      <article className="rounded-2xl border border-white/[0.07] bg-[#131627] p-5 text-start lg:min-h-[381px]">
        <div className="flex items-center justify-start gap-2">
          <FileText className="size-4 text-[#a78bfa]" aria-hidden="true" />
          <h2 className="text-[15px] font-extrabold text-white">
            ملخص المشروع
          </h2>
        </div>

        <h3 className="mt-5 text-[15px] font-extrabold leading-7 text-white">
          {project.title}
        </h3>
        <p className="mt-1.5 text-xs leading-5 text-[#b8bdd8]">
          {project.description}
        </p>

        <dl className="mt-5 grid gap-2">
          {project.details.map((detail) => (
            <div
              key={detail.label}
              className="flex items-start justify-between gap-4"
            >
              <dt className="text-[11px] font-medium text-[#7f86a8]">
                {detail.label}
              </dt>
              <dd className="text-xs font-bold text-[#b8bdd8]">
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 grid gap-2">
          {project.roles.map((role) => (
            <div key={role.title} className={role.className}>
              <p className="text-[10px] font-extrabold uppercase tracking-normal text-[#7f86a8]">
                {role.title}
              </p>
              <p className="mt-1 text-xs leading-5 text-[#b8bdd8]">
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </article>
      <article className="rounded-2xl border border-white/[0.07] bg-[#131627] p-5 text-start">
        <div className="flex items-center justify-start gap-2">
          <UserRound className="size-4 text-[#60a5fa]" aria-hidden="true" />
          <h2 className="text-[15px] font-extrabold text-white">الأطراف</h2>
        </div>

        <div className="mt-5 grid gap-3">
          {parties.map((party) => (
            <div
              key={party.email}
              className={`flex items-start gap-3 rounded-xl border p-3.5 ${party.className}`}
            >
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-[10px] ${party.avatarClassName}`}
              >
                <span
                  className={`text-base font-extrabold ${party.avatarTextClassName}`}
                >
                  {party.initial}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="text-[13px] font-extrabold leading-5 text-white">
                  {party.name}
                </h3>
                <p className="text-[10px] leading-5 text-[#7f86a8]">
                  {party.role}
                </p>
                <p className="truncate text-[11px] leading-5 text-[#7f86a8]">
                  {party.email}
                </p>
                <p className="mt-0.5 text-[11px] leading-5 text-[#b8bdd8]">
                  {party.responsibility}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t border-white/[0.07] pt-4">
          <div className="flex items-center justify-start gap-2">
            <CircleDollarSign
              className="size-4 text-[#4ade80]"
              aria-hidden="true"
            />
            <h2 className="text-[15px] font-extrabold text-white">
              ملخص الدفع
            </h2>
          </div>

          <p className="mt-4 text-[28px] font-black leading-normal text-[#4ade80]">
            {agreement.total}
          </p>
          <p className="mt-1 text-[11px] text-[#7f86a8]">
            دفعات مرتبطة بالمراحل · {agreement.stagesLabel}
          </p>

          <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-2 text-[11px] leading-5 text-[#4ade80]">
            <ShieldCheck className="size-3" aria-hidden="true" />
            <span>كل دفعة ترتبط بمرحلة وشروط قبول واضحة.</span>
          </div>

          <div className="mt-4 grid gap-2">
            {payments.map((payment) => (
              <div
                key={payment.label}
                className="flex items-center justify-between gap-4"
              >
                <p
                  className={`text-[13px] font-extrabold ${payment.colorClassName ?? "text-[#4ade80]"}`}
                >
                  {payment.amount}
                </p>
                <div className="flex items-center gap-2 text-xs text-[#b8bdd8]">
                  <span
                    className={`size-2 rounded-full ${payment.dotClassName ?? "bg-[#4ade80]"}`}
                    aria-hidden="true"
                  />
                  <span>{payment.label}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 rounded-lg border border-white/[0.07] bg-[#1a1d2e] p-3 text-[10px] leading-5 text-[#7f86a8]">
            بعد الموافقة، يتم اعتبار الدفعة الأولى محجوزة افتراضيًا داخل النظام
            حتى يتم تسليم المرحلة ومراجعتها.
          </p>
        </div>
      </article>
    </section>
  );
}
