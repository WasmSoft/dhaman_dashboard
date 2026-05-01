import { queryOptions } from "@tanstack/react-query";

import { getCurrentUser, getCurrentUserProfile } from "./users.api";
import { usersQueryKeys } from "./users.keys";

// AR: تبني query options قابلة لإعادة الاستخدام لبيانات الحساب الحالية.
// EN: Builds reusable query options for the current account data.
export function currentUserQueryOptions() {
  return queryOptions({
    queryKey: usersQueryKeys.currentUser(),
    queryFn: getCurrentUser,
  });
}

// AR: تبني query options قابلة لإعادة الاستخدام للملف المهني الحالي.
// EN: Builds reusable query options for the current professional profile.
export function currentUserProfileQueryOptions() {
  return queryOptions({
    queryKey: usersQueryKeys.currentUserProfile(),
    queryFn: getCurrentUserProfile,
  });
}
