// AR: يدير لغة التطبيق الحالية ويوفرها للـ axios interceptor وبقية الواجهة.
// EN: Manages the current application locale and exposes it to the axios interceptor and the rest of the UI.

const LOCALE_STORAGE_KEY = "dhaman_locale";
const DEFAULT_LOCALE = "ar";

export type AppLocale = "en" | "ar";

// AR: تُرجع اللغة المحفوظة في localStorage أو اللغة الافتراضية (ar).
// EN: Returns the locale stored in localStorage or the default (ar).
export function getAppLocale(): AppLocale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);

  if (stored === "en" || stored === "ar") {
    return stored;
  }

  return DEFAULT_LOCALE;
}

// AR: تحفظ اللغة المطلوبة في localStorage لاستخدامها لاحقًا.
// EN: Persists the requested locale in localStorage for future use.
export function setAppLocale(locale: AppLocale): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
}