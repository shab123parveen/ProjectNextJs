import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
        success:
          "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
        warning:
          "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
        error:
          "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
        info:
          "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
        purple:
          "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
        outline:
          "border border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
