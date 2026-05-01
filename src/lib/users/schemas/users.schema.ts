import { z } from "zod";

import { SUPPORTED_CURRENCIES, SUPPORTED_LOCALES } from "@/constants";

const optionalUrl = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.string().url().max(2048).optional(),
);

const optionalEnum = <TValues extends readonly [string, ...string[]]>(values: TValues) =>
  z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.enum(values).optional(),
  );

// AR: هذه المخططات تتحقق من الحقول القابلة للتعديل فقط حتى تبقى واجهة الإعدادات آمنة ومحدودة.
// EN: These schemas validate only the editable fields so the settings UI stays safe and constrained.
export const usersAccountUpdateSchema = z
  .object({
    name: z.string().trim().max(100).optional(),
    avatarUrl: optionalUrl,
  })
  .strict();

// AR: هذا المخطط يطابق قيود الملف المهني مع القيم المدعومة للعملة واللغة.
// EN: This schema mirrors the profile constraints with supported currency and locale values.
export const usersProfileUpdateSchema = z
  .object({
    businessName: z.string().trim().max(200).optional(),
    bio: z.string().trim().max(1000).optional(),
    specialization: z.string().trim().max(100).optional(),
    preferredCurrency: optionalEnum(SUPPORTED_CURRENCIES),
    locale: optionalEnum(SUPPORTED_LOCALES),
  })
  .strict();

// AR: هذا المخطط يجمع حقول الحساب والملف في draft واحد لاستخدامه داخل الواجهات المشتركة.
// EN: This schema combines account and profile fields into a single draft for shared UI usage.
export const usersSettingsDraftSchema = usersAccountUpdateSchema
  .merge(usersProfileUpdateSchema)
  .strict();
