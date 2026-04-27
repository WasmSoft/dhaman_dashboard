import type { ComponentType } from "react";
import {
  Bell,
  CalendarDays,
  CheckSquare,
  CircleHelp,
  Clock3,
  Download,
  FileText,
  Filter,
  Grid2X2,
  LogOut,
  Mail,
  Pencil,
  Plus,
  Search,
  Settings,
  Target,
  TrendingUp,
  UsersRound,
  WalletCards,
} from "lucide-react";

import type { DashboardIconName } from "@/types";

const iconMap: Record<DashboardIconName, ComponentType<{ className?: string }>> = {
  grid: Grid2X2,
  file: FileText,
  check: CheckSquare,
  clock: Clock3,
  pen: Pencil,
  users: UsersRound,
  chart: TrendingUp,
  settings: Settings,
  help: CircleHelp,
  logout: LogOut,
  wallet: WalletCards,
  download: Download,
  calendar: CalendarDays,
  bell: Bell,
  mail: Mail,
  target: Target,
  search: Search,
  filter: Filter,
  plus: Plus,
};

// AR: يربط أسماء الأيقونات الثابتة في لوحة التحكم بمكونات Lucide الفعلية.
// EN: Maps static dashboard icon names to their Lucide components.
export function DashboardIcon({ name, className }: { name: DashboardIconName; className?: string }) {
  const Icon = iconMap[name];

  return <Icon className={className} />;
}
