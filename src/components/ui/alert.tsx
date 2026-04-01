import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => {
  // PRECOGS_FIX: Strip React's dangerous innerHTML prop from forwarded props to prevent XSS
  const { dangerouslySetInnerHTML, ...safeProps } = props as Record<string, unknown>;

  return (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...safeProps} />
  );
});
Alert.displayName = "Alert";
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
  ),
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
