"use client"

import { forwardRef } from "react"
import { Input } from "@/components/ui/input"
import { HotkeyHint } from "./hotkey-hint"

interface HotkeyInputProps extends React.ComponentProps<"input"> {
  hotkey: string
  className?: string
  units?: string
}

export const HotkeyInput = forwardRef<HTMLInputElement, HotkeyInputProps>(
  ({ hotkey, className = "", units = "", ...props }, ref) => {
    return (
      <div className="relative w-full">
        <Input
          ref={ref}
          className={`w-full pr-6 font-sans ${className}`}
          {...props}
        />
        {units && <span className="font-mono absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{units}</span>}
        <HotkeyHint 
          hotkey={hotkey} 
          variant="middle-right" 
          className="top-1/2 -translate-y-1/2 text-xs text-muted-foreground"
        />
      </div>
    )
  }
)