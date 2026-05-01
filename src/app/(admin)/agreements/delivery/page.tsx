import { getAgreements } from "@/lib/agreements/actions/agreements.api";
import { findFirstDeliveryRouteMatch } from "@/lib/deliveries/helpers";
import { getAgreementMilestones } from "@/lib/milestones/actions/milestones.api";
import { buildMilestoneDeliveryHref } from "@/lib/milestones/helpers";
import { redirect } from "next/navigation";

// AR: تحاول هذه الصفحة فتح أول مرحلة مؤهلة للتسليم بدل إعادة المستخدم لقائمة الاتفاقات دون سبب.
// EN: This page resolves the first eligible milestone delivery route instead of bouncing the user back to agreements.
export default async function AgreementDeliveryPage() {
  try {
    const agreementsResponse = await getAgreements({
      status: "ACTIVE",
      page: 1,
      limit: 20,
    });

    const candidates = await Promise.all(
      agreementsResponse.data.map(async (agreement) => {
        const milestoneResponse = await getAgreementMilestones(agreement.id);

        return {
          agreementId: agreement.id,
          agreementStatus: agreement.status,
          milestones: milestoneResponse.data.milestones,
        };
      }),
    );

    const match = findFirstDeliveryRouteMatch(candidates);

    if (match) {
      redirect(buildMilestoneDeliveryHref(match.agreementId, match.milestoneId));
    }
  } catch {
    // AR: نرجع إلى صفحة الاتفاقات فقط عند تعذر تحديد مسار تسليم صالح من الخادم.
    // EN: Fall back to the agreements page only when the server cannot resolve a valid delivery route.
  }

  redirect("/agreements");
}
