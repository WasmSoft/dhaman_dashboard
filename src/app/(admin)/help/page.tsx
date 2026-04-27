import { NotFoundState } from "@/components/shared";
import { adminNotReadyPages } from "@/constants";

export default function HelpPage() {
  return <NotFoundState {...adminNotReadyPages.help} />;
}
