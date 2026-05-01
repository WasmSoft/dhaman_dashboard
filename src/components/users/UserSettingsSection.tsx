"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/shared";
import { Skeleton } from "@/components/shared/skeleton";
import { USERS_COPY } from "@/constants";
import { classifyUsersError } from "@/lib/users";
import { useCurrentUserQuery, useUpdateCurrentUserMutation, useUpdateUserProfileMutation, useUserProfileQuery } from "@/hooks/users";

import { UserAccountCard } from "./UserAccountCard";
import { UserProfileForm } from "./UserProfileForm";

// AR: هذا القسم ينسق تحميل وتحرير بيانات الحساب والملف في واجهة واحدة.
// EN: This section coordinates loading and editing account/profile data in one interface.
export function UserSettingsSection() {
  const currentUserQuery = useCurrentUserQuery();
  const userProfileQuery = useUserProfileQuery();
  const updateCurrentUserMutation = useUpdateCurrentUserMutation();
  const updateUserProfileMutation = useUpdateUserProfileMutation();
  const [accountSuccessMessage, setAccountSuccessMessage] = useState<string | undefined>();
  const [profileSuccessMessage, setProfileSuccessMessage] = useState<string | undefined>();

  const errorState = useMemo(() => {
    const error = currentUserQuery.error ?? userProfileQuery.error;

    return error ? classifyUsersError(error) : null;
  }, [currentUserQuery.error, userProfileQuery.error]);

  if (currentUserQuery.isLoading || userProfileQuery.isLoading) {
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-[28rem] rounded-2xl" />
        <Skeleton className="h-[28rem] rounded-2xl" />
      </div>
    );
  }

  if (errorState) {
    return (
      <section className="rounded-2xl border border-white/10 bg-[#12162a] p-6 text-start text-white">
        <h2 className="text-lg font-semibold">{errorState.message}</h2>
        <p className="mt-2 text-sm text-[#a7aecb]">{USERS_COPY.description}</p>
        <div className="mt-4 flex gap-3">
          <Button
            onClick={async () => {
              await Promise.all([currentUserQuery.refetch(), userProfileQuery.refetch()]);
            }}
          >
            {USERS_COPY.retryLabel}
          </Button>
        </div>
      </section>
    );
  }

  if (!currentUserQuery.data || !userProfileQuery.data) {
    return null;
  }

  return (
    <section className="grid gap-6">
      <header className="space-y-2 text-start">
        <h1 className="text-2xl font-bold text-white md:text-3xl">{USERS_COPY.title}</h1>
        <p className="max-w-3xl text-sm leading-6 text-[#a7aecb] md:text-base">{USERS_COPY.description}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <UserAccountCard
          user={currentUserQuery.data}
          isSaving={updateCurrentUserMutation.isPending}
          successMessage={accountSuccessMessage}
          onSave={async (payload) => {
            await updateCurrentUserMutation.mutateAsync(payload);
            setAccountSuccessMessage("تم تحديث بيانات الحساب بنجاح.");
          }}
        />

        <UserProfileForm
          profile={userProfileQuery.data}
          isSaving={updateUserProfileMutation.isPending}
          successMessage={profileSuccessMessage}
          onSave={async (payload) => {
            await updateUserProfileMutation.mutateAsync(payload);
            setProfileSuccessMessage("تم تحديث الملف المهني بنجاح.");
          }}
        />
      </div>
    </section>
  );
}
