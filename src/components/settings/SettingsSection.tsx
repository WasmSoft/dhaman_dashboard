// AR: صفحة الإعدادات تجمع بين معاينات الحساب والتنقل الداخلي وسياسات الاتفاق في واجهة RTL متجاوبة.
// EN: The settings page combines account summaries, internal navigation, and agreement policies in a responsive RTL interface.
"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldError, type FieldErrors, type UseFormRegister } from "react-hook-form";
import {
  Bell,
  BriefcaseBusiness,
  Check,
  CircleAlert,
  CreditCard,
  FileText,
  Info,
  Lock,
  RefreshCcw,
  Save,
  ShieldAlert,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

import { Button } from "@/components/shared";
import { settingsContent } from "@/constants";
import {
  useSettingsQuery,
  useUpdateSettingsMutation,
  useDefaultPoliciesQuery,
  useUpdateDefaultPoliciesMutation,
} from "@/hooks/settings";
import { ApiError } from "@/lib/axios-instance";
import { policyMutationSchema } from "@/lib/agreement-policies";
import { settingsSchema } from "@/lib/settings/schemas";
import { cn } from "@/lib/utils";
import type {
  UpdateSettingsPayload,
  UpdateDefaultPoliciesPayload,
  SettingsAction,
  SettingsIconName,
  SettingsOverviewCard,
  SettingsPolicyCard,
  SettingsPolicyField,
  SettingsSectionKey,
  SettingsResponse,
} from "@/types";

const panelKeysWithContent = new Set<SettingsSectionKey>(["agreementPolicies", "aiPreferences", "business", "profile"]);

type DefaultPolicyFieldName = keyof UpdateDefaultPoliciesPayload;

function getDefaultPoliciesFormValues(
  values?: UpdateDefaultPoliciesPayload | null,
): UpdateDefaultPoliciesPayload {
  return {
    defaultDelayPolicy: values?.defaultDelayPolicy ?? "",
    defaultCancellationPolicy: values?.defaultCancellationPolicy ?? "",
    defaultExtraRequestPolicy: values?.defaultExtraRequestPolicy ?? "",
    defaultReviewPolicy: values?.defaultReviewPolicy ?? "",
  };
}

function getPolicyFieldError(
  errors: FieldErrors<UpdateDefaultPoliciesPayload>,
  name?: string,
) {
  if (!name) {
    return undefined;
  }

  return errors[name as DefaultPolicyFieldName] as FieldError | undefined;
}

function getSettingsErrorMessage(error: unknown) {
  const apiError = error as ApiError;

  return (
    apiError.message ||
    "تعذر تحميل سياسات الإعدادات الآن / Could not load settings policies right now"
  );
}

function buildSettingsPolicyCards(
  policies: readonly SettingsPolicyCard[],
  values: UpdateDefaultPoliciesPayload,
): SettingsPolicyCard[] {
  return [
    {
      ...policies[0],
      showDefaultToggle: false,
      fields: [
        {
          label: "نص سياسة التأخير",
          name: "defaultDelayPolicy",
          value: values.defaultDelayPolicy ?? "",
          inputType: "textarea",
          placeholder: "اكتب سياسة التأخير الافتراضية",
        },
      ],
      enabledByDefault: true,
    },
    {
      ...policies[1],
      showDefaultToggle: false,
      fields: [
        {
          label: "نص سياسة الإلغاء",
          name: "defaultCancellationPolicy",
          value: values.defaultCancellationPolicy ?? "",
          inputType: "textarea",
          placeholder: "اكتب سياسة الإلغاء الافتراضية",
        },
      ],
      enabledByDefault: true,
    },
    {
      ...policies[2],
      showDefaultToggle: false,
      fields: [
        {
          label: "نص سياسة الطلبات الإضافية",
          name: "defaultExtraRequestPolicy",
          value: values.defaultExtraRequestPolicy ?? "",
          inputType: "textarea",
          placeholder: "اكتب سياسة الطلبات الإضافية الافتراضية",
        },
      ],
      enabledByDefault: true,
    },
    {
      ...policies[3],
      showDefaultToggle: false,
      fields: [
        {
          label: "نص سياسة المراجعة والاعتراض",
          name: "defaultReviewPolicy",
          value: values.defaultReviewPolicy ?? "",
          inputType: "textarea",
          placeholder: "اكتب سياسة المراجعة والاعتراض الافتراضية",
        },
      ],
      enabledByDefault: true,
    },
  ];
}

function SettingsIcon({ name, className }: { name: SettingsIconName; className?: string }) {
  const iconClassName = cn("size-4", className);

  switch (name) {
    case "profile":
      return <UserRound className={iconClassName} />;
    case "business":
      return <BriefcaseBusiness className={iconClassName} />;
    case "agreementPolicies":
      return <FileText className={iconClassName} />;
    case "aiPreferences":
      return <Sparkles className={iconClassName} />;
    case "notifications":
      return <Bell className={iconClassName} />;
    case "security":
      return <Lock className={iconClassName} />;
    case "billing":
      return <CreditCard className={iconClassName} />;
    case "enabled":
      return <Check className={iconClassName} />;
    case "warning":
      return <CircleAlert className={iconClassName} />;
    case "info":
    default:
      return <Info className={iconClassName} />;
  }
}

function ToggleSwitch({ defaultEnabled }: { defaultEnabled: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={defaultEnabled}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-transparent transition-colors",
        defaultEnabled ? "bg-[#6f52ff]" : "bg-[#2a2f46]",
      )}
    >
      <span
        className={cn(
          "block size-3.5 rounded-full bg-white transition-transform",
          defaultEnabled ? "translate-x-[2px]" : "translate-x-[17px]",
        )}
      />
    </button>
  );
}

