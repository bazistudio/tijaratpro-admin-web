import React from 'react';
import { AppModal } from '../overlay/app-modal';
import { AppButton } from '../form/AppButton';

export interface AppConfirmDialogProps {
  title?: string;
  description?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  isDestructive?: boolean;
}

export function AppConfirmDialog({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  isDestructive = true,
}: AppConfirmDialogProps) {
  
  const handleCancel = () => {
    if (onCancel) onCancel();
    onOpenChange(false);
  };

  const footer = (
    <div className="flex w-full items-center justify-end gap-2">
      <AppButton variant="outline" onClick={handleCancel} disabled={isLoading}>
        {cancelText}
      </AppButton>
      <AppButton 
        variant={isDestructive ? "danger" : "primary"} 
        onClick={onConfirm} 
        isLoading={isLoading}
      >
        {confirmText}
      </AppButton>
    </div>
  );

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      footer={footer}
    />
  );
}
