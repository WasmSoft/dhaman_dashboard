// AR: هذا المكوّن يعرض حالة 404/غير جاهز بأسلوب بصري متوافق مع لوحة التحكم الداكنة في المشروع.
// EN: This component renders a 404/not-ready state using the same dark visual language as the dashboard.
import Link from "next/link";
import { ArrowLeft, Compass, SearchX, ShieldAlert } from "lucide-react";

import type { NotFoundStateContent } from "@/types";

import { Button } from "../button";

export function NotFoundState({
  eyebrow,
  code,
  title,
  description,
  primaryActionLabel,
  primaryActionHref,
  secondaryActionHref,
  secondaryActionLabel,
  highlights,
}: NotFoundStateContent) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 py-10 md:px-6 md:py-14" dir="rtl">
      <div className="grid w-full gap-5 lg:grid-cols-[minmax(0,1.25fr)_320px] lg:items-stretch">
        <article className="relative overflow-hidden rounded-[24px] border border-[#252a42] bg-[radial-gradient(circle_at_top,_rgba(111,82,255,0.22),_transparent_40%),linear-gradient(180deg,#171b2d_0%,#111524_100%)] p-6 shadow-[0_28px_80px_rgba(2,4,15,0.35)] md:p-8">
          <div className="absolute inset-y-0 start-0 w-24 bg-[linear-gradient(90deg,rgba(111,82,255,0.12),transparent)]" />
          <div className="relative flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-[#6f52ff]/25 bg-[#6f52ff]/10 px-3 py-1 text-[11px] font-bold text-[#b7abff]">
                {eyebrow}
              </span>
              <span className="inline-flex items-center rounded-full border border-[#2f3658] bg-[#1b2034] px-3 py-1 text-[11px] font-bold text-[#8b90a8]">
                الرمز {code}
              </span>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl text-start">
                <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-white md:text-5xl">{title}</h1>
                <p className="mt-4 max-w-[52ch] text-[14px] leading-8 text-[#9aa3c7] md:text-[15px]">
                  {description}
                </p>
              </div>

              <div className="grid size-[78px] shrink-0 place-items-center rounded-[24px] border border-[#2f3658] bg-[#1d2135] text-[#8b74ff] shadow-[0_0_24px_rgba(111,82,255,0.18)]">
                <SearchX className="size-8" />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild className="h-11 rounded-[12px] bg-[#6f52ff] px-5 text-[13px] font-bold text-white shadow-[0_16px_34px_rgba(111,82,255,0.28)] hover:bg-[#7d66ff]">
                <Link href={primaryActionHref}>
                  <ArrowLeft className="size-4" />
                  {primaryActionLabel}
                </Link>
              </Button>

              {secondaryActionHref && secondaryActionLabel ? (
                <Button asChild variant="secondary" className="h-11 rounded-[12px] border border-[#2f3658] bg-[#1d2135] px-5 text-[13px] font-bold text-[#d7dcf0] hover:bg-[#262b49] hover:text-white">
                  <Link href={secondaryActionHref}>
                    <Compass className="size-4" />
                    {secondaryActionLabel}
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
        </article>

        {/* <aside className="rounded-[24px] border border-[#252a42] bg-[#15192b] p-6 shadow-[0_24px_64px_rgba(2,4,15,0.3)]">
          <div className="flex items-center gap-3 text-white">
            <span className="grid size-10 place-items-center rounded-[14px] bg-[#22264a] text-[#8b74ff]">
              <ShieldAlert className="size-4" />
            </span>
            <div>
              <h2 className="text-[16px] font-bold">ماذا يمكنك فعله الآن؟</h2>
              <p className="mt-1 text-[12px] text-[#737b99]">خيارات سريعة للرجوع إلى المسارات الجاهزة داخل المنصة.</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {highlights.map((highlight) => (
              <div key={highlight} className="rounded-[14px] border border-[#252a42] bg-[#111524] px-4 py-3 text-[13px] leading-7 text-[#c8cee6]">
                {highlight}
              </div>
            ))}
          </div>
        </aside> */}
      </div>
    </section>
  );
}
