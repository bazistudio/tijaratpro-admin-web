"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MarketingButton from "@/components/ui/MarketingButton";
import { leadService } from "@/services/lead.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const EarlyAccessModal = ({ isOpen, onClose, title = "Get Early Access" }: EarlyAccessModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    shopName: '',
    city: '',
    businessType: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await leadService.submitLead(formData);
      toast.success("Request submitted successfully! We will contact you soon.");
      onClose();
      setFormData({
        name: '',
        phone: '',
        shopName: '',
        city: '',
        businessType: '',
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to submit request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-h2 text-[#003049]">{title}</DialogTitle>
          <DialogDescription>
            Join the waitlist and get 1-month free trial when we launch.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              placeholder="e.g. Ahmed Ali" 
              required 
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">WhatsApp Phone Number</Label>
            <Input 
              id="phone" 
              placeholder="e.g. 0332XXXXXXX" 
              required 
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shopName">Shop/Business Name</Label>
            <Input 
              id="shopName" 
              placeholder="e.g. Ali General Store" 
              required 
              value={formData.shopName}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                placeholder="e.g. Lahore" 
                required 
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Input 
                id="businessType" 
                placeholder="e.g. Mobile Shop" 
                required 
                value={formData.businessType}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="pt-4">
            <MarketingButton 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Reserve My Spot"
              )}
            </MarketingButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EarlyAccessModal;
