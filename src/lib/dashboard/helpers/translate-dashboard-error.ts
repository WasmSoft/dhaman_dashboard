import type { DashboardErrorCode } from "@/types";

import { dashboardErrorMessages } from "@/constants/dashboard";

// AR: تحوّل رمز خطأ لوحة التحكم إلى رسالة مترجمة حسب اللغة المطلوبة.
// EN: Translates a dashboard error code into a localized message for the requested locale.
export function translateDashboardError(
  code: DashboardErrorCode,
  locale: "en" | "ar",
): string {
  const entry = dashboardErrorMessages[code];

  if (!entry) {
    throw new Error(`Missing dashboard error translation for code: ${code}`);
  }

  return entry[locale];
}