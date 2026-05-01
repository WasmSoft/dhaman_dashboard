'use client';

import Link from "next/link";
import { startTransition, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  CheckCircle2,
  Circle,
  ClipboardList,
  CreditCard,
  FileText,
  LockKeyhole,
  Save,
  Sparkles,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/shared";
import { Input } from "@/components/shared/input";
import { agreementsContent } from "@/constants";
import {
  useCreateAgreementMutation,
  useUpdateAgreementMutation,
} from "@/hooks/agreements";
import { useDefaultPoliciesQuery, useSettingsQuery } from "@/hooks/settings";
import { createClient, getClients } from "@/lib/clients/actions/clients.api";
import { agreementsQueryKeys } from "@/lib/agreements/actions";
import { upsertAgreementPolicy } from "@/lib/agreement-policies/actions/agreement-policies.api";
import { generateAgreementDraft, generatePlan } from "@/lib/ai-plan/actions";
import {
  createMilestone,
  updateMilestone,
} from "@/lib/milestones/actions/milestones.api";
import { getAgreementDefaultsFromSettings } from "@/lib/settings";
import { cn } from "@/lib/utils";

import { AiPlanSection } from "./AiPlanSection";

import type {
  DefaultPolicies,
  GenerateAgreementDraftRequest,
  GeneratedAgreementDraft,
  GeneratedMilestone,
  GeneratedPlan,
  PolicyMutationPayload,
} from "@/types";

const stepClasses = {
  active: "border-[#6f52ff]/35 bg-[#6f52ff]/10 text-white",
  done: "border-emerald-500/25 bg-emerald-500/10 text-white",
  upcoming: "border-[#252a42] bg-[#0f1220] text-[#8a91ac]",
} as const;

type PolicyKey = "delay" | "cancellation" | "extraRequest" | "review";

type EditableMilestone = {
  localId: string;
  id?: string;
  title: string;
  amount: string;
  dueInDays: string;
  revisionLimit: string;
  acceptanceCriteriaText: string;
};

const POLICY_ITEMS: Array<{ key: PolicyKey; label: string }> = [
  { key: "delay", label: "سياسة التأخير" },
  { key: "cancellation", label: "سرية البيانات" },
  { key: "extraRequest", label: "الملكية الفكرية" },
  { key: "review", label: "المراجعة والاعتراض" },
];

const DEFAULT_POLICY_SELECTION: Record<PolicyKey, boolean> = {
  delay: true,
  cancellation: false,
  extraRequest: false,
  review: false,
};

function FieldLabel({ children }: { children: ReactNode }) {
  return <label className="mb-2 block text-[12px] font-bold text-[#a7aecb]">{children}</label>;
}

function FormCard({ icon, title, description, children }: { icon: ReactNode; title: string; description: string; children: ReactNode }) {
  return (
    <section className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-4 shadow-[0_18px_45px_rgba(4,7,20,0.18)] md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="text-start">
          <h2 className="text-[17px] font-extrabold text-white">{title}</h2>
          <p className="mt-1 text-[12px] leading-6 text-[#737b99]">{description}</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-[#6f52ff]/20 text-[#a898ff]">{icon}</span>
      </div>
      {children}
    </section>
  );
}

function mapDefaultPoliciesToTexts(defaultPolicies?: DefaultPolicies | null) {
  return {
    delay: defaultPolicies?.delayPolicy ?? "",
    cancellation: defaultPolicies?.cancellationPolicy ?? "",
    extraRequest: defaultPolicies?.extraRequestPolicy ?? "",
    review: defaultPolicies?.reviewPolicy ?? "",
  };
}

function mapPlanToMilestones(milestones: GeneratedMilestone[]): EditableMilestone[] {
  return milestones.map((milestone, index) => ({
    localId: `generated-${index}-${milestone.title}`,
    title: milestone.title,
    amount: String(milestone.amount),
    dueInDays: String(milestone.dueInDays),
    revisionLimit: String(milestone.revisionLimit),
    acceptanceCriteriaText: milestone.acceptanceCriteria.join("\n"),
  }));
}

function buildSingleMilestoneDraft(
  title: string,
  amount: string,
  description: string,
): EditableMilestone[] {
  return [
    {
      localId: "manual-single-milestone",
      title: `المرحلة الأولى: ${title}`,
      amount,
      dueInDays: "7",
      revisionLimit: "2",
      acceptanceCriteriaText:
        description.trim() || "تنفيذ الأعمال المتفق عليها وتسليمها للعميل بجودة مناسبة.",
    },
  ];
}

function buildPolicyPayload(
  selectedPolicies: Record<PolicyKey, boolean>,
  policyTexts: Record<PolicyKey, string>,
  defaultPolicies?: DefaultPolicies,
): PolicyMutationPayload {
  return {
    delayPolicy: selectedPolicies.delay ? policyTexts.delay || null : null,
    cancellationPolicy: selectedPolicies.cancellation ? policyTexts.cancellation || null : null,
    extraRequestPolicy: selectedPolicies.extraRequest ? policyTexts.extraRequest || null : null,
    reviewPolicy: selectedPolicies.review ? policyTexts.review || null : null,
    clientReviewPeriodDays: defaultPolicies?.clientReviewPeriodDays ?? 7,
    freelancerDelayGraceDays: defaultPolicies?.freelancerDelayGraceDays ?? 3,
  };
}

function CreateAgreementHeader() {
  const content = agreementsContent.createAgreementPage;

  return (
    <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <Button asChild variant="secondary" className="order-1 h-10 w-fit rounded-[10px] border border-[#252a42] bg-[#15192b] px-4 text-[13px] font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white lg:order-2">
        <Link href="/agreements">
          <ArrowRight className="size-4" />
          {content.backLabel}
        </Link>
      </Button>
      <div className="order-2 text-start lg:order-1">
        <p className="mb-2 text-[12px] text-[#58607c]">{content.eyebrow}</p>
        <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-white md:text-[28px]">{content.title}</h1>
        <p className="mt-1 max-w-xl text-sm leading-6 text-[#737b99]">{content.subtitle}</p>
      </div>
    </header>
  );
}

function ProjectDetailsCard(props: {
  title: string;
  description: string;
  durationText: string;
  serviceType: string;
  expectedDeliveryDate: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onDurationTextChange: (value: string) => void;
  onServiceTypeChange: (value: string) => void;
  onExpectedDeliveryDateChange: (value: string) => void;
}) {
  const section = agreementsContent.createAgreementPage.sections.project;

  return (
    <FormCard icon={<FileText className="size-4" />} title={section.title} description={section.description}>
      <div className="space-y-4">
        <div>
          <FieldLabel>{section.nameLabel}</FieldLabel>
          <Input className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white placeholder:text-[#58607c] focus-visible:ring-[#6f52ff]/20" placeholder={section.namePlaceholder} value={props.title} onChange={(event) => props.onTitleChange(event.target.value)} />
        </div>
        <div>
          <FieldLabel>{section.descriptionLabel}</FieldLabel>
          <textarea className="min-h-[118px] w-full resize-none rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3 py-3 text-right text-[13px] leading-6 text-white outline-none placeholder:text-[#58607c] focus:border-[#6f52ff]/60 focus:ring-2 focus:ring-[#6f52ff]/20" placeholder={section.descriptionPlaceholder} value={props.description} onChange={(event) => props.onDescriptionChange(event.target.value)} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <FieldLabel>{section.durationLabel}</FieldLabel>
            <Input className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white placeholder:text-[#58607c] focus-visible:ring-[#6f52ff]/20" placeholder={section.durationPlaceholder} value={props.durationText} onChange={(event) => props.onDurationTextChange(event.target.value)} />
          </div>
          <div>
            <FieldLabel>{section.serviceLabel}</FieldLabel>
            <Input className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white placeholder:text-[#58607c] focus-visible:ring-[#6f52ff]/20" placeholder={section.servicePlaceholder} value={props.serviceType} onChange={(event) => props.onServiceTypeChange(event.target.value)} />
          </div>
        </div>
        <div>
          <FieldLabel>{section.deliveryLabel}</FieldLabel>
          <div className="relative">
            <Input className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] pe-10 text-right text-[13px] text-white placeholder:text-[#58607c] focus-visible:ring-[#6f52ff]/20" type="date" value={props.expectedDeliveryDate} onChange={(event) => props.onExpectedDeliveryDateChange(event.target.value)} />
            <CalendarDays className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-[#58607c]" />
          </div>
        </div>
      </div>
    </FormCard>
  );
}

function ClientDetailsCard(props: {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  onClientNameChange: (value: string) => void;
  onClientEmailChange: (value: string) => void;
  onClientPhoneChange: (value: string) => void;
}) {
  const section = agreementsContent.createAgreementPage.sections.client;

  return (
    <FormCard icon={<UsersRound className="size-4" />} title={section.title} description={section.description}>
      <div className="space-y-4">
        <div>
          <FieldLabel>{section.nameLabel}</FieldLabel>
          <Input className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white placeholder:text-[#58607c] focus-visible:ring-[#6f52ff]/20" placeholder={section.namePlaceholder} value={props.clientName} onChange={(event) => props.onClientNameChange(event.target.value)} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <FieldLabel>{section.emailLabel}</FieldLabel>
            <Input className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white placeholder:text-[#58607c] focus-visible:ring-[#6f52ff]/20" placeholder={section.emailPlaceholder} value={props.clientEmail} onChange={(event) => props.onClientEmailChange(event.target.value)} />
          </div>
          <div>
            <FieldLabel>{section.phoneLabel}</FieldLabel>
            <Input className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white placeholder:text-[#58607c] focus-visible:ring-[#6f52ff]/20" placeholder={section.phonePlaceholder} value={props.clientPhone} onChange={(event) => props.onClientPhoneChange(event.target.value)} />
          </div>
        </div>
      </div>
    </FormCard>
  );
}

function PaymentDetailsCard(props: {
  totalAmount: string;
  currency: string;
  milestones: EditableMilestone[];
  onTotalAmountChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
  onMilestoneChange: (localId: string, field: keyof EditableMilestone, value: string) => void;
}) {
  const section = agreementsContent.createAgreementPage.sections.payment;

  return (
    <FormCard icon={<CreditCard className="size-4" />} title={section.title} description={section.description}>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <FieldLabel>{section.amountLabel}</FieldLabel>
            <Input className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white placeholder:text-[#58607c] focus-visible:ring-[#6f52ff]/20" placeholder={section.amountPlaceholder} value={props.totalAmount} onChange={(event) => props.onTotalAmountChange(event.target.value)} />
          </div>
          <div>
            <FieldLabel>{section.currencyLabel}</FieldLabel>
            <Input className="h-11 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[13px] text-white focus-visible:ring-[#6f52ff]/20" value={props.currency} onChange={(event) => props.onCurrencyChange(event.target.value.toUpperCase())} />
          </div>
        </div>
        <div>
          <FieldLabel>{section.methodsLabel}</FieldLabel>
          <div className="grid gap-2 sm:grid-cols-3">
            {section.methods.map((method) => (
              <button key={method.label} className={cn("h-10 rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3 text-[12px] font-bold text-[#a7aecb] transition hover:border-[#6f52ff]/50", "active" in method && method.active && "border-[#6f52ff] bg-[#6f52ff]/10 text-[#a898ff]")} type="button">
                {method.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <FieldLabel>{section.milestonesLabel}</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {props.milestones.length > 0
              ? props.milestones.map((milestone, index) => (
                  <button key={milestone.localId} className={cn("h-9 min-w-10 rounded-[9px] border border-[#252a42] bg-[#1d2135] px-3 text-[12px] font-bold text-[#8a91ac]", index === 0 && "border-[#6f52ff] bg-[#6f52ff]/10 text-[#a898ff]")} type="button">
                    {milestone.title}
                  </button>
                ))
              : section.milestones.map((milestone, index) => (
                  <button key={milestone} className={cn("h-9 min-w-10 rounded-[9px] border border-[#252a42] bg-[#1d2135] px-3 text-[12px] font-bold text-[#8a91ac]", index === 0 && "border-[#6f52ff] bg-[#6f52ff]/10 text-[#a898ff]")} type="button">
                    {milestone}
                  </button>
                ))}
          </div>
        </div>

        {props.milestones.length > 0 ? (
          <div className="space-y-3 rounded-[10px] bg-[#1d2135] p-4">
            {props.milestones.map((milestone, index) => (
              <div key={milestone.localId} className="rounded-[10px] border border-[#252a42] bg-[#15192b] p-4">
                <p className="mb-3 text-[12px] font-bold text-white">المرحلة {index + 1}</p>
                <div className="grid gap-3 md:grid-cols-2">
                  <Input className="h-10 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[12px] text-white placeholder:text-[#58607c]" value={milestone.title} onChange={(event) => props.onMilestoneChange(milestone.localId, "title", event.target.value)} />
                  <Input className="h-10 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[12px] text-white placeholder:text-[#58607c]" value={milestone.amount} onChange={(event) => props.onMilestoneChange(milestone.localId, "amount", event.target.value)} />
                  <Input className="h-10 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[12px] text-white placeholder:text-[#58607c]" value={milestone.dueInDays} onChange={(event) => props.onMilestoneChange(milestone.localId, "dueInDays", event.target.value)} />
                  <Input className="h-10 rounded-[10px] border-[#252a42] bg-[#1d2135] text-right text-[12px] text-white placeholder:text-[#58607c]" value={milestone.revisionLimit} onChange={(event) => props.onMilestoneChange(milestone.localId, "revisionLimit", event.target.value)} />
                </div>
                <textarea className="mt-3 min-h-[96px] w-full resize-none rounded-[10px] border border-[#252a42] bg-[#1d2135] px-3 py-3 text-right text-[12px] leading-6 text-white outline-none placeholder:text-[#58607c] focus:border-[#6f52ff]/60 focus:ring-2 focus:ring-[#6f52ff]/20" value={milestone.acceptanceCriteriaText} onChange={(event) => props.onMilestoneChange(milestone.localId, "acceptanceCriteriaText", event.target.value)} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </FormCard>
  );
}

function PoliciesCard(props: {
  selectedPolicies: Record<PolicyKey, boolean>;
  policyTexts: Record<PolicyKey, string>;
  onTogglePolicy: (key: PolicyKey) => void;
}) {
  const section = agreementsContent.createAgreementPage.sections.policies;

  return (
    <FormCard icon={<LockKeyhole className="size-4" />} title={section.title} description={section.description}>
      <div className="flex flex-wrap gap-2">
        {POLICY_ITEMS.map((policy) => (
          <button key={policy.key} className={cn("h-9 rounded-full border border-[#252a42] bg-[#1d2135] px-4 text-[12px] font-bold text-[#8a91ac] transition hover:border-[#6f52ff]/50", props.selectedPolicies[policy.key] && "border-[#6f52ff] bg-[#6f52ff]/10 text-[#a898ff]")} type="button" onClick={() => props.onTogglePolicy(policy.key)}>
            {policy.label}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-2 rounded-[10px] bg-[#1d2135] px-4 py-3">
        {POLICY_ITEMS.filter((policy) => props.selectedPolicies[policy.key]).map((policy) => (
          <p key={policy.key} className="text-[12px] leading-6 text-[#737b99]"><span className="font-bold text-[#a7aecb]">{policy.label}:</span> {props.policyTexts[policy.key] || section.note}</p>
        ))}
        {!POLICY_ITEMS.some((policy) => props.selectedPolicies[policy.key]) ? (
          <p className="text-[12px] leading-6 text-[#737b99]">{section.note}</p>
        ) : null}
      </div>
    </FormCard>
  );
}

function CreateAgreementSidebar(props: {
  currency: string;
  totalAmount: string;
  milestonesCount: number;
  onGeneratePlan: () => void;
  isGeneratingPlan: boolean;
}) {
  const content = agreementsContent.createAgreementPage;

  return (
    <aside dir="rtl" className="space-y-4 xl:w-[230px] xl:shrink-0">
      <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5">
        <div className="mb-4 flex items-center justify-between text-[12px] font-bold">
          <span className="text-[#a898ff]">{content.progressValue}</span>
          <span className="text-white">{content.progressTitle}</span>
        </div>
        <div className="mb-4 h-[5px] rounded-full bg-[#0d1020]">
          <span className="block h-full w-1/2 rounded-full bg-[#6f52ff]" />
        </div>
        <div className="space-y-2">
          {content.steps.map((step) => (
            <div key={step.label} className={cn("flex h-9 items-center justify-between rounded-[9px] border px-3 text-[12px] font-bold", stepClasses[step.status])}>
              <span>{step.label}</span>
              {step.status === "done" ? <CheckCircle2 className="size-4 text-emerald-300" /> : <Circle className="size-4 text-[#58607c]" />}
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-[14px] border border-[#252a42] bg-[#15192b] p-5">
        <h2 className="mb-4 text-[14px] font-extrabold text-white">{content.helpTitle}</h2>
        <ul className="space-y-2 text-[12px] text-[#a7aecb]">
          {content.helpItems.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#6f52ff]" />
              {item.label}
            </li>
          ))}
        </ul>
      </article>

      <article className="rounded-[14px] border border-[#252a42] bg-[#0f1220] p-5">
        <h2 className="mb-4 flex items-center gap-2 text-[14px] font-extrabold text-white">
          <ClipboardList className="size-4 text-[#737b99]" />
          {content.summaryTitle}
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[12px]"><strong className="text-white">{props.totalAmount || "0"}</strong><span className="text-[#737b99]">قيمة الاتفاق</span></div>
          <div className="flex items-center justify-between text-[12px]"><strong className="text-white">{props.currency || "SAR"}</strong><span className="text-[#737b99]">العملة</span></div>
          <div className="flex items-center justify-between text-[12px]"><strong className="text-white">{props.milestonesCount || 0}</strong><span className="text-[#737b99]">عدد المراحل</span></div>
        </div>
        <Button type="button" onClick={props.onGeneratePlan} disabled={props.isGeneratingPlan} className="mt-5 h-10 w-full rounded-[10px] bg-[#6f52ff] text-[13px] font-bold text-white shadow-[0_12px_28px_rgba(111,82,255,0.26)] hover:bg-[#7b63ff]">
          <Sparkles className="size-4" />
          {props.isGeneratingPlan ? "جارٍ التوليد..." : content.aiButtonLabel}
        </Button>
      </article>
    </aside>
  );
}

export function CreateAgreementSection() {
  const content = agreementsContent.createAgreementPage;
  const router = useRouter();
  const queryClient = useQueryClient();
  const createAgreementMutation = useCreateAgreementMutation();
  const updateAgreementMutation = useUpdateAgreementMutation();
  const defaultPoliciesQuery = useDefaultPoliciesQuery();
  const settingsQuery = useSettingsQuery();
  const hasPrefilledRef = useRef(false);

  const [draftAgreementId, setDraftAgreementId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [durationText, setDurationText] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [currency, setCurrency] = useState("SAR");
  const [milestones, setMilestones] = useState<EditableMilestone[]>([]);
  const [policyTexts, setPolicyTexts] = useState<Record<PolicyKey, string>>({
    delay: "",
    cancellation: "",
    extraRequest: "",
    review: "",
  });
  const [selectedPolicies, setSelectedPolicies] = useState<Record<PolicyKey, boolean>>(DEFAULT_POLICY_SELECTION);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null);
  const [isPlanIncorporated, setIsPlanIncorporated] = useState(false);
  const [planDescription, setPlanDescription] = useState("");
  const [planBudget, setPlanBudget] = useState("");
  const [planValidationError, setPlanValidationError] = useState<string | null>(null);
  const [planApiError, setPlanApiError] = useState<string | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [isGeneratingAgreement, setIsGeneratingAgreement] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // AR: تملأ هذه الدالة حقول الاتفاق مرة واحدة من إعدادات الفريلانسر المحفوظة.
  // EN: Prefills agreement fields once from saved freelancer settings.
  useEffect(() => {
    if (!settingsQuery.data || hasPrefilledRef.current) {
      return;
    }

    const defaults = getAgreementDefaultsFromSettings(settingsQuery.data);
    hasPrefilledRef.current = true;

    startTransition(() => {
      if (defaults.currency) {
        setCurrency(defaults.currency);
      }

      if (defaults.serviceType) {
        setServiceType(defaults.serviceType);
      }
    });
  }, [settingsQuery.data]);

  useEffect(() => {
    if (!defaultPoliciesQuery.data) {
      return;
    }

    startTransition(() => {
      setPolicyTexts((current) => {
        if (current.delay || current.cancellation || current.extraRequest || current.review) {
          return current;
        }

        return mapDefaultPoliciesToTexts(defaultPoliciesQuery.data);
      });

      setSelectedPolicies((current) => {
        if (
          current.delay !== DEFAULT_POLICY_SELECTION.delay ||
          current.cancellation !== DEFAULT_POLICY_SELECTION.cancellation ||
          current.extraRequest !== DEFAULT_POLICY_SELECTION.extraRequest ||
          current.review !== DEFAULT_POLICY_SELECTION.review
        ) {
          return current;
        }

        return {
          delay: Boolean(defaultPoliciesQuery.data.delayPolicy),
          cancellation: Boolean(defaultPoliciesQuery.data.cancellationPolicy),
          extraRequest: Boolean(defaultPoliciesQuery.data.extraRequestPolicy),
          review: Boolean(defaultPoliciesQuery.data.reviewPolicy),
        };
      });
    });
  }, [defaultPoliciesQuery.data]);

  const displayMilestoneCount = useMemo(() => {
    if (milestones.length > 0) {
      return milestones.length;
    }

    return title.trim() && totalAmount.trim() ? 1 : 0;
  }, [milestones.length, title, totalAmount]);

  function applyPlanToForm(plan: GeneratedPlan | GeneratedAgreementDraft) {
    setGeneratedPlan(plan);
    setIsPlanIncorporated(true);
    setMilestones(mapPlanToMilestones(plan.milestones));
    setPolicyTexts(plan.policies);
    setSelectedPolicies({
      delay: Boolean(plan.policies.delay),
      cancellation: Boolean(plan.policies.cancellation),
      extraRequest: Boolean(plan.policies.extraRequest),
      review: Boolean(plan.policies.review),
    });
  }

  function handleIncorporate(plan: GeneratedPlan) {
    applyPlanToForm(plan);
  }

  function handleMilestoneChange(localId: string, field: keyof EditableMilestone, value: string) {
    setMilestones((current) =>
      current.map((milestone) =>
        milestone.localId === localId ? { ...milestone, [field]: value } : milestone,
      ),
    );
  }

  function handleTogglePolicy(key: PolicyKey) {
    setSelectedPolicies((current) => ({ ...current, [key]: !current[key] }));
  }

  async function handleGeneratePlan() {
    const nextDescription = (planDescription || description || title).trim();
    const nextBudget = (planBudget || totalAmount).trim();

    setPlanDescription(nextDescription);
    setPlanBudget(nextBudget);

    if (nextDescription.length < 20) {
      setPlanValidationError("يرجى إدخال وصف مشروع واضح لا يقل عن 20 حرفاً.");
      return;
    }

    const parsedBudget = nextBudget ? Number(nextBudget) : undefined;

    if (parsedBudget !== undefined && (!Number.isFinite(parsedBudget) || parsedBudget <= 0)) {
      setPlanValidationError("قيمة الاتفاق غير صالحة.");
      return;
    }

    setPlanValidationError(null);
    setPlanApiError(null);
    setIsGeneratingPlan(true);
    setIsPlanIncorporated(false);

    try {
      const plan = await generatePlan({
        projectDescription: nextDescription,
        totalBudget: parsedBudget,
        currency: currency.trim() || undefined,
        language: "ar",
      });

      setGeneratedPlan(plan);
      setSuccessMessage("تم توليد خطة الدفع بنجاح. يمكنك مراجعتها ثم استخدامها.");
    } catch (error) {
      setPlanApiError((error as Error).message || "تعذر توليد خطة الدفع الآن.");
    } finally {
      setIsGeneratingPlan(false);
    }
  }

  async function handleGenerateAgreementWithAi() {
    const payload: GenerateAgreementDraftRequest = {
      projectTitle: title.trim() || undefined,
      projectDescription: description.trim() || undefined,
      clientName: clientName.trim() || undefined,
      serviceType: serviceType.trim() || undefined,
      durationText: durationText.trim() || undefined,
      expectedDeliveryDate: expectedDeliveryDate || undefined,
      totalBudget: totalAmount.trim() ? Number(totalAmount) : undefined,
      currency: currency.trim() || undefined,
      language: "ar",
    };

    if (!payload.projectTitle && !payload.projectDescription) {
      setFormError("يرجى إدخال اسم المشروع أو وصفه أولاً قبل التوليد الذكي.");
      return;
    }

    setFormError(null);
    setSuccessMessage(null);
    setIsGeneratingAgreement(true);

    try {
      const draft = await generateAgreementDraft(payload);

      setTitle(draft.title);
      setDescription(draft.description);
      setServiceType(draft.serviceType ?? serviceType);
      setDurationText(draft.durationText ?? durationText);
      setExpectedDeliveryDate(draft.expectedDeliveryDate ?? expectedDeliveryDate);
      setCurrency(draft.currency || currency);
      applyPlanToForm(draft);
      setSuccessMessage("تم توليد بيانات الاتفاق باستخدام AI وملء الحقول الحالية.");
    } catch (error) {
      setFormError((error as Error).message || "تعذر توليد الاتفاق الذكي الآن.");
    } finally {
      setIsGeneratingAgreement(false);
    }
  }

  async function ensureClientId(required: boolean) {
    const normalizedName = clientName.trim();
    const normalizedEmail = clientEmail.trim().toLowerCase();
    const normalizedPhone = clientPhone.trim();

    if (!normalizedName && !normalizedEmail) {
      return undefined;
    }

    if (required && (!normalizedName || !normalizedEmail)) {
      throw new Error("يرجى استكمال بيانات العميل قبل حفظ الاتفاق.");
    }

    if (!normalizedEmail) {
      return undefined;
    }

    const existingClients = await getClients({ search: normalizedEmail, page: 1, limit: 50 });
    const matchedClient = existingClients.data.find(
      (client) => client.email.toLowerCase() === normalizedEmail,
    );

    if (matchedClient) {
      return matchedClient.id;
    }

    try {
      const createdClient = await createClient({
        name: normalizedName || normalizedEmail,
        email: normalizedEmail,
        phone: normalizedPhone || undefined,
      });

      return createdClient.id;
    } catch (error) {
      const apiError = error as Error;

      if (apiError.message.includes("exists") || apiError.message.includes("موجود")) {
        const retryClients = await getClients({ search: normalizedEmail, page: 1, limit: 50 });
        const retryMatched = retryClients.data.find(
          (client) => client.email.toLowerCase() === normalizedEmail,
        );

        if (retryMatched) {
          return retryMatched.id;
        }
      }

      throw error;
    }
  }

  async function persistAgreementBase(clientId?: string | null) {
    const payload = {
      title: title.trim(),
      description: description.trim() || undefined,
      serviceType: serviceType.trim() || undefined,
      clientId: clientId || undefined,
      currency: currency.trim() || undefined,
      durationText: durationText.trim() || undefined,
      expectedDeliveryDate: expectedDeliveryDate || undefined,
    };

    if (draftAgreementId) {
      await updateAgreementMutation.mutateAsync({
        agreementId: draftAgreementId,
        payload: {
          ...payload,
        },
      });

      return draftAgreementId;
    }

    const agreement = await createAgreementMutation.mutateAsync(payload);
    setDraftAgreementId(agreement.id);
    return agreement.id;
  }

  async function syncAgreementPolicies(agreementId: string) {
    const payload = buildPolicyPayload(
      selectedPolicies,
      policyTexts,
      defaultPoliciesQuery.data,
    );

    return upsertAgreementPolicy(agreementId, payload);
  }

  async function syncAgreementMilestones(agreementId: string, required: boolean) {
    const sourceMilestones =
      milestones.length > 0
        ? milestones
        : title.trim() && totalAmount.trim()
          ? buildSingleMilestoneDraft(title.trim(), totalAmount.trim(), description)
          : [];

    if (required && sourceMilestones.length === 0) {
      throw new Error("يرجى توليد أو إدخال خطة دفع قبل إنشاء الاتفاق.");
    }

    const nextMilestones = [...sourceMilestones];

    for (let index = 0; index < nextMilestones.length; index += 1) {
      const milestone = nextMilestones[index];
      const acceptanceCriteria = milestone.acceptanceCriteriaText
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => ({ description: item, required: true }));

      const payload = {
        title: milestone.title.trim(),
        amount: milestone.amount.trim(),
        orderIndex: index + 1,
        dueDate: expectedDeliveryDate || undefined,
        revisionLimit: Number(milestone.revisionLimit) || 1,
        acceptanceCriteria:
          acceptanceCriteria.length > 0
            ? acceptanceCriteria
            : [{ description: title.trim() || "تسليم المرحلة", required: true }],
      };

      if (!payload.title || !payload.amount) {
        throw new Error("يرجى استكمال بيانات مراحل الدفع قبل الحفظ.");
      }

      if (milestone.id) {
        await updateMilestone(milestone.id, {
          title: payload.title,
          amount: payload.amount,
          dueDate: payload.dueDate,
          revisionLimit: payload.revisionLimit,
          acceptanceCriteria: payload.acceptanceCriteria,
        });
        continue;
      }

      const createdMilestone = await createMilestone(agreementId, payload);
      nextMilestones[index] = {
        ...milestone,
        id: createdMilestone.data.id,
      };
    }

    setMilestones(nextMilestones);
  }

  async function invalidateAgreementCaches(agreementId: string) {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: agreementsQueryKeys.lists() }),
      queryClient.invalidateQueries({ queryKey: agreementsQueryKeys.detail(agreementId) }),
    ]);
  }

  async function handleSaveDraft() {
    setFormError(null);
    setSuccessMessage(null);

    if (!title.trim()) {
      setFormError("عنوان الاتفاقية مطلوب.");
      return;
    }

    try {
      const clientId = await ensureClientId(false);
      const agreementId = await persistAgreementBase(clientId);
      await syncAgreementPolicies(agreementId);

      if (milestones.length > 0 || (title.trim() && totalAmount.trim())) {
        await syncAgreementMilestones(agreementId, false);
      }

      await invalidateAgreementCaches(agreementId);
      setSuccessMessage("تم حفظ المسودة بنجاح.");
    } catch (error) {
      const apiError = error as Error;
      setFormError(apiError.message || "تعذر حفظ المسودة الآن.");
    }
  }

  async function handleCreateAgreement() {
    setFormError(null);
    setSuccessMessage(null);

    if (!title.trim()) {
      setFormError("عنوان الاتفاقية مطلوب.");
      return;
    }

    if (!totalAmount.trim() || Number(totalAmount) <= 0) {
      setFormError("يرجى إدخال قيمة الاتفاق قبل الإنشاء.");
      return;
    }

    try {
      const clientId = await ensureClientId(true);
      const agreementId = await persistAgreementBase(clientId);
      await syncAgreementPolicies(agreementId);
      await syncAgreementMilestones(agreementId, true);
      await invalidateAgreementCaches(agreementId);
      router.push("/agreements?created=1");
    } catch (error) {
      const apiError = error as Error;
      setFormError(apiError.message || "تعذر إنشاء الاتفاق الآن.");
    }
  }

  const isSavingAgreement =
    createAgreementMutation.isPending || updateAgreementMutation.isPending;

  return (
    <>
      <CreateAgreementHeader />
      <section dir="ltr" className="flex flex-col gap-4 xl:flex-row xl:items-start">
        <CreateAgreementSidebar
          currency={currency}
          totalAmount={totalAmount}
          milestonesCount={displayMilestoneCount}
          onGeneratePlan={handleGeneratePlan}
          isGeneratingPlan={isGeneratingPlan}
        />
        <div dir="rtl" className="min-w-0 flex-1 space-y-4">
          <ProjectDetailsCard
            title={title}
            description={description}
            durationText={durationText}
            serviceType={serviceType}
            expectedDeliveryDate={expectedDeliveryDate}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onDurationTextChange={setDurationText}
            onServiceTypeChange={setServiceType}
            onExpectedDeliveryDateChange={setExpectedDeliveryDate}
          />
          <ClientDetailsCard
            clientName={clientName}
            clientEmail={clientEmail}
            clientPhone={clientPhone}
            onClientNameChange={setClientName}
            onClientEmailChange={setClientEmail}
            onClientPhoneChange={setClientPhone}
          />
          <PaymentDetailsCard
            totalAmount={totalAmount}
            currency={currency}
            milestones={milestones}
            onTotalAmountChange={setTotalAmount}
            onCurrencyChange={setCurrency}
            onMilestoneChange={handleMilestoneChange}
          />
          <PoliciesCard
            selectedPolicies={selectedPolicies}
            policyTexts={policyTexts}
            onTogglePolicy={handleTogglePolicy}
          />
          <AiPlanSection
            description={planDescription}
            onDescriptionChange={setPlanDescription}
            totalBudget={planBudget}
            onBudgetChange={setPlanBudget}
            validationError={planValidationError}
            apiError={planApiError}
            isPending={isGeneratingPlan}
            generatedPlan={generatedPlan}
            isIncorporated={isPlanIncorporated}
            onGenerate={handleGeneratePlan}
            onIncorporate={handleIncorporate}
          />
          {successMessage ? (
            <section className="rounded-[12px] border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-[12px] leading-6 text-emerald-100/90">
              {successMessage}
            </section>
          ) : null}
          {formError ? (
            <section className="rounded-[12px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-[12px] leading-6 text-red-100/90">
              {formError}
            </section>
          ) : null}
          <div className="flex flex-col gap-3 pb-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-[12px] leading-6 text-[#737b99]">{content.footerNote}</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" className="h-10 rounded-[10px] border border-[#252a42] bg-[#15192b] px-4 text-[13px] font-bold text-[#c7cce0] hover:bg-[#1d2135] hover:text-white" onClick={() => void handleSaveDraft()} disabled={isSavingAgreement}>
                <Save className="size-4" />
                {isSavingAgreement ? "جارٍ الحفظ..." : content.saveDraftLabel}
              </Button>
              <Button type="button" className="h-10 rounded-[10px] bg-[#1d2135] px-4 text-[13px] font-bold text-white shadow-[0_12px_28px_rgba(111,82,255,0.16)] hover:bg-[#262b49]" onClick={() => void handleGenerateAgreementWithAi()} disabled={isGeneratingAgreement}>
                <Bot className="size-4" />
                {isGeneratingAgreement ? "جارٍ التوليد..." : content.generateLabel}
              </Button>
              <Button type="button" className="h-10 rounded-[10px] bg-[#1d2135] px-4 text-[13px] font-bold text-white shadow-[0_12px_28px_rgba(111,82,255,0.16)] hover:bg-[#262b49]" onClick={() => void handleGeneratePlan()} disabled={isGeneratingPlan}>
                <Sparkles className="size-4" />
                {content.aiButtonLabel}
              </Button>
              <Button className="h-10 rounded-[10px] bg-[#6f52ff] px-5 text-[13px] font-bold text-white shadow-[0_12px_28px_rgba(111,82,255,0.26)] hover:bg-[#7b63ff]" onClick={() => void handleCreateAgreement()} disabled={isSavingAgreement}>
                <Save className="size-4" />
                حفظ / إنشاء الاتفاق
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
