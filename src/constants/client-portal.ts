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
    paymentOutcome: {
      operationSummary: {
        title: "ملخص العملية",
        rows: [
          {
            label: "المشروع",
            value: "تصميم صفحة هبوط",
            tone: "muted",
          },
          {
            label: "الدفعة الحالية",
            value: "$150",
            tone: "green",
          },
          {
            label: "المرحلة",
            value: "الأولى",
            tone: "muted",
          },
          {
            label: "الحالة بعد الدفع",
            value: "Reserved",
            tone: "purple",
          },
          {
            label: "إجمالي الاتفاق",
            value: "$450",
            tone: "muted",
          },
          {
            label: "المتبقي لاحقًا",
            value: "$300",
            tone: "subtle",
          },
        ],
      },
      protection: {
        title: "حماية الدفعة",
        description:
          "لا يتم صرف الدفعة تلقائيًا. يتم ربطها بتسليم المرحلة ومراجعتك.",
        badge: "Protected Payment",
      },
      afterPayment: {
        title: "بعد الدفع",
        steps: [
          "تتغير حالة الدفعة إلى Reserved",
          "يبدأ الفريلانسر تنفيذ المرحلة",
          "تستلم إشعارًا عند رفع التسليم",
          "تراجع التسليم وتقرر الصرف أو طلب تعديل",
        ],
      },
      policies: {
        title: "سياسات مرتبطة",
        items: [
          "مراجعة العميل خلال 3 أيام عمل",
          "الاعتراض يجب أن يرتبط بشرط قبول",
          "الطلبات الإضافية تتحول إلى Change Request",
        ],
        actionLabel: "عرض السياسات",
      },
      securityNote: {
        title: "ملاحظة أمان",
        description:
          "هذه واجهة دفع تجريبية للـ MVP. في النسخة الفعلية سيتم ربطها بمزود دفع آمن.",
        badge: "Demo Payment",
      },
    },
  },
  paymentConfirmation: {
    title: "تم حجز الدفعة بنجاح",
    description:
      "تم حجز دفعة المرحلة الأولى وربطها بشروط التسليم والمراجعة داخل بوابة المشروع.",
    hero: {
      eyebrow: "تأكيد الحجز",
      heading: "تم حجز دفعة المرحلة الأولى",
      meta: "تصميم صفحة هبوط لشركة ناشئة · حمزة → شركة المدار",
      description:
        "تم حجز مبلغ $150 كدفعة محمية للمرحلة الأولى. لن يتم صرفها تلقائيًا، وستبقى Reserved حتى يتم رفع التسليم ومراجعته.",
      amountLabel: "المبلغ المحجوز",
      amount: "$150",
      amountStatus: "Reserved",
      badges: [
        {
          label: "تم بنجاح",
          className:
            "border-emerald-400/25 bg-emerald-400/[0.12] text-[#4ade80]",
        },
        {
          label: "Reserved",
          className: "border-[#6d5dfc]/30 bg-[#6d5dfc]/15 text-[#a78bfa]",
        },
        {
          label: "دفعة محمية",
          className: "border-[#2f80ed]/30 bg-[#2f80ed]/15 text-[#60a5fa]",
        },
        {
          label: "محاكاة دفع آمن",
          className: "border-white/[0.08] bg-white/[0.05] text-[#b8bdd8]",
        },
      ],
      primaryAction: "العودة لبوابة المشروع",
      secondaryActions: [
        {
          label: "عرض الإيصال",
          icon: "receipt",
          variant: "secondary",
        },
        {
          label: "نسخ رقم العملية",
          icon: "copy",
          variant: "ghost",
        },
      ],
    },
    receipt: {
      title: "ملخص الإيصال",
      receiptId: "DHMN-PAY-2026-0048",
      rows: [
        { label: "رقم الإيصال", value: "DHMN-PAY-2026-0048" },
        { label: "مرجع العملية", value: "TXN-8K29-M1" },
        { label: "تاريخ الدفع", value: "26 أبريل 2026" },
        { label: "وقت الدفع", value: "02:45 PM" },
        { label: "طريقة الدفع", value: "Visa •••• 4242" },
        { label: "حامل البطاقة", value: "شركة المدار" },
      ],
      totals: [
        { label: "قيمة المرحلة", value: "$150" },
        { label: "رسوم ضمان (ديمو)", value: "$0", tone: "muted" },
        { label: "الإجمالي المحجوز", value: "$150", tone: "green" },
      ],
      badges: ["تم الحجز بنجاح", "Reserved"],
      note:
        "هذه واجهة إيصال تجريبية ضمن نسخة MVP، ولا تمثل عملية دفع حقيقية أو Escrow قانوني في هذه المرحلة.",
    },
    fundedMilestone: {
      title: "تفاصيل المرحلة الممولة",
      amount: "$150",
      heading: "المرحلة الأولى: الهيكل والتصميم الأولي",
      project: "تصميم صفحة هبوط لشركة ناشئة",
      rows: [
        { label: "حالة المرحلة", value: "قيد التنفيذ" },
        { label: "حالة الدفعة", value: "Reserved", tone: "purple" },
        { label: "التسليم المتوقع", value: "خلال 5 أيام", tone: "green" },
        { label: "حد التعديلات", value: "تعديلان", tone: "muted" },
      ],
      acceptanceCriteria: [
        "تسليم Wireframe واضح للصفحة",
        "تحديد أقسام الصفحة الرئيسية",
        "اعتماد الاتجاه البصري الأولي",
      ],
      note:
        "سيتم استخدام هذه الشروط عند مراجعة التسليم قبل صرف الدفعة أو طلب التعديل أو فتح AI Review.",
    },
    protection: {
      title: "حالة حماية الدفعة",
      beforeLabel: "قبل",
      beforeStatus: "بانتظار الحجز",
      currentLabel: "الآن",
      currentStatus: "Reserved",
      note:
        "أصبحت الدفعة الآن محجوزة ومحميّة داخل تجربة ضمان، وليست مصروفة بعد للفريلانسر.",
      items: [
        {
          title: "ليست مصروفة بعد",
          description: "لا يتم صرفها مباشرة للفريلانسر.",
        },
        {
          title: "مرتبطة بمرحلة",
          description: "الدفعة تخص المرحلة الأولى فقط.",
        },
        {
          title: "تدعم AI Review",
          description: "عند الخلاف يمكن تحليل التسليم والاعتراض.",
        },
        {
          title: "تنتظر التسليم",
          description: "الفريلانسر يبدأ العمل ويرفع التسليم لاحقًا.",
        },
      ],
    },
    nextSteps: {
      title: "ماذا يحدث الآن؟",
      steps: [
        {
          title: "تم حجز الدفعة",
          description: "دفعة المرحلة الأولى أصبحت Reserved.",
          state: "completed",
        },
        {
          title: "يبدأ الفريلانسر التنفيذ",
          description: "سيتم إشعار حمزة بأن المرحلة يمكن أن تبدأ.",
          state: "current",
        },
        {
          title: "يتم رفع التسليم",
          description: "عند الانتهاء، سيرفع الفريلانسر رابط أو ملف التسليم للمراجعة.",
          state: "upcoming",
        },
        {
          title: "تراجع التسليم",
          description: "ستراجع التسليم بناءً على شروط القبول.",
          state: "upcoming",
        },
        {
          title: "الصرف أو المراجعة",
          description:
            "يمكنك قبول الصرف، طلب تعديل، أو فتح AI Review عند وجود خلاف واضح.",
          state: "upcoming",
        },
      ],
    },
    receiptActions: {
      title: "إجراءات الإيصال",
      items: [
        {
          title: "تحميل الإيصال",
          description: "احفظ نسخة من ملخص العملية.",
          actionLabel: "تحميل PDF",
          icon: "download",
        },
        {
          title: "نسخ ملخص العملية",
          description: "انسخ رقم العملية والمبلغ والحالة.",
          actionLabel: "نسخ الملخص",
          icon: "copy",
        },
        {
          title: "مشاركة الإيصال",
          description: "شارك ملخص العملية مع فريقك.",
          actionLabel: "مشاركة",
          icon: "share",
        },
        {
          title: "العودة لبوابة المشروع",
          description: "تابع حالة المرحلة والدفعات.",
          actionLabel: "العودة للبوابة",
          icon: "arrow",
        },
      ],
    },
    portalPreview: {
      title: "كيف سيظهر هذا في بوابة المشروع؟",
      stats: [
        { value: "$150", label: "محجوز", tone: "green" },
        { value: "$0", label: "تحت المراجعة", tone: "blue" },
        { value: "$0", label: "مصروف", tone: "purple" },
        { value: "$300", label: "متبقي لاحقًا", tone: "default" },
      ],
      note:
        "المرحلة الأولى أصبحت قيد التنفيذ والدفعة مرتبطة بها حتى تظهر لاحقًا للمراجعة أو الصرف.",
      statusLabel: "Payment status: Reserved",
    },
    trustFooter: {
      title: "إيصال واضح ودفعة محمية",
      description:
        "تم ربط هذه الدفعة بمرحلة محددة وشروط قبول واضحة، مما يساعد الطرفين على متابعة التنفيذ والمراجعة بوضوح.",
      disclaimer:
        "هذه واجهة محاكاة ولا تمثل Escrow قانوني أو عملية دفع حقيقية في هذه المرحلة.",
      links: ["سياسة الخصوصية", "الشروط والأحكام"],
      copyright: "© 2026 Dhaman",
    },
    quickSummary: {
      operationSummary: {
        title: "ملخص العملية",
        rows: [
          { label: "رقم الإيصال", value: "DHMN-PAY-2026-0048" },
          { label: "المشروع", value: "تصميم صفحة هبوط" },
          { label: "المرحلة", value: "الأولى" },
          { label: "المبلغ", value: "$150", tone: "green" },
          { label: "الحالة", value: "Reserved", tone: "purple" },
        ],
      },
      paymentMethod: {
        title: "طريقة الدفع",
        rows: [
          { label: "البطاقة", value: "Visa •••• 4242" },
          { label: "النوع", value: "بطاقة بنكية" },
          { label: "النتيجة", value: "ناجحة", tone: "green" },
        ],
      },
      agreementSummary: {
        title: "ملخص الاتفاق",
        rows: [
          { label: "إجمالي الاتفاق", value: "$450" },
          { label: "حُجز الآن", value: "$150", tone: "green" },
          { label: "المتبقي لاحقًا", value: "$300" },
          { label: "عدد المراحل", value: "3" },
        ],
      },
      nextStep: {
        title: "الخطوة التالية",
        description: "بانتظار بدء تنفيذ المرحلة الأولى من الفريلانسر.",
        note: "تسليم متوقع خلال 5 أيام",
        actionLabel: "فتح بوابة المشروع",
      },
      demoNote: {
        title: "ملاحظة الديمو",
        description:
          "هذا إيصال تجريبي داخل MVP. في النسخة الفعلية سيتم ربط العملية بمزود دفع آمن وسجل عمليات واضح.",
        badge: "Demo Receipt",
      },
    },
  },
  paymentHistory: {
    title: "سجل الدفعات",
    description:
      "راجع كل عمليات الحجز، الصرف، والمراجعة المرتبطة بهذا الاتفاق.",
    hero: {
      eyebrow: "سجل الدفعات المحمية",
      projectTitle: "تصميم صفحة هبوط لشركة ناشئة",
      parties: "حمزة → شركة المدار",
      badges: [
        {
          label: "اتفاق نشط",
          className:
            "border-emerald-400/25 bg-emerald-400/[0.12] text-[#4ade80]",
        },
        {
          label: "دفعات محمية",
          className: "border-[#2f80ed]/30 bg-[#2f80ed]/15 text-[#60a5fa]",
        },
        {
          label: "3 مراحل",
          className: "border-[#6d5dfc]/30 bg-[#6d5dfc]/15 text-[#a78bfa]",
        },
        {
          label: "محاكاة دفع آمن",
          className: "border-white/[0.08] bg-white/[0.05] text-[#7f86a8]",
        },
      ],
      stats: [
        { value: "$450", label: "إجمالي الاتفاق", tone: "purple" },
        { value: "$150", label: "محجوز", tone: "blue" },
        { value: "$0", label: "مصروف", tone: "green" },
        { value: "$300", label: "متبقي", tone: "amber" },
      ],
      actions: [
        {
          label: "العودة لبوابة المشروع",
          icon: "arrow",
          variant: "primary",
        },
        {
          label: "تحميل سجل الدفعات",
          icon: "download",
          variant: "secondary",
        },
        {
          label: "نسخ ملخص السجل",
          icon: "copy",
          variant: "ghost",
        },
      ],
      note:
        "كل دفعة في ضمان مرتبطة بمرحلة محددة وشروط قبول واضحة.",
    },
    summaryCards: [
      {
        value: "$450",
        label: "إجمالي الاتفاق",
        description: "قيمة المشروع كاملة",
        tone: "purple",
        icon: "wallet",
      },
      {
        value: "$150",
        label: "محجوز",
        description: "دفعة المرحلة الأولى",
        tone: "blue",
        icon: "lock",
      },
      {
        value: "$0",
        label: "مصروف",
        description: "لم يتم صرف أي دفعة بعد",
        tone: "green",
        icon: "check",
      },
      {
        value: "$300",
        label: "متبقي لاحقًا",
        description: "مراحل غير ممولة بعد",
        tone: "amber",
        icon: "clock",
      },
    ],
    sidebar: {
      financialSummary: {
        title: "ملخص مالي",
        rows: [
          { label: "إجمالي الاتفاق", value: "$450" },
          { label: "المحجوز", value: "$150" },
          { label: "تحت المراجعة", value: "$0" },
          { label: "المصروف", value: "$0" },
          { label: "المتبقي", value: "$300" },
        ],
        progress: {
          reservedLabel: "محجوز",
          remainingLabel: "متبقي",
          reservedPercent: 40,
        },
      },
      currentStatus: {
        title: "الحالة الحالية",
        description:
          "دفعة المرحلة الأولى محجوزة الآن، والمرحلة بانتظار التنفيذ والتسليم.",
        badge: "Reserved",
        actionLabel: "فتح بوابة المشروع",
      },
      receiptShortcuts: {
        title: "اختصارات الإيصالات",
        items: [
          { label: "تحميل آخر إيصال", icon: "download" },
          { label: "نسخ رقم آخر عملية", icon: "copy" },
          { label: "تحميل سجل الدفعات", icon: "download" },
        ],
      },
      releaseRules: {
        title: "قواعد الصرف",
        items: [
          "الصرف بعد قبول التسليم",
          "طلب التعديل يوقف الصرف مؤقتًا",
          "الخلاف ينتقل إلى AI Review",
          "الطلبات الإضافية تتحول إلى Change Request",
        ],
      },
      demoNote: {
        title: "ملاحظة الديمو",
        description:
          "هذا سجل دفعات تجريبي داخل MVP. في النسخة الفعلية سيتم ربط السجل برمز الدفع المعتمد.",
        badge: "Demo Payment History",
      },
    },
    paymentsWorkspace: {
      filters: {
        chips: [
          "الكل",
          "محجوزة",
          "تحت المراجعة",
          "جاهزة للصرف",
          "مصروفة",
          "معلقة",
          "بانتظار الحجز",
        ],
        searchPlaceholder: "ابحث برقم الإيصال أو اسم المرحلة...",
        selects: ["كل المراحل", "كل العمليات", "كل الطرق", "الأحدث"],
      },
      operations: {
        title: "عمليات الدفع",
        count: "4 عمليات",
        columns: [
          "العملية",
          "المرحلة",
          "المبلغ",
          "الحالة",
          "طريقة الدفع",
          "رقم الإيصال",
          "التاريخ",
          "الإجراء",
        ],
        rows: [
          {
            action: "حجز دفعة",
            stage: "المرحلة الأولى: الهيكل والتصميم الأولي",
            amount: "$150",
            status: "Reserved",
            statusTone: "purple",
            paymentMethod: "Visa •••• 4242",
            receipt: "DHMN-PAY-2026-0048",
            date: "26 أبريل 2026 — 02:45 PM",
            actionLabel: "عرض الإيصال",
          },
          {
            action: "تحديث حالة",
            stage: "المرحلة الأولى: الهيكل والتصميم الأولي",
            amount: "$150",
            status: "Client Review",
            statusTone: "blue",
            paymentMethod: "Visa •••• 4242",
            receipt: "DHMN-PAY-2026-0048",
            date: "عند رفع التسليم",
            actionLabel: "سيظهر لاحقًا",
          },
          {
            action: "دفعة لاحقة",
            stage: "المرحلة الثانية: تصميم الواجهة النهائية",
            amount: "$200",
            status: "بانتظار الحجز",
            statusTone: "amber",
            paymentMethod: "لم يتم الدفع",
            receipt: "--",
            date: "لاحقًا",
            actionLabel: "غير متاحة بعد",
          },
          {
            action: "دفعة لاحقة",
            stage: "المرحلة الثالثة: التسليم النهائي",
            amount: "$100",
            status: "بانتظار الحجز",
            statusTone: "amber",
            paymentMethod: "لم يتم الدفع",
            receipt: "--",
            date: "لاحقًا",
            actionLabel: "غير متاحة بعد",
          },
        ],
      },
      selectedReceipt: {
        title: "معاينة الإيصال المحدد",
        selectedLabel: "الصف 1 محدد",
        rows: [
          { label: "رقم الإيصال", value: "DHMN-PAY-2026-0048" },
          { label: "مرجع العملية", value: "TXN-8K29-M1" },
          { label: "العملية", value: "حجز دفعة المرحلة الأولى" },
          { label: "المشروع", value: "تصميم صفحة هبوط لشركة ناشئة" },
          { label: "المرحلة", value: "المرحلة الأولى: الهيكل والتصميم الأولي" },
          { label: "طريقة الدفع", value: "Visa •••• 4242" },
          { label: "حالة الدفعة", value: "Reserved" },
          { label: "التاريخ", value: "26 أبريل 2026" },
          { label: "الوقت", value: "02:45 PM" },
        ],
        amount: "$150",
        amountLabel: "المبلغ",
        note: "تم حجز الدفعة وربطها بتسليم المرحلة الأولى.",
        actions: [
          { label: "تحميل الإيصال", icon: "download" },
          { label: "نسخ رقم العملية", icon: "copy" },
          { label: "فتح المرحلة", icon: "external" },
          { label: "العودة للبوابة", icon: "arrow" },
        ],
        disclaimer:
          "هذا الإيصال تجريبي ضمن نسخة MVP ولا يمثل عملية دفع حقيقية.",
      },
      stageStatuses: {
        title: "حالة دفعات المراحل",
        description: "يعرض هذا القسم حالة كل دفعة مرتبطة بمراحل الاتفاق.",
        items: [
          {
            order: "01",
            stage: "المرحلة الأولى",
            description: "تم حجز الدفعة وهي مرتبطة بتسليم المرحلة.",
            amount: "$150",
            status: "Reserved",
            statusTone: "purple",
          },
          {
            order: "02",
            stage: "المرحلة الثانية",
            description: "تصبح متاحة بعد إكمال المرحلة الأولى.",
            amount: "$200",
            status: "بانتظار الحجز",
            statusTone: "amber",
          },
          {
            order: "03",
            stage: "المرحلة الثالثة",
            description: "تصبح متاحة بعد إكمال المرحلة الثانية.",
            amount: "$100",
            status: "بانتظار الحجز",
            statusTone: "amber",
          },
        ],
      },
      timeline: {
        title: "تسلسل أحداث الدفع",
        items: [
          {
            state: "completed",
            title: "تمت الموافقة على الاتفاق",
            description: "أصبح الاتفاق جاهزًا لحجز الدفعة الأولى.",
            meta: "26 أبريل 2026 — 02:30 PM",
          },
          {
            state: "completed",
            title: "تم حجز دفعة المرحلة الأولى",
            description: "تم حجز مبلغ $150 كدفعة محمية.",
            meta: "26 أبريل 2026 — 02:45 PM",
          },
          {
            state: "current",
            title: "بانتظار تسليم المرحلة الأولى",
            description: "سيتم تحديث السجل عند رفع التسليم.",
            meta: "قادم",
          },
          {
            state: "upcoming",
            title: "مراجعة العميل للتسليم",
            description: "ستنتقل الدفعة إلى Client Review عند رفع التسليم.",
            meta: "قادم",
          },
        ],
      },
      footerNotice: {
        title: "سجل واضح لكل دفعة",
        description:
          "يساعد سجل الدفعات على توثيق كل عملية حجز أو صرف أو مراجعة مرتبطة بالاتفاق.",
        disclaimer:
          "هذه واجهة محاكاة ولا تمثل كشف حساب بنكي أو Escrow قانوني.",
        links: ["سياسة الخصوصية", "الشروط والأحكام"],
        copyright: "© 2026 Dhaman",
      },
    },
  },
  releasePayment: {
    title: "تأكيد صرف دفعة المرحلة",
    description:
      "أنت على وشك قبول التسليم وجعل دفعة المرحلة جاهزة للصرف للفريلانسر.",
    hero: {
      title: "تصميم صفحة هبوط لشركة ناشئة",
      meta: "حمزة → شركة المدار · المرحلة الأولى: الهيكل والتصميم الأولي",
      eyebrow: "تأكيد قبول التسليم",
      badges: [
        {
          label: "تمت مراجعة التسليم",
          className:
            "border-emerald-400/25 bg-emerald-400/[0.12] text-[#4ade80]",
        },
        {
          label: "Client Review",
          className: "border-[#3b82f6]/25 bg-[#3b82f6]/12 text-[#67a8ff]",
        },
        {
          label: "Ready to Release",
          className: "border-[#8d63ff]/25 bg-[#8d63ff]/12 text-[#b58cff]",
        },
        {
          label: "صرف دفعة محمية",
          className: "border-amber-400/25 bg-amber-400/[0.12] text-[#f6c453]",
        },
      ],
      note:
        "عند تأكيد قبول التسليم، تصبح دفعة المرحلة الأولى جاهزة للصرف داخل نسخة MVP.",
      amount: "$150",
      amountLabel: "قيمة الصرف",
      stageLabel: "المرحلة الأولى",
      fromStatus: "Client Review",
      toStatus: "Ready to Release",
      actions: [
        {
          label: "تأكيد قبول التسليم",
          icon: "check",
          variant: "primary",
        },
        {
          label: "العودة لمراجعة التسليم",
          icon: "arrow",
          variant: "secondary",
        },
        {
          label: "عرض سجل الدفعات",
          icon: "history",
          variant: "ghost",
        },
      ],
    },
    acceptedDelivery: {
      title: "ملخص التسليم المقبول",
      statusLabel: "التسليم مقبول",
      rows: [
        { label: "مقدم من", value: "حمزة", icon: "user" },
        { label: "وقت التقديم", value: "منذ 5 ساعات", icon: "clock" },
        { label: "رابط التسليم", value: "Figma Wireframe", icon: "link" },
        { label: "الملف المرفق", value: "landing-wireframe-v1.pdf", icon: "file" },
      ],
      notes: [
        {
          title: "ملاحظة الفريلانسر",
          description:
            "تم تجهيز الهيكل الأولي للصفحة، تحديد أقسام Hero والأقسام الأساسية للمراجعة.",
        },
        {
          title: "نتيجة مراجعة العميل",
          description:
            "تمت مراجعة الهيكل الأولي، ويمكن الانتقال للمرحلة التالية من التصميم.",
        },
      ],
      actions: ["فتح رابط التسليم", "تحميل الملف", "نسخ رابط التسليم"],
    },
    releaseSummary: {
      title: "ملخص صرف الدفعة",
      amount: "$150",
      currency: "USD",
      rows: [
        { label: "المرحلة", value: "المرحلة الأولى" },
        { label: "المبلغ", value: "$150" },
        { label: "سبب الصرف", value: "قبول العميل للتسليم" },
        { label: "الفريلانسر", value: "حمزة" },
        { label: "الاتفاق", value: "تصميم صفحة هبوط لشركة ناشئة" },
      ],
      transition: {
        fromLabel: "من",
        fromStatus: "Client Review",
        toLabel: "إلى",
        toStatus: "Ready to Release",
        note:
          "في نسخة MVP، يمثل هذا انتقال الدفعة إلى حالة جاهزة للصرف قبل التحويل الفعلي.",
      },
    },
    acceptanceConditions: {
      title: "تأكيد شروط القبول",
      description:
        "تم قبول التسليم بناءً على شروط المرحلة المتفق عليها بالكامل.",
      items: [
        "تسليم Wireframe واضح للصفحة",
        "تحديد أقسام الصفحة الرئيسية",
        "اعتماد الاتجاه البصري الأولي",
      ],
      note:
        "يمكن توثيق أي ملاحظات بسيطة للمرحلة التالية دون تعطيل قبول هذه المرحلة.",
    },
    releaseDecision: {
      title: "قرار الصرف",
      amount: "$150",
      heading: "قبول التسليم وصرف دفعة المرحلة",
      description: "التسليم يطابق شروط القبول المتفق عليها.",
      outcome: "جعل الدفعة Ready to Release",
      noteLabel: "ملاحظة اختيارية للفريلانسر",
      notePlaceholder: "اكتب ملاحظة قصيرة للفريلانسر قبل تأكيد الصرف...",
      noteCount: "77 / 300",
    },
    confirmationChecklist: {
      title: "تأكيد قبل الصرف",
      items: [
        "راجعت رابط التسليم والملف المرفق",
        "راجعت شروط قبول المرحلة",
        "أفهم أن تأكيد القبول يجعل الدفعة جاهزة للصرف",
        "لا يوجد طلب تعديل مفتوح على هذه المرحلة",
        "أدرك أن هذه واجهة محاكاة صرف للـ MVP",
      ],
      finalConfirmation:
        "أؤكد قبول تسليم المرحلة الأولى وجعل دفعتها جاهزة للصرف.",
      warning:
        "يجب قراءة والموافقة على جميع بنود التأكيد قبل تأكيد الصرف.",
    },
    confirmRelease: {
      title: "تأكيد الصرف",
      summary: [
        { label: "الحالة بعد التأكيد", value: "Ready to Release" },
        { label: "المرحلة", value: "المرحلة الأولى" },
        { label: "المبلغ", value: "$150" },
      ],
      primaryAction: "تأكيد قبول التسليم وصرف الدفعة",
      secondaryActions: ["العودة لمراجعة التسليم", "فتح بوابة المشروع"],
      note:
        "بعد التأكيد، سيتم تحديث حالة الدفعة وإشعار الفريلانسر بقبول التسليم.",
    },
    afterConfirmation: {
      title: "ماذا يحدث بعد التأكيد؟",
      steps: [
        {
          state: "now",
          title: "يتم قبول التسليم",
          description: "تُسجل موافقتك في سجل الاتفاق.",
        },
        {
          state: "now",
          title: "تتغير حالة الدفعة",
          description:
            "تنتقل الدفعة من Client Review إلى Ready to Release",
        },
        {
          state: "upcoming",
          title: "يتم إشعار الفريلانسر",
          description: "يعرف الفريلانسر أن التسليم مقبول وأن الدفعة جاهزة.",
        },
        {
          state: "upcoming",
          title: "تبدأ المرحلة التالية",
          description: "يمكن متابعة المشروع إلى المرحلة الثانية.",
        },
      ],
    },
    footerNotice: {
      title: "قرار موثق وواضح",
      description:
        "سيتم توثيق قبول التسليم وتحديث حالة الدفعة في سجل الاتفاق لسهولة المتابعة بين الطرفين.",
      disclaimer:
        "هذه واجهة محاكاة ولا تمثل Escrow قانوني أو عملية دفع حقيقية في هذه المرحلة.",
      links: ["سياسة الخصوصية", "الشروط والأحكام"],
      copyright: "© 2026 Dhaman",
    },
    recap: {
      releaseSummary: {
        title: "ملخص الصرف",
        rows: [
          { label: "المشروع", value: "تصميم صفحة هبوط" },
          { label: "المرحلة", value: "الأولى" },
          { label: "الدفعة", value: "$150" },
          { label: "من الحالة", value: "Client Review" },
          { label: "إلى الحالة", value: "Ready to Release" },
        ],
      },
      delivery: {
        title: "التسليم",
        rows: [
          { label: "النوع", value: "رابط Figma + ملف PDF" },
          { label: "مقدم من", value: "حمزة" },
          { label: "وقت التقديم", value: "منذ 5 ساعات" },
          { label: "نتيجة المراجعة", value: "مقبول" },
        ],
        action: "فتح التسليم",
      },
      progress: {
        title: "تقدم الاتفاق",
        rows: [
          { label: "المراحل", value: "1 من 3" },
          { label: "المرحلة الحالية", value: "الأولى" },
          { label: "التالية", value: "تصميم الواجهة النهائية" },
          { label: "إجمالي الاتفاق", value: "$450" },
        ],
        progressLabel: "مرحلة 1 من 3",
      },
      rules: {
        title: "قواعد الصرف",
        items: [
          "الصرف بعد قبول التسليم",
          "الاعتراض يجب أن يحدث قبل الصرف",
          "طلب التعديل يوقف الصرف مؤقتًا",
          "الخلاف ينتقل إلى AI Review",
        ],
      },
      demo: {
        title: "ملاحظة الديمو",
        description:
          "هذه شاشة محاكاة لصرف دفعة داخل MVP. في النسخة الفعلية سيتم ربطها بمزود دفع معتمد وسجل تنفيذي واضح.",
        badge: "Demo Release",
      },
    },
  },
  changeRequestPayment: {
    title: "دفع طلب تغيير إضافي",
    description:
      "راجع الطلب الإضافي، التكلفة الجديدة، والمدة قبل تأكيد حجز الدفعة الإضافية.",
    hero: {
      eyebrow: "طلب تغيير إضافي · خارج النطاق",
      title: "تصميم صفحات إضافية",
      meta: "حمزة → شركة المدار · المرحلة الأولى: الهيكل والتصميم الأولي",
      project: "مشروع: تصميم صفحة هبوط لشركة ناشئة",
      badges: [
        {
          label: "طلب خارج النطاق",
          className: "border-red-400/25 bg-red-400/[0.12] text-[#f87171]",
        },
        {
          label: "Change Request",
          className: "border-[#8d63ff]/25 bg-[#8d63ff]/12 text-[#b58cff]",
        },
        {
          label: "تكلفة إضافية",
          className: "border-amber-400/25 bg-amber-400/[0.12] text-[#f6c453]",
        },
        {
          label: "محاكاة دفع آمن",
          className: "border-white/[0.08] bg-white/[0.05] text-[#7f86a8]",
        },
        {
          label: "دفعة إضافية محمية",
          className: "border-[#3b82f6]/25 bg-[#3b82f6]/12 text-[#67a8ff]",
        },
      ],
      note:
        "هذا الطلب منفصل عن دفعة المرحلة الأولى، وسيتم ربطه بتسليم إضافي مستقل وواضح للطرفين.",
      amount: "$180",
      amountLabel: "تكلفة طلب التغيير",
      status: "بانتظار الحجز",
      duration: "3 أيام إضافية",
      originalPayment: "$150 Ready to Release",
      actions: [
        {
          label: "تأكيد ودفع الطلب الإضافي",
          icon: "check",
          variant: "primary",
        },
        {
          label: "رفض الطلب",
          icon: "reject",
          variant: "secondary",
        },
        {
          label: "العودة لنتيجة AI",
          icon: "arrow",
          variant: "ghost",
        },
      ],
    },
    whyChangeRequest: {
      title: "لماذا هذا طلب تغيير؟",
      aiLabel: "تم تحديده كخارج النطاق بواسطة AI",
      description:
        "طلب تصميم صفحات إضافية مثل صفحة الأسعار، من نحن، والتواصل لا يندرج ضمن نطاق المرحلة الأولى الأصلية، لذلك تم فصله كطلب تغيير مستقل وواضح.",
      items: [
        "المرحلة الأصلية تركز على Wireframe الصفحة الرئيسية",
        "الطلب الجديد يضيف صفحات داخلية غير مذكورة في الاتفاق",
        "الأفضل تحويله إلى طلب منفصل واضح للطرفين.",
      ],
    },
    scopeComparison: {
      title: "النطاق الأصلي مقابل الطلب الجديد",
      original: {
        title: "النطاق الأصلي",
        subtitle: "المرحلة الأولى: الهيكل والتصميم الأولي",
        items: [
          "Wireframe واضح للصفحة الرئيسية",
          "تحديد أقسام الصفحة الرئيسية",
          "اعتماد الاتجاه البصري الأولي",
        ],
        status: "Ready to Release",
        amount: "$150",
      },
      requested: {
        title: "الطلب الجديد",
        subtitle: "تصميم صفحات إضافية · Change Request",
        items: [
          "صفحة الأسعار",
          "صفحة من نحن",
          "صفحة التواصل",
          "ربط التصميم بالهوية البصرية الحالية",
        ],
        status: "بانتظار الحجز",
        amount: "$180",
        duration: "3 أيام إضافية",
      },
    },
    requestDetails: {
      title: "تفاصيل طلب التغيير",
      rows: [
        { label: "عنوان الطلب", value: "تصميم صفحات إضافية" },
        { label: "طلب من", value: "شركة المدار" },
        { label: "سيُنفّذه", value: "حمزة" },
        { label: "مدة إضافية", value: "3 أيام إضافية" },
        { label: "حد التعديل", value: "تعديل واحد" },
      ],
      reason: "إضافة صفحات داخلية غير موجودة ضمن نطاق المرحلة الأصلية للمشروع.",
      deliveries: [
        "تصميم صفحة الأسعار",
        "تصميم صفحة من نحن",
        "تصميم صفحة التواصل",
        "تجهيز الروابط داخل ملف Figma",
        "تسليم نسخة Desktop واضحة",
      ],
      acceptanceCriteria: [
        "كل صفحة تحتوي على هيكل واضح ومحتوى قابل للمراجعة",
        "التصميم متسق مع اتجاه الصفحة الرئيسية",
        "تسليم رابط Figma محدّث",
        "تعديل واحد متاح على الطلب الإضافي",
      ],
    },
    paymentSummary: {
      title: "ملخص الدفع الإضافي",
      rows: [
        { label: "مبلغ طلب التغيير", value: "$180" },
        { label: "رسوم الخدمة", value: "$0" },
        { label: "الضرائب", value: "$0" },
      ],
      totalLabel: "المبلغ المطلوب الآن",
      total: "$180 USD",
      note:
        "هذه الدفعة منفصلة عن دفعة المرحلة الأولى، وترتبط فقط بتسليم طلب التغيير الإضافي.",
    },
    paymentMethod: {
      title: "طريقة الدفع",
      description: "اختر طريقة الدفع لحجز دفعة الطلب الإضافي.",
      method: "بطاقة بنكية · Visa",
      cardNumber: "Visa •••• 4242",
      cardHolder: "شركة المدار",
      status: "جاهزة للتأكيد",
      action: "تغيير طريقة الدفع",
      cardPreview: {
        brand: "VISA",
        maskedNumber: "•••• •••• •••• 4242",
        holder: "شركة المدار",
      },
      note: "هذه بيانات تجريبية لمحاكاة الدفع داخل نسخة MVP.",
    },
    flow: {
      title: "كيف تعمل دفعة طلب التغيير؟",
      description:
        "عند تأكيد الدفع، تصبح دفعة الطلب الإضافي محجوزة بشكل مستقل عن دفعة المرحلة الأصلية.",
      steps: [
        "تؤكد الطلب وتدفع",
        "تصبح الدفعة Reserved",
        "ينفذ الفريلانسر الطلب",
        "تراجع التسليم وتقرر",
      ],
    },
    statusUpdate: {
      title: "تحديث حالة الدفعة الإضافية",
      amount: "$180",
      beforeLabel: "قبل التأكيد",
      beforeStatus: "بانتظار الحجز",
      afterLabel: "بعد التأكيد",
      afterStatus: "Reserved",
      note:
        "بعد التأكيد، تظهر دفعة الطلب الإضافي كدفعة محمية مستقلة عن الدفعة الأصلية.",
    },
    checklist: {
      title: "تأكيد قبل الدفع",
      items: [
        "راجعت الفرق بين النطاق الأصلي والطلب الجديد",
        "أفهم أن هذا الطلب خارج نطاق المرحلة الأولى",
        "أفهم أن هذه دفعة إضافية منفصلة",
        "راجعت التكلفة والمدة الجديدة",
        "أوافق على شروط قبول طلب التغيير",
        "أدرك أن هذه واجهة محاكاة دفع للـ MVP",
      ],
      confirmation: "أؤكد رغبتي في حجز دفعة طلب التغيير بقيمة $180.",
    },
    confirmPayment: {
      title: "تأكيد طلب التغيير",
      rows: [
        { label: "طلب التغيير", value: "تصميم صفحات إضافية" },
        { label: "المبلغ", value: "$180" },
        { label: "طريقة الدفع", value: "Visa •••• 4242" },
        { label: "الحالة بعد التأكيد", value: "Reserved" },
      ],
      primaryAction: "تأكيد ودفع الطلب الإضافي",
      secondaryActions: ["العودة للبوابة", "رفض الطلب"],
    },
    afterPayment: {
      title: "ماذا يحدث بعد الدفع؟",
      steps: [
        "يتم اعتماد طلب التغيير",
        "تحجز الدفعة الإضافية",
        "يبدأ الفريلانسر العمل",
        "يرفع تسليم الطلب الإضافي",
        "تراجعه وتقرر الصرف",
      ],
    },
    footerNotice: {
      title: "طلب إضافي واضح ومنفصل",
      description:
        "يساعد ضمان على فصل الطلبات الإضافية عن نطاق الاتفاق الأصلي، ليبقى كل تسليم ودفعة موثقين بشكل واضح للطرفين.",
      disclaimer:
        "هذه واجهة محاكاة ولا تمثل Escrow قانوني أو عملية دفع حقيقية في هذه المرحلة.",
      links: ["سياسة الخصوصية", "الشروط والأحكام"],
      copyright: "© 2026 Dhaman",
    },
    recap: {
      requestSummary: {
        title: "ملخص طلب التغيير",
        rows: [
          { label: "الطلب", value: "تصميم صفحات إضافية" },
          { label: "المبلغ", value: "$180" },
          { label: "المدة", value: "3 أيام إضافية" },
          { label: "الحالة بعد الدفع", value: "Reserved" },
          { label: "مرتبط", value: "بالمرحلة الأولى" },
        ],
      },
      originalPayment: {
        title: "دفعة المرحلة الأصلية",
        rows: [
          { label: "المرحلة الأولى", value: "$150" },
          { label: "الحالة", value: "Ready to Release" },
          { label: "السبب", value: "الطلب الجديد خارج النطاق" },
          { label: "الأثر", value: "لا تتأثر بهذا الطلب" },
        ],
        badge: "Original payment separate",
      },
      afterPayment: {
        title: "ماذا يحدث بعد الدفع؟",
        items: [
          "يتم اعتماد طلب التغيير",
          "تحجز الدفعة الإضافية",
          "يبدأ الفريلانسر العمل",
          "يرفع تسليم الطلب الإضافي",
          "تراجعه وتقرر الصرف",
        ],
      },
      policy: {
        title: "السياسة المرتبطة",
        description:
          "سياسة الطلبات الإضافية: أي طلب خارج شروط قبول المرحلة يعتبر طلبًا إضافيًا مستقلًا ويحتاج موافقة ودفعة منفصلة.",
      },
      demo: {
        title: "ملاحظة الديمو",
        description:
          "هذه شاشة محاكاة لدفع طلب تغيير داخل MVP. في النسخة الفعلية سيتم ربطها بمزود دفع معتمد وتوثيق تنفيذي أوضح.",
        badge: "Demo Change Request Payment",
      },
    },
  },
  fundMilestone: {
    title: "حجز دفعة المرحلة",
    description: "راجع تفاصيل الدفعة والمرحلة قبل تأكيد الحجز.",
    eyebrow: "تمويل دفعة محمية",
    milestone: {
      title: "المرحلة الأولى: الهيكل والتصميم الأولي",
      meta: "تصميم صفحة هبوط لشركة ناشئة · حمزة → شركة المدار",
      amount: "$150",
      amountLabel: "قيمة الدفعة",
      currentStatus: "بانتظار الحجز",
      nextStatus: "Reserved",
    },
    badges: [
      {
        label: "دفعة مطلوبة الآن",
        className: "border-amber-400/30 bg-amber-400/15 text-[#fbbf24]",
      },
      {
        label: "محاكاة دفع آمن",
        className: "border-[#2f80ed]/30 bg-[#2f80ed]/15 text-[#60a5fa]",
      },
      {
        label: "تصبح Reserved بعد التأكيد",
        className: "border-[#6d5dfc]/30 bg-[#6d5dfc]/15 text-[#a78bfa]",
      },
      {
        label: "مرتبطة بشروط قبول",
        className: "border-emerald-400/25 bg-emerald-400/[0.12] text-[#4ade80]",
      },
    ],
    actions: [
      {
        label: "تأكيد حجز الدفعة",
        icon: "lock",
        variant: "primary",
      },
      {
        label: "العودة لإعداد الدفع",
        icon: "arrow",
        variant: "secondary",
      },
      {
        label: "عرض الاتفاق",
        icon: "file",
        variant: "ghost",
      },
    ],
    notice:
      "سيتم ربط هذه الدفعة بالمرحلة الأولى، ولن يتم صرفها إلا بعد مراجعة التسليم أو حسب توصية AI عند الخلاف.",
    details: {
      selectedMilestone: {
        title: "المرحلة الأولى: الهيكل والتصميم الأولي",
        badges: [
          {
            label: "المرحلة الأولى",
            className: "border-[#6d5dfc]/25 bg-[#6d5dfc]/10 text-[#a78bfa]",
          },
          {
            label: "مطلوبة الآن",
            className: "border-amber-400/30 bg-amber-400/[0.12] text-[#fbbf24]",
          },
        ],
        amount: "$150",
        rows: [
          { label: "الموعد", value: "خلال 5 أيام" },
          { label: "حد التعديلات", value: "تعديلان" },
          {
            label: "الحالة الحالية",
            value: "بانتظار بدء التنفيذ",
            tone: "warning",
          },
          { label: "حالة الدفعة", value: "بانتظار الحجز", tone: "warning" },
          { label: "بعد الدفع", value: "تبدأ المرحلة ← Reserved", tone: "green" },
        ],
        note:
          "هذه المرحلة تركز على Wireframe الصفحة الرئيسية، تحديد أقسامها، والاتجاه البصري الأولي.",
      },
      amountSummary: {
        title: "تفاصيل المبلغ",
        rows: [
          { label: "قيمة المرحلة", value: "$150" },
          { label: "رسوم ضمان (ديمو)", value: "$0", tone: "muted" },
          { label: "ضرائب", value: "$0", tone: "muted" },
        ],
        totalLabel: "المبلغ المطلوب الآن",
        total: "$150",
        totalHint: "إجمالي الحجز · USD",
        note:
          "هذه واجهة تجريبية للـ MVP، لذلك لا توجد رسوم فعلية أو ضرائب في هذا السيناريو.",
      },
      paymentMethod: {
        title: "طريقة الدفع",
        method: "Visa •••• 4242",
        detail: "بطاقة محفوظة",
        status: "مهيأة وجاهزة",
        warning: "لن يتم تنفيذ عملية دفع فعلية في هذا النموذج.",
      },
      impact: {
        title: "ماذا يغيّر حجز الدفعة",
        description: "توضح هذه الخطوة أثر الحجز على المرحلة والدفعة.",
        items: [
          {
            title: "تتحول الدفعة إلى Reserved",
            description: "تظهر الدفعة كحجز محمي مرتبط بالمرحلة الأولى.",
            tone: "purple",
          },
          {
            title: "يبدأ تنفيذ المرحلة",
            description: "يصبح بإمكان الفريلانسر البدء في التسليم المتفق عليه.",
            tone: "green",
          },
          {
            title: "لا يتم الصرف مباشرة",
            description: "تبقى الدفعة محجوزة حتى مراجعة التسليم واعتماده.",
            tone: "warning",
          },
          {
            title: "AI Review متاح عند الخلاف",
            description: "يمكن الرجوع لتحليل الشروط والتسليم عند وجود اعتراض.",
            tone: "blue",
          },
        ],
        note:
          "بعد التأكيد، ستظهر الدفعة كدفعة محمية ومحجوزة داخل بوابة المشروع.",
      },
      statusChange: {
        title: "تغيير حالة الدفعة",
        beforeLabel: "قبل",
        beforeStatus: "بانتظار الحجز",
        afterLabel: "بعد التأكيد",
        afterStatus: "Reserved",
        amount: "$150",
        note:
          "تتحول الدفعة من انتظار الحجز إلى حجز محمي مرتبط بالمرحلة المحددة.",
      },
      checklist: {
        title: "تأكيد قبل الحجز",
        items: [
          "راجعت اسم المرحلة وقيمتها",
          "أفهم أن الدفعة لا تصرف مباشرة",
          "أفهم أن الصرف يعتمد على مراجعة التسليم",
          "أوافق على سياسات الاتفاق المرتبطة بالدفع",
          "أدرك أن هذه واجهة محاكاة دفع للـ MVP",
        ],
        confirmation: "أؤكد حجز دفعة المرحلة الأولى بقيمة $150.",
      },
      reservation: {
        title: "تأكيد حجز الدفعة",
        rows: [
          { label: "المبلغ", value: "$150", tone: "green" },
          { label: "المرحلة", value: "المرحلة الأولى" },
          { label: "طريقة الدفع", value: "Visa •••• 4242" },
          { label: "الحالة بعد التأكيد", value: "Reserved", tone: "purple" },
        ],
        warning: "يرجى تأكيد جميع بنود قائمة التحقق أعلاه قبل المتابعة.",
        primaryAction: "تأكيد وحجز الدفعة",
        secondaryAction: "العودة",
        note:
          "بعد التأكيد، سيتم تحديث حالة الاتفاق وإشعار الفريلانسر ببدء المرحلة.",
      },
      footer: {
        title: "تمويل واضح ومرتبط بالمرحلة",
        description:
          "ضمان يربط كل دفعة بمرحلة محددة وشروط قبول واضحة، مما يساعد الطرفين على معرفة متى يتم الصرف ومتى يتم التعليق.",
        disclaimer:
          "هذه واجهة محاكاة ولا تمثل Escrow قانوني أو عملية دفع حقيقية في هذه المرحلة.",
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
