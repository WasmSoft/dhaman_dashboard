import type { FeaturePlaceholderContent } from "@/types";

type FeaturePlaceholderProps = FeaturePlaceholderContent;

export function FeaturePlaceholder({
  title,
  description,
}: FeaturePlaceholderProps) {
  return (
    <section className="flex flex-1 px-4 py-10 md:px-6 md:py-12">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 text-start">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  );
}
