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
      },
      {
        label: "المرحلة الثانية",
        amount: "$150",
        percent: 33,
        description: "تصميم واجهة الصفحة الرئيسية وتفاصيل الأقسام الأساسية.",
      },
      {
        label: "المرحلة الثالثة",
        amount: "$150",
        percent: 34,
        description: "تسليم ملف Figma النهائي وتجهيز الحالات المتجاوبة.",
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
  paymentSetup: {
    title: "إعداد الدفعات المحمية",
    description:
      "راجع خطة الدفعات، احجز دفعة المرحلة الأولى، وابدأ المشروع بثقة.",
    eyebrow: "إعداد دفع محمي",
    project: {
      title: "تصميم صفحة هبوط لشركة ناشئة",
      meta: "حمزة → شركة المدار · دفعات حسب المراحل",
    },
    stats: [
      {
        label: "مطلوب الآن",
        value: "$150",
        description: "المرحلة الأولى",
        tone: "green",
      },
      {
        label: "إجمالي الاتفاق",
        value: "$450",
        description: "3 مراحل",
        tone: "default",
      },
    ],
    badges: [
      {
        label: "اتفاق معتمد",
        className:
          "border-emerald-400/25 bg-emerald-400/[0.12] text-[#4ade80]",
      },
      {
        label: "3 مراحل",
        className: "border-[#6d5dfc]/30 bg-[#6d5dfc]/15 text-[#a78bfa]",
      },
      {
        label: "دفعة أولى مطلوبة",
        className: "border-amber-400/30 bg-amber-400/15 text-[#fbbf24]",
      },
      {
        label: "دفعات محمية",
        className: "border-[#2f80ed]/30 bg-[#2f80ed]/15 text-[#60a5fa]",
      },
      {
        label: "AI Review متاح عند الخلاف",
        className: "border-white/[0.08] bg-white/[0.05] text-[#7f86a8]",
      },
    ],
    actions: [
      {
        label: "حجز الدفعة الأولى",
        icon: "lock",
        variant: "primary",
      },
      {
        label: "عرض تفاصيل الاتفاق",
        icon: "file",
        variant: "secondary",
      },
      {
        label: "العودة للبوابة",
        icon: "arrow",
        variant: "ghost",
      },
    ],
    notice:
      "سيتم حجز دفعة المرحلة الأولى حتى يتم تسليمها ومراجعتها حسب شروط الاتفاق.",
    details: {
      summary: {
        title: "ملخص الدفع",
        rows: [
          { label: "إجمالي الاتفاق", value: "$450" },
          { label: "عملة الدفع", value: "USD", tone: "muted" },
          { label: "عدد المراحل", value: "3 مراحل", tone: "muted" },
          { label: "هيكل الدفع", value: "الدفع على مراحل", tone: "muted" },
          {
            label: "الدفعة الحالية المطلوبة",
            value: "$150",
            tone: "green",
          },
          { label: "المبلغ المتبقي", value: "$300", tone: "muted" },
        ],
        stages: [
          {
            label: "المرحلة الأولى",
            amount: "$150",
            status: "مطلوبة الآن",
            tone: "purple",
            current: true,
          },
          {
            label: "المرحلة الثانية",
            amount: "$200",
            status: "لاحقًا",
            tone: "blue",
          },
          {
            label: "المرحلة الثالثة",
            amount: "$100",
            status: "لاحقًا",
            tone: "green",
          },
        ],
        note:
          "لا يتم صرف أي دفعة للفريلانسر إلا بعد تسليم المرحلة ومراجعتها أو حسب توصية AI عند وجود خلاف.",
      },
      milestones: {
        title: "خطة دفعات المراحل",
        description: "كل دفعة مرتبطة بمرحلة واضحة وشروط قبول محددة.",
        items: [
          {
            order: 1,
            title: "المرحلة الأولى: الاتجاه والتصميم الأولي",
            status: "مطلوبة الآن",
            amount: "$150",
            dueLabel: "خلال 5 أيام",
            description:
              "Wireframe واتجاه بصري أولي مع مراجعة واحدة قبل اعتماد المرحلة.",
            acceptanceCriteria: [
              "تسليم Wireframe واضح للصفحة",
              "تحديد أقسام الصفحة الرئيسية",
              "اعتماد الاتجاه البصري الأولي",
            ],
            tone: "purple",
            current: true,
          },
          {
            order: 2,
            title: "المرحلة الثانية: تصميم الواجهة النهائية",
            status: "لاحقًا",
            amount: "$200",
            dueLabel: "خلال 7 أيام",
            description:
              "تصميم واجهة الصفحة الرئيسية وحالات الأقسام الأساسية.",
            acceptanceCriteria: [
              "واجهة رئيسية كاملة في Figma",
              "حالات واضحة للأزرار والروابط",
              "تنظيم مكونات الصفحة بصريًا",
            ],
            tone: "blue",
          },
          {
            order: 3,
            title: "المرحلة الثالثة: التسليم النهائي",
            status: "لاحقًا",
            amount: "$100",
            dueLabel: "خلال 11 يوم",
            description:
              "تسليم ملف Figma النهائي وتجهيز الملاحظات والنسخ المتجاوبة.",
            acceptanceCriteria: [
              "ملف Figma منظم ومسمى بوضوح",
              "تصميم Desktop وMobile",
              "تسليم رابط قابل للمراجعة",
            ],
            tone: "green",
          },
        ],
        aiReview: {
          title: "ماذا يحدث عند وجود خلاف؟",
          description:
            "إذا اختلف الطرفان، يقارن ضمان بين شروط القبول، التسليم، وسياسات الاتفاق ثم يقترح قرارًا واضحًا.",
          steps: [
            { label: "اعتراض العميل", icon: "flag", tone: "danger" },
            { label: "تحليل AI للشروط", icon: "bot", tone: "purple" },
            { label: "توصية واضحة", icon: "shield", tone: "blue" },
            { label: "صرف أو مراجعة", icon: "check", tone: "green" },
          ],
        },
      },
      paymentMethod: {
        title: "طريقة الدفع",
        options: [
          {
            label: "بطاقة بنكية",
            detail: "Visa / Mastercard",
            icon: "card",
            selected: true,
          },
          {
            label: "Apple Pay",
            detail: "غير متاح حاليًا",
            icon: "apple",
            disabled: true,
          },
          {
            label: "تحويل بنكي",
            detail: "قريبًا",
            icon: "bank",
            disabled: true,
          },
        ],
        warning: "هذه واجهة محاكاة للدفع في نسخة MVP.",
        fields: [
          { label: "رقم البطاقة", value: "4242 4242 4242 4242" },
          { label: "تاريخ الانتهاء", value: "12 / 27" },
          { label: "رمز الأمان", value: "CVC" },
          { label: "اسم حامل البطاقة", value: "شركة المدار" },
        ],
      },
      checklist: {
        title: "تأكيد قبل الدفع",
        items: [
          "راجعت قيمة الدفعة الأولى",
          "أفهم أن الدفعة مرتبطة بالمرحلة الأولى",
          "أفهم أن الصرف يتم بعد مراجعة التسليم",
          "أوافق على سياسات الاتفاق المرتبطة بالدفع",
        ],
        confirmation: "أؤكد رغبتي في حجز دفعة المرحلة الأولى بقيمة $150.",
      },
      reservation: {
        title: "تأكيد حجز الدفعة",
        rows: [
          { label: "المبلغ", value: "$150", tone: "green" },
          { label: "طريقة الدفع", value: "بطاقة بنكية" },
          { label: "الحالة بعد الدفع", value: "Reserved", tone: "purple" },
        ],
        primaryAction: "تأكيد وحجز الدفعة",
        secondaryAction: "العودة للبوابة",
        warning: "يرجى تأكيد جميع البنود في قائمة التحقق أعلاه قبل المتابعة.",
        note:
          "بعد تأكيد الحجز، سيتم تحديث حالة الاتفاق وإشعار الفريلانسر ببدء المرحلة الأولى.",
      },
      footer: {
        title: "دفع محمي وواضح",
        description:
          "ضمان يساعد الطرفين على ربط الدفعات بالمراحل والتسليمات، لتقليل الخلافات وتوضيح متى يتم الصرف.",
        disclaimer:
          "هذه واجهة محاكاة للدفع في نسخة MVP، ولا تمثل Escrow قانوني أو عملية دفع حقيقية في هذه المرحلة.",
        links: ["سياسة الخصوصية", "الشروط والأحكام"],
        copyright: "© 2026 Dhaman",
      },
    },
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
    paymentSummary: {
      title: "ملخص الدفعات",
      description: "كل دفعة مرتبطة بمرحلة واضحة وشروط قبول محددة.",
      stats: [
        {
          label: "إجمالي الاتفاق",
          value: "$450",
          description: "قيمة المشروع كاملة",
          tone: "default",
        },
        {
          label: "محجوز",
          value: "$150",
          description: "دفعة المرحلة الحالية",
          tone: "purple",
        },
        {
          label: "تحت المراجعة",
          value: "$0",
          description: "لا توجد دفعات قيد المراجعة الآن",
          tone: "blue",
        },
        {
          label: "مصروف",
          value: "$0",
          description: "لم يتم صرف أي دفعة بعد",
          tone: "green",
        },
      ],
      note: "بعد تسليم المرحلة، ستنتقل الدفعة إلى مراجعتك قبل الصرف.",
    },
    requiredAction: {
      title: "الإجراء المطلوب الآن",
      heading: "لا يوجد إجراء مطلوب منك حاليًا",
      description:
        "الفريلانسر يعمل على المرحلة الأولى. ستظهر لك هنا إجراءات المراجعة عند رفع التسليم.",
      status: "بانتظار تسليم الفريلانسر",
      expectation: "متوقع: بعد يومين",
      note:
        "عند رفع التسليم، ستتمكن من قبوله، طلب تعديل، أو فتح مراجعة AI إذا كان هناك خلاف.",
      actions: ["مراجعة التسليم", "طلب تعديل", "فتح AI Review"],
    },
    agreementTimeline: {
      title: "مسار الاتفاق",
      description: "يعرض هذا المسار أهم الأحداث منذ إنشاء الاتفاق وحتى اكتماله.",
      steps: [
        {
          title: "تم إنشاء الاتفاق",
          time: "منذ 3 أيام",
          description: "أنشأ حمزة اتفاق الدفع والمراحل.",
          state: "completed",
        },
        {
          title: "تم إرسال الدعوة",
          time: "منذ يومين",
          description: "تم إرسال رابط مراجعة الاتفاق إلى شركة المدار.",
          state: "completed",
        },
        {
          title: "تمت الموافقة",
          time: "منذ يوم",
          description: "وافقت شركة المدار على الاتفاق وأصبح نشطًا.",
          state: "completed",
        },
        {
          title: "المرحلة الأولى قيد التنفيذ",
          time: "الآن",
          description: "الفريلانسر يعمل على الهيكل والتصميم الأولي.",
          status: "قيد التنفيذ الآن",
          state: "current",
        },
        {
          title: "مراجعة التسليم",
          description: "بعد رفع التسليم، ستراجعه شركة المدار.",
          state: "upcoming",
        },
        {
          title: "صرف الدفعة أو مراجعة AI",
          description:
            "بعد القبول يتم صرف الدفعة، أو يتم فتح مراجعة AI عند الخلاف.",
          state: "upcoming",
        },
      ],
    },
    progressDetails: {
      milestones: {
        title: "مراحل المشروع",
        description: "كل مرحلة لها مبلغ، موعد، وشروط قبول واضحة.",
        items: [
          {
            order: 1,
            title: "المرحلة الأولى: الهيكل والتصميم الأولي",
            status: "قيد التنفيذ",
            escrowStatus: "محجوزة",
            amount: "$150",
            dueLabel: "بعد يومين",
            deliveryLabel: "حالة التسليم",
            deliveryStatus: "بانتظار التسليم",
            acceptanceTitle: "شروط القبول",
            acceptanceCriteria: [
              "تسليم Wireframe واضح للصفحة",
              "تحديد أقسام الصفحة الرئيسية",
              "اعتماد الاتجاه البصري الأولي",
            ],
            revisionPrefix: "التعديلات المسموحة: ",
            revisionHighlight: "تعديلان",
            revisionSuffix: " ستتمكن من المراجعة بعد رفع التسليم",
            defaultOpen: true,
          },
          {
            order: 2,
            title: "المرحلة الثانية: تصميم الواجهة النهائية",
            status: "قادمة",
            escrowStatus: "بانتظار إكمال المرحلة السابقة",
            amount: "$200",
            dueLabel: "بعد 7 أيام",
          },
          {
            order: 3,
            title: "المرحلة الثالثة: التسليم النهائي",
            status: "قادمة",
            escrowStatus: "بانتظار إكمال المرحلة السابقة",
            amount: "$100",
            dueLabel: "بعد 11 يوم",
          },
        ],
      },
      policies: {
        title: "سياسات الاتفاق",
        description:
          "هذه السياسات تنظّم التأخير، الإلغاء، الطلبات الإضافية، والمراجعة.",
        actionLabel: "عرض تفاصيل السياسات",
        items: [
          {
            title: "سياسة التأخير",
            description: "يجب مراجعة التسليم خلال 3 أيام عمل.",
            tone: "warning",
          },
          {
            title: "سياسة الإلغاء",
            description: "يمكن الإلغاء قبل بدء المرحلة الأولى.",
            tone: "danger",
          },
          {
            title: "الطلبات الإضافية",
            description: "أي طلب خارج النطاق يتحول إلى Change Request.",
            tone: "blue",
          },
          {
            title: "المراجعة والاعتراض",
            description: "يجب ربط الاعتراض بشرط قبول واضح.",
            tone: "purple",
          },
        ],
      },
      dispute: {
        title: "ماذا يحدث عند وجود خلاف؟",
        description:
          "إذا كان هناك اعتراض على التسليم، يقارن ضمان بين شروط القبول، التسليم المرفوع، وسياسات الاتفاق. بعدها يقترح قرارًا واضحًا مثل صرف الدفعة، طلب تعديل، تعليق الدفعة، أو إنشاء Change Request.",
        steps: [
          { order: 1, label: "اعتراض", tone: "danger" },
          { order: 2, label: "تحليل AI", tone: "purple" },
          { order: 3, label: "توصية", tone: "blue" },
          { order: 4, label: "قرار", tone: "green" },
        ],
      },
    },
    finalSummary: {
      agreement: {
        title: "ملخص الاتفاق",
        rows: [
          {
            label: "المشروع",
            value: "تصميم صفحة هبوط لشركة ناشئة",
          },
          {
            label: "الفريلانسر",
            value: "حمزة",
          },
          {
            label: "العميل",
            value: "شركة المدار",
          },
          {
            label: "الحالة",
            value: "نشط",
            tone: "green",
          },
          {
            label: "عدد المراحل",
            value: "3",
          },
          {
            label: "قيمة الاتفاق",
            value: "$450",
          },
        ],
      },
      nextStep: {
        title: "الخطوة التالية",
        description: "بانتظار تسليم المرحلة الأولى من الفريلانسر.",
        expectation: "متوقع خلال يومين",
        note: "لا يوجد إجراء مطلوب منك الآن",
      },
      actions: {
        title: "الإجراءات المتاحة",
        items: [
          {
            label: "عرض تفاصيل الاتفاق",
            icon: "eye",
            variant: "primary",
          },
          {
            label: "نسخ رابط البوابة",
            icon: "copy",
            variant: "secondary",
          },
          {
            label: "التواصل للدعم",
            icon: "help",
            variant: "secondary",
          },
          {
            label: "مراجعة التسليم غير متاح بعد",
            icon: "review",
            variant: "ghost",
            disabled: true,
          },
        ],
      },
      security: {
        title: "بوابة آمنة",
        description:
          "هذا الرابط مخصص لمتابعة هذا الاتفاق فقط. لا تحتاج إلى إنشاء حساب في هذه المرحلة.",
        tokenLabel: "Token Protected",
      },
    },
    footer: {
      notice: {
        title: "متابعة محمية وواضحة",
        description:
          "ضمان يساعد الطرفين على توثيق المراحل، الدفعات، والتسليمات بطريقة واضحة تقلل الخلافات.",
        disclaimer:
          "هذا النظام ينظم الاتفاقات والدفعات داخل تجربة المنتج، ولا يمثل استشارة قانونية.",
      },
      links: ["سياسة الخصوصية", "الشروط والأحكام"],
      copyright: "© 2026 Dhaman",
    },
  },
  deliveryPreview: {
    title: "مراجعة تسليم المرحلة",
    description:
      "راجع التسليم المرفوع، قارنه بشروط القبول، ثم اختر الإجراء المناسب.",
    hero: {
      eyebrow: "تسليم مرحلة",
      title: "المرحلة الأولى: الهيكل والتصميم الأولي",
      meta: "تصميم صفحة هبوط لشركة ناشئة · حمزة → شركة المدار",
      amount: "$150",
      amountLabel: "قيمة المرحلة",
      uploadedAt: "رُفع منذ ساعتين",
      reviewDeadline: "مهلة 3 أيام عمل",
      badges: [
        {
          label: "بانتظار مراجعتك",
          tone: "warning",
        },
        {
          label: "Client Review",
          tone: "blue",
        },
        {
          label: "دفعة محمية",
          tone: "green",
        },
        {
          label: "AI Review متاح عند الخلاف",
          tone: "purple",
        },
      ],
      actions: [
        {
          label: "قبول التسليم وصرف الدفعة",
          icon: "check",
          variant: "accept",
        },
        {
          label: "طلب تعديل",
          variant: "secondary",
        },
        {
          label: "فتح AI Review",
          icon: "bot",
          variant: "ai",
        },
      ],
      note: "عند قبول التسليم، تصبح دفعة المرحلة جاهزة للصرف للفريلانسر.",
    },
    stageDetails: {
      title: "تفاصيل المرحلة",
      rows: [
        {
          label: "اسم المرحلة",
          value: "المرحلة الأولى: الهيكل والتصميم الأولي",
        },
        {
          label: "قيمة الدفعة",
          value: "$150",
          tone: "green",
        },
        {
          label: "الموعد",
          value: "خلال 5 أيام",
        },
        {
          label: "التعديلات",
          value: "تعديلان",
        },
        {
          label: "الإصدار الحالي",
          value: "الإصدار الأول",
        },
        {
          label: "حالة التسليم",
          value: "تم تقديم التسليم",
          tone: "purple",
        },
        {
          label: "حالة الدفعة",
          value: "تحت مراجعة العميل",
          tone: "warning",
        },
      ],
      note:
        "هذه المرحلة تركز على الهيكل الأولي للصفحة وتحديد أقسامها والاتجاه البصري الأولي.",
    },
    submission: {
      title: "التسليم المرفوع",
      description: "راجع الرابط والملفات المرفقة من الفريلانسر.",
      freelancer: {
        name: "حمزة",
        uploadedAt: "منذ ساعتين",
        avatarLabel: "ح",
      },
      attachments: [
        {
          title: "Figma Wireframe",
          meta: "https://figma.com/file/dhaman-landing-wireframe",
          kind: "link",
          actions: [
            {
              label: "فتح الرابط",
              icon: "external-link",
            },
            {
              label: "نسخ",
              icon: "copy",
            },
          ],
        },
        {
          title: "landing-wireframe-v1.pdf",
          meta: "PDF · ملف مرفق",
          kind: "file",
          actions: [
            {
              label: "تحميل",
              icon: "download",
            },
          ],
        },
      ],
      summary: {
        label: "ملخص التسليم",
        text:
          "تم تجهيز الهيكل الأولي للصفحة، تحديد أقسام Hero والمزايا وطريقة العمل، وإعداد اتجاه بصري مبدئي للمراجعة.",
      },
      notes: {
        label: "ملاحظات الفريلانسر",
        text:
          "يرجى التركيز على ترتيب الأقسام والرسالة الرئيسية قبل الانتقال للتصميم النهائي.",
      },
    },
    contextSummary: {
      payment: {
        title: "ملخص الدفعة",
        rows: [
          {
            label: "مبلغ المرحلة",
            value: "$150",
            tone: "green",
          },
          {
            label: "الحالة الحالية",
            value: "Client Review",
            tone: "warning",
          },
          {
            label: "بعد القبول",
            value: "Ready to Release",
            tone: "green",
          },
          {
            label: "عند الاعتراض",
            value: "AI Review · On Hold",
            tone: "purple",
          },
        ],
      },
      deadline: {
        title: "مهلة المراجعة",
        value: "3",
        unit: "أيام",
        description: "لديك 3 أيام عمل لمراجعة التسليم.",
        note: "تساعد المهلة على إبقاء المشروع واضحًا للطرفين.",
      },
      policies: {
        title: "سياسات مرتبطة",
        items: [
          "يجب ربط الاعتراض بشرط قبول محدد.",
          "أي طلب خارج النطاق يتحول إلى Change Request.",
          "يمكن فتح AI Review عند وجود خلاف.",
        ],
        actionLabel: "عرض السياسات",
      },
      project: {
        title: "ملخص المشروع",
        rows: [
          {
            label: "المشروع",
            value: "تصميم صفحة هبوط لشركة ناشئة",
          },
          {
            label: "الفريلانسر",
            value: "حمزة",
          },
          {
            label: "المرحلة الحالية",
            value: "1 من 3",
          },
          {
            label: "قيمة الاتفاق",
            value: "$450",
            tone: "green",
          },
        ],
      },
      security: {
        title: "مراجعة آمنة",
        description:
          "هذا الرابط مخصص لمراجعة هذا التسليم فقط داخل اتفاقك مع الفريلانسر.",
        badge: "Token Protected",
      },
    },
    review: {
      criteria: {
        title: "شروط قبول المرحلة",
        description: "استخدم هذه الشروط لتحديد هل التسليم يطابق الاتفاق.",
        note:
          "إذا كان الاعتراض على شرط محدد، اربطه بهذا الشرط عند طلب تعديل أو فتح AI Review.",
        items: [
          {
            label: "تسليم Wireframe واضح للصفحة",
            status: "يبدو مكتملًا",
            state: "completed",
          },
          {
            label: "تحديد أقسام الصفحة الرئيسية",
            status: "يبدو مكتملًا",
            state: "completed",
          },
          {
            label: "اعتماد الاتجاه البصري الأولي",
            status: "بحاجة مراجعة",
            state: "review",
          },
        ],
      },
      decision: {
        title: "قرارك بخصوص التسليم",
        description: "اختر الإجراء المناسب بعد مراجعة التسليم وشروط القبول.",
        note: "يجب أن يكون طلب التعديل أو الاعتراض مرتبطًا بشروط قبول المرحلة.",
        options: [
          {
            title: "قبول التسليم وصرف الدفعة",
            description: "استخدم هذا الخيار إذا كان التسليم يطابق شروط المرحلة.",
            actionLabel: "قبول وصرف الدفعة",
            tone: "accept",
          },
          {
            title: "طلب تعديل",
            description:
              "استخدم هذا الخيار إذا كان التسليم يحتاج تعديلًا داخل نطاق شروط المرحلة.",
            actionLabel: "طلب تعديل",
            tone: "revision",
          },
          {
            title: "فتح AI Review",
            description:
              "استخدم هذا الخيار إذا كان هناك خلاف واضح حول هل التسليم يطابق شروط الاتفاق.",
            actionLabel: "فتح مراجعة AI",
            tone: "ai",
          },
        ],
      },
      flow: {
        title: "ماذا يحدث بعد قرارك؟",
        cards: [
          {
            title: "إذا قبلت التسليم",
            tone: "accept",
            steps: ["تصبح الدفعة جاهزة للصرف", "ينتقل المشروع للمرحلة التالية"],
          },
          {
            title: "إذا طلبت تعديل",
            tone: "revision",
            steps: [
              "يستلم الفريلانسر طلبك",
              "يرفع نسخة محدثة",
              "تراجعها مرة أخرى",
            ],
          },
          {
            title: "إذا فتحت AI Review",
            tone: "ai",
            steps: ["يتم تحليل الاعتراض", "تصدر توصية", "تتحدد حالة الدفعة"],
          },
        ],
      },
      notice: {
        title: "قرار واضح وموثق",
        description:
          "أي إجراء تتخذه هنا سيتم توثيقه في سجل الاتفاق، ليساعد الطرفين على تتبع التسليمات والدفعات بوضوح.",
        disclaimer:
          "ضمان يساعد على تنظيم المراجعة والدفعات، ولا يمثل استشارة قانونية.",
      },
    },
  },
} as const satisfies ClientPortalContentMap;
