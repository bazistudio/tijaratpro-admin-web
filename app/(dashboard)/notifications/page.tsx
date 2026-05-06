import { PageHeader } from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";

export default function NotificationsPage() {
  return (
    <Container className="py-8">
      <PageHeader 
        title="Notifications" 
        subtitle="Stay updated with your latest alerts."
      />
      <div className="border-2 border-dashed border-border rounded-xl p-12 text-center text-muted-foreground">
        Notifications center is coming soon.
      </div>
    </Container>
  );
}
