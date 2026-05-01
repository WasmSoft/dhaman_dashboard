import { ClientProfileSection } from "@/components/clients";

type ClientProfilePageProps = {
  params: { id: string };
};

export default function ClientProfilePage({ params }: ClientProfilePageProps) {
  const { id } = params;

  return <ClientProfileSection clientId={id} />;
}
