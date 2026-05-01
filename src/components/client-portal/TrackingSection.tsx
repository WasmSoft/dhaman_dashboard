"use client";

import Link from "next/link";
import { Copy, Eye } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/components/shared";
import { PortalTimelineSection } from "@/components/client-portal/PortalTimelineSection";
import { TrackingDetailsSection } from "@/components/client-portal/TrackingDetailsSection";
import { TrackingFinalSection } from "@/components/client-portal/TrackingFinalSection";
import { TrackingProgressSection } from "@/components/client-portal/TrackingProgressSection";
import { clientPortalContent } from "@/constants";
import { usePortalWorkspaceQuery } from "@/hooks/client-portal";
import { buildPortalPath } from "@/lib/client-portal";
import { canClientReviewDelivery, getDeliveryStatusLabel } from "@/lib/deliveries";
import { cn } from "@/lib/utils";

export function TrackingSection({
  portalToken,
}: {
  portalToken?: string;
}) {
  const { tracking } = clientPortalContent;
  const workspaceQuery = usePortalWorkspaceQuery(portalToken ?? "");

  const activeProject = useMemo(() => {
    if (!workspaceQuery.data) {
      return tracking.activeProject;
    }

    return {
      ...tracking.activeProject,
      title: workspaceQuery.data.agreement.title,
      freelancer: workspaceQuery.data.freelancer.name,
      client: workspaceQuery.data.client?.name || tracking.activeProject.client,
      total: workspaceQuery.data.payments[0]?.currency
        ? `${workspaceQuery.data.payments[0].currency} ${workspaceQuery.data.payments.reduce((sum, payment) => sum + Number(payment.amount ?? 0), 0)}`
        : tracking.activeProject.total,
      stagesLabel: `1 من ${workspaceQuery.data.milestones.length} مراحل`,
      progressValue:
        workspaceQuery.data.milestones.length > 0
          ? `${Math.round((workspaceQuery.data.milestones.filter((milestone) => milestone.status === "ACTIVE" || milestone.status === "ACCEPTED").length / workspaceQuery.data.milestones.length) * 100)}%`
          : tracking.activeProject.progressValue,
      stageLabels: workspaceQuery.data.milestones.map((milestone) => milestone.title),
    };
  }, [tracking.activeProject, workspaceQuery.data]);

  const paymentSummary = useMemo(() => {
    if (!workspaceQuery.data) {
      return tracking.paymentSummary;
    }

    return {
      ...tracking.paymentSummary,
      stats: tracking.paymentSummary.stats.map((stat) => {
        if (stat.label.includes("محجوز")) {
          const total = workspaceQuery.data.payments
            .filter((payment) => payment.status === "RESERVED")
            .reduce((sum, payment) => sum + Number(payment.amount ?? 0), 0);
          return { ...stat, value: `${total}` };
        }

        if (stat.label.includes("تحت المراجعة")) {
          const total = workspaceQuery.data.payments
            .filter((payment) => payment.status === "CLIENT_REVIEW" || payment.status === "AI_REVIEW")
            .reduce((sum, payment) => sum + Number(payment.amount ?? 0), 0);
          return { ...stat, value: `${total}` };
        }

        if (stat.label.includes("مصروف")) {
          const total = workspaceQuery.data.payments
            .filter((payment) => payment.status === "RELEASED")
            .reduce((sum, payment) => sum + Number(payment.amount ?? 0), 0);
          return { ...stat, value: `${total}` };
        }

        return stat;
      }),
    };
  }, [tracking.paymentSummary, workspaceQuery.data]);

  const agreementTimeline = !workspaceQuery.data
    ? tracking.agreementTimeline
    : {
        ...tracking.agreementTimeline,
        steps: workspaceQuery.data.timelineSummary.slice(0, 4).map((event, index, all) => ({
          title: event.eventType,
          time: new Date(event.occurredAt).toLocaleDateString("ar-SA"),
          description: event.description || "-",
          state:
            index === 0
              ? "current"
              : index < all.length - 1
                ? "completed"
                : "upcoming",
        })) as typeof tracking.agreementTimeline.steps,
      };

  const progressDetails = useMemo(() => {
    if (!workspaceQuery.data) {
      return tracking.progressDetails;
    }

    return {
      ...tracking.progressDetails,
      milestones: {
        ...tracking.progressDetails.milestones,
        items: workspaceQuery.data.milestones.map((milestone, index) => ({
          order: index + 1,
          title: milestone.title,
          status: milestone.status ?? "-",
          escrowStatus: milestone.currency || "",
          amount: `${milestone.currency ?? "SAR"} ${milestone.amount}`,
          dueLabel: milestone.description ?? "-",
          acceptanceCriteria: milestone.acceptanceCriteria ?? [],
          defaultOpen: index === 0,
        })),
      },
    };
  }, [tracking.progressDetails, workspaceQuery.data]);

  const finalSummary = useMemo(() => {
    if (!workspaceQuery.data) {
      return tracking.finalSummary;
    }

    return {
      ...tracking.finalSummary,
      agreement: {
        ...tracking.finalSummary.agreement,
        rows: [
          { label: "المشروع", value: workspaceQuery.data.agreement.title },
          { label: "الفريلانسر", value: workspaceQuery.data.freelancer.name },
          { label: "العميل", value: workspaceQuery.data.client?.name || "-" },
          { label: "الحالة", value: workspaceQuery.data.agreement.status, tone: "green" as const },
          { label: "عدد المراحل", value: String(workspaceQuery.data.milestones.length) },
          { label: "قيمة الاتفاق", value: activeProject.total },
        ],
      },
      actions: {
        ...tracking.finalSummary.actions,
        items: tracking.finalSummary.actions.items.map((item) => {
          if (item.icon === "eye") {
            return { ...item, label: "عرض تفاصيل الاتفاق" };
          }
          if (item.icon === "copy") {
            return { ...item, label: "نسخ رابط البوابة" };
          }
          return item;
        }),
      },
      security: {
        ...tracking.finalSummary.security,
        tokenLabel: portalToken ? `Token: ${portalToken.slice(0, 8)}...` : tracking.finalSummary.security.tokenLabel,
      },
    };
  }, [activeProject.total, portalToken, tracking.finalSummary, workspaceQuery.data]);

  const deliveryItems = useMemo(() => {
    if (!workspaceQuery.data || !portalToken) {
      return [];
    }

    return workspaceQuery.data.deliveries.map((delivery) => ({
      id: delivery.id,
      title: delivery.milestoneName,
      statusLabel: getDeliveryStatusLabel(delivery.status),
      submittedAt: delivery.submittedAt
        ? new Date(delivery.submittedAt).toLocaleDateString("ar-SA")
        : "غير متاح",
      href: buildPortalPath(portalToken, "deliveryPreview"),
      reviewable: canClientReviewDelivery(delivery.status),
    }));
  }, [portalToken, workspaceQuery.data]);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#0d0f1a] px-4 py-8 text-[#f1f3fc] sm:px-6 sm:py-10"
      aria-labelledby="tracking-title"
    >
      <section className="mx-auto w-full max-w-[992px]">
        <div className="text-center">
          <h1
            id="tracking-title"
            className="text-[26px] font-black leading-[1.5] tracking-normal text-white"
          >
            {tracking.title}
          </h1>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-[#7f86a8]">
            {tracking.description}
          </p>
        </div>

        <div className="mt-16 space-y-14 sm:mt-[74px] sm:space-y-16">
          <div className="space-y-5 text-start">
            <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
              <div className="space-y-2.5 sm:order-2 sm:text-start">
                <p className="text-base leading-6">{activeProject.eyebrow}</p>
                <h2 className="text-xl font-medium leading-[1.5]">
                  {activeProject.title}
                </h2>
                <p className="text-base leading-6">
                  الفريلانسر {activeProject.freelancer} · العميل{" "}
                  {activeProject.client}
                </p>
              </div>

              <dl className="space-y-1 sm:order-1 sm:min-w-32 sm:text-start">
                <div>
                  <dt className="sr-only">{activeProject.totalLabel}</dt>
                  <dd className="text-base leading-6">{activeProject.total}</dd>
                </div>
                <div>
                  <dt className="text-base leading-6">
                    {activeProject.totalLabel}
                  </dt>
                </div>
                <div>
                  <dd className="text-base leading-6">
                    {activeProject.stagesLabel}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-wrap justify-start gap-1.5 sm:justify-end">
              {activeProject.badges.map((badge) => (
                <span
                  key={badge.label}
                  className={cn(
                    "inline-flex min-h-6 items-center rounded-full border px-2.5 text-[11px] font-bold leading-none",
                    badge.className,
                  )}
                >
                  {badge.label}
                </span>
              ))}
            </div>

            <div className="space-y-1.5">
              <p className="text-base leading-6">
                {activeProject.progressLabel}
                {activeProject.progressValue}
              </p>
              <div className="flex flex-wrap gap-x-1 text-base leading-6">
                {activeProject.stageLabels.map((stage) => (
                  <span key={stage}>{stage}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                className="h-[38px] rounded-[10px] border-white/10 bg-[#1a1d2e] px-4 text-xs font-bold text-[#b8bdd8] hover:bg-[#20243a] hover:text-white sm:min-w-[169px]"
              >
                <Eye className="size-[13px]" aria-hidden="true" />
                {activeProject.primaryAction}
              </Button>
              <Button
                variant="outline"
                className="h-[38px] rounded-[10px] border-white/[0.07] bg-transparent px-4 text-xs font-bold text-[#7f86a8] hover:bg-white/[0.03] hover:text-[#b8bdd8] sm:min-w-[143px]"
              >
                <Copy className="size-[13px]" aria-hidden="true" />
                {activeProject.secondaryAction}
              </Button>
            </div>
          </div>

          <TrackingDetailsSection
            paymentSummary={paymentSummary}
            requiredAction={tracking.requiredAction}
            agreementTimeline={agreementTimeline}
          />
          {/* AR: السجل الزمني لبوابة العميل — يعرض الأحداث الآمنة للعميل فقط.
              EN: Client portal timeline — displays client-safe events only. */}
          {portalToken ? (
            <PortalTimelineSection portalToken={portalToken} />
          ) : null}
          {/* AR: قسم مراجعة التسليمات يربط العميل مباشرة بشاشة القرار الحية لكل تسليم متاح.
              EN: The delivery review section links the client directly to the live decision screen for each available delivery. */}
          <section className="space-y-4 rounded-[20px] border border-white/10 bg-[#13182b] p-5 text-start text-white sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-[20px] font-black">مراجعة التسليمات</h2>
                <p className="mt-1 text-[13px] leading-6 text-[#8f97b6]">
                  راجع كل تسليم، اطلب تعديلات، أو افتح مراجعة AI من رابط التسليم نفسه.
                </p>
              </div>
              <span className="rounded-full border border-[#6f52ff]/30 bg-[#6f52ff]/15 px-3 py-1 text-[11px] font-bold text-[#d7d0ff]">
                {deliveryItems.length} تسليم
              </span>
            </div>

            {deliveryItems.length ? (
              <div className="space-y-3">
                {deliveryItems.map((delivery) => (
                  <article
                    key={delivery.id}
                    className="flex flex-col gap-3 rounded-[16px] border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h3 className="text-[14px] font-extrabold text-white">{delivery.title}</h3>
                      <p className="mt-1 text-[12px] text-[#b8bdd8]">{delivery.statusLabel}</p>
                      <p className="mt-1 text-[11px] text-[#7f86a8]">آخر إرسال: {delivery.submittedAt}</p>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="h-[38px] rounded-[10px] border-white/10 bg-[#1a1d2e] px-4 text-xs font-bold text-[#b8bdd8] hover:bg-[#20243a] hover:text-white"
                    >
                      <Link href={delivery.href}>
                        <Eye className="size-[13px]" aria-hidden="true" />
                        {delivery.reviewable ? "مراجعة التسليم" : "عرض نتيجة التسليم"}
                      </Link>
                    </Button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-[16px] border border-dashed border-white/10 bg-white/[0.02] p-4 text-[13px] text-[#8f97b6]">
                لا توجد تسليمات متاحة للمراجعة في هذه الاتفاقية حتى الآن.
              </div>
            )}
          </section>
          <TrackingProgressSection progressDetails={progressDetails} />
          <TrackingFinalSection
            finalSummary={finalSummary}
            footer={tracking.footer}
          />
        </div>
      </section>
    </main>
  );
}
