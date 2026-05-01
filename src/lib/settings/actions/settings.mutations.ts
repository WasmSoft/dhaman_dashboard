import type { QueryClient, UseMutationOptions } from "@tanstack/react-query";

import type { DefaultPolicies, DefaultPoliciesMutationPayload } from "@/types";

import { updateDefaultPolicies } from "./settings.api";
import { settingsQueryKeys } from "./settings.keys";

// AR: تبني هذه الدالة خيارات طفرة حفظ السياسات الافتراضية مع إعادة جلب قيم الإعدادات.
// EN: This builder creates default-policy mutation options and refreshes the settings cache.
export function updateDefaultPoliciesMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  DefaultPolicies,
  Error,
  DefaultPoliciesMutationPayload
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
