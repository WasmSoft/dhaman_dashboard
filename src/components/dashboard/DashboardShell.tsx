"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";
import { Bell, CircleHelp, Mail, Menu, Search, Shield } from "lucide-react";

import { Button } from "@/components/shared";
import { Input } from "@/components/shared/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/shared/sidebar";
import { dashboardContent } from "@/constants";
import { cn } from "@/lib/utils";

import { DashboardIcon } from "./DashboardIcon";

function DashboardSidebar() {
  const { dashboard } = dashboardContent;

  return (
    <Sidebar
      side="right"
      collapsible="icon"
      className="border-s border-[#1d2135] bg-[#101323] text-[#a7aecb] [&_[data-slot=sidebar-inner]]:bg-[#101323]"
    >
      <SidebarHeader className="h-[70.8px] justify-center border-b border-[#1d2135] px-[18px] py-2">
        <div className="flex w-full items-center justify-start gap-[10px] text-white">
          <div className="grid size-[34px] place-items-center rounded-[11px] bg-violet-500 text-white shadow-[0_0_24px_rgba(124,88,255,0.5)]">
            <Shield className="size-[18px]" fill="currentColor" />
          </div>
          <strong className="text-[15px] font-bold leading-none group-data-[collapsible=icon]:hidden">{dashboard.brandName}</strong>
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-1 px-0 py-0">
        {/* AR: الشريط الجانبي يعيش في layout حتى تشترك كل صفحات لوحة التحكم في نفس الإطار. EN: The sidebar lives in layout so every dashboard page shares the same chrome. */}
        {dashboard.navGroups.map((group, index) => (
          <SidebarGroup
            key={group.label}
            className={cn("px-[18px] pb-2 pt-[18px]", index > 0 && "mt-2 border-t border-[#1d2135]")}
          >
            <SidebarGroupLabel className="mb-1 h-[15px] justify-start px-0 text-[11px] font-bold leading-none tracking-[0.02em] text-[#58607c]">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={"active" in item ? item.active : false}
                      tooltip={item.label}
                      className={cn(
                        "h-[39px] w-[193.2px] rounded-[10px] px-3 text-[13px] font-medium leading-none text-[#a7aecb] hover:bg-[#24204f] hover:text-white data-[active=true]:bg-[#24204f] data-[active=true]:text-white group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:px-2",
                        "active" in item && item.active && "shadow-[inset_0_0_0_1px_rgba(124,88,255,0.1)]",
                      )}
                    >
                      <Link href={item.href}>
                        <DashboardIcon name={item.icon} className="size-4 text-[#8790ad]" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                    {"badge" in item && item.badge ? (
                      <SidebarMenuBadge className="start-3 end-auto top-[9.7px] size-[19.6px] rounded-full bg-violet-500 px-0 text-[11px] font-bold leading-none text-white">
                        {item.badge}
                      </SidebarMenuBadge>
                    ) : null}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <div className="mx-[15px] mb-5 mt-auto hidden h-[53.5px] w-[201.2px] items-center justify-center rounded-[10px] bg-gradient-to-l from-violet-600 to-violet-400 text-white shadow-[0_18px_38px_rgba(111,82,255,0.28)] group-data-[collapsible=icon]:hidden md:flex">
        <div className="text-[22px] leading-none">⚡</div>
      </div>
      <SidebarRail />
    </Sidebar>
  );
}

function DashboardHeader() {
  const { dashboard } = dashboardContent;

  return (
    <header className="sticky top-0 z-20 flex min-h-14 items-center gap-3 border-b border-[#252a42] bg-[#101323]/95 px-4 backdrop-blur md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger className="size-[34px] rounded-[10px] border border-[#252a42] bg-[#1d2135] text-[#a7aecb] hover:bg-[#262b49] hover:text-white">
          <Menu className="size-4" />
        </SidebarTrigger>

        <div className="relative w-[min(320px,calc(100vw-7rem))]" dir="ltr">
          <Input
            aria-label={dashboard.searchPlaceholder}
            placeholder={dashboard.searchPlaceholder}
            className="h-[37px] rounded-[10px] border-[#252a42] bg-[#1d2135] ps-9 pe-12 text-right text-[13px] text-white placeholder:text-[#636b8a] focus-visible:ring-violet-500/20"
            dir="rtl"
          />
          <Search className="pointer-events-none absolute end-3 top-1/2 size-3.5 -translate-y-1/2 text-[#636b8a]" />
          <kbd className="absolute start-2 top-1/2 hidden -translate-y-1/2 rounded-md bg-[#111526] px-2 py-1 text-[10px] text-[#747b99] sm:block">
            ⌘ K
          </kbd>
        </div>
      </div>

      <div className="ms-auto flex items-center gap-2">
        <Button size="icon" variant="secondary" className="size-[34px] rounded-[10px] border border-[#252a42] bg-[#1d2135] text-[#a7aecb] hover:bg-[#262b49] hover:text-white">
          <CircleHelp className="size-[15px]" />
        </Button>
        <Button size="icon" variant="secondary" className="size-[34px] rounded-[10px] border border-[#252a42] bg-[#1d2135] text-[#a7aecb] hover:bg-[#262b49] hover:text-white">
          <Mail className="size-[15px]" />
        </Button>
        <Button size="icon" variant="secondary" className="relative size-[34px] rounded-[10px] border border-[#252a42] bg-[#1d2135] text-[#a7aecb] hover:bg-[#262b49] hover:text-white">
          <Bell className="size-[15px]" />
          <span className="absolute end-2 top-2 size-1.5 rounded-full bg-violet-400" />
        </Button>
        <div className="grid size-[34px] place-items-center rounded-full bg-blue-500 text-sm font-bold text-white">ح</div>
      </div>
    </header>
  );
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <SidebarProvider
      defaultOpen
      open={open}
      onOpenChange={setOpen}
      dir="rtl"
      className="dark min-h-screen bg-[#0f1220] text-start text-white"
      style={{ "--sidebar-width": "14.375rem", "--sidebar-width-icon": "4.25rem" } as CSSProperties}
    >
      <DashboardSidebar />
      <SidebarInset className="min-w-0 bg-[#0f1220] text-white">
        <DashboardHeader />
        <main className="w-full px-4 py-6 md:px-[32.8px] md:py-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
