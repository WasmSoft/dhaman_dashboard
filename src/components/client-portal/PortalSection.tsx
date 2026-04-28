import {
  CheckCircle2,
  HelpCircle,
  Languages,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import { clientPortalContent } from "@/constants";
import { AgreementSummarySection } from "@/components/client-portal/AgreementSummarySection";
import { AgreementHero } from "@/components/client-portal/AgreementHero";
import { AiDisputeSection } from "@/components/client-portal/AiDisputeSection";
import { DecisionSection } from "@/components/client-portal/DecisionSection";
import { MilestonesSection } from "@/components/client-portal/MilestonesSection";
import { PolicySection } from "@/components/client-portal/PolicySection";

export function PortalSection() {
  const { portal } = clientPortalContent;

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#0d0f1a] text-white"
      aria-labelledby="portal-title"
    >
      
      <div className="mx-auto w-full max-w-[900px] px-4 py-8 sm:px-6 lg:px-0">
        <section className="delivery text-center">
          <h1 id="portal-title" className="text-[26px] font-black leading-normal">
            {portal.title}
          </h1>
          <p className="mt-1.5 text-[13px] text-[#7f86a8]">
            {portal.description}
          </p>
        </section>

        <div className="mt-6 space-y-5">
          <AgreementHero agreement={portal.agreement} />
          <AgreementSummarySection
            agreement={portal.agreement}
            parties={portal.parties}
            project={portal.project}
            payments={portal.payments}
          />
          <MilestonesSection milestones={portal.milestones} />
          <PolicySection policies={portal.policies} />
          <AiDisputeSection steps={portal.aiReviewSteps} />
          <DecisionSection agreement={portal.agreement} />

          <aside className="flex flex-col gap-3 rounded-[14px] border border-emerald-400/15 bg-emerald-400/[0.05] p-5 text-start sm:flex-row sm:items-start sm:justify-start">
            <div>
              <div className="flex gap-1">
                <CheckCircle2
              className="size-4 shrink-0 text-[#4ade80]"
              aria-hidden="true"
            />
              <h2 className="text-[13px] font-extrabold text-[#4ade80]">
                {portal.securityNotice.title}
              </h2>
              </div>
              <p className="mt-1.5 text-xs leading-5 text-[#b8bdd8]">
                {portal.securityNotice.description}
              </p>
              <p className="mt-1 text-[11px] leading-5 text-[#7f86a8]">
                {portal.securityNotice.disclaimer}
              </p>
            </div>
            
          </aside>
        </div>

        <footer className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 pt-8 text-[11px] text-[#7f86a8]">
          <a href="#" className="transition-colors hover:text-[#b8bdd8]">
            سياسة الخصوصية
          </a>
          <span>·</span>
          <a href="#" className="transition-colors hover:text-[#b8bdd8]">
            الشروط والأحكام
          </a>
          <span>·</span>
          <span>{portal.footerText}</span>
        </footer>
      </div>
    </main>
  );
}
