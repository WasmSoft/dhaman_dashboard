// AR: اختبارات محولات عرض المراحل — تتأكد من تنسيق القيم وربط الحالات بالبطاقات.
// EN: Milestone display helper tests — verify formatting and status-to-card mapping.
import { describe, expect, it } from "vitest";

import {
  buildAgreementWorkspacePaymentRows,
  buildAgreementWorkspacePaymentSummary,
  formatMilestoneAmount,
  mapMilestoneToWorkspaceMilestone,
} from "@/lib/milestones";
import type { Milestone } from "@/types";

function makeMilestone(overrides?: Partial<Milestone>): Milestone {
  return {
    id: "mil-1",
    agreementId: "agr-1",
    title: "Phase 1",
    description: "Wireframe and planning",
    amount: "150.00",
    currency: "USD",
    dueDate: "2026-05-20T00:00:00.000Z",
    orderIndex: 1,
    status: "ACTIVE",
    paymentStatus: "RESERVED",
    deliveryStatus: "DRAFT" as const,
    acceptanceCriteria: [{ description: "Wireframe delivered", required: true }],
    revisionLimit: 2,
    createdAt: "2026-05-01T00:00:00.000Z",
    updatedAt: "2026-05-02T00:00:00.000Z",
    ...overrides,
  };
}

describe("milestone display helpers", () => {
  it("formats milestone amounts with currency", () => {
    expect(formatMilestoneAmount("150.00", "USD")).toBe("$150.00");
  });

  it("maps an active milestone into the workspace card model", () => {
    const mapped = mapMilestoneToWorkspaceMilestone(makeMilestone());

    expect(mapped).toMatchObject({
      id: "mil-1",
      number: "1",
      title: "Phase 1",
      status: "قيد التنفيذ",
      paymentStatus: "محجوزة",
      active: true,
      revisionLimit: "حد التعديلات: 2",
      operationStatus: "مسودة",
    });
    expect(mapped.acceptanceCriteria).toEqual(["Wireframe delivered"]);
  });

  it("builds payment rows from milestones", () => {
    const rows = buildAgreementWorkspacePaymentRows([
      makeMilestone(),
      makeMilestone({
        id: "mil-2",
        title: "Phase 2",
        amount: "200.00",
        paymentStatus: "CLIENT_REVIEW",
        deliveryStatus: "CLIENT_REVIEW" as const,
      }),
    ]);

    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({
      milestone: "Phase 1",
      status: "محجوزة",
      operation: "مسودة",
      tone: "reserved",
    });
    expect(rows[1]).toMatchObject({
      milestone: "Phase 2",
      status: "مراجعة العميل",
      operation: "تحت مراجعة العميل",
      tone: "review",
    });
  });

  it("builds payment summary totals by status groups", () => {
    const summary = buildAgreementWorkspacePaymentSummary([
      makeMilestone({ amount: "150.00", paymentStatus: "RESERVED" }),
      makeMilestone({ id: "mil-2", amount: "200.00", paymentStatus: "CLIENT_REVIEW" }),
      makeMilestone({ id: "mil-3", amount: "100.00", paymentStatus: "RELEASED" }),
      makeMilestone({ id: "mil-4", amount: "50.00", paymentStatus: "WAITING" }),
    ]);

    expect(summary).toEqual([
      { label: "محجوز", value: "$150.00", tone: "reserved" },
      { label: "تحت المراجعة", value: "$200.00", tone: "review" },
      { label: "مصروف", value: "$100.00", tone: "released" },
      { label: "بانتظار التمويل", value: "$50.00", tone: "held" },
    ]);
  });
});
