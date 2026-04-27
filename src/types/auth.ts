import type { FeaturePlaceholderContent } from "@/types/common";

export interface AuthContentMap {
  login: FeaturePlaceholderContent;
  signUp: FeaturePlaceholderContent;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: "client" | "admin";
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthSessionResponse {
  user: AuthUser;
  tokens?: AuthTokens;
}
