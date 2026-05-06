import { PageHeader } from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";

export default function SettingsPage() {
  return (
    <Container className="py-8">
      <PageHeader 
        title="Settings" 
        subtitle="Configure your application preferences."
      />
      <div className="border-2 border-dashed border-border rounded-xl p-12 text-center text-muted-foreground">
        Settings management is coming soon.
      </div>
    </Container>
  );
}
