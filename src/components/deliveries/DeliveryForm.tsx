"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, FileText, Send } from "lucide-react";

import { Button } from "@/components/shared";
import { Input } from "@/components/shared/input";
import { cn } from "@/lib/utils";
import {
  createDeliverySchema,
  updateDeliverySchema,
  type CreateDeliveryFormValues,
  type UpdateDeliveryFormValues,
} from "@/lib/deliveries/schemas/delivery.schema";
import { isDeliveryEditable } from "@/lib/deliveries/helpers/delivery-status.helper";
import { getDeliveryErrorMessage } from "@/lib/deliveries/helpers/delivery-status.helper";
import { deliveriesUiStrings } from "@/constants/deliveries";
import type { Delivery, DeliveryErrorCode } from "@/types";

interface DeliveryFormProps {
  milestoneId: string;
  agreementId: string;
  initialData?: Delivery;
  onSubmit: (values: CreateDeliveryFormValues | UpdateDeliveryFormValues) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
  apiError?: { code: string; message: string } | null;
}

// AR: نموذج إنشاء/تعديل التسليم مع تحقق Zod وعرض أخطاء inline.
// EN: Delivery create/edit form with Zod validation and inline error display.
export function DeliveryForm({
  milestoneId,
  agreementId,
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
  apiError,
}: DeliveryFormProps) {
  const isEditing = Boolean(initialData?.id);
  const isEditable = initialData ? isDeliveryEditable(initialData.status) : true;

  const schema = isEditing ? updateDeliverySchema : createDeliverySchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDeliveryFormValues | UpdateDeliveryFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialData
      ? {
          summary: initialData.summary,
          deliveryUrl: initialData.deliveryUrl ?? "",
          fileUrl: initialData.fileUrl ?? "",
          fileName: initialData.fileName ?? undefined,
          fileType: initialData.fileType ?? undefined,
          notes: initialData.notes ?? undefined,
        }
      : {
          summary: "",
          deliveryUrl: "",
          fileUrl: "",
        },
  });

  if (!isEditable && initialData) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
        <p className="text-[13px] text-[#737b99]">{deliveriesUiStrings.errorTitle}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 text-start"
      dir="rtl"
    >
      {apiError && (
        <div className="flex items-center gap-2 rounded-[10px] border border-red-500/25 bg-red-500/10 px-4 py-3 text-[12px] text-red-300">
          <AlertTriangle className="size-4 shrink-0" />
          {apiError.message || getDeliveryErrorMessage(apiError.code as DeliveryErrorCode)}
        </div>
      )}

      {!isEditing && (
        <input type="hidden" {...register("milestoneId" as never)} value={milestoneId} />
      )}

      <div>
        <label htmlFor="summary" className="mb-1.5 block text-[13px] font-bold text-white">
          ملخص التسليم
        </label>
        <textarea
          id="summary"
          {...register("summary")}
          rows={3}
          className={cn(
            "w-full rounded-[10px] border bg-[#15192b] px-4 py-3 text-[13px] text-white placeholder:text-[#636b8a] focus-visible:ring-[#6f52ff]/20",
            errors.summary ? "border-red-500/50" : "border-[#252a42]",
          )}
          placeholder="اكتب ملخص التسليم (10 أحرف على الأقل)"
          dir="rtl"
        />
        {errors.summary && (
          <p className="mt-1 text-[11px] text-red-400">{errors.summary.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="deliveryUrl" className="mb-1.5 block text-[13px] font-bold text-white">
          رابط التسليم
        </label>
        <Input
          id="deliveryUrl"
          {...register("deliveryUrl")}
          placeholder="https://example.com/work"
          dir="ltr"
          className={cn(
            "h-10 rounded-[10px] border-[#252a42] bg-[#15192b] px-4 text-[12px] text-white",
            errors.deliveryUrl && "border-red-500/50",
          )}
        />
        {errors.deliveryUrl && (
          <p className="mt-1 text-[11px] text-red-400">{errors.deliveryUrl.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="fileUrl" className="mb-1.5 block text-[13px] font-bold text-white">
          رابط الملف (اختياري)
        </label>
        <Input
          id="fileUrl"
          {...register("fileUrl")}
          placeholder="https://example.com/file.zip"
          dir="ltr"
          className={cn(
            "h-10 rounded-[10px] border-[#252a42] bg-[#15192b] px-4 text-[12px] text-white",
            errors.fileUrl && "border-red-500/50",
          )}
        />
        {errors.fileUrl && (
          <p className="mt-1 text-[11px] text-red-400">{errors.fileUrl.message}</p>
        )}
      </div>

      {(initialData?.fileName || initialData?.fileUrl) && (
        <div className="flex items-center gap-2 rounded-[10px] border border-[#252a42] bg-[#15192b] px-4 py-2">
          <FileText className="size-4 text-[#a898ff]" />
          <span className="text-[12px] text-[#c7cce0]">
            {initialData?.fileName || "ملف مرفق"}
          </span>
        </div>
      )}

      <div>
        <label htmlFor="notes" className="mb-1.5 block text-[13px] font-bold text-white">
          ملاحظات (اختياري)
        </label>
        <textarea
          id="notes"
          {...register("notes")}
          rows={2}
          className="w-full rounded-[10px] border border-[#252a42] bg-[#15192b] px-4 py-3 text-[13px] text-white placeholder:text-[#636b8a] focus-visible:ring-[#6f52ff]/20"
          placeholder="أي ملاحظات إضافية للعميل"
          dir="rtl"
        />
      </div>

      {errors.root?.message && (
        <p className="text-[11px] text-red-400">{errors.root.message}</p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-10 rounded-[10px] bg-[#6f52ff] px-6 text-[13px] font-bold text-white hover:bg-[#7b63ff]"
        >
          <Send className="me-2 size-4" />
          {isSubmitting ? "جارٍ الحفظ..." : isEditing ? "حفظ التعديلات" : "إنشاء التسليم"}
        </Button>

        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="h-10 rounded-[10px] border border-[#252a42] bg-[#15192b] px-6 text-[13px] font-bold text-[#c7cce0] hover:text-white"
          >
            إلغاء
          </Button>
        )}

        {agreementId && (
          <Link
            href={`/agreements/${agreementId}`}
            className="ms-auto flex items-center gap-1 text-[12px] text-[#8a91ac] hover:text-white"
          >
            <ArrowLeft className="size-3.5" />
            العودة لمساحة العمل
          </Link>
        )}
      </div>
    </form>
  );
}