function TopActionButton({ action, emphasized = false }: { action: SettingsAction; emphasized?: boolean }) {
  const icon =
    action.icon === "save" ? <Save className="size-3.5" /> : action.icon === "refresh" ? <RefreshCcw className="size-3.5" /> : <X className="size-3.5" />;

  return (
    <Button
      variant={emphasized ? "default" : "secondary"}
      className={cn(
        "h-[35.6px] rounded-[10px] border px-3.5 text-[13px] font-bold",
        emphasized
          ? "border-transparent bg-[#6f52ff] text-white shadow-[0_14px_30px_rgba(111,82,255,0.26)] hover:bg-[#7b63ff]"
          : "border-[#252a42] bg-[#1d2135] text-white hover:bg-[#262b49]",
      )}
    >
      {icon}
      {action.label}
    </Button>
  );
}

function SummaryCard({
  card,
}: {
  card: SettingsOverviewCard;
}) {
  const { profileSummary, businessSummary, notificationSummary, securitySummary } = settingsContent.settings;

  return (
    <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-[18.8px] shadow-[0_18px_40px_rgba(3,5,18,0.2)]">
      <div className="flex items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-[9px] bg-[#1d2135] text-[#8b74ff]">
            <SettingsIcon name={card.icon} className="size-3.5" />
          </span>
          <h3 className="text-[14px] font-bold">{card.title}</h3>
        </div>
      </div>

      {card.type === "profile" ? (
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1 text-start">
              <p className="text-[15px] font-bold text-white">{profileSummary.name}</p>
              <p className="text-[11px] text-[#737b99]">{profileSummary.email}</p>
              <span className="inline-flex rounded-full bg-[#6f52ff]/15 px-2 py-0.5 text-[10px] font-medium text-[#a898ff]">
                {profileSummary.role}
              </span>
            </div>
            <div className="grid size-[42px] place-items-center rounded-[14px] bg-[#586df6] text-lg font-bold text-white">
              {profileSummary.initials}
            </div>
          </div>
          <Button variant="secondary" className="h-[35.6px] w-full rounded-[10px] border border-[#2c3150] bg-[#22264a] text-[13px] font-bold text-[#cbd1e8] hover:bg-[#2b3057]">
            <UserRound className="size-3.5" />
            {profileSummary.buttonLabel}
          </Button>
        </div>
      ) : null}

      {card.type === "business" ? (
        <div className="mt-4 space-y-3 text-[12px] text-[#cbd1e8]">
          <div className="flex items-center justify-between gap-3"><span>{businessSummary.businessName}</span><span className="text-[#737b99]">اسم العمل</span></div>
          <div className="flex items-center justify-between gap-3"><span>{businessSummary.service}</span><span className="text-[#737b99]">الخدمة الافتراضية</span></div>
          <div className="flex items-center justify-between gap-3"><span>{businessSummary.currency}</span><span className="text-[#737b99]">العملة الافتراضية</span></div>
          <Button variant="secondary" className="h-[35.6px] w-full rounded-[10px] border border-[#2c3150] bg-[#22264a] text-[13px] font-bold text-[#cbd1e8] hover:bg-[#2b3057]">
            <BriefcaseBusiness className="size-3.5" />
            {businessSummary.buttonLabel}
          </Button>
        </div>
      ) : null}

      {card.type === "notifications" ? (
        <div className="mt-4 space-y-2.5 text-[12px] text-[#cbd1e8]">
          {notificationSummary.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <SettingsIcon name="enabled" className="size-3" />
                {item.status}
              </span>
              <span>{item.label}</span>
            </div>
          ))}
          <Button variant="secondary" className="mt-2 h-[35.6px] w-full rounded-[10px] border border-[#2c3150] bg-[#22264a] text-[13px] font-bold text-[#cbd1e8] hover:bg-[#2b3057]">
            <Bell className="size-3.5" />
            إدارة الإشعارات
          </Button>
        </div>
      ) : null}

      {card.type === "security" ? (
        <div className="mt-4 space-y-3 text-[12px] text-[#cbd1e8]">
          <div className="flex items-center justify-between gap-3"><span>{securitySummary.password}</span><span className="text-[#737b99]">كلمة المرور</span></div>
          <div className="flex items-center justify-between gap-3"><span>{securitySummary.lastLogin}</span><span className="text-[#737b99]">آخر تسجيل دخول</span></div>
          <div className="flex items-center justify-between gap-3"><span>{securitySummary.twoFactor}</span><span className="text-[#737b99]">2FA</span></div>
          <Button variant="secondary" className="h-[35.6px] w-full rounded-[10px] border border-[#2c3150] bg-[#22264a] text-[13px] font-bold text-[#cbd1e8] hover:bg-[#2b3057]">
            <Lock className="size-3.5" />
            {securitySummary.buttonLabel}
          </Button>
        </div>
      ) : null}
    </article>
  );
}

