import { cn } from "@/lib/utils";

export function Skeleton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={cn("animate-pulse rounded-lg bg-gray-200 dark:bg-dark-3", className)} style={style} />
  );
}
