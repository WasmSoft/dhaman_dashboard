// AR: المحتوى الثابت لمكونات طلبات التغيير بالعربية والإنجليزية.
// EN: Static content for change request components in Arabic and English.
export const changeRequestsContent = {
  sectionTitle: { ar: "طلبات التغيير", en: "Change Requests" },
  createButton: { ar: "طلب تغيير جديد", en: "New Change Request" },
  emptyState: {
    title: { ar: "لا توجد طلبات تغيير", en: "No Change Requests" },
    description: {
      ar: "لم يتم إنشاء أي طلبات تغيير لهذه الاتفاقية بعد.",
      en: "No change requests have been created for this agreement yet.",
    },
  },
  sendConfirm: {
    title: { ar: "إرسال إلى العميل", en: "Send to Client" },
    description: {
      ar: "سيتم إرسال طلب التغيير إلى العميل للموافقة عليه. لا يمكن التراجع بعد الإرسال.",
      en: "The change request will be sent to the client for approval. This cannot be undone.",
    },
    confirm: { ar: "إرسال", en: "Send" },
    cancel: { ar: "إلغاء", en: "Cancel" },
  },
  approve: {
    title: { ar: "قبول طلب التغيير", en: "Approve Change Request" },
    confirm: { ar: "قبول", en: "Approve" },
  },
  decline: {
    title: { ar: "رفض طلب التغيير", en: "Decline Change Request" },
    reasonLabel: { ar: "سبب الرفض", en: "Decline Reason" },
    confirm: { ar: "رفض", en: "Decline" },
  },
  fund: {
    title: { ar: "تمويل طلب التغيير", en: "Fund Change Request" },
    confirm: { ar: "تمويل", en: "Fund Now" },
  },
  createForm: {
    title: { ar: "إنشاء طلب تغيير", en: "Create Change Request" },
    titleLabel: { ar: "العنوان", en: "Title" },
    descriptionLabel: { ar: "الوصف", en: "Description" },
    amountLabel: { ar: "المبلغ", en: "Amount" },
    currencyLabel: { ar: "العملة", en: "Currency" },
    acceptanceCriteriaLabel: {
      ar: "معايير القبول",
      en: "Acceptance Criteria",
    },
    addCriterion: { ar: "إضافة معيار", en: "Add Criterion" },
    timelineDaysLabel: {
      ar: "أيام الجدول الزمني (اختياري)",
      en: "Timeline Days (optional)",
    },
    submit: { ar: "إنشاء", en: "Create" },
    cancel: { ar: "إلغاء", en: "Cancel" },
  },
  editForm: {
    title: { ar: "تعديل طلب التغيير", en: "Edit Change Request" },
    submit: { ar: "حفظ", en: "Save" },
  },
  detail: {
    sendAction: { ar: "إرسال إلى العميل", en: "Send to Client" },
    editAction: { ar: "تعديل", en: "Edit" },
    paymentSummary: { ar: "ملخص الدفع", en: "Payment Summary" },
    acceptanceCriteria: { ar: "معايير القبول", en: "Acceptance Criteria" },
    timelineDays: { ar: "أيام الجدول الزمني", en: "Timeline Days" },
    approvedAt: { ar: "تاريخ القبول", en: "Approved At" },
    declinedAt: { ar: "تاريخ الرفض", en: "Declined At" },
    fundedAt: { ar: "تاريخ التمويل", en: "Funded At" },
    amount: { ar: "المبلغ", en: "Amount" },
    description: { ar: "الوصف", en: "Description" },
    loading: { ar: "جاري التحميل...", en: "Loading..." },
    error: { ar: "حدث خطأ", en: "An error occurred" },
    notFound: {
      ar: "لم يتم العثور على طلب التغيير.",
      en: "Change request not found.",
    },
  },
  portal: {
    invalidToken: {
      ar: "هذا الرابط غير صالح أو منتهي الصلاحية.",
      en: "This link is invalid or has expired.",
    },
    declined: {
      ar: "تم رفض طلب التغيير.",
      en: "Change request has been declined.",
    },
    funded: {
      ar: "تم تمويل طلب التغيير.",
      en: "Change request has been funded.",
    },
  },
  toast: {
    created: { ar: "تم إنشاء طلب التغيير بنجاح.", en: "Change request created successfully." },
    updated: { ar: "تم تحديث طلب التغيير بنجاح.", en: "Change request updated successfully." },
    sent: { ar: "تم إرسال طلب التغيير إلى العميل.", en: "Change request sent to client." },
    approved: { ar: "تم قبول طلب التغيير.", en: "Change request approved." },
    declined: { ar: "تم رفض طلب التغيير.", en: "Change request declined." },
    funded: { ar: "تم تمويل طلب التغيير.", en: "Change request funded." },
  },
} as const;

export type ChangeRequestsContent = typeof changeRequestsContent;
