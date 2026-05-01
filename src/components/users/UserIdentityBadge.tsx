"use client";

import type { HTMLAttributes } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/shared/avatar";
import { cn } from "@/lib/utils";
import { buildUserAvatarFallbackInitial, buildUserDisplayName } from "@/lib/users";
import type { UsersIdentity } from "@/types";

interface UserIdentityBadgeProps extends HTMLAttributes<HTMLDivElement> {
  user?: UsersIdentity | null;
  compact?: boolean;
}

// AR: هذه البطاقة تعرض هوية المستخدم بشكل آمن مع صورة بديلة وخط RTL واضح.
// EN: This badge renders the user identity safely with a fallback avatar and RTL-friendly text.
export function UserIdentityBadge({ user, compact = false, className, ...props }: UserIdentityBadgeProps) {
  const displayName = buildUserDisplayName(user ?? {});
  const initial = buildUserAvatarFallbackInitial(user ?? {});

  return (
    <div className={cn("flex min-w-0 items-center gap-3 text-start", className)} {...props}>
      <Avatar size={compact ? "sm" : "default"}>
        <AvatarImage src={user?.avatarUrl ?? undefined} alt={displayName} />
        <AvatarFallback>{initial}</AvatarFallback>
      </Avatar>
      <div className={cn("min-w-0", compact && "hidden sm:block")}>
        <div className="truncate text-sm font-semibold text-white">{displayName}</div>
        {!compact && user?.email ? (
          <div className="truncate text-xs text-[#a7aecb]">{user.email}</div>
        ) : null}
      </div>
    </div>
  );
}
