// AR: محتوى عربي ثابت لواجهة العملاء مع نصوص الحالة والمدخلات فقط.
// EN: Static Arabic content for the clients UI with labels and state copy only.
import type { ClientPageLabels } from "@/types";

export const clientContent = {
  clients: {
    title: "العملاء",
    subtitle: "تابع عملاءك، وابحث بسرعة، وانتقل بين الصفحات دون فقدان السياق.",
    searchPlaceholder: "ابحث باسم العميل أو البريد الإلكتروني أو اسم الشركة",
    emptyTitle: "لا يوجد عملاء بعد",
    emptyDescription: "ابدأ بإضافة أول عميل لتتمكن من استخدامه في الاتفاقات والفواتير.",
    noResultsTitle: "لا توجد نتائج مطابقة",
    noResultsDescription: "جرّب كلمة بحث مختلفة أو امسح الفلتر الحالي.",
    retryLabel: "إعادة المحاولة",
    pageLabel: "صفحة",
    ofLabel: "من",
    detailsLabel: "عرض التفاصيل",
    phoneLabel: "الهاتف",
    companyLabel: "الشركة",
    createdLabel: "تاريخ الإنشاء",
    updatedLabel: "آخر تحديث",
  },
} as const satisfies { clients: ClientPageLabels };
