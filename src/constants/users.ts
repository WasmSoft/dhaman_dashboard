import type { SupportedCurrency, SupportedLocale } from "@/types";

export const SUPPORTED_CURRENCIES = [
  "SAR",
  "USD",
  "EUR",
  "AED",
  "KWD",
  "BHD",
  "QAR",
  "OMR",
  "EGP",
] as const satisfies readonly SupportedCurrency[];

export const SUPPORTED_LOCALES = ["ar", "en"] as const satisfies readonly SupportedLocale[];

export const USERS_CURRENCY_OPTIONS = [
  { value: "SAR", label: "ريال سعودي" },
  { value: "USD", label: "دولار أمريكي" },
  { value: "EUR", label: "يورو" },
  { value: "AED", label: "درهم إماراتي" },
  { value: "KWD", label: "دينار كويتي" },
  { value: "BHD", label: "دينار بحريني" },
  { value: "QAR", label: "ريال قطري" },
  { value: "OMR", label: "ريال عماني" },
  { value: "EGP", label: "جنيه مصري" },
] as const;

export const USERS_LOCALE_OPTIONS = [
  { value: "ar", label: "العربية" },
  { value: "en", label: "English" },
] as const;

export const USERS_COPY = {
  title: "إعدادات الحساب والملف",
  description: "عدّل بيانات الحساب والملف المهني مع إبقاء البريد والدور للقراءة فقط.",
  accountTitle: "الحساب",
  accountDescription: "هذه الحقول تؤثر على هوية الحساب الظاهرة في الواجهة.",
  profileTitle: "الملف المهني",
  profileDescription: "هذه الحقول تتحكم ببيانات العمل والإعدادات المفضلة.",
  emailLabel: "البريد الإلكتروني",
  roleLabel: "الدور",
  nameLabel: "الاسم",
  avatarUrlLabel: "رابط الصورة الشخصية",
  businessNameLabel: "اسم النشاط",
  bioLabel: "نبذة مختصرة",
  specializationLabel: "التخصص",
  preferredCurrencyLabel: "العملة المفضلة",
  localeLabel: "اللغة",
  saveAccountLabel: "حفظ بيانات الحساب",
  saveProfileLabel: "حفظ الملف المهني",
  retryLabel: "إعادة المحاولة",
  loadingLabel: "جارٍ تحميل بيانات المستخدم",
  authenticationRequiredTitle: "تسجيل الدخول مطلوب",
  notFoundTitle: "تعذر العثور على بيانات المستخدم",
  unexpectedErrorTitle: "حدث خطأ غير متوقع",
  validationErrorTitle: "هناك حقول غير صالحة",
  fallbackDisplayName: "المستخدم",
  fallbackAvatarInitial: "د",
} as const;
