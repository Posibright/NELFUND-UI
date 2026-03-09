import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "./utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-bold transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none h-12 px-8 py-2 rounded-full cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-emerald-700 text-white hover:bg-emerald-800 shadow-lg shadow-emerald-200",
        outline:
          "border border-neutral-200 bg-transparent hover:bg-neutral-50 text-neutral-700 hover:border-emerald-600",
        ghost: "bg-transparent hover:bg-neutral-100 text-neutral-700",
      },
      size: {
        default: "h-12 px-8 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
