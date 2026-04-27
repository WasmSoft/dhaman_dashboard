import { NotFoundState } from "@/components/shared";
import { adminNotReadyPages } from "@/constants";

export default function ReportsPage() {
  return <NotFoundState {...adminNotReadyPages.reports} />;
}