function NavigationList({
  activeSection,
  onChange,
}: {
  activeSection: SettingsSectionKey;
  onChange: (section: SettingsSectionKey) => void;
}) {
  return (
    <aside className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-[8.8px] shadow-[0_18px_40px_rgba(3,5,18,0.2)]">
      {settingsContent.settings.navigation.map((item) => {
        const active = item.key === activeSection;

        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key)}
            className={cn(
              "flex w-full items-center justify-between rounded-[12px] px-2.5 py-2.5 text-start transition-colors",
              active ? "bg-[#24204f] shadow-[inset_0_0_0_1px_rgba(124,88,255,0.12)]" : "hover:bg-[#1b1f33]",
            )}
          >
            <span className="grid size-[30px] place-items-center rounded-[10px] bg-[#1d2135] text-[#8b74ff]">
              <SettingsIcon name={item.icon} className="size-3.5" />
            </span>
            <span className="min-w-0 flex-1 px-3">
              <span className={cn("block text-[13px] font-bold", active ? "text-white" : "text-[#d1d6eb]")}>{item.label}</span>
              <span className="mt-0.5 block text-[11px] text-[#737b99]">{item.description}</span>
            </span>
          </button>
        );
      })}
    </aside>
  );
}

function PlaceholderPanel({ onFocusPolicies }: { onFocusPolicies: () => void }) {
  const { placeholderTitle, placeholderDescription, placeholderActionLabel } = settingsContent.settings;

  return (
    <section className="grid min-h-[308px] place-items-center rounded-[16px] border border-[#252a42] bg-[#15192b] px-6 py-10 text-center shadow-[0_18px_40px_rgba(3,5,18,0.2)]">
      <div className="max-w-[300px]">
        <div className="mx-auto grid size-12 place-items-center rounded-[16px] bg-[#22264a] text-[#7f68ff]">
          <UserRound className="size-4" />
        </div>
        <h2 className="mt-4 text-[22px] font-bold text-white">{placeholderTitle}</h2>
        <p className="mt-3 text-[13px] leading-7 text-[#8b90a8]">{placeholderDescription}</p>
        <Button onClick={onFocusPolicies} className="mt-5 h-[37.6px] rounded-[10px] bg-[#6f52ff] px-5 text-[13px] font-bold text-white shadow-[0_14px_28px_rgba(111,82,255,0.28)] hover:bg-[#7b63ff]">
          {placeholderActionLabel}
        </Button>
      </div>
    </section>
  );
}

