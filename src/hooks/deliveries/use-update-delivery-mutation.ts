"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
<<<<<<< HEAD

import { updateDeliveryMutationOptions } from "@/lib/deliveries/actions";

// AR: hook توفر update-delivery mutation مع invalidation للقوائم والتفاصيل.
// EN: Hook exposing update-delivery mutation with list/detail invalidation.
=======
import { updateDeliveryMutationOptions } from "@/lib/deliveries/actions";

// AR: هوك تحديث مسودة تسليم قابلة للتعديل.
// EN: Mutation hook for updating an editable delivery draft.
>>>>>>> 376aec6939d214e5014cc9fa065f5e9a54ce38a7
export function useUpdateDeliveryMutation() {
  const queryClient = useQueryClient();

  return useMutation(updateDeliveryMutationOptions(queryClient));
<<<<<<< HEAD
}
=======
}
>>>>>>> 376aec6939d214e5014cc9fa065f5e9a54ce38a7
