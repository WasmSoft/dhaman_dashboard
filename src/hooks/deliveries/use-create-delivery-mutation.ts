"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
<<<<<<< HEAD

import { createDeliveryMutationOptions } from "@/lib/deliveries/actions";

// AR: hook توفر create-delivery mutation مع invalidation للقوائم والمراحل.
// EN: Hook exposing create-delivery mutation with list/milestone invalidation.
=======
import { createDeliveryMutationOptions } from "@/lib/deliveries/actions";

// AR: هوك إنشاء مسودة تسليم جديدة.
// EN: Mutation hook for creating a new delivery draft.
>>>>>>> 376aec6939d214e5014cc9fa065f5e9a54ce38a7
export function useCreateDeliveryMutation() {
  const queryClient = useQueryClient();

  return useMutation(createDeliveryMutationOptions(queryClient));
<<<<<<< HEAD
}
=======
}
>>>>>>> 376aec6939d214e5014cc9fa065f5e9a54ce38a7