function PolicyField({
  field,
  register,
  error,
  disabled = false,
}: {
  field: SettingsPolicyField;
  register?: UseFormRegister<UpdateDefaultPoliciesPayload>;
  error?: FieldError;
  disabled?: boolean;
}) {
  const fieldRegistration =
    register && field.name
      ? register(field.name as DefaultPolicyFieldName, {
          setValueAs:
            field.inputType === "number"
              ? (value) => (value === "" ? undefined : Number(value))
              : (value) => (value === "" ? null : value),
        })
      : undefined;

  if (field.inputType === "textarea") {
    return (
      <div className="space-y-2">
        <label className="block text-[12px] font-medium text-[#cbd1e8]">{field.label}</label>
        <textarea
          {...fieldRegistration}
          defaultValue={fieldRegistration ? undefined : (field.value ?? "")}
          rows={4}
          disabled={disabled}
          placeholder={field.placeholder}
          className="min-h-[86px] w-full resize-none rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3 py-2.5 text-[12px] leading-6 text-white outline-none placeholder:text-[#636b8a] disabled:cursor-not-allowed disabled:opacity-60"
        />
        {error ? (
          <p className="text-[11px] text-red-300">{error.message}</p>
        ) : null}
      </div>
    );
  }

  if (field.inputType === "number") {
    return (
      <div className="space-y-2">
        <label className="block text-[12px] font-medium text-[#cbd1e8]">{field.label}</label>
        <input
          {...fieldRegistration}
          type="number"
          defaultValue={fieldRegistration ? undefined : (field.value ?? "")}
          disabled={disabled}
          className="h-[38px] w-full rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3 text-[12px] text-white outline-none placeholder:text-[#636b8a] disabled:cursor-not-allowed disabled:opacity-60"
        />
        {error ? (
          <p className="text-[11px] text-red-300">{error.message}</p>
        ) : null}
      </div>
    );
  }

  if (field.inputType === "select") {
    return (
      <div className="space-y-2">
        <label className="block text-[12px] font-medium text-[#cbd1e8]">{field.label}</label>
        <select
          defaultValue={field.value ?? ""}
          className="h-[38px] w-full rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3 text-[12px] text-white outline-none"
        >
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.inputType === "pill-list") {
    return (
      <div className="space-y-2">
        <label className="block text-[12px] font-medium text-[#cbd1e8]">{field.label}</label>
        <div className="flex flex-wrap gap-2 rounded-[10px] border border-[#252a42] bg-[#1d2135] p-3">
          {field.pills?.map((pill) => (
            <span key={pill} className="rounded-full bg-[#6f52ff]/15 px-2.5 py-1 text-[11px] font-medium text-[#b5a8ff]">
              {pill}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (field.value === "مفعل") {
    return (
      <div className="flex items-center justify-between gap-4 rounded-[10px] border border-[#252a42] bg-[#171b2d] px-3 py-3.5">
        <ToggleSwitch defaultEnabled />
        <span className="text-[12px] font-medium text-[#cbd1e8]">{field.label}</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-[12px] font-medium text-[#cbd1e8]">{field.label}</label>
      <input
        defaultValue={field.value ?? ""}
        className="h-[38px] w-full rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3 text-[12px] text-white outline-none placeholder:text-[#636b8a]"
      />
    </div>
  );
}

function PolicyCard({
  card,
  register,
  errors,
  disabled = false,
}: {
  card: SettingsPolicyCard;
  register?: UseFormRegister<UpdateDefaultPoliciesPayload>;
  errors?: FieldErrors<UpdateDefaultPoliciesPayload>;
  disabled?: boolean;
}) {
  return (
    <article className="rounded-[16px] border border-[#252a42] bg-[#15192b] shadow-[0_18px_40px_rgba(3,5,18,0.2)]">
      <div className="flex items-start justify-between gap-4 border-b border-[#252a42] px-5 py-4">
        <span className="grid size-8 place-items-center rounded-[11px] bg-[#1d2135] text-[#8b74ff]">
          <SettingsIcon name={card.icon} className="size-3.5" />
        </span>
        <div className="flex-1 text-start">
          <h3 className="text-[15px] font-bold text-white">{card.title}</h3>
          <p className="mt-1 text-[12px] leading-6 text-[#8b90a8]">{card.description}</p>
        </div>
      </div>

      <div className="space-y-4 px-5 py-4">
        {card.fields.map((field) => (
          <PolicyField
            key={field.label}
            field={field}
            register={register}
            error={getPolicyFieldError(errors ?? {}, field.name)}
            disabled={disabled}
          />
        ))}

        {card.showDefaultToggle !== false ? (
          <div className="border-t border-[#252a42] pt-4">
            <div className="flex items-center justify-between gap-4 rounded-[10px] border border-[#252a42] bg-[#171b2d] px-3 py-3.5">
              <ToggleSwitch defaultEnabled={card.enabledByDefault} />
              <span className="text-[12px] font-medium text-[#cbd1e8]">تفعيل هذه السياسة افتراضيًا</span>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function PoliciesPanel() {
  const {
    aiPreferenceHint,
    aiPreferenceLevelLabel,
    aiPreferenceOptions,
    aiPreferenceTitle,
    aiPreferenceToggles,
    footerBanner,
    footerNote,
    policies,
    policyBadges,
    policyHint,
    policyIntroDescription,
    policyIntroTitle,
  } = settingsContent.settings;

  const defaultPoliciesQuery = useDefaultPoliciesQuery();
  const updateDefaultPoliciesMutation = useUpdateDefaultPoliciesMutation();
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<UpdateDefaultPoliciesPayload>({
    resolver: zodResolver(policyMutationSchema),
    defaultValues: getDefaultPoliciesFormValues(),
  });

  useEffect(() => {
    if (!defaultPoliciesQuery.data) {
      return;
    }

    reset(getDefaultPoliciesFormValues(defaultPoliciesQuery.data));
  }, [defaultPoliciesQuery.data, reset]);

  async function onSave(values: UpdateDefaultPoliciesPayload) {
    setSaveMessage(null);
    setSubmitError(null);

    try {
      await updateDefaultPoliciesMutation.mutateAsync(values);
      setSaveMessage("تم حفظ السياسات الافتراضية / Default policies saved");
    } catch (error) {
      const apiError = error as ApiError;

      if (apiError.code === "SETTINGS_POLICY_INVALID") {
        const textFields: DefaultPolicyFieldName[] = [
          "defaultDelayPolicy",
          "defaultCancellationPolicy",
          "defaultExtraRequestPolicy",
          "defaultReviewPolicy",
        ];

        for (const fieldName of textFields) {
          setError(fieldName, {
            type: "server",
            message: "لا يمكن أن يكون النص فارغًا / Policy text cannot be empty",
          });
        }
      }

      setSubmitError(
        apiError.message ||
          "تعذر حفظ السياسات الافتراضية الآن / Could not save the default policies right now",
      );
    }
  }

  const livePolicyCards = buildSettingsPolicyCards(
    policies,
    defaultPoliciesQuery.data ?? getDefaultPoliciesFormValues(),
  );

  return (
    <section className="space-y-4">
      <article className="rounded-[16px] border border-[#252a42] bg-[#15192b] p-5 shadow-[0_18px_40px_rgba(3,5,18,0.2)]">
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-[38px] place-items-center rounded-[14px] bg-[#22264a] text-[#8b74ff]">
            <ShieldAlert className="size-4" />
          </span>
          <div className="flex-1 text-start">
            <h2 className="text-[18px] font-bold text-white">{policyIntroTitle}</h2>
            <p className="mt-2 text-[13px] leading-7 text-[#8b90a8]">{policyIntroDescription}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {policyBadges.map((badge) => (
            <span key={badge.label} className="rounded-full bg-[#1d2135] px-3 py-1.5 text-[11px] font-medium text-[#cbd1e8]">
              {badge.label}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-[12px] border border-[#2a3150] bg-[#171b2d] px-3 py-3 text-[12px] leading-6 text-[#aeb5d2]">
          <Info className="mt-1 size-3.5 shrink-0 text-[#8b74ff]" />
          <p>{policyHint}</p>
        </div>
      </article>

      {defaultPoliciesQuery.isError ? (
        <article className="rounded-[16px] border border-red-500/20 bg-red-500/10 px-5 py-5 text-start text-[12px] leading-6 text-red-100/90">
          <p>{getSettingsErrorMessage(defaultPoliciesQuery.error)}</p>
          <Button
            type="button"
            variant="secondary"
            className="mt-4 h-[35.6px] rounded-[10px] border border-red-500/20 bg-red-500/10 px-4 text-[12px] font-bold text-red-50 hover:bg-red-500/20"
            onClick={() => defaultPoliciesQuery.refetch()}
          >
            <RefreshCcw className="size-3.5" />
            إعادة المحاولة
          </Button>
        </article>
      ) : (
        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
          {defaultPoliciesQuery.isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <article
                  key={index}
                  className="rounded-[16px] border border-[#252a42] bg-[#15192b] p-5 shadow-[0_18px_40px_rgba(3,5,18,0.2)]"
                >
                  <div className="h-5 w-40 animate-pulse rounded bg-[#252a42]" />
                  <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-[#252a42]" />
                  <div className="mt-5 h-28 w-full animate-pulse rounded bg-[#252a42]" />
                </article>
              ))
            : livePolicyCards.map((policy) => (
                <PolicyCard
                  key={policy.key}
                  card={policy}
                  register={register}
                  errors={errors}
                  disabled={updateDefaultPoliciesMutation.isPending}
                />
              ))}

          <article className="rounded-[16px] border border-[#252a42] bg-[#15192b] p-5 shadow-[0_18px_40px_rgba(3,5,18,0.2)]">
            <div className="flex items-start gap-2 rounded-[12px] border border-[#2d3252] bg-[#171b2d] px-3 py-3 text-[12px] font-medium text-[#cbd1e8]">
              <CircleAlert className="mt-1 size-3.5 shrink-0 text-amber-400" />
              <p>{footerBanner}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                type="submit"
                className="h-[35.6px] rounded-[10px] border border-transparent bg-[#6f52ff] px-3.5 text-[13px] font-bold text-white shadow-[0_14px_30px_rgba(111,82,255,0.26)] hover:bg-[#7b63ff]"
                disabled={updateDefaultPoliciesMutation.isPending || defaultPoliciesQuery.isLoading}
              >
                <Save className="size-3.5" />
                {updateDefaultPoliciesMutation.isPending ? "جارٍ الحفظ..." : "حفظ التغييرات"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="h-[35.6px] rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3.5 text-[13px] font-bold text-white hover:bg-[#262b49]"
                onClick={() => reset(getDefaultPoliciesFormValues(defaultPoliciesQuery.data))}
              >
                <X className="size-3.5" />
                إلغاء
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="h-[35.6px] rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3.5 text-[13px] font-bold text-white hover:bg-[#262b49]"
                onClick={() => {
                  reset(getDefaultPoliciesFormValues(defaultPoliciesQuery.data));
                  setSaveMessage(null);
                  setSubmitError(null);
                }}
              >
                <RefreshCcw className="size-3.5" />
                استعادة آخر قيمة
              </Button>
            </div>
            {saveMessage ? (
              <p className="mt-4 rounded-[10px] border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-[12px] leading-6 text-emerald-100/90">
                {saveMessage}
              </p>
            ) : null}
            {submitError ? (
              <p className="mt-4 rounded-[10px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-[12px] leading-6 text-red-100/90">
                {submitError}
              </p>
            ) : null}
            <p className="mt-4 text-[11px] leading-6 text-[#737b99]">{footerNote}</p>
          </article>
        </form>
      )}

      <article className="rounded-[16px] border border-[#252a42] bg-[#15192b] p-5 shadow-[0_18px_40px_rgba(3,5,18,0.2)]">
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-8 place-items-center rounded-[11px] bg-[#1d2135] text-[#8b74ff]">
            <Sparkles className="size-3.5" />
          </span>
          <div className="flex-1 text-start">
            <h3 className="text-[15px] font-bold text-white">{aiPreferenceTitle}</h3>
            <p className="mt-2 text-[12px] text-[#cbd1e8]">{aiPreferenceLevelLabel}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {aiPreferenceOptions.map((option, index) => (
            <button
              key={option.key}
              type="button"
              className={cn(
                "rounded-[10px] border px-4 py-2 text-[12px] font-bold transition-colors",
                index === 1
                  ? "border-[#6f52ff] bg-[#6f52ff] text-white shadow-[0_12px_24px_rgba(111,82,255,0.22)]"
                  : "border-[#252a42] bg-[#1d2135] text-[#cbd1e8] hover:bg-[#262b49]",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-3">
          {aiPreferenceToggles.map((toggle) => (
            <div key={toggle.label} className="flex items-center justify-between gap-4 rounded-[10px] border border-[#252a42] bg-[#171b2d] px-3 py-3.5">
              <ToggleSwitch defaultEnabled={toggle.enabled} />
              <span className="text-[12px] font-medium text-[#cbd1e8]">{toggle.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-[12px] border border-[#2a3150] bg-[#171b2d] px-3 py-3 text-[12px] leading-6 text-[#aeb5d2]">
          <Info className="mt-1 size-3.5 shrink-0 text-[#8b74ff]" />
          <p>{aiPreferenceHint}</p>
        </div>
      </article>
    </section>
  );
}

function GeneralSettingsPanel({
  settings,
}: {
  settings: SettingsResponse;
}) {
  const updateSettingsMutation = useUpdateSettingsMutation();
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateSettingsPayload>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      defaultCurrency: settings.defaultCurrency,
      defaultServiceType: settings.defaultServiceType ?? "",
      aiStrictness: settings.aiStrictness as "lenient" | "balanced" | "strict",
      emailNotificationsEnabled: settings.emailNotificationsEnabled,
    },
  });

  async function onSave(values: UpdateSettingsPayload) {
    setSaveMessage(null);
    setSubmitError(null);

    try {
      await updateSettingsMutation.mutateAsync(values);
      setSaveMessage("تم حفظ الإعدادات / Settings saved");
    } catch (error) {
      setSubmitError(
        (error as ApiError).message ??
          "تعذر حفظ الإعدادات الآن / Could not save settings right now",
      );
    }
  }

  const aiOptions = settingsContent.settings.aiPreferenceOptions;

  return (
    <section className="space-y-4">
      <form onSubmit={handleSubmit(onSave)} className="space-y-4">
        <article className="rounded-[16px] border border-[#252a42] bg-[#15192b] p-5 shadow-[0_18px_40px_rgba(3,5,18,0.2)]">
          <h2 className="mb-4 text-[17px] font-extrabold text-white">الإعدادات العامة</h2>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-[12px] font-bold text-[#a7aecb]">العملة الافتراضية</label>
              <input
                {...register("defaultCurrency")}
                className="h-[38px] w-full rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3 text-[12px] text-white outline-none placeholder:text-[#636b8a]"
                placeholder="SAR"
              />
              {errors.defaultCurrency ? (
                <p className="mt-1 text-[11px] text-red-300">{errors.defaultCurrency.message}</p>
              ) : null}
            </div>

            <div>
              <label className="mb-2 block text-[12px] font-bold text-[#a7aecb]">نوع الخدمة الافتراضي</label>
              <input
                {...register("defaultServiceType")}
                className="h-[38px] w-full rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3 text-[12px] text-white outline-none placeholder:text-[#636b8a]"
                placeholder="تصميم وتطوير واجهات"
              />
              {errors.defaultServiceType ? (
                <p className="mt-1 text-[11px] text-red-300">{errors.defaultServiceType.message}</p>
              ) : null}
            </div>

            <div>
              <label className="mb-2 block text-[12px] font-bold text-[#a7aecb]">مستوى دقة AI</label>
              <div className="flex flex-wrap gap-2">
                {aiOptions.map((option) => {
                  const isSelected = settings.aiStrictness === option.key;

                  return (
                    <label
                      key={option.key}
                      className={cn(
                        "cursor-pointer rounded-[10px] border px-4 py-2 text-[12px] font-bold transition-colors",
                        isSelected
                          ? "border-[#6f52ff] bg-[#6f52ff] text-white shadow-[0_12px_24px_rgba(111,82,255,0.22)]"
                          : "border-[#252a42] bg-[#1d2135] text-[#cbd1e8] hover:bg-[#262b49]",
                      )}
                    >
                      <input
                        type="radio"
                        value={option.key}
                        {...register("aiStrictness")}
                        className="hidden"
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>
              {errors.aiStrictness ? (
                <p className="mt-1 text-[11px] text-red-300">{errors.aiStrictness.message}</p>
              ) : null}
            </div>

            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-[10px] border border-[#252a42] bg-[#171b2d] px-3 py-3.5">
              <input
                type="checkbox"
                {...register("emailNotificationsEnabled")}
                className="sr-only"
              />
              <span
                className={cn(
                  "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-transparent transition-colors",
                  settings.emailNotificationsEnabled ? "bg-[#6f52ff]" : "bg-[#2a2f46]",
                )}
              >
                <span
                  className={cn(
                    "block size-3.5 rounded-full bg-white transition-transform",
                    settings.emailNotificationsEnabled ? "translate-x-[2px]" : "translate-x-[17px]",
                  )}
                />
              </span>
              <span className="text-[12px] font-medium text-[#cbd1e8]">تفعيل إشعارات البريد الإلكتروني</span>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button
              type="submit"
              className="h-[35.6px] rounded-[10px] border border-transparent bg-[#6f52ff] px-3.5 text-[13px] font-bold text-white shadow-[0_14px_30px_rgba(111,82,255,0.26)] hover:bg-[#7b63ff]"
              disabled={updateSettingsMutation.isPending}
            >
              <Save className="size-3.5" />
              {updateSettingsMutation.isPending ? "جارٍ الحفظ..." : "حفظ التغييرات"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="h-[35.6px] rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3.5 text-[13px] font-bold text-white hover:bg-[#262b49]"
              onClick={() =>
                reset({
                  defaultCurrency: settings.defaultCurrency,
                  defaultServiceType: settings.defaultServiceType ?? "",
                  aiStrictness: settings.aiStrictness as "lenient" | "balanced" | "strict",
                  emailNotificationsEnabled: settings.emailNotificationsEnabled,
                })
              }
            >
              <X className="size-3.5" />
              إلغاء
            </Button>
          </div>

          {saveMessage ? (
            <p className="mt-4 rounded-[10px] border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-[12px] leading-6 text-emerald-100/90">
              {saveMessage}
            </p>
          ) : null}
          {submitError ? (
            <p className="mt-4 rounded-[10px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-[12px] leading-6 text-red-100/90">
              {submitError}
            </p>
          ) : null}
        </article>
      </form>
    </section>
  );
}

export function SettingsSection() {
  const { actions, description, overviewCards, title } = settingsContent.settings;
  const [activeSection, setActiveSection] = useState<SettingsSectionKey>("profile");

  const settingsQuery = useSettingsQuery();
  const showPolicies = activeSection === "agreementPolicies" || activeSection === "aiPreferences";
  const showGeneral = activeSection === "profile" || activeSection === "business";

  function renderMainPanel() {
    if (showPolicies) {
      return <PoliciesPanel />;
    }

    if (showGeneral && settingsQuery.data) {
      return <GeneralSettingsPanel settings={settingsQuery.data} />;
    }

    if (showGeneral && settingsQuery.isLoading) {
      return (
        <section className="grid min-h-[308px] place-items-center rounded-[16px] border border-[#252a42] bg-[#15192b] px-6 py-10 shadow-[0_18px_40px_rgba(3,5,18,0.2)]">
          <div className="h-5 w-40 animate-pulse rounded bg-[#252a42]" />
        </section>
      );
    }

    if (showGeneral && settingsQuery.isError) {
      return (
        <section className="rounded-[16px] border border-red-500/20 bg-red-500/10 px-5 py-5 text-start text-[12px] leading-6 text-red-100/90">
          <p>{(settingsQuery.error as ApiError).message ?? "تعذر تحميل الإعدادات"}</p>
          <Button
            type="button"
            variant="secondary"
            className="mt-4 h-[35.6px] rounded-[10px] border border-red-500/20 bg-red-500/10 px-4 text-[12px] font-bold text-red-50 hover:bg-red-500/20"
            onClick={() => settingsQuery.refetch()}
          >
            <RefreshCcw className="size-3.5" />
            إعادة المحاولة
          </Button>
        </section>
      );
    }

    return <PlaceholderPanel onFocusPolicies={() => setActiveSection("agreementPolicies")} />;
  }

  return (
    <section className="space-y-5" dir="rtl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="text-start">
          <h1 className="text-[31px] font-extrabold tracking-[-0.02em] text-white">{title}</h1>
          <p className="mt-2 max-w-[560px] text-[13px] leading-7 text-[#8b90a8]">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2 lg:justify-start">
          {actions.map((action, index) => (
            <TopActionButton key={action.label} action={action} emphasized={index === 0} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 xl:flex-row xl:items-start">
        <div className="order-1 xl:w-[220px] xl:shrink-0">
          <NavigationList activeSection={activeSection} onChange={setActiveSection} />
        </div>

        <div className="order-2 min-w-0 flex-1">
          {renderMainPanel()}
        </div>

        <div className="order-3 grid gap-4 md:grid-cols-2 xl:w-[256px] xl:grid-cols-1 xl:shrink-0">
          {overviewCards.map((card) => (
            <SummaryCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
