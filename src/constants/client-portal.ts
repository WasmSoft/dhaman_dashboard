import type { ClientPortalContentMap } from "@/types";

export const clientPortalContent = {
  portal: {
    title: "بوابة العميل",
    description:
      "هذه صفحة placeholder أساسية لواجهة العميل، وتم فصلها داخل route group مستقل لتسهيل العمل المتوازي على الـ portal.",
  },
} as const satisfies ClientPortalContentMap;
