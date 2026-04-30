"use client";

// AR: نافذة تأكيد لإرسال طلب التغيير إلى العميل — تحذر من عدم إمكانية التراجع.
// EN: Confirmation dialog for sending a change request to the client — warns it cannot be undone.
import { useState } from "react";
import { Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/shared";
import { useSendChangeRequestMutation } from "@/hooks/change-requests";
import { changeRequestsContent } from "@/constants";

interface SendChangeRequestConfirmDialogProps {
  id: string;
  trigger: React.ReactNode;
}

export function SendChangeRequestConfirmDialog({
  id,
  trigger,
}: SendChangeRequestConfirmDialogProps) {
  const [open, setOpen] = useState(false);
  const locale = "ar";
  const ct = changeRequestsContent;

  const sendMutation = useSendChangeRequestMutation(id);

  const handleSend = async () => {
    try {
      await sendMutation.mutateAsync();
      setOpen(false);
    } catch {
      // Error handled by TanStack Query
    }
  };

  return (
    <>
      <div onClick={() => setOpen(true)} className="inline-flex">
        {trigger}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="relative z-10 w-full max-w-md rounded-[14px] border border-[#252a42] bg-[#15192b] p-6 shadow-2xl">
            <div className="mb-4 flex items-start gap-3 text-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/15">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-[15px] font-semibold text-white">
                  {ct.sendConfirm.title[locale]}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#8b90a8]">
                  {ct.sendConfirm.description[locale]}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                {ct.sendConfirm.cancel[locale]}
              </Button>
              <Button
                onClick={handleSend}
                disabled={sendMutation.isPending}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                {sendMutation.isPending && (
                  <Loader2 className="me-2 h-4 w-4 animate-spin" />
                )}
                {ct.sendConfirm.confirm[locale]}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
