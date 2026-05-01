"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Edit3,
  LockKeyhole,
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/shared";
import {
  useDeleteMilestoneMutation,
  useReorderMilestonesMutation,
} from "@/hooks/milestones";
import {
  mapMilestoneToWorkspaceMilestone,
} from "@/lib/milestones/helpers/milestone-display.helper";
import {
  buildReorderPayload,
} from "@/lib/milestones/helpers/milestone-builder.helper";
import { MilestoneDraftForm } from "./MilestoneDraftForm";
import type { AgreementWorkspaceMilestone, Milestone } from "@/types";
import { cn } from "@/lib/utils";

interface MilestoneDraftListProps {
  agreementId: string;
  milestones: readonly Milestone[];
  onChanged: () => void;
}

// AR: قائمة المراحل القابلة للتعديل — تدعم إعادة الترتيب والحذف وإضافة مرحلة جديدة.
// EN: Editable milestone list — supports reordering, deletion, and adding a new milestone.
export function MilestoneDraftList({
  agreementId,
  milestones,
  onChanged,
}: MilestoneDraftListProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingMilestoneId, setEditingMilestoneId] = useState<string | null>(
    null,
  );
  const [orderedIds, setOrderedIds] = useState<string[]>([]);

  const deleteMutation = useDeleteMilestoneMutation();
  const reorderMutation = useReorderMilestonesMutation(agreementId);

  const workspaceMilestones: readonly AgreementWorkspaceMilestone[] =
    milestones.map(mapMilestoneToWorkspaceMilestone);

  const nextOrderIndex =
    milestones.length > 0
      ? Math.max(...milestones.map((m) => m.orderIndex)) + 1
      : 1;

  async function handleDelete(milestoneId: string) {
    await deleteMutation.mutateAsync({
      milestoneId,
      agreementId,
    });
    onChanged();
  }

  async function moveUp(index: number) {
    if (index === 0) {
      return;
    }

    const ids =
      orderedIds.length === milestones.length
        ? [...orderedIds]
        : milestones.map((m) => m.id);

    [ids[index - 1], ids[index]] = [ids[index], ids[index - 1]];
    setOrderedIds(ids);

    await reorderMutation.mutateAsync({
      milestoneId: milestones[0].id,
      payload: buildReorderPayload(ids),
    });
    onChanged();
  }

  async function moveDown(index: number) {
    if (index >= milestones.length - 1) {
      return;
    }

    const ids =
      orderedIds.length === milestones.length
        ? [...orderedIds]
        : milestones.map((m) => m.id);

    [ids[index], ids[index + 1]] = [ids[index + 1], ids[index]];
    setOrderedIds(ids);

    await reorderMutation.mutateAsync({
      milestoneId: milestones[0].id,
      payload: buildReorderPayload(ids),
    });
    onChanged();
  }

  return (
    <section
      dir="rtl"
      className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 md:p-6"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="text-start">
          <h2 className="text-[18px] font-extrabold text-white">
            مراحل الاتفاق
          </h2>
          <p className="mt-1 text-[12px] leading-6 text-[#737b99]">
            رتب المراحل، عدّل تفاصيلها، أو احذفها قبل إرسال الاتفاق.
          </p>
        </div>

        <Button
          className="h-9 rounded-[10px] bg-[#6f52ff] px-3 text-[12px] font-bold text-white shadow-[0_12px_28px_rgba(111,82,255,0.26)] hover:bg-[#7b63ff]"
          onClick={() => {
            setShowForm(true);
            setEditingMilestoneId(null);
          }}
        >
          <Plus className="size-4" />
          إضافة مرحلة
        </Button>
      </div>

      {milestones.length === 0 && !showForm ? (
        <div className="rounded-[10px] border border-dashed border-[#252a42] bg-[#12162a] px-4 py-10 text-center text-[12px] text-[#8a91ac]">
          لا توجد مراحل حالياً. أضف أول مرحلة للبدء.
        </div>
      ) : null}

      {workspaceMilestones.map((milestone, index) => {
        const isEditing = editingMilestoneId === milestone.id;

        return (
          <article
            key={milestone.id ?? index}
            className="mb-3 rounded-[12px] border border-[#252a42] bg-[#1d2135] p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#252a42] text-[12px] font-bold text-[#a7aecb]">
                  {milestone.number}
                </span>
                <div>
                  <h3 className="text-[14px] font-extrabold leading-6 text-white">
                    {milestone.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                    <span className="font-bold text-emerald-300" dir="ltr">
                      {milestone.amount}
                    </span>
                    <span className="text-[#737b99]">{milestone.due}</span>
                    <span className={cn("rounded-md px-2 py-0.5 font-bold", milestone.active ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300")}>
                      {milestone.status}
                    </span>
                    <span className="rounded-md bg-[#6f52ff]/15 px-2 py-0.5 font-bold text-[#a898ff]">
                      {milestone.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-lg bg-[#101323] text-[#8a91ac] hover:bg-[#1d2135] hover:text-white"
                  onClick={() => moveUp(index)}
                  aria-label="تحريك لأعلى"
                >
                  <ArrowUp className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-lg bg-[#101323] text-[#8a91ac] hover:bg-[#1d2135] hover:text-white"
                  onClick={() => moveDown(index)}
                  aria-label="تحريك لأسفل"
                >
                  <ArrowDown className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-lg bg-[#101323] text-[#8a91ac] hover:bg-[#1d2135] hover:text-white"
                  onClick={() => {
                    setEditingMilestoneId(
                      isEditing ? null : (milestone.id ?? null),
                    );
                    setShowForm(false);
                  }}
                  aria-label="تعديل المرحلة"
                >
                  <Edit3 className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-lg bg-[#101323] text-[#8a91ac] hover:bg-red-500/20 hover:text-red-300"
                  onClick={() => {
                    if (milestone.id) {
                      handleDelete(milestone.id);
                    }
                  }}
                  aria-label="حذف المرحلة"
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>

            {milestone.acceptanceCriteria.length > 0 ? (
              <div className="mt-4 rounded-[10px] bg-[#101323]/50 px-4 py-3">
                <h4 className="mb-2 text-[11px] font-extrabold text-[#a7aecb]">
                  شروط القبول
                </h4>
                <ul className="space-y-1 text-[11px] leading-6 text-[#8a91ac]">
                  {milestone.acceptanceCriteria.map((criteria) => (
                    <li key={criteria} className="flex items-center gap-2">
                      <CheckCircle2 className="size-3 shrink-0 text-emerald-300" />
                      {criteria}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {milestone.revisionLimit ? (
              <p className="mt-3 flex items-center gap-2 text-[11px] text-[#a7aecb]">
                <LockKeyhole className="size-3 text-[#a898ff]" />
                {milestone.revisionLimit}
              </p>
            ) : null}
          </article>
        );
      })}

      {deleteMutation.isError ? (
        <p className="rounded-[10px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-[12px] leading-6 text-red-100/85">
          {(deleteMutation.error as Error).message}
        </p>
      ) : null}

      {reorderMutation.isError ? (
        <p className="mt-3 rounded-[10px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-[12px] leading-6 text-red-100/85">
          {(reorderMutation.error as Error).message}
        </p>
      ) : null}

      {showForm ? (
        <div className="mt-4">
          <MilestoneDraftForm
            agreementId={agreementId}
            nextOrderIndex={nextOrderIndex}
            onSaved={() => {
              setShowForm(false);
              onChanged();
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      ) : null}
    </section>
  );
}
