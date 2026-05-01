import type { DefaultPoliciesResponse, SettingsResponse } from "@/types";

export interface AgreementDefaults {
  currency: string;
  serviceType: string;
}

export interface DefaultPolicyTexts {
  delay: string;
  cancellation: string;
  extraRequest: string;
  review: string;
}

// AR: تحوّل هذه الدالة إعدادات الفريلانسر إلى قيم أولية لنموذج إنشاء الاتفاقية.
// EN: This helper converts freelancer settings into initial values for the agreement builder form.
export function getAgreementDefaultsFromSettings(
  settings: SettingsResponse,
): AgreementDefaults {
  return {
    currency: settings.defaultCurrency,
    serviceType: settings.defaultServiceType ?? "",
  };
}

// AR: تحوّل هذه الدالة نصوص السياسات الافتراضية إلى كائن يمكن تمريره لمنشئ الاتفاقية.
// EN: This helper converts default policy texts into an object consumable by the agreement builder.
export function getDefaultPolicyTexts(
  policies: DefaultPoliciesResponse,
): DefaultPolicyTexts {
  return {
    delay: policies.defaultDelayPolicy ?? "",
    cancellation: policies.defaultCancellationPolicy ?? "",
    extraRequest: policies.defaultExtraRequestPolicy ?? "",
    review: policies.defaultReviewPolicy ?? "",
  };
}
