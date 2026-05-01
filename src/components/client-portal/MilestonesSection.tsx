"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, ClipboardList } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/shared";
import { cn } from "@/lib/utils";
import type { PortalMilestone } from "@/types";

interface MilestonesSectionProps {
  milestones: PortalMilestone[];
}

export function MilestonesSection({ milestones }: MilestonesSectionProps) {
  const [openMilestoneId, setOpenMilestoneId] = useState(milestones[0]?.id ?? "");

  return (
    <section className="rounded-2xl border border-white/[0.07] bg-[#131627] p-5 text-start">
      <div className="mb-4 flex items-center justify-start gap-2">
        <ClipboardList className="size-4 text-[#a78bfa]" aria-hidden="true" />
        <div>
          <h2 className="text-[15px] font-extrabold text-white">مراحل الاتفاق</h2>
          <p className="mt-1 text-[11px] text-[#7f86a8]">
            افتح كل مرحلة لمراجعة المطلوب وشروط القبول قبل اتخاذ القرار.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {milestones.map((milestone) => {
          const isOpen = openMilestoneId === milestone.id;

          return (
            <Collapsible
              key={milestone.id}
              open={isOpen}
              onOpenChange={(nextOpen) =>
                setOpenMilestoneId(nextOpen ? milestone.id : "")
              }
              className="rounded-[10px] border border-white/[0.07] bg-[#171a2d]"
            >
              <CollapsibleTrigger className="group flex w-full items-center justify-between gap-3 px-4 py-3 text-start outline-none transition-colors hover:bg-white/[0.02] focus-visible:ring-2 focus-visible:ring-[#6d5dfc]/60">
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-[#7f86a8] transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-start gap-2">
                    <span className="text-[13px] font-extrabold text-white">
                      {milestone.title}
                    </span>
                    <span className="rounded-full bg-[#6d5dfc]/15 px-2 py-0.5 text-[10px] font-bold text-[#a78bfa]">
                      {milestone.amount}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] leading-5 text-[#7f86a8]">
                    {milestone.summary}
                  </p>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent
                forceMount
                className="grid overflow-hidden opacity-100 transition-[grid-template-rows,opacity] duration-300 ease-out data-[state=closed]:grid-rows-[0fr] data-[state=closed]:opacity-0 data-[state=open]:grid-rows-[1fr]"
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="border-t border-white/[0.06] px-4 pb-4 pt-3">
                    <p className="text-xs leading-6 text-[#b8bdd8]">
                      {milestone.description}
                    </p>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {(milestone.acceptanceCriteria ?? []).map((criterion) => (
                        <li
                          key={criterion}
                          className="flex items-start gap-2 rounded-lg bg-[#101323] px-3 py-2 text-[11px] leading-5 text-[#b8bdd8]"
                        >
                          <CheckCircle2
                            className="mt-0.5 size-3 shrink-0 text-[#4ade80]"
                            aria-hidden="true"
                          />
                          <span>{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>
    </section>
  );
}
