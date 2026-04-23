"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Search, ShoppingCart, User, CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionCard } from "@/components/ui/SectionCard";
import { Card, CardContent } from "@/components/ui/card";
import { useProductsStore } from "@/store/products.store";
import { useCustomersStore } from "@/store/customers.store";
import { useSalesStore } from "@/store/sales.store";
import { Product, Customer } from "@/types";

export default function CreateSalePage() {
  const router = useRouter();
  const { products, fetchProducts } = useProductsStore();
  const { customers, fetchCustomers } = useCustomersStore();
  const { addSale, isLoading: isSaving } = useSalesStore();

  const [cart, setCart] = React.useState<Array<{ product: Product; quantity: number }>>([]);
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    fetchProducts();
    fetchCustomers();
  }, [fetchProducts, fetchCustomers]);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: Product) => {
    if (product.currentStock <= 0) {
      toast.error("Out of stock!");
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.currentStock) {
          toast.error("Not enough stock available");
          return prev;
        }
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        if (newQty > 0 && newQty <= item.product.currentStock) {
          return { ...item, quantity: newQty };
        }
      }
      return item;
    }));
  };

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    try {
      await addSale({
        customerId: selectedCustomer?.id,
        items: cart.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        })),
        total,
        status: "completed",
        paymentMethod: "Cash"
      } as any);

      toast.success("Sale recorded successfully");
      router.push("/sales");
    } catch (error: any) {
      toast.error(error.message || "Checkout failed");
    }
  };

  return (
    <PageLayout 
      title="Point of Sale (POS)"
      breadcrumbs={<span className="flex items-center gap-2">Sales <span className="text-muted-foreground/50">/</span> New Sale</span>}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Product Selection */}
        <div className="lg:col-span-2 space-y-4">
          <SectionCard title="Select Products">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search products by name or SKU..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredProducts.map(product => (
                <Card 
                  key={product.id} 
                  className={`cursor-pointer hover:border-primary transition-colors ${product.currentStock <= 0 ? 'opacity-60 grayscale' : ''}`}
                  onClick={() => addToCart(product)}
                >
                  <CardContent className="p-3 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm line-clamp-1">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sku}</p>
                      <p className="text-primary font-bold mt-1">Rs {product.price.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${product.currentStock < 10 ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'}`}>
                        {product.currentStock} in stock
                      </span>
                      <Button size="icon" variant="ghost" className="h-8 w-8 ml-2">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Cart & Checkout */}
        <div className="space-y-4">
          <SectionCard title="Current Cart" className="h-full flex flex-col">
            
            {/* Customer Selection */}
            <div className="mb-6">
               <label className="text-xs font-medium text-muted-foreground mb-1 block">Customer / Party</label>
               <select 
                className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm focus:ring-1 focus:ring-primary outline-none"
                onChange={(e) => setSelectedCustomer(customers.find(c => c.id === e.target.value) || null)}
               >
                 <option value="">Walk-in Customer</option>
                 {customers.map(c => (
                   <option key={c.id} value={c.id}>{c.name}</option>
                 ))}
               </select>
            </div>

            {/* Cart Items */}
            <div className="flex-1 space-y-3 min-h-[300px]">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-40">
                  <ShoppingCart className="h-12 w-12 mb-2" />
                  <p className="text-sm">Cart is empty</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.product.id} className="flex items-center justify-between border-b pb-3 border-dashed last:border-0">
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Button variant="outline" size="icon" className="h-5 w-5" onClick={() => updateQuantity(item.product.id, -1)}>-</Button>
                        <span className="text-xs font-bold">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-5 w-5" onClick={() => updateQuantity(item.product.id, 1)}>+</Button>
                        <span className="text-[10px] text-muted-foreground">x Rs {item.product.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">Rs {(item.product.price * item.quantity).toLocaleString()}</p>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeFromCart(item.product.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Summary */}
            <div className="mt-6 pt-4 border-t space-y-4">
               <div className="flex justify-between items-center text-lg font-bold">
                 <span>Total Bill</span>
                 <span className="text-primary">Rs {total.toLocaleString()}</span>
               </div>

               <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="w-full" onClick={() => setCart([])}>Clear</Button>
                  <Button className="w-full" disabled={isSaving || cart.length === 0} onClick={handleCheckout}>
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="mr-2 h-4 w-4" />}
                    Checkout
                  </Button>
               </div>
            </div>
          </SectionCard>
        </div>

      </div>
    </PageLayout>
  );
}
