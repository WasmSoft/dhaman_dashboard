import { queryOptions } from "@tanstack/react-query";

import { getCurrentUser } from "./auth.api";
import { authQueryKeys } from "./auth.keys";

// AR: تبني هذه الدالة query options قابلة لإعادة الاستخدام لبيانات المستخدم الحالي بدون ربطها بأي React hook.
// EN: This function builds reusable current-user query options without coupling them to a React hook.
export function currentUserQueryOptions() {
  return queryOptions({
    queryKey: authQueryKeys.currentUser(),
    queryFn: getCurrentUser,
    retry: false,
  });
}
