import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  // Remove/ignore dangerous props that could lead to XSS when forwarded to the DOM
  const { dangerouslySetInnerHTML, ...safeProps } = props as Record<string, any>; // PRECOGS_FIX: strip dangerouslySetInnerHTML to prevent XSS

  if (dangerouslySetInnerHTML) {
    // Non-blocking developer notice in dev environments
    try {
      if (process && process.env && process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn(
          "Checkbox: dangerouslySetInnerHTML prop has been ignored for security reasons.",
        );
      }
    } catch (e) {
      /* swallow errors in environments without process */
    }
  }

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...safeProps} // PRECOGS_FIX: forward only sanitized/filtered props, not the original props object
    >
      <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
