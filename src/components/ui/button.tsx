import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const variants = {
      default: "bg-clinic-forest text-white hover:bg-clinic-forest/90 shadow",
      outline: "border border-clinic-forest text-clinic-forest hover:bg-clinic-forest/10",
      ghost: "hover:bg-clinic-sage/20 text-clinic-forest",
      link: "text-clinic-forest underline-offset-4 hover:underline",
    }

    const sizes = {
      default: "h-11 px-6 py-2",
      sm: "h-9 rounded-md px-3 text-sm",
      lg: "h-14 rounded-md px-8 text-lg",
      icon: "h-10 w-10",
    }

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }