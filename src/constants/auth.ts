import type { AuthContentMap } from "@/types";

export const authContent = {
  login: {
    brandName: "Dhaman",
    tagline: "ضمان مالي ذكي للعمل الحر",
    title: "تسجيل الدخول",
    description:
      "ادخل إلى لوحة التحكم لإدارة اتفاقاتك، دفعاتك، وتسليماتك بأمان.",
    fields: {
      email: {
        id: "email",
        label: "البريد الإلكتروني",
        placeholder: "example@email.com",
        type: "email",
      },
      password: {
        id: "password",
        label: "كلمة المرور",
        placeholder: "••••••••",
        type: "password",
      },
    },
    rememberLabel: "تذكرني",
    forgotPasswordLabel: "نسيت كلمة المرور؟",
    submitLabel: "دخول إلى لوحة التحكم",
    dividerLabel: "أو",
    googleLabel: "المتابعة باستخدام Google",
    signUpPrompt: "ليس لديك حساب؟",
    signUpLabel: "إنشاء حساب",
    preview: {
      title: "لوحة التحكم",
      liveLabel: "● مباشر",
      protectionTitle: "حماية كاملة",
      protectionDescription: "مشفّر + محمي بـ AI",
      completedPaymentTitle: "دفعة مكتملة",
      completedPaymentDescription: "+$450 — تصميم",
      metrics: [
        {
          value: "$12,450",
          label: "محمية",
          accent: "violet",
        },
        {
          value: "8",
          label: "اتفاقات",
          accent: "emerald",
        },
        {
          value: "3",
          label: "مراجعات AI",
          accent: "blue",
        },
      ],
      chartBars: [22, 30, 80, 52, 68, 44, 56, 36],
      activity: [
        {
          label: "دفعات محمية",
          value: "$7,820",
          accent: "emerald",
        },
        {
          label: "اتفاق نشط",
          value: "نشط",
          accent: "blue",
        },
        {
          label: "مراجعة AI",
          value: "قيد التنفيذ",
          accent: "violet",
        },
        {
          label: "جاهزة للصرف",
          value: "$3,090",
          accent: "amber",
        },
      ],
    },
  },
  signUp: {
    brandName: "Dhaman",
    tagline: "ضمان مالي ذكي للعمل الحر",
    title: "إنشاء حساب جديد",
    description:
      "ابدأ بإعداد حسابك لإدارة اتفاقات الدفع، المراحل، التسليمات، والمراجعات من مكان واحد.",
    roleOptions: [
      {
        label: "مستقل / Freelancer",
        value: "freelancer",
        active: true,
      },
      {
        label: "عميل / Client",
        value: "client",
      },
    ],
    fields: {
      fullName: {
        id: "fullName",
        label: "الاسم الكامل",
        placeholder: "اكتب اسمك الكامل",
        type: "text",
      },
      businessName: {
        id: "businessName",
        label: "اسم النشاط (اختياري)",
        placeholder: "Hamza Studio",
        type: "text",
      },
      email: {
        id: "email",
        label: "البريد الإلكتروني",
        placeholder: "example@email.com",
        type: "email",
      },
      password: {
        id: "password",
        label: "كلمة المرور",
        placeholder: "••••••••",
        type: "password",
        helper: "8 أحرف على الأقل مع رقم أو رمز.",
      },
      confirmPassword: {
        id: "confirmPassword",
        label: "تأكيد كلمة المرور",
        placeholder: "••••••••",
        type: "password",
      },
    },
    termsLabel: "أوافق على الشروط وسياسة الخصوصية",
    submitLabel: "إنشاء الحساب",
    dividerLabel: "أو",
    googleLabel: "المتابعة باستخدام Google",
    loginPrompt: "لديك حساب بالفعل؟",
    loginLabel: "تسجيل الدخول",
    preview: {
      stepLabel: "الخطوة 1 من 3",
      title: "إعداد الحساب",
      steps: [
        {
          label: "معلومات الحساب",
          status: "done",
        },
        {
          label: "إنشاء أول اتفاق",
          status: "active",
        },
        {
          label: "دعوة عميل",
          status: "pending",
        },
      ],
      cards: [
        {
          label: "حساب مستقل",
          value: "محمي",
          caption: "AI مفعّل ✓",
          accent: "violet",
        },
        {
          label: "دفعات على مراحل",
          value: "3 مراحل",
          caption: "مرونة كاملة",
          accent: "blue",
        },
        {
          label: "مراجعة AI",
          value: "تلقائية",
          caption: "نزاعات عادلة",
          accent: "amber",
        },
        {
          label: "بوابة عميل آمنة",
          value: "مشاركة",
          caption: "رابط مخصص",
          accent: "emerald",
        },
      ],
      secureTitle: "اتفاقات محمية بالكامل",
      secureDescription: "تشفير + ذكاء اصطناعي + حماية قانونية",
      securePercent: "100%",
      topBadge: "مراجعة AI",
      bottomBadge: "جاهزة للصرف",
    },
  },
} as const satisfies AuthContentMap;
