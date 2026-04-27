import type { NotFoundStateContent } from "@/types";

// AR: هذا الملف يوحّد محتوى صفحات 404 والصفحات غير الجاهزة حتى تبقى الرسائل متسقة داخل النظام.
// EN: This file centralizes copy for 404 and not-ready pages so messaging stays consistent across the app.
export const globalNotFoundContent: NotFoundStateContent = {
  eyebrow: "الصفحة غير موجودة",
  code: "404",
  title: "لم نعثر على الصفحة التي تبحث عنها",
  description:
    "قد يكون الرابط غير صحيح، أو أن الصفحة نُقلت، أو أن هذه المساحة لم تُفعَّل بعد داخل منصة ضمان.",
  primaryActionLabel: "العودة إلى لوحة التحكم",
  primaryActionHref: "/dashboard",
  secondaryActionLabel: "الرجوع للرئيسية",
  secondaryActionHref: "/",
  highlights: [
    "تحقق من صحة الرابط الذي فتحته",
    "استخدم التنقل الجانبي للوصول إلى الصفحات المتاحة",
    "إذا كنت تتوقع وجود هذه الصفحة، فقد تكون قيد التطوير حاليًا",
  ],
};

export const adminNotReadyPages = {
  payments: {
    eyebrow: "ميزة قيد التحضير",
    code: "404",
    title: "صفحة الدفعات ليست جاهزة بعد",
    description:
      "نعمل حاليًا على بناء واجهة الدفعات وربطها بتدفقات الحجز والصرف داخل الاتفاقات بشكل متكامل.",
    primaryActionLabel: "العودة إلى لوحة التحكم",
    primaryActionHref: "/dashboard",
    secondaryActionLabel: "عرض الاتفاقات",
    secondaryActionHref: "/agreements",
    highlights: [
      "ستتضمن ملخص الدفعات المحجوزة والمصروفة",
      "سيظهر فيها تتبع الصرف المرتبط بالمراحل",
      "ستتصل لاحقًا بمراجعات AI عند وجود خلاف على الصرف",
    ],
  },
  reports: {
    eyebrow: "ميزة قيد التحضير",
    code: "404",
    title: "صفحة التقارير ليست جاهزة بعد",
    description:
      "قسم التقارير لم يُفعّل بعد، وسيجمع لاحقًا مؤشرات الاتفاقات والتسليمات والدفعات في مكان واحد.",
    primaryActionLabel: "العودة إلى لوحة التحكم",
    primaryActionHref: "/dashboard",
    secondaryActionLabel: "عرض العملاء",
    secondaryActionHref: "/clients",
    highlights: [
      "تقارير أداء شهرية ومقارنات زمنية",
      "ملخصات مرتبطة بحالة الاتفاقات والتسليمات",
      "قراءة أسرع لاتجاهات النشاط والمخاطر",
    ],
  },
  help: {
    eyebrow: "ميزة قيد التحضير",
    code: "404",
    title: "صفحة المساعدة ليست جاهزة بعد",
    description:
      "مركز المساعدة لا يزال تحت الإعداد، وسيضم لاحقًا أدلة الاستخدام، الأسئلة الشائعة، وطرق التواصل السريع.",
    primaryActionLabel: "العودة إلى لوحة التحكم",
    primaryActionHref: "/dashboard",
    secondaryActionLabel: "عرض الإعدادات",
    secondaryActionHref: "/settings",
    highlights: [
      "إجابات سريعة للأسئلة الشائعة",
      "أدلة خطوة بخطوة للاتفاقات والدفعات",
      "قنوات دعم أوضح عند الحاجة للمساعدة",
    ],
  },
  logout: {
    eyebrow: "إجراء غير متاح هنا",
    code: "404",
    title: "تسجيل الخروج غير مفعّل بعد",
    description:
      "زر تسجيل الخروج موجود في النموذج الحالي للواجهة، لكن التدفق الفعلي للخروج لم يُربط بعد بنظام المصادقة.",
    primaryActionLabel: "العودة إلى لوحة التحكم",
    primaryActionHref: "/dashboard",
    secondaryActionLabel: "الذهاب إلى الإعدادات",
    secondaryActionHref: "/settings",
    highlights: [
      "سيُربط لاحقًا بإدارة الجلسات الفعلية",
      "سيشمل إنهاء الجلسة الحالية بأمان",
      "سيظهر معه دعم أوضح لتبديل الحسابات",
    ],
  },
} as const satisfies Record<string, NotFoundStateContent>;
