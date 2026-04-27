export type DeliveryMetricTone = "amber" | "violet" | "emerald" | "red";
export type DeliveryStatusTone = "review" | "change" | "accepted" | "pending" | "ai";
export type DeliveryPaymentTone = "client" | "hold" | "ready" | "reserved" | "ai";

export interface DeliveryMetricCard {
  label: string;
  value: string;
  helper: string;
  badge: string;
  tone: DeliveryMetricTone;
}

export interface DeliveryFilterChip {
  label: string;
  count: string;
  active?: boolean;
}

export interface DeliveryTableItem {
  id: string;
  project: string;
  client: string;
  milestone: string;
  delivery: string;
  deliveryStatus: string;
  deliveryTone: DeliveryStatusTone;
  paymentStatus: string;
  paymentTone: DeliveryPaymentTone;
  amount: string;
  lastUpdate: string;
  actionLabel: string;
  active?: boolean;
}

export interface DeliverySelectedSummary {
  title: string;
  project: string;
  milestone: string;
  statusLabel: string;
  status: string;
  paymentLabel: string;
  payment: string;
  amount: string;
  deliveryTimeLabel: string;
  deliveryTime: string;
  reviewDueLabel: string;
  reviewDue: string;
  criteriaTitle: string;
  criteria: readonly string[];
  note: string;
}

export interface DeliveriesContent {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  exportLabel: string;
  createLabel: string;
  metrics: readonly DeliveryMetricCard[];
  filters: readonly DeliveryFilterChip[];
  sortFilters: readonly string[];
  tableHeaders: readonly string[];
  deliveries: readonly DeliveryTableItem[];
  selectedSummary: DeliverySelectedSummary;
  aiNotice: string;
  quickActionsTitle: string;
  quickActions: readonly string[];
}
