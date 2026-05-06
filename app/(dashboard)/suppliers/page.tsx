import { PageHeader } from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";

export default function SuppliersPage() {
  return (
    <Container className="py-8">
      <PageHeader 
        title="Suppliers" 
        subtitle="Manage your vendor and supplier list."
      />
      <div className="border-2 border-dashed border-border rounded-xl p-12 text-center text-muted-foreground">
        Supplier management is coming soon.
      </div>
    </Container>
  );
}
