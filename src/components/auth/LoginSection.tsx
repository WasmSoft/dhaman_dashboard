import { authContent } from "@/constants";
import { FeaturePlaceholder } from "@/components/shared";

export function LoginSection() {
  return <FeaturePlaceholder {...authContent.login} />;
}
