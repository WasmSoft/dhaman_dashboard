import type { ClientPortalContentMap } from "@/types";

export const clientPortalContent = {
  portal: {
    title: "مراجعة اتفاق الدفع",
    description:
      "راجع تفاصيل الاتفاق، المراحل، وسياسات الدفع قبل الموافقة.",
    agreement: {
      sender: "حمزة",
      title: "تصميم صفحة هبوط لشركة ناشئة",
      total: "$450",
      currency: "USD",
      stagesLabel: "3 مراحل",
      paymentTiming: "بعد الموافقة مباشرة",
      badges: [
        {
          label: "بانتظار الموافقة",
          className:
            "rounded-full border border-amber-400/30 bg-amber-400/15 px-3 py-1 text-[11px] font-bold text-[#fbbf24]",
        },
        {
          label: "3 مراحل",
          className:
            "rounded-full border border-[#6d5dfc]/30 bg-[#6d5dfc]/15 px-3 py-1 text-[11px] font-bold text-[#a78bfa]",
        },
        {
          label: "دفعات محمية",
          className:
            "rounded-full border border-emerald-400/25 bg-emerald-400/[0.12] px-3 py-1 text-[11px] font-bold text-[#4ade80]",
        },
        {
          label: "AI Review متاح عند الخلاف",
          className:
            "rounded-full border border-blue-400/30 bg-blue-400/15 px-3 py-1 text-[11px] font-bold text-[#60a5fa]",
        },
      ],
    },
    parties: [
      {
        name: "حمزة",
        role: "Freelancer",
        email: "hamza@email.com",
        responsibility: "تنفيذ العمل وتسليم المراحل",
        initial: "ح",
        className:
          "border-[#6d5dfc]/15 bg-[#6d5dfc]/[0.06]",
        avatarClassName: "bg-[#6d5dfc]/20",
        avatarTextClassName: "text-[#a78bfa]",
      },
      {
        name: "شركة المدار",
        role: "Client",
        email: "client@almadar.com",
        responsibility: "مراجعة التسليمات واعتماد الدفعات",
        initial: "م",
        className:
          "border-[#2f80ed]/15 bg-[#2f80ed]/[0.06]",
        avatarClassName: "bg-[#2f80ed]/20",
        avatarTextClassName: "text-[#60a5fa]",
      },
    ],
    project: {
      title: "تصميم صفحة هبوط لشركة ناشئة",
      description:
        "تصميم صفحة هبوط احترافية توضّح قيمة المنتج، تعرض المزايا الأساسية، وتدفع الزائر إلى اتخاذ إجراء واضح.",
      details: [
        { label: "نوع الخدمة", value: "تصميم واجهات" },
        { label: "المدة المتوقعة", value: "14 يوم" },
        { label: "صيغة التسليم", value: "رابط Figma وملف تصميم نهائي" },
      ],
      roles: [
        {
          title: "دور الفريلانسر",
          description: "تنفيذ التصميم وتسليم المخرجات حسب شروط كل مرحلة",
          className:
            "rounded-[10px] border border-[#6d5dfc]/15 bg-[#6d5dfc]/[0.07] p-3",
        },
        {
          title: "دور العميل",
          description: "مراجعة المراحل والموافقة على التسليمات",
          className:
            "rounded-[10px] border border-[#2f80ed]/15 bg-[#2f80ed]/[0.07] p-3",
        },
      ],
    },
    payments: [
      {
        label: "المرحلة الأولى",
        amount: "$150",
        percent: 33,
        description: "Wireframe واتجاه بصري أولي مع مراجعة واحدة.",
        colorClassName: "text-[#a78bfa]",
        dotClassName: "bg-[#a78bfa]",
      },
      {
        label: "المرحلة الثانية",
        amount: "$200",
        percent: 44,
        description: "تصميم واجهة الصفحة الرئيسية وتفاصيل الأقسام الأساسية.",
        colorClassName: "text-[#60a5fa]",
        dotClassName: "bg-[#60a5fa]",
      },
      {
        label: "المرحلة الثالثة",
        amount: "$100",
        percent: 23,
        description: "تسليم ملف Figma النهائي وتجهيز الحالات المتجاوبة.",
        colorClassName: "text-[#4ade80]",
        dotClassName: "bg-[#4ade80]",
      },
    ],
    milestones: [
      {
        id: "discovery",
        title: "المرحلة الأولى: الاتجاه العام والهيكل",
        amount: "$150",
        summary: "تحديد بنية الصفحة، أقسامها، وأول مسار بصري.",
        description:
          "يتم تسليم Wireframe واضح مع اقتراح اتجاه بصري أولي يعكس هدف المنتج والجمهور المستهدف.",
        acceptanceCriteria: [
          "تغطية أقسام الصفحة الأساسية",
          "إظهار CTA رئيسي واضح",
          "توضيح المسار من القيمة إلى الإجراء",
          "تضمين ملاحظات مراجعة واحدة",
        ],
      },
      {
        id: "design",
        title: "المرحلة الثانية: تصميم الواجهة الرئيسية",
        amount: "$150",
        summary: "تصميم الصفحة الأساسية بنمط نهائي قابل للمراجعة.",
        description:
          "تشمل المرحلة تصميم الواجهة الرئيسية، البطاقات، حالات الأزرار، وتناسق التباعد والألوان مع الهوية المعتمدة.",
        acceptanceCriteria: [
          "واجهة رئيسية كاملة في Figma",
          "حالات واضحة للأزرار والروابط",
          "تنظيم مكونات الصفحة بصرياً",
          "تطبيق تعديلات المراجعة المعتمدة",
        ],
      },
      {
        id: "handoff",
        title: "المرحلة الثالثة: التسليم النهائي",
        amount: "$150",
        summary: "تسليم الملف النهائي وتجهيز النسخ المتجاوبة.",
        description:
          "تجهيز ملف Figma النهائي مع تنظيم الطبقات، نسخة موبايل، وملاحظات تسليم تساعد المطور على التنفيذ.",
        acceptanceCriteria: [
          "ملف Figma منظم ومسمى بوضوح",
          "تصميم Desktop وMobile",
          "تسليم رابط قابل للمراجعة",
          "تضمين ملاحظات التسليم النهائية",
        ],
      },
    ],
    policies: [
      {
        title: "الاعتراض على مرحلة",
        description:
          "يمكن للعميل الاعتراض خلال فترة المراجعة إذا لم تطابق التسليمات شروط القبول المتفق عليها.",
        className:
          "flex gap-3 rounded-[10px] border border-red-400/15 bg-red-400/[0.05] p-4 text-red-300",
      },
      {
        title: "طلب تعديل",
        description:
          "يمكن طلب تعديل واضح قبل اعتماد المرحلة، مع توضيح النقاط المطلوبة وربطها بالمخرجات.",
        className:
          "flex gap-3 rounded-[10px] border border-amber-400/15 bg-amber-400/[0.05] p-4 text-amber-300",
      },
      {
        title: "صرف الدفعة",
        description:
          "بعد اعتماد المرحلة يتم صرف مبلغها فقط، وتبقى بقية الدفعات محجوزة حتى إكمال مراحلها.",
        className:
          "flex gap-3 rounded-[10px] border border-emerald-400/15 bg-emerald-400/[0.05] p-4 text-emerald-300",
      },
      {
        title: "Change Request",
        description:
          "أي نطاق جديد خارج الاتفاق الحالي يتم تحويله إلى طلب تغيير مستقل قبل تنفيذه.",
        className:
          "flex gap-3 rounded-[10px] border border-[#6d5dfc]/15 bg-[#6d5dfc]/[0.05] p-4 text-[#a78bfa]",
      },
    ],
    aiReviewSteps: [
      { order: 1, label: "مراجعة شروط المرحلة" },
      { order: 2, label: "تحليل التسليم والاعتراض" },
      { order: 3, label: "إصدار توصية واضحة" },
    ],
    securityNotice: {
      title: "رابط مراجعة آمن",
      description:
        "هذا الرابط مخصص لمراجعة هذا الاتفاق فقط. لا تحتاج إلى إنشاء حساب في هذه المرحلة.",
      disclaimer:
        "ضمان يساعد الطرفين على توثيق المراحل والدفعات بوضوح، لكنه لا يمثل استشارة قانونية.",
    },
    footerText: "© 2026 Dhaman · جميع الحقوق محفوظة",
  },
  tracking: {
    title: "متابعة المشروع",
    description: "تابع مراحل الاتفاق، حالة الدفعات، والإجراءات المطلوبة منك.",
    activeProject: {
      eyebrow: "المشروع النشط",
      title: "تصميم صفحة هبوط لشركة ناشئة",
      freelancer: "حمزة",
      client: "شركة المدار",
      totalLabel: "إجمالي الاتفاق",
      total: "$450",
      stagesLabel: "1 من 3 مراحل",
      progressLabel: "تقدم الاتفاق",
      progressValue: "33%",
      stageLabels: ["المرحلة الأولى", "المرحلة الثانية", "المرحلة الثالثة"],
      badges: [
        {
          label: "اتفاق نشط",
          className:
            "border-emerald-400/25 bg-emerald-400/[0.12] text-[#4ade80]",
        },
        {
          label: "دفعات محمية",
          className: "border-[#6d5dfc]/30 bg-[#6d5dfc]/15 text-[#a78bfa]",
        },
        {
          label: "المرحلة الأولى قيد التنفيذ",
          className: "border-amber-400/30 bg-amber-400/15 text-[#fbbf24]",
        },
        {
          label: "AI Review متاح عند الخلاف",
          className: "border-blue-400/30 bg-blue-400/15 text-[#60a5fa]",
        },
      ],
      primaryAction: "عرض تفاصيل الاتفاق",
      secondaryAction: "نسخ رابط البوابة",
    },
    statusRows: [
      {
        label: "الحالة",
        value: "قيد التنفيذ",
        tone: "purple",
      },
      {
        label: "الإجراء التالي",
        value: "بانتظار تسليم الفريلانسر",
        tone: "amber",
      },
      {
        label: "الدفعة",
        value: "$150 محجوزة",
        tone: "purple",
      },
    ],
  },
} as const satisfies ClientPortalContentMap;
