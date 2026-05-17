import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-green text-white shadow-soft hover:shadow-green hover:scale-105 active:scale-95",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-soft hover:shadow-lg hover:scale-105 active:scale-95",
        outline:
          "border-2 border-dark-200 bg-white text-dark-700 shadow-soft hover:bg-dark-50 hover:border-primary-300 hover:text-primary-600 hover:scale-105 active:scale-95",
        secondary:
          "bg-dark-100 text-dark-700 shadow-soft hover:bg-dark-200 hover:scale-105 active:scale-95",
        ghost:
          "text-dark-700 hover:bg-dark-100 hover:text-primary-600 hover:scale-105 active:scale-95",
        link: "text-primary-600 underline-offset-4 hover:underline hover:text-primary-700",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-lg gap-1.5 px-3 text-xs has-[>svg]:px-2.5",
        lg: "h-12 rounded-xl px-6 text-base has-[>svg]:px-4",
        icon: "size-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
