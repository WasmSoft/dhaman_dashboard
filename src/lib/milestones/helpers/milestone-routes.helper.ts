// AR: مساعدات مسارات المراحل — توحّد بناء المسارات لتجنب تكرارها في المكونات.
// EN: Milestone route helpers — centralize path construction to avoid duplicating them in components.

export function buildAgreementEditHref(agreementId: string) {
  return `/agreements/${encodeURIComponent(agreementId)}/edit`;
}

export function buildAgreementWorkspaceHref(agreementId: string) {
  return `/agreements/${encodeURIComponent(agreementId)}`;
}

export function buildMilestoneDetailHref(
  agreementId: string,
  milestoneId: string,
) {
  return `/agreements/${encodeURIComponent(agreementId)}/milestones/${encodeURIComponent(milestoneId)}`;
}
