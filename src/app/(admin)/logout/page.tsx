import { NotFoundState } from "@/components/shared";
import { adminNotReadyPages } from "@/constants";

export default function LogoutPage() {
  return <NotFoundState {...adminNotReadyPages.logout} />;
}
