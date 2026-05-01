import type { QueryClient, UseMutationOptions } from "@tanstack/react-query";

import type {
  DefaultPoliciesResponse,
  SettingsResponse,
  UpdateDefaultPoliciesPayload,
  UpdateSettingsPayload,
} from "@/types";

import { updateDefaultPolicies, updateSettings } from "./settings.api";
import { settingsQueryKeys } from "./settings.keys";

// AR: تبني هذه الدالة خيارات طفرة حفظ الإعدادات العامة مع إعادة جلب قيم الإعدادات.
// EN: This builder creates general settings mutation options and refreshes the settings cache.
export function updateSettingsMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  SettingsResponse,
  Error,
  UpdateSettingsPayload
> {
  return {
    mutationFn: updateSettings,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: settingsQueryKeys.general(),
      });
    },
  };
}

// AR: تبني هذه الدالة خيارات طفرة حفظ السياسات الافتراضية مع إعادة جلب قيم الإعدادات.
// EN: This builder creates default-policy mutation options and refreshes the settings cache.
export function updateDefaultPoliciesMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  DefaultPoliciesResponse,
  Error,
  UpdateDefaultPoliciesPayload
> {
  return {
    mutationFn: updateDefaultPolicies,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: settingsQueryKeys.defaultPolicies(),
      });
    },
  };
}
