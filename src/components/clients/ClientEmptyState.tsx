// AR: هذه البطاقة تعرض حالة الفراغ أو عدم وجود نتائج بطريقة عربية وRTL واضحة.
// EN: This card renders the empty or no-results state in a clear Arabic RTL layout.
import Link from "next/link";

import { Button } from "@/components/shared";

type ClientEmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function ClientEmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: ClientEmptyStateProps) {
  return (
    <section className="rounded-[18px] border border-[#252a42] bg-[#15192b] p-6 text-start shadow-[0_18px_45px_rgba(4,7,20,0.18)]" dir="rtl">
      <h2 className="text-[16px] font-bold text-white">{title}</h2>
      <p className="mt-2 max-w-xl text-[13px] leading-7 text-[#8b90a8]">{description}</p>
      {actionLabel && actionHref ? (
        <Button asChild className="mt-5 h-10 rounded-[10px] bg-[#6f52ff] px-4 text-[13px] font-bold text-white hover:bg-[#7b63ff]">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      ) : null}
    </section>
  );
}
