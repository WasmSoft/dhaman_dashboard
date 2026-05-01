"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
<<<<<<< HEAD

import { submitDeliveryMutationOptions } from "@/lib/deliveries/actions";

// AR: hook توفر submit-delivery mutation مع invalidation للقوائم والتفاصيل والاتفاقيات.
// EN: Hook exposing submit-delivery mutation with list/detail/agreements invalidation.
=======
import { submitDeliveryMutationOptions } from "@/lib/deliveries/actions";

// AR: هوك إرسال التسليم إلى العميل للمراجعة.
// EN: Mutation hook for submitting the delivery to client review.
>>>>>>> 376aec6939d214e5014cc9fa065f5e9a54ce38a7
export function useSubmitDeliveryMutation() {
  const queryClient = useQueryClient();

  return useMutation(submitDeliveryMutationOptions(queryClient));
<<<<<<< HEAD
}
=======
}
>>>>>>> 376aec6939d214e5014cc9fa065f5e9a54ce38a7
