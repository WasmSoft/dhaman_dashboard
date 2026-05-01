type PortalRouteKey =
  | "portalHome"
  | "deliveryPreview"
  | "tracking"
  | "changeRequests"
  | "changeRequestPayment"
  | "paymentSetup"
  | "paymentConfirmation"
  | "paymentHistory"
  | "fundMilestone"
  | "releasePayment";

type PortalTokenSource = {
  portalToken?: string | null;
  inviteToken?: string | null;
};

const portalRouteSegments: Record<PortalRouteKey, string> = {
  portalHome: "",
  deliveryPreview: "delivery-preview",
  tracking: "tracking",
  changeRequests: "change-requests",
  changeRequestPayment: "change-request-payment",
  paymentSetup: "payment-setup",
  paymentConfirmation: "payment-confirmation",
  paymentHistory: "payment-History",
  fundMilestone: "fund-milestone",
  releasePayment: "release-payment",
};

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function getConfiguredPortalBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL ??
    process.env.NEXT_PUBLIC_APP_BASE_URL ??
    process.env.CLIENT_PORTAL_URL ??
    process.env.APP_BASE_URL ??
    ""
  );
}

// AR: يحدد رمز بوابة العميل المفضل للروابط الخارجية، مع استخدام inviteToken كاحتياط قديم فقط.
// EN: Resolves the preferred client portal token for external links, keeping inviteToken only as a legacy fallback.
export function resolveClientPortalToken(tokens: PortalTokenSource) {
  return tokens.portalToken ?? tokens.inviteToken ?? null;
}

// AR: يبني مسارات روابط بوابة العميل بنفس بنية /portal/{token}/... المطلوبة في رسائل البريد.
// EN: Builds client portal link paths using the required /portal/{token}/... email-link structure.
export function buildPortalPath(token: string, route: PortalRouteKey = "portalHome") {
  const segment = portalRouteSegments[route];
  const basePath = `/portal/${encodeURIComponent(token)}`;

  return segment ? `${basePath}/${segment}` : basePath;
}

// AR: يبني رابطاً كاملاً للبوابة باستخدام base URL الممرر أو إعدادات APP/CLIENT_PORTAL_URL.
// EN: Builds a full portal URL using an explicit base URL or APP/CLIENT_PORTAL_URL configuration.
export function buildPortalUrl(
  token: string,
  route: PortalRouteKey = "portalHome",
  baseUrl = getConfiguredPortalBaseUrl(),
) {
  const path = buildPortalPath(token, route);

  return baseUrl ? `${trimTrailingSlash(baseUrl)}${path}` : path;
}
