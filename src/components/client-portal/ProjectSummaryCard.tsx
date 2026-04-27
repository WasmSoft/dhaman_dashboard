import { BriefcaseBusiness } from "lucide-react";

import type { PortalProjectSummary } from "@/types";

interface ProjectSummaryCardProps {
  project: PortalProjectSummary;
}

export function ProjectSummaryCard({ project }: ProjectSummaryCardProps) {
  return (
    <article className="rounded-2xl border border-white/[0.07] bg-[#131627] p-5 text-start">
      <div className="mb-5 flex items-center justify-start gap-2">
        <BriefcaseBusiness className="size-4 text-[#a78bfa]" aria-hidden="true" />
        <h2 className="text-[15px] font-extrabold text-white">ملخص المشروع</h2>
      </div>

      <h3 className="text-[15px] font-extrabold leading-7 text-white">
        {project.title}
      </h3>
      <p className="mt-1.5 text-xs leading-5 text-[#b8bdd8]">
        {project.description}
      </p>

      <dl className="mt-5 space-y-2.5">
        {project.details.map((detail) => (
          <div key={detail.label} className="flex items-start justify-between gap-4">
            <dt className="text-[11px] font-medium text-[#7f86a8]">
              {detail.label}
            </dt>
            <dd className="text-xs font-bold text-[#b8bdd8]">{detail.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 grid gap-2">
        {project.roles.map((role) => (
          <div
            key={role.title}
            className={role.className}
          >
            <p className="text-[10px] font-extrabold uppercase tracking-normal text-[#7f86a8]">
              {role.title}
            </p>
            <p className="mt-1 text-xs leading-5 text-[#b8bdd8]">{role.description}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
