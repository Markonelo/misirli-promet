"use client";
import React, { forwardRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  label?: string;
  onClick?(): void;
  className?: string;
  icon?: React.ReactNode;
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ label = "Generate", onClick, className, icon }, ref) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200);
      onClick?.();
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        className={cn("glow-btn", className)}
        onClick={handleClick}
        data-state={isClicked ? "clicked" : undefined}
      >
        <span className="flex items-center justify-center gap-1.5">
          {label}
          {icon ?? <Sparkles size={16} className="ml-0.5" />}
        </span>
      </button>
    );
  }
);

GlowButton.displayName = "GlowButton";

// Keep the original export name for drop-in demo compatibility.
export const Component = GlowButton;
