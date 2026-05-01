import { z } from "zod";

const optionalText = z
  .string()
  .trim()
  .max(200, "القيمة طويلة جدًا")
  .optional()
  .or(z.literal(""));

export const clientFormSchema = z.object({
  name: z.string().trim().min(1, "الاسم مطلوب").max(100, "الاسم طويل جدًا"),
  email: z.string().trim().email("البريد الإلكتروني غير صالح").max(254, "البريد الإلكتروني طويل جدًا"),
  phone: z.string().trim().max(20, "رقم الهاتف طويل جدًا").optional().or(z.literal("")),
  companyName: optionalText,
});

export const createClientSchema = clientFormSchema;

export const updateClientSchema = z.object({
  name: z.string().trim().min(1, "الاسم مطلوب").max(100, "الاسم طويل جدًا").optional(),
  email: z.string().trim().email("البريد الإلكتروني غير صالح").max(254, "البريد الإلكتروني طويل جدًا").optional(),
  phone: z.string().trim().max(20, "رقم الهاتف طويل جدًا").optional().nullable(),
  companyName: z.string().trim().max(200, "اسم الشركة طويل جدًا").optional().nullable(),
});

export const clientListParamsSchema = z.object({
  search: z.string().trim().optional().transform((value) => value || undefined),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type ClientFormSchemaValues = z.infer<typeof clientFormSchema>;
export type CreateClientSchemaValues = z.infer<typeof createClientSchema>;
export type UpdateClientSchemaValues = z.infer<typeof updateClientSchema>;
export type ClientListParamsSchemaValues = z.infer<typeof clientListParamsSchema>;
