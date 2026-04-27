import { AlertTriangle, FileText, ShieldAlert, Workflow } from "lucide-react";

import type { PortalPolicy } from "@/types";

const policyIcons = [AlertTriangle, FileText, ShieldAlert, Workflow] as const;

interface PolicySectionProps {
  policies: PortalPolicy[];
}

export function PolicySection({ policies }: PolicySectionProps) {
  return (
    <section className="rounded-2xl border border-white/[0.07] bg-[#131627] p-5 text-start">
      <div className="mb-4 flex items-center justify-start gap-2">
        <ShieldAlert className="size-4 text-[#a78bfa]" aria-hidden="true" />
        <div>
          <h2 className="text-[15px] font-extrabold text-white">
            سياسات الدفع والخلاف
          </h2>
          <p className="mt-1 text-[11px] text-[#7f86a8]">
            قواعد مختصرة توضّح ما يحدث عند الاعتماد، الاعتراض، أو طلب تعديل.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {policies.map((policy, index) => {
          const Icon = policyIcons[index % policyIcons.length];

          return (
            <article
              key={policy.title}
              className={policy.className}
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="text-xs font-extrabold text-white">{policy.title}</h3>
                <p className="mt-1.5 text-[11px] leading-5 text-[#b8bdd8]">
                  {policy.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
