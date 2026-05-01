"use client";

import { History } from "lucide-react";

import { portalCopy } from "@/constants";
import { usePortalTimelineQuery } from "@/hooks/client-portal";
import { ApiError } from "@/lib/axios-instance";

interface PortalTimelineSectionProps {
  token?: string;
  portalToken?: string;
}

function isPortalTokenError(error: unknown) {
  return error instanceof ApiError && error.code?.startsWith("PORTAL_TOKEN");
}

export function PortalTimelineSection({ token, portalToken }: PortalTimelineSectionProps) {
  const resolvedToken = token ?? portalToken ?? "";
  const { data, isLoading, error } = usePortalTimelineQuery(resolvedToken);

  if (isPortalTokenError(error)) {
    throw error;
  }

  if (isLoading) {
    return <div className="h-64 animate-pulse rounded-3xl border border-white/10 bg-white/5" />;
  }

  if (!data) {
    return <div className="rounded-3xl border border-white/10 bg-[#13182b] p-6 text-white">تعذر تحميل الخط الزمني.</div>;
  }

  return (
    <section dir="rtl" className="rounded-3xl border border-white/10 bg-[#13182b] p-6 text-start text-white">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#8f97b6]">{portalCopy.titles.timeline.ar}</p>
          <h2 className="mt-2 text-2xl font-black">سجل الاتفاق</h2>
        </div>
        <span className="rounded-2xl border border-blue-400/20 bg-blue-400/10 p-3 text-blue-300">
          <History className="size-5" />
        </span>
      </div>
      <div className="space-y-3">
        {data.length ? data.map((event) => (
          <article key={event.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-semibold">{portalCopy.timeline[event.eventType as keyof typeof portalCopy.timeline]?.ar ?? event.eventType}</p>
                <p className="text-sm text-[#a9b0cd]">{event.description || "-"}</p>
              </div>
              <div className="text-sm text-[#8f97b6]">
                <p>{event.actorRole}</p>
                <p>{new Date(event.occurredAt).toLocaleString("ar-SA")}</p>
              </div>
            </div>
          </article>
        )) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-[#a9b0cd]">لا توجد أحداث حالية.</div>
        )}
      </div>
    </section>
  );
}
