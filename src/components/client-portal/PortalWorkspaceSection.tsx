"use client";

import Link from "next/link";

import { portalCopy } from "@/constants";
import { usePortalWorkspaceQuery } from "@/hooks/client-portal";
import { ApiError } from "@/lib/axios-instance";
import { buildPortalPath } from "@/lib/client-portal";

function isPortalTokenError(error: unknown) {
  return error instanceof ApiError && error.code?.startsWith("PORTAL_TOKEN");
}

export function PortalWorkspaceSection({ token }: { token: string }) {
  const { data, isLoading, error } = usePortalWorkspaceQuery(token);

  if (isPortalTokenError(error)) {
    throw error;
  }

  if (isLoading) {
    return <div className="h-64 animate-pulse rounded-3xl border border-white/10 bg-white/5" />;
  }

  if (!data) {
    return <div className="rounded-3xl border border-white/10 bg-[#13182b] p-6 text-white">تعذر تحميل مساحة العمل.</div>;
  }

  return (
    <section dir="rtl" className="space-y-6 text-start text-white">
      <header className="rounded-3xl border border-white/10 bg-[#13182b] p-6">
        <p className="text-sm text-[#8f97b6]">{portalCopy.titles.workspace.ar}</p>
        <h1 className="mt-2 text-3xl font-black">{data.agreement.title}</h1>
        <div className="mt-3 flex flex-wrap gap-3 text-sm text-[#a9b0cd]">
          <span>الحالة: {portalCopy.statuses[data.agreement.status as keyof typeof portalCopy.statuses]?.ar ?? data.agreement.status}</span>
          <span>الفريلانسر: {data.freelancer.name}</span>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-white/10 bg-[#13182b] p-6">
            <h2 className="mb-4 text-xl font-bold">المراحل</h2>
            <div className="space-y-4">
              {data.milestones.map((milestone) => (
                <article key={milestone.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{milestone.title}</h3>
                      <p className="mt-1 text-sm text-[#a9b0cd]">{milestone.description}</p>
                    </div>
                    <span className="text-sm text-[#7fd7a2]">{milestone.progress ?? 0}%</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-[#6f52ff]" style={{ width: `${milestone.progress ?? 0}%` }} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-[#13182b] p-6">
            <h2 className="mb-4 text-xl font-bold">التسليمات المعلقة</h2>
            <div className="space-y-3">
              {data.deliveries.map((delivery) => (
                <Link
                  key={delivery.id}
                  href={buildPortalPath(token, "deliveryPreview")}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.05]"
                >
                  <div>
                    <p className="font-semibold">{delivery.milestoneName}</p>
                    <p className="text-sm text-[#a9b0cd]">{delivery.status}</p>
                  </div>
                  <span className="text-sm text-[#8f97b6]">عرض</span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-3xl border border-white/10 bg-[#13182b] p-6">
            <h2 className="mb-4 text-xl font-bold">الدفعات</h2>
            <div className="space-y-3">
              {data.payments.map((payment) => (
                <div key={payment.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="font-semibold">{payment.milestoneName}</p>
                  <p className="mt-1 text-sm text-[#a9b0cd]">{portalCopy.statuses[payment.status as keyof typeof portalCopy.statuses]?.ar ?? payment.status}</p>
                </div>
              ))}
            </div>
            <Link href={buildPortalPath(token, "paymentSetup")} className="mt-4 inline-block text-sm font-semibold text-[#9f92ff] hover:text-white">
              الذهاب إلى صفحة الدفعات
            </Link>
          </section>

          <section className="rounded-3xl border border-white/10 bg-[#13182b] p-6">
            <h2 className="mb-4 text-xl font-bold">طلبات التغيير</h2>
            <div className="space-y-3">
              {data.changeRequests.length ? data.changeRequests.map((request) => (
                <div key={request.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="font-semibold">{request.title || `طلب #${request.id}`}</p>
                  <p className="text-sm text-[#a9b0cd]">{request.status}</p>
                </div>
              )) : <p className="text-sm text-[#a9b0cd]">لا توجد طلبات تغيير حالية.</p>}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-[#13182b] p-6">
            <h2 className="mb-4 text-xl font-bold">آخر الأحداث</h2>
            <div className="space-y-3">
              {data.timelineSummary.map((event) => (
                <div key={event.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-[#c6cbe0]">
                  <p className="font-semibold text-white">{portalCopy.timeline[event.eventType as keyof typeof portalCopy.timeline]?.ar ?? event.eventType}</p>
                  <p>{event.description || "-"}</p>
                </div>
              ))}
            </div>
            <Link href={buildPortalPath(token, "tracking")} className="mt-4 inline-block text-sm font-semibold text-[#9f92ff] hover:text-white">
              عرض الخط الزمني الكامل
            </Link>
          </section>
        </div>
      </div>
    </section>
  );
}
