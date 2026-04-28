import { PortalNavBar } from "@/components/client-portal/PortalNavBar";


export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PortalNavBar>
    {children}
  </PortalNavBar>
}
