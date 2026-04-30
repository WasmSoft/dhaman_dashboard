import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CardLoading, CardEmpty, CardError } from "@/components/dashboard/DashboardCardStates";
import { translateDashboardError } from "@/lib/dashboard/helpers/translate-dashboard-error";

import type { DashboardErrorCode } from "@/types/dashboard";

describe("DashboardCardStates", () => {
  describe("CardLoading", () => {
    it("renders a loading indicator with accessible role", () => {
      render(<CardLoading />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });

  describe("CardEmpty", () => {
    it("renders the localized empty message", () => {
      render(<CardEmpty messageKey="dashboard.actions.empty" />);
      expect(screen.getByText("كل شيء مكتمل")).toBeInTheDocument();
    });
  });

  describe("CardError", () => {
    it("renders the localized error message for a known error code", () => {
      render(
        <CardError
          code="DASHBOARD_RANGE_INVALID"
          onRetry={() => {}}
        />,
      );
      expect(
        screen.getByText("نطاق التاريخ للوحة التحكم غير صالح."),
      ).toBeInTheDocument();
    });

    it("renders a retry button and calls onRetry when clicked", async () => {
      const user = userEvent.setup();
      const onRetry = vi.fn();
      render(
        <CardError code="VALIDATION_ERROR" onRetry={onRetry} />,
      );

      const retryButton = screen.getByRole("button", { name: /إعادة المحاولة|retry/i });
      await user.click(retryButton);
      expect(onRetry).toHaveBeenCalledOnce();
    });
  });
});