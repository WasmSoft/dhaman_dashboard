declare module "@hookform/resolvers/zod" {
  import type { FieldValues, Resolver } from "react-hook-form";

  export function zodResolver<
    TFieldValues extends FieldValues = FieldValues,
    TContext = unknown,
  >(
    schema: unknown,
    schemaOptions?: unknown,
    resolverOptions?: unknown,
  ): Resolver<TFieldValues, TContext>;
}
