import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva(
  "animate-spin rounded-full border-solid border-current border-r-transparent",
  {
    variants: {
      size: {
        sm: "h-4 w-4 border-2",
        default: "h-6 w-6 border-2",
        lg: "h-8 w-8 border-[3px]",
        xl: "h-12 w-12 border-4",
      },
      variant: {
        default: "text-primary",
        secondary: "text-secondary-foreground",
        muted: "text-muted-foreground",
        destructive: "text-destructive",
        success: "text-green-600",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  },
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  /**
   * Optional text to display alongside the spinner
   */
  text?: string;
  /**
   * Layout mode for the spinner
   * - inline: Spinner and text side by side (default)
   * - centered: Spinner and text centered in container
   * - stacked: Spinner above text, both centered
   */
  layout?: "inline" | "centered" | "stacked";
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, variant, text, layout = "inline", ...props }, ref) => {
    const spinnerElement = (
      <div
        ref={ref}
        className={cn(spinnerVariants({ size, variant, className }))}
        {...props}
      />
    );

    if (!text) {
      return spinnerElement;
    }

    const textElement = (
      <span className="text-sm text-muted-foreground">{text}</span>
    );

    switch (layout) {
      case "centered":
        return (
          <div className="flex items-center justify-center gap-2">
            {spinnerElement}
            {textElement}
          </div>
        );
      case "stacked":
        return (
          <div className="flex flex-col items-center justify-center gap-2">
            {spinnerElement}
            {textElement}
          </div>
        );
      case "inline":
      default:
        return (
          <div className="flex items-center gap-2">
            {spinnerElement}
            {textElement}
          </div>
        );
    }
  },
);

Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };
