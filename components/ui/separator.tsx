// components/ui/separator.tsx
import * as React from "react"
import { Separator } from "ui"

export function Separator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="separator"
      className={cn("h-[1px] w-full bg-border my-6", className)}
      {...props}
    />
  )
}