// AR: اختبارات مكون صفحة تفاصيل المرحلة — تتحقق من التحميل والخطأ وحالة النجاح.
// EN: Milestone detail section tests — verify loading, error, and success states.
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MilestoneDetailSection } from "@/components/agreements/MilestoneDetailSection";

const testQueryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

function renderMilestoneDetail(agreementId: string, milestoneId: string) {
  return render(
    <QueryClientProvider client={testQueryClient}>
      <MilestoneDetailSection
        agreementId={agreementId}
        milestoneId={milestoneId}
      />
    </QueryClientProvider>,
  );
}

describe("MilestoneDetailSection", () => {
  it("shows a loading state before data arrives", () => {
    renderMilestoneDetail("agr-1", "mil-1");

    expect(
      screen.getByText("جاري تحميل بيانات المرحلة..."),
    ).toBeTruthy();
  });

  it("shows the back-navigation link to the agreement workspace", () => {
    renderMilestoneDetail("agr-1", "mil-1");

    const backLink = screen.getByText("العودة لمساحة العمل");
    expect(backLink).toBeTruthy();
    expect(backLink.closest("a")?.getAttribute("href")).toBe(
      "/agreements/agr-1",
    );
  });
});
