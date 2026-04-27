export interface DashboardContentMap {
  dashboard: DashboardContent;
}

export interface DashboardMetric {
  key: string;
  label: string;
  value: string;
  trend: string;
  trendTone: "positive" | "negative";
  icon: DashboardIconName;
}

export interface DashboardSummaryResponse {
  metrics: DashboardMetric[];
  generatedAt: string;
}

export type DashboardIconName =
  | "grid"
  | "file"
  | "check"
  | "clock"
  | "pen"
  | "users"
  | "chart"
  | "settings"
  | "help"
  | "logout"
  | "wallet"
  | "download"
  | "calendar"
  | "bell"
  | "mail"
  | "target"
  | "search"
  | "filter"
  | "plus";

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: DashboardIconName;
  badge?: string;
  active?: boolean;
}

export interface DashboardNavGroup {
  label: string;
  items: readonly DashboardNavItem[];
}

export interface DashboardAgreementItem {
  id: string;
  title: string;
  code: string;
  amount: string;
  status: string;
  statusTone: "success" | "purple" | "blue" | "muted";
  emoji: string;
}

export interface DashboardReviewItem {
  title: string;
  description: string;
  progress: number;
  tone: "purple" | "amber" | "emerald";
  icon: DashboardIconName;
}

export interface DashboardTransactionItem {
  title: string;
  description: string;
  date: string;
  amount: string;
  status: string;
  statusTone: "success" | "purple" | "blue";
  emoji: string;
}

export interface DashboardChartBar {
  month: string;
  value: number;
  label?: string;
  active?: boolean;
}

export interface DashboardContent {
  brandName: string;
  greeting: string;
  subtitle: string;
  currentDate: string;
  searchPlaceholder: string;
  navGroups: readonly DashboardNavGroup[];
  metrics: readonly DashboardMetric[];
  chartBars: readonly DashboardChartBar[];
  agreements: readonly DashboardAgreementItem[];
  reviews: readonly DashboardReviewItem[];
  transactions: readonly DashboardTransactionItem[];
}
