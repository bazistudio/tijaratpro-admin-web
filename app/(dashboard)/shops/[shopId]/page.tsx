import { ComingSoon } from "@/components/ui/ComingSoon";
import { Store } from "lucide-react";

export default async function ShopDetailsPage({ 
  params 
}: { 
  params: Promise<{ shopId: string }> 
}) {
  const { shopId } = await params;
  return <ComingSoon title={`Shop: ${shopId}`} icon={Store} />;
}
