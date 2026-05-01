// AR: يعرض هذا القسم أحدث الاتفاقات المرتبطة بالعميل مع روابط سريعة عند توفرها.
// EN: This section renders the client's recent agreements with quick links when available.
import Link from "next/link";

import type { AgreementReference } from "@/types";
import { formatAmountValue, formatClientDate, formatClientStatusLabel } from "@/lib/clients";

type ClientRecentAgreementsProps = {
  agreements: AgreementReference[];
};

export function ClientRecentAgreements({ agreements }: ClientRecentAgreementsProps) {
  return (
    <section className="rounded-[18px] border border-[#252a42] bg-[#15192b] p-4" dir="rtl">
      <h2 className="text-[16px] font-bold text-white">أحدث الاتفاقات</h2>
      {agreements.length > 0 ? (
        <div className="mt-4 grid gap-3">
          {agreements.map((agreement) => (
            <article key={agreement.id} className="rounded-[12px] border border-[#252a42] bg-[#1d2135] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[13px] font-semibold text-white">{agreement.title}</h3>
                  <p className="mt-1 text-[11px] text-[#8b90a8]">{formatClientStatusLabel(agreement.status)} · {formatClientDate(agreement.createdAt)}</p>
                </div>
                <span className="text-[13px] font-bold text-white">{formatAmountValue(agreement.totalAmount)}</span>
              </div>
              {agreement.id ? (
                <Link className="mt-3 inline-flex text-[12px] font-bold text-[#a898ff] hover:text-white" href={`/agreements/${agreement.id}`}>
                  فتح الاتفاق
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-3 rounded-[12px] border border-dashed border-[#252a42] px-4 py-5 text-[12px] leading-6 text-[#8b90a8]">
          لا توجد اتفاقات سابقة لهذا العميل بعد.
        </p>
      )}
    </section>
  );
}
