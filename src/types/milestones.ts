import type { ApiItemResponse } from "./common";
import type {
  DeliveryStatus,
  MilestoneStatus,
  PaymentStatus,
} from "./dashboard";

export interface MilestoneAcceptanceCriterion {
  description: string;
  required?: boolean;
}

export interface Milestone {
  id: string;
  agreementId: string;
  title: string;
  description: string | null;
  amount: string;
  currency: string;
  dueDate: string | null;
  orderIndex: number;
  status: MilestoneStatus;
  paymentStatus: PaymentStatus;
  deliveryStatus: DeliveryStatus;
  acceptanceCriteria: MilestoneAcceptanceCriterion[];
  revisionLimit: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMilestonePayload {
  title: string;
  description?: string;
  amount: string;
  dueDate?: string;
  orderIndex: number;
  acceptanceCriteria: MilestoneAcceptanceCriterion[];
  revisionLimit?: number;
}

export interface UpdateMilestonePayload {
  title?: string;
  description?: string;
  amount?: string;
  dueDate?: string;
  acceptanceCriteria?: MilestoneAcceptanceCriterion[];
  revisionLimit?: number;
}

export interface MilestoneReorderItem {
  milestoneId: string;
  orderIndex: number;
}

export interface ReorderMilestonesPayload {
  milestones: MilestoneReorderItem[];
}

export interface MilestoneListSummary {
  milestones: Milestone[];
  totalAmount: string;
  agreementTotalAmount: string;
  amountMatch: boolean;
  currency: string;
}

export type AgreementMilestonesResponse = ApiItemResponse<MilestoneListSummary>;
export type MilestoneDetailsResponse = ApiItemResponse<Milestone>;

export interface MilestoneMutationResponse {
  data: Milestone;
  amountWarning?: string;
}

export interface ReorderMilestonesResponse {
  data: Milestone[];
}

export interface DeleteMilestoneResponse {
  success: boolean;
}
