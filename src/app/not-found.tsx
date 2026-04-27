import { NotFoundState } from "@/components/shared";
import { globalNotFoundContent } from "@/constants";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen bg-[#0f1220] text-white">
      <NotFoundState {...globalNotFoundContent} />
    </main>
  );
}
