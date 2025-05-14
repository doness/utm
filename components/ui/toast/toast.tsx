// components/ui/toast.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/toast/use-toast"

const ToastProvider = () => {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-0 right-0 z-[100] flex flex-col gap-2 p-4 pointer-events-none">
      {toasts.map(function ({ id, title, description, action, type = "default" }) {
        return (
          <Toast key={id} type={type}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="right-1 top-1" onClick={() => useToast().dismiss(id)}>
              <X className="h-4 w-4" />
            </ToastClose>
          </Toast>
        )
      })}
    </div>
  )
}

const Toast = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    type?: "default" | "success" | "error" | "warning" | "info"
  }
>(({ className, type = "default", ...props }, ref) => {
  const variantClasses = {
    default: "bg-background border",
    success: "bg-green-500 text-white border-green-600",
    error: "bg-destructive text-destructive-foreground border-destructive",
    warning: "bg-yellow-500 text-yellow-900 border-yellow-600",
    info: "bg-blue-500 text-white border-blue-600",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[200%] data-[swipe=move]:translate-x-[calc(var(--radix-toast-swipe-offset-x)+100%)] data-[swipe=start]:translate-x-0 data-[swipe=end]:opacity-0",
        variantClasses[type],
        className
      )}
      {...props}
    />
  )
})

Toast.displayName = "Toast"

const ToastClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 group-hover:opacity-100",
      className
    )}
    {...props}
  />
))

ToastClose.displayName = "ToastClose"

const ToastTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))

ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))

ToastDescription.displayName = "ToastDescription"

export {
  ToastProvider,
  Toast,
  ToastClose,
  ToastTitle,
  ToastDescription,
}