import type { DashboardContentMap } from "@/types";

export const dashboardContent = {
  dashboard: {
    brandName: "Dhaman",
    greeting: "مرحباً 👋",
    subtitle: "تابع اتفاقاتك، مدفوعاتك، ومراجعات الذكاء الاصطناعي",
    currentDate: "الأحد، 26 أبريل 2026",
    searchPlaceholder: "بحث...",
    navGroups: [
      {
        label: "القائمة الرئيسية",
        items: [
          { label: "لوحة التحكم", href: "/dashboard", icon: "grid" },
          { label: "الاتفاقات", href: "/agreements", icon: "file", badge: "24" },
          { label: "التسليمات", href: "/deliveries", icon: "check" },
          { label: "الدفعات", href: "/payments", icon: "clock" },
        ],
      },
      {
        label: "الأدوات",
        items: [
          { label: "مراجعات AI", href: "/ai-reviews", icon: "pen", badge: "3" },
          { label: "العملاء", href: "/clients", icon: "users" },
          { label: "التقارير", href: "/reports", icon: "chart" },
        ],
      },
      {
        label: "عام",
        items: [
          { label: "الإعدادات", href: "/settings", icon: "settings" },
          { label: "المساعدة", href: "/help", icon: "help" },
          { label: "تسجيل الخروج", href: "/logout", icon: "logout" },
        ],
      },
    ],
    metrics: [
      { key: "protected", label: "إجمالي المبالغ المحمية", value: "$12,450.00", trend: "+18%", trendTone: "positive", icon: "wallet" },
      { key: "paid", label: "الدفعات المصروفة", value: "$7,820.00", trend: "-2.1%", trendTone: "negative", icon: "download" },
      { key: "active", label: "الاتفاقات النشطة", value: "8", trend: "+4.5%", trendTone: "positive", icon: "file" },
    ],
    chartBars: [
      { month: "ديسمبر", value: 10 },
      { month: "نوفمبر", value: 17 },
      { month: "أكتوبر", value: 25 },
      { month: "سبتمبر", value: 34 },
      { month: "أغسطس", value: 86, label: "$84,849.93", active: true },
      { month: "يوليو", value: 47 },
      { month: "يونيو", value: 57 },
      { month: "مايو", value: 45 },
      { month: "أبريل", value: 52 },
      { month: "مارس", value: 33 },
      { month: "فبراير", value: 40 },
      { month: "يناير", value: 29 },
    ],
    agreements: [
      { id: "1", title: "تصميم صفحة هبوط", code: "AGR-00078", amount: "$450", status: "نشط", statusTone: "success", emoji: "🖥" },
      { id: "2", title: "تطوير لوحة تحكم", code: "AGR-00077", amount: "$1,800", status: "مراجعة AI", statusTone: "purple", emoji: "💻" },
      { id: "3", title: "هوية بصرية", code: "AGR-00076", amount: "$620", status: "جاهزة للصرف", statusTone: "blue", emoji: "🎨" },
      { id: "4", title: "موقع تعريفي", code: "AGR-00075", amount: "$950", status: "مسودة", statusTone: "muted", emoji: "🌐" },
    ],
    reviews: [
      { title: "تطوير لوحة تحكم", description: "فحص بنود الاتفاق", progress: 62, tone: "purple", icon: "file" },
      { title: "هوية بصرية", description: "مراجعة الجدول الزمني", progress: 40, tone: "amber", icon: "clock" },
      { title: "تصميم صفحة هبوط", description: "مكتمل — جاهز للصرف", progress: 100, tone: "emerald", icon: "check" },
    ],
    transactions: [
      { title: "تصميم صفحة هبوط", description: "الأحد، 26 أبريل 2026", date: "26 أبريل 2026", amount: "$450.00", status: "مكتمل ✓", statusTone: "success", emoji: "🖥" },
      { title: "تطوير لوحة تحكم", description: "السبت، 25 أبريل 2026", date: "25 أبريل 2026", amount: "$1,800.00", status: "مراجعة AI", statusTone: "purple", emoji: "💻" },
      { title: "هوية بصرية", description: "الجمعة، 24 أبريل 2026", date: "24 أبريل 2026", amount: "$620.00", status: "جاهزة للصرف", statusTone: "blue", emoji: "🎨" },
    ],
  },
} as const satisfies DashboardContentMap;
