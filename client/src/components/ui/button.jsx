// button.jsx
import React from "react";
import { cn } from "../../lib/utils";

const Button = ({ className, variant = "primary", ...props }) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md text-white font-medium transition duration-200",
        variant === "primary" ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 hover:bg-gray-700",
        className
      )}
      {...props}
    />
  );
};

export { Button };
