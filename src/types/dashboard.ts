import type { FeaturePlaceholderContent } from "@/types/common";

export interface DashboardContentMap {
  dashboard: FeaturePlaceholderContent;
}

export interface DashboardMetric {
  key: string;
  label: string;
  value: number | string;
  trend?: number;
}

export interface DashboardSummaryResponse {
  metrics: DashboardMetric[];
  generatedAt: string;
}
