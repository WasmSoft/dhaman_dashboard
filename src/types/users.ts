export type SupportedCurrency =
  | "SAR"
  | "USD"
  | "EUR"
  | "AED"
  | "KWD"
  | "BHD"
  | "QAR"
  | "OMR"
  | "EGP";

export type SupportedLocale = "ar" | "en";
export type UserRole = "FREELANCER" | "ADMIN";

export interface UsersAccountResponse {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
  avatarUrl: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface UsersProfileResponse {
  id: string;
  userId: string;
  businessName: string | null;
  bio: string | null;
  specialization: string | null;
  preferredCurrency: SupportedCurrency;
  locale: SupportedLocale;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface UsersAccountUpdatePayload {
  name?: string | null;
  avatarUrl?: string | null;
}

export interface UsersProfileUpdatePayload {
  businessName?: string | null;
  bio?: string | null;
  specialization?: string | null;
  preferredCurrency?: SupportedCurrency;
  locale?: SupportedLocale;
}

export interface UsersSettingsDraft {
  name?: string;
  avatarUrl?: string;
  businessName?: string;
  bio?: string;
  specialization?: string;
  preferredCurrency?: SupportedCurrency;
  locale?: SupportedLocale;
}

export interface UsersIdentity {
  name?: string | null;
  avatarUrl?: string | null;
  email?: string | null;
  role?: UserRole | null;
}

export type UsersUiState =
  | "loading"
  | "ready"
  | "saving"
  | "authenticationRequired"
  | "notFound"
  | "validationError"
  | "unexpectedError";

export interface UsersUiErrorState {
  state: Exclude<UsersUiState, "loading" | "ready" | "saving">;
  message: string;
}
