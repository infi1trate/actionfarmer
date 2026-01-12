import * as React from "react";
import { 
  Inbox, 
  Search, 
  WifiOff, 
  Users, 
  Bell, 
  FolderOpen,
  Zap,
  Plus,
  type LucideIcon 
} from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { SuccessState } from "@/components/ui/success-state";

// ============================================
// EMPTY STATE TEMPLATES
// ============================================

interface EmptyTemplateProps {
  onAction?: () => void;
  onSecondary?: () => void;
  className?: string;
}

// No devices connected
export function EmptyDevices({ onAction, className }: EmptyTemplateProps) {
  return (
    <EmptyState
      icon={Zap}
      title="No devices yet"
      description="Connect your first DePIN device to start earning rewards."
      action={onAction ? { label: "Add Device", onClick: onAction, icon: Plus } : undefined}
      className={className}
    />
  );
}

// No search results
export function EmptySearchResults({ onAction, className }: EmptyTemplateProps) {
  return (
    <EmptyState
      icon={Search}
      title="No results found"
      description="Try adjusting your search or filters."
      action={onAction ? { label: "Clear filters", onClick: onAction } : undefined}
      className={className}
    />
  );
}

// No notifications
export function EmptyNotifications({ className }: EmptyTemplateProps) {
  return (
    <EmptyState
      icon={Bell}
      title="All caught up!"
      description="You have no new notifications."
      size="sm"
      className={className}
    />
  );
}

// No team members
export function EmptyTeam({ onAction, className }: EmptyTemplateProps) {
  return (
    <EmptyState
      icon={Users}
      title="Build your team"
      description="Invite others to collaborate on your DePIN network."
      action={onAction ? { label: "Invite Member", onClick: onAction, icon: Plus } : undefined}
      className={className}
    />
  );
}

// Empty inbox/messages
export function EmptyInbox({ className }: EmptyTemplateProps) {
  return (
    <EmptyState
      icon={Inbox}
      title="Inbox zero"
      description="You're all caught up. Nice work!"
      size="sm"
      className={className}
    />
  );
}

// No files/documents
export function EmptyFiles({ onAction, className }: EmptyTemplateProps) {
  return (
    <EmptyState
      icon={FolderOpen}
      title="No files yet"
      description="Upload your first file to get started."
      action={onAction ? { label: "Upload", onClick: onAction, icon: Plus } : undefined}
      className={className}
    />
  );
}

// Offline state
export function EmptyOffline({ onAction, className }: EmptyTemplateProps) {
  return (
    <EmptyState
      icon={WifiOff}
      title="You're offline"
      description="Check your connection and try again."
      action={onAction ? { label: "Retry", onClick: onAction } : undefined}
      className={className}
    />
  );
}

// ============================================
// ERROR STATE TEMPLATES
// ============================================

interface ErrorTemplateProps {
  onRetry?: () => void;
  onGoBack?: () => void;
  onGoHome?: () => void;
  onContact?: () => void;
  isRetrying?: boolean;
  className?: string;
}

// Generic error
export function ErrorGeneric({ onRetry, onGoBack, isRetrying, className }: ErrorTemplateProps) {
  return (
    <ErrorState
      variant="generic"
      title="Oops, something went wrong"
      description="We're looking into it. Please try again."
      onRetry={onRetry}
      onGoBack={onGoBack}
      isRetrying={isRetrying}
      className={className}
    />
  );
}

// Network error
export function ErrorNetwork({ onRetry, isRetrying, className }: ErrorTemplateProps) {
  return (
    <ErrorState
      variant="network"
      title="Connection lost"
      description="Check your internet connection and try again."
      onRetry={onRetry}
      isRetrying={isRetrying}
      className={className}
    />
  );
}

// Server error
export function ErrorServer({ onRetry, onContact, isRetrying, className }: ErrorTemplateProps) {
  return (
    <ErrorState
      variant="server"
      title="Service unavailable"
      description="We're experiencing issues. Please try again in a few minutes."
      onRetry={onRetry}
      onContact={onContact}
      isRetrying={isRetrying}
      showContact
      className={className}
    />
  );
}

// Permission error
export function ErrorPermission({ onGoBack, onGoHome, className }: ErrorTemplateProps) {
  return (
    <ErrorState
      variant="permission"
      title="Access denied"
      description="You don't have permission to view this page."
      onGoBack={onGoBack}
      onGoHome={onGoHome}
      className={className}
    />
  );
}

// Not found error
export function ErrorNotFound({ onGoBack, onGoHome, className }: ErrorTemplateProps) {
  return (
    <ErrorState
      variant="notFound"
      title="Page not found"
      description="The page you're looking for doesn't exist."
      onGoBack={onGoBack}
      onGoHome={onGoHome}
      className={className}
    />
  );
}

// ============================================
// SUCCESS STATE TEMPLATES
// ============================================

interface SuccessTemplateProps {
  onPrimary?: () => void;
  onSecondary?: () => void;
  className?: string;
}

// Device connected
export function SuccessDeviceConnected({ onPrimary, className }: SuccessTemplateProps) {
  return (
    <SuccessState
      variant="celebration"
      title="Device connected!"
      description="Your device is now synced and earning rewards."
      primaryAction={onPrimary ? { label: "View Dashboard", onClick: onPrimary } : undefined}
      className={className}
    />
  );
}

// Payment successful
export function SuccessPayment({ onPrimary, onSecondary, className }: SuccessTemplateProps) {
  return (
    <SuccessState
      variant="default"
      title="Payment successful"
      description="Your transaction has been processed."
      primaryAction={onPrimary ? { label: "View Receipt", onClick: onPrimary } : undefined}
      secondaryAction={onSecondary ? { label: "Done", onClick: onSecondary } : undefined}
      className={className}
    />
  );
}

// Account created
export function SuccessAccountCreated({ onPrimary, className }: SuccessTemplateProps) {
  return (
    <SuccessState
      variant="celebration"
      title="Welcome aboard!"
      description="Your account is ready. Let's get started."
      primaryAction={onPrimary ? { label: "Continue", onClick: onPrimary } : undefined}
      className={className}
    />
  );
}

// Settings saved
export function SuccessSettingsSaved({ onPrimary, className }: SuccessTemplateProps) {
  return (
    <SuccessState
      variant="subtle"
      title="Settings saved"
      description="Your changes have been applied."
      primaryAction={onPrimary ? { label: "Done", onClick: onPrimary } : undefined}
      size="sm"
      className={className}
    />
  );
}

// Invite sent
export function SuccessInviteSent({ onPrimary, className }: SuccessTemplateProps) {
  return (
    <SuccessState
      variant="default"
      title="Invite sent!"
      description="They'll receive an email with your invitation."
      primaryAction={onPrimary ? { label: "Invite Another", onClick: onPrimary } : undefined}
      className={className}
    />
  );
}

// Withdrawal requested
export function SuccessWithdrawal({ onPrimary, className }: SuccessTemplateProps) {
  return (
    <SuccessState
      variant="default"
      title="Withdrawal requested"
      description="Funds will arrive in 1-3 business days."
      primaryAction={onPrimary ? { label: "Track Status", onClick: onPrimary } : undefined}
      className={className}
    />
  );
}
