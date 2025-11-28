"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { useHasActiveSubscription } from "@/features/subscription/hooks/use-subscription";
import { toast } from "sonner";
import { Loader2, Crown, Check } from "lucide-react";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const features = [
  "Unlimited workflows",
  "Advanced automation tools",
  "Priority support",
  "Team collaboration",
  "API access",
  "Custom integrations",
  "Analytics dashboard",
  "Export capabilities"
];

export const UpgradeModal = ({ open, onOpenChange }: UpgradeModalProps) => {
  const [isUpgrading, setIsUpgrading] = useState(false);
  const { hasActiveSubscription } = useHasActiveSubscription();

  const handleUpgrade = async () => {
    try {
      setIsUpgrading(true);
      
      // Note: This will need to be implemented when POLAR_ACCESS_TOKEN is configured
      // For now, we'll simulate the checkout process
      
      // Uncomment when Polar is configured:
      // const { data, error } = await authClient.checkout({ slug: "pro" });
      // if (error) {
      //   throw new Error(error.message);
      // }
      // if (data?.url) {
      //   window.location.href = data.url;
      // }
      
      // Temporary mock implementation
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Redirecting to checkout...");
      
      // Simulate opening a checkout page
      console.log("Opening checkout for Pro subscription");
      
      onOpenChange(false);
    } catch (error) {
      console.error("Upgrade failed:", error);
      toast.error("Failed to initiate upgrade. Please try again.");
    } finally {
      setIsUpgrading(false);
    }
  };

  // Don't show modal if user already has active subscription
  if (hasActiveSubscription) {
    return null;
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Crown className="h-12 w-12 text-yellow-500" />
              <div className="absolute -top-2 -right-2">
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  PRO
                </Badge>
              </div>
            </div>
          </div>
          <AlertDialogTitle className="text-center text-xl">
            Upgrade to Pro
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            You need an active subscription to perform this action. Upgrade to
            Pro to unlock all features.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Card className="my-4">
          <CardContent className="p-4">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold">$9.99</div>
              <div className="text-sm text-muted-foreground">per month</div>
            </div>
            
            <div className="space-y-2">
              {features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
              <div className="text-center pt-2">
                <span className="text-xs text-muted-foreground">
                  +{features.length - 4} more features
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
          <AlertDialogAction 
            onClick={handleUpgrade}
            disabled={isUpgrading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isUpgrading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Upgrade Now"
            )}
          </AlertDialogAction>
          <AlertDialogCancel className="w-full" disabled={isUpgrading}>
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Hook to use the upgrade modal

