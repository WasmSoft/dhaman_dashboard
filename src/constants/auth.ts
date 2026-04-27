import type { AuthContentMap } from "@/types";

export const authContent = {
  login: {
    title: "تسجيل الدخول",
    description:
      "هذه صفحة placeholder نظيفة لبدء تطوير تدفق تسجيل الدخول داخل مجموعة routes الخاصة بالمصادقة.",
  },
  signUp: {
    title: "إنشاء حساب",
    description:
      "هذه صفحة placeholder نظيفة لبدء تطوير تدفق إنشاء الحساب بدون خلط بين الـ route والـ UI والمنطق.",
  },
} as const satisfies AuthContentMap;
