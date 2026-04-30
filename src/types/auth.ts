export interface AuthContentMap {
  login: LoginPageContent;
  signUp: SignUpPageContent;
}

export interface AuthField {
  id: string;
  label: string;
  placeholder: string;
  type: "text" | "email" | "password";
  helper?: string;
}

export interface SignUpRoleOption {
  label: string;
  value: "freelancer" | "client";
  active?: boolean;
}

export interface SignUpPreviewStep {
  label: string;
  status: "done" | "active" | "pending";
}

export interface LoginMetric {
  value: string;
  label: string;
  accent: "violet" | "emerald" | "blue";
}

export interface LoginActivityItem {
  label: string;
  value: string;
  status?: string;
  accent: "emerald" | "blue" | "violet" | "amber";
}

export interface LoginPageContent {
  brandName: string;
  tagline: string;
  title: string;
  description: string;
  fields: {
    email: AuthField;
    password: AuthField;
  };
  rememberLabel: string;
  forgotPasswordLabel: string;
  submitLabel: string;
  dividerLabel: string;
  googleLabel: string;
  signUpPrompt: string;
  signUpLabel: string;
  preview: {
    title: string;
    liveLabel: string;
    protectionTitle: string;
    protectionDescription: string;
    completedPaymentTitle: string;
    completedPaymentDescription: string;
    metrics: LoginMetric[];
    chartBars: number[];
    activity: LoginActivityItem[];
  };
}

export interface SignUpTrustCard {
  label: string;
  value: string;
  caption: string;
  accent: "violet" | "blue" | "emerald" | "amber";
}

export interface SignUpPageContent {
  brandName: string;
  tagline: string;
  title: string;
  description: string;
  roleOptions: SignUpRoleOption[];
  fields: {
    fullName: AuthField;
    businessName: AuthField;
    email: AuthField;
    password: AuthField;
    confirmPassword: AuthField;
  };
  termsLabel: string;
  submitLabel: string;
  dividerLabel: string;
  googleLabel: string;
  loginPrompt: string;
  loginLabel: string;
  preview: {
    stepLabel: string;
    title: string;
    steps: SignUpPreviewStep[];
    cards: SignUpTrustCard[];
    secureTitle: string;
    secureDescription: string;
    securePercent: string;
    topBadge: string;
    bottomBadge: string;
  };
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "FREELANCER" | "ADMIN";
  avatarUrl: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  fullName: string;
  businessName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthSessionResponse {
  accessToken: string;
  user: AuthUser;
}

export interface AuthLogoutResponse {
  message: string;
}
