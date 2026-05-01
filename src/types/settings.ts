export interface SettingsContentMap {
  settings: SettingsContent;
}

export type SettingsSectionKey =
  | "profile"
  | "business"
  | "agreementPolicies"
  | "aiPreferences"
  | "notifications"
  | "security"
  | "billing";

export type SettingsIconName =
  | "profile"
  | "business"
  | "agreementPolicies"
  | "aiPreferences"
  | "notifications"
  | "security"
  | "billing"
  | "enabled"
  | "info"
  | "warning";

export interface SettingsAction {
  label: string;
  icon: "save" | "close" | "refresh";
}

export interface SettingsNavigationItem {
  key: SettingsSectionKey;
  label: string;
  description: string;
  icon: SettingsIconName;
}

export interface SettingsInfoBadge {
  label: string;
}

export interface SettingsProfileSummary {
  name: string;
  email: string;
  role: string;
  initials: string;
  buttonLabel: string;
}

export interface SettingsBusinessSummary {
  businessName: string;
  service: string;
  currency: string;
  buttonLabel: string;
}

export interface SettingsStatusRow {
  label: string;
  status: string;
}

export interface SettingsSecuritySummary {
  password: string;
  lastLogin: string;
  twoFactor: string;
  buttonLabel: string;
}

export interface SettingsOverviewCard {
  title: string;
  icon: SettingsIconName;
  type: "profile" | "business" | "notifications" | "security";
}

export interface SettingsPolicyField {
  label: string;
  value: string | number | null;
  name?: string;
  placeholder?: string;
  inputType?: "text" | "number" | "select" | "textarea" | "pill-list";
  options?: readonly string[];
  pills?: readonly string[];
}

export interface SettingsPolicyCard {
  key: string;
  title: string;
  description: string;
  icon: SettingsIconName;
  fields: readonly SettingsPolicyField[];
  enabledByDefault: boolean;
  showDefaultToggle?: boolean;
}

export interface SettingsAiPreferenceOption {
  key: string;
  label: string;
}

export interface SettingsAiPreferenceToggle {
  label: string;
  enabled: boolean;
}

export interface SettingsContent {
  title: string;
  description: string;
  actions: readonly SettingsAction[];
  navigation: readonly SettingsNavigationItem[];
  profileSummary: SettingsProfileSummary;
  businessSummary: SettingsBusinessSummary;
  notificationSummary: readonly SettingsStatusRow[];
  securitySummary: SettingsSecuritySummary;
  overviewCards: readonly SettingsOverviewCard[];
  placeholderTitle: string;
  placeholderDescription: string;
  placeholderActionLabel: string;
  policyIntroTitle: string;
  policyIntroDescription: string;
  policyBadges: readonly SettingsInfoBadge[];
  policyHint: string;
  policies: readonly SettingsPolicyCard[];
  aiPreferenceTitle: string;
  aiPreferenceLevelLabel: string;
  aiPreferenceOptions: readonly SettingsAiPreferenceOption[];
  aiPreferenceToggles: readonly SettingsAiPreferenceToggle[];
  aiPreferenceHint: string;
  footerBanner: string;
  footerNote: string;
}
