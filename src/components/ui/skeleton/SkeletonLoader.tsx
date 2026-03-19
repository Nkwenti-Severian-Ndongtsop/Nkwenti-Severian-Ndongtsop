import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton = ({ 
  className = '', 
  variant = 'default',
  animation = 'pulse'
}: SkeletonProps) => {
  const variantClasses = {
    default: 'rounded-md',
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-none'
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer bg-gradient-to-r from-transparent via-muted to-transparent bg-[length:200%_100%]',
    none: ''
  };

  return (
    <div
      className={cn(
        'bg-muted',
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
    />
  );
};

// Card Skeleton for project cards
export const CardSkeleton = () => (
  <div className="rounded-lg border border-border bg-card p-6 space-y-4">
    <Skeleton className="h-48 w-full rounded-lg" />
    <div className="space-y-2">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
    <div className="flex gap-2 pt-2">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-8 w-24" />
    </div>
  </div>
);

// Tech Stack Skeleton
export const TechStackSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="p-4 border border-border rounded-lg space-y-3">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <Skeleton className="h-2 w-full" />
      </div>
    ))}
  </div>
);

// Profile Skeleton
export const ProfileSkeleton = () => (
  <div className="flex flex-col md:flex-row items-center gap-8 p-8">
    <div className="flex-shrink-0">
      <Skeleton className="w-64 h-64 md:w-80 md:h-80 rounded-full" />
    </div>
    <div className="flex-1 space-y-4 text-center md:text-left">
      <Skeleton className="h-8 w-48 mx-auto md:mx-0" />
      <Skeleton className="h-4 w-full max-w-2xl" />
      <Skeleton className="h-4 w-full max-w-xl" />
      <div className="flex gap-3 justify-center md:justify-start pt-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  </div>
);

// Navigation Skeleton
export const NavSkeleton = () => (
  <div className="flex items-center justify-between p-4 border-b border-border">
    <Skeleton className="h-8 w-32" />
    <div className="hidden md:flex items-center space-x-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-16" />
      ))}
    </div>
    <Skeleton className="h-8 w-8 rounded-full" />
  </div>
);

export default Skeleton;
