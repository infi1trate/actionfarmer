import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

// Card Skeleton
interface CardSkeletonProps {
  showImage?: boolean;
  showActions?: boolean;
  lines?: number;
  className?: string;
}

export function CardSkeleton({ 
  showImage = false, 
  showActions = false, 
  lines = 2,
  className 
}: CardSkeletonProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-surface p-4 space-y-4", className)}>
      {showImage && <Skeleton className="h-32 w-full rounded-lg" />}
      <div className="space-y-3">
        <Skeleton className="h-5 w-3/4" />
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className={cn("h-4", i === lines - 1 ? "w-1/2" : "w-full")} />
        ))}
      </div>
      {showActions && (
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 w-20 rounded-lg" />
          <Skeleton className="h-9 w-20 rounded-lg" />
        </div>
      )}
    </div>
  );
}

// Stat Card Skeleton
export function StatCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border bg-surface p-4 space-y-3", className)}>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

// List Skeleton
interface ListSkeletonProps {
  rows?: number;
  showAvatar?: boolean;
  showAction?: boolean;
  className?: string;
}

export function ListSkeleton({ 
  rows = 5, 
  showAvatar = true, 
  showAction = false,
  className 
}: ListSkeletonProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-lg">
          {showAvatar && <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          {showAction && <Skeleton className="h-8 w-16 rounded-lg flex-shrink-0" />}
        </div>
      ))}
    </div>
  );
}

// Table Skeleton
interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  className?: string;
}

export function TableSkeleton({ 
  rows = 5, 
  columns = 4, 
  showHeader = true,
  className 
}: TableSkeletonProps) {
  return (
    <div className={cn("rounded-xl border border-border overflow-hidden", className)}>
      {showHeader && (
        <div className="flex gap-4 p-4 bg-muted/50 border-b border-border">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>
      )}
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4 p-4">
            {Array.from({ length: columns }).map((_, j) => (
              <Skeleton key={j} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Chart Skeleton
interface ChartSkeletonProps {
  type?: "line" | "bar" | "pie";
  className?: string;
}

export function ChartSkeleton({ type = "line", className }: ChartSkeletonProps) {
  if (type === "pie") {
    return (
      <div className={cn("flex items-center justify-center p-8", className)}>
        <Skeleton className="h-40 w-40 rounded-full" />
      </div>
    );
  }

  if (type === "bar") {
    return (
      <div className={cn("p-4 space-y-4", className)}>
        <div className="flex items-end gap-2 h-32">
          {[60, 80, 45, 90, 70, 55, 85].map((height, i) => (
            <Skeleton key={i} className="flex-1 rounded-t" style={{ height: `${height}%` }} />
          ))}
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-3 flex-1" />
          ))}
        </div>
      </div>
    );
  }

  // Line chart
  return (
    <div className={cn("p-4 space-y-4", className)}>
      <div className="flex gap-4 mb-4">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="relative h-32">
        <Skeleton className="absolute bottom-0 left-0 right-0 h-px" />
        <Skeleton className="absolute top-0 bottom-0 left-0 w-px" />
        <svg className="w-full h-full" viewBox="0 0 200 80">
          <path
            d="M0,60 Q50,20 100,40 T200,30"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted animate-pulse"
          />
        </svg>
      </div>
    </div>
  );
}

// Profile Skeleton
export function ProfileSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Skeleton className="h-16 w-16 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

// Page Skeleton (full page layout)
export function PageSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-8 p-6", className)}>
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
      
      {/* Content */}
      <div className="grid md:grid-cols-2 gap-6">
        <CardSkeleton showImage lines={3} />
        <ListSkeleton rows={4} />
      </div>
    </div>
  );
}
