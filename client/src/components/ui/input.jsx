// input.jsx
import React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };