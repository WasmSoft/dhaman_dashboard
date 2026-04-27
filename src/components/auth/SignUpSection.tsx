import { authContent } from "@/constants";
import { FeaturePlaceholder } from "@/components/shared";

export function SignUpSection() {
  return <FeaturePlaceholder {...authContent.signUp} />;
}
