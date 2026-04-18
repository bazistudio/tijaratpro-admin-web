import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ComponentsDemo() {
  return (
    <div className="p-8 space-y-8 bg-background min-h-screen text-foreground">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-2">ERP Design System Demo</h1>
        <p className="text-muted-foreground">Verification of all Core UI components.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-heading">Buttons</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 items-start">
            <Button variant="default">Primary Action</Button>
            <Button variant="premium">Premium Export</Button>
            <Button variant="destructive">Delete Item</Button>
            <Button variant="secondary">Secondary Action</Button>
            <Button variant="outline">Outline Filter</Button>
            <Button variant="ghost">Ghost Cancel</Button>
            <Button loading>Saving...</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Inputs System</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input label="Full Name" placeholder="Ahmed Khan" />
            <Input type="email" label="Email Address" placeholder="admin@tijaratpro.com" required />
            <Input type="password" label="Password" placeholder="••••••••" error="Password must be at least 8 characters" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Badges & Indicators</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge variant="default" className="bg-success hover:bg-success/80">Paid</Badge>
            <Badge variant="default" className="bg-warning hover:bg-warning/80">Pending</Badge>
            <Badge variant="destructive">Low Stock</Badge>
            <Badge variant="outline" className="text-info border-info">Processing</Badge>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">Uses updated token scale.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
