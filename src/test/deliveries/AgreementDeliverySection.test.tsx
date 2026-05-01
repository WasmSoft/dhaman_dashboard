import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AgreementDeliverySection } from "@/components/agreements/AgreementDeliverySection";

const createMutateAsync = vi.fn();
const updateMutateAsync = vi.fn();
const submitMutateAsync = vi.fn();

vi.mock("@/hooks/milestones", () => ({
  useMilestoneDetailsQuery: () => ({
    data: {
      data: {
        id: "mil-1",
        agreementId: "agr-1",
        title: "Homepage design",
        description: "Milestone description",
        amount: "150.00",
        currency: "USD",
        dueDate: null,
        orderIndex: 1,
        status: "ACTIVE",
        paymentStatus: "RESERVED",
        deliveryStatus: "DRAFT",
        acceptanceCriteria: [{ description: "تسليم نسخة الموبايل" }],
        revisionLimit: 2,
        createdAt: "2026-05-01T09:00:00.000Z",
        updatedAt: "2026-05-01T10:00:00.000Z",
      },
    },
    isLoading: false,
  }),
}));

vi.mock("@/hooks/agreements", () => ({
  useAgreementDetailsQuery: () => ({
    data: {
      id: "agr-1",
      title: "Agreement",
      description: null,
      serviceType: null,
      freelancerId: "fre-1",
      clientId: "cli-1",
      client: null,
      totalAmount: 150,
      currency: "USD",
      durationText: null,
      expectedDeliveryDate: null,
      status: "ACTIVE",
      inviteToken: "invite-1",
      portalToken: "portal-1",
      approvedAt: null,
      sentAt: null,
      createdAt: "2026-05-01T09:00:00.000Z",
      updatedAt: "2026-05-01T10:00:00.000Z",
      milestones: [],
      policy: null,
    },
  }),
}));

vi.mock("@/hooks/deliveries/use-deliveries-query", () => ({
  useDeliveriesQuery: () => ({
    data: { data: { deliveries: [], page: 1, limit: 20, total: 0 } },
    isLoading: false,
  }),
}));

vi.mock("@/hooks/deliveries/use-create-delivery-mutation", () => ({
  useCreateDeliveryMutation: () => ({ isPending: false, mutateAsync: createMutateAsync }),
}));

vi.mock("@/hooks/deliveries/use-update-delivery-mutation", () => ({
  useUpdateDeliveryMutation: () => ({ isPending: false, mutateAsync: updateMutateAsync }),
}));

vi.mock("@/hooks/deliveries/use-submit-delivery-mutation", () => ({
  useSubmitDeliveryMutation: () => ({ isPending: false, mutateAsync: submitMutateAsync }),
}));

vi.mock("@/components/timeline-events", () => ({
  TimelineEvidencePanel: () => <div>timeline-evidence</div>,
}));

describe("AgreementDeliverySection", () => {
  it("renders the live milestone delivery form", () => {
    render(<AgreementDeliverySection agreementId="agr-1" milestoneId="mil-1" />);

    expect(screen.getByText("تقديم تسليم المرحلة")).toBeTruthy();
    expect(screen.getByText("Homepage design")).toBeTruthy();
    expect(screen.getByText("timeline-evidence")).toBeTruthy();
    expect(screen.getByText("رابط مراجعة التسليم")).toBeTruthy();
  });

  it("blocks submit when the confirmation checkbox is missing", async () => {
    render(<AgreementDeliverySection agreementId="agr-1" milestoneId="mil-1" />);

    fireEvent.change(screen.getByPlaceholderText(/اكتب باختصار/i), {
      target: { value: "This is a valid delivery summary for the current milestone." },
    });
    fireEvent.click(screen.getByText("إرسال التسليم للعميل"));

    expect(
      await screen.findByText("يجب تأكيد جاهزية التسليم قبل الإرسال"),
    ).toBeTruthy();
  });
});
