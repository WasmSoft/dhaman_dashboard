import { NotFoundState } from "@/components/shared";
import { adminNotReadyPages } from "@/constants";

export default function PaymentsPage() {
  return <NotFoundState {...adminNotReadyPages.payments} />;
}
