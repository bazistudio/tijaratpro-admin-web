import { ComingSoon } from "@/components/ui/ComingSoon";
import { Package } from "lucide-react";

export default async function ProductDetailsPage({ 
  params 
}: { 
  params: Promise<{ productId: string }> 
}) {
  const { productId } = await params;
  return <ComingSoon title={`Product: ${productId}`} icon={Package} />;
}
