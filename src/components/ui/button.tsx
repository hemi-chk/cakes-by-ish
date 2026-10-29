import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Variants follow DESIGN_SPEC.md §5.1 / §10.2.
const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-[4px] text-[13px] font-bold uppercase leading-none tracking-[0.12em] transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cocoa disabled:cursor-not-allowed disabled:opacity-45 disabled:active:scale-100 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:stroke-[1.8]",
  {
    variants: {
      variant: {
        default: "bg-rose text-white hover:bg-rose-hover active:bg-rose-pressed",
        outline: "border-[1.5px] border-rose bg-transparent text-rose-text hover:bg-blush-mist",
        soft: "bg-blush-soft text-[#6E3540] hover:bg-[#E2B3BA]",
        cream: "bg-white-choc text-[#7A2E48] hover:bg-white",
        creamFlour: "rounded-lg bg-events-button text-[#7A2E48] shadow-flour hover:bg-white",
        pill: "rounded-full border-[1.5px] border-line-strong bg-transparent text-[15px] font-medium normal-case tracking-normal text-cocoa hover:bg-blush-mist",
        pillCream: "rounded-full bg-white-choc text-[15px] font-bold normal-case tracking-normal text-cocoa hover:bg-white",
        link: "h-12 px-0 text-[15px] font-medium normal-case tracking-normal text-rose-text underline underline-offset-4 hover:text-[#6E3540]",
        ghost: "text-cocoa hover:bg-blush-mist",
      },
      size: {
        default: "h-12 px-7",
        nav: "h-11 px-[22px]",
        lg: "h-[52px] px-[34px]",
        icon: "size-11 px-0",
      },
    },
    compoundVariants: [
      { variant: "outline", size: "default", className: "px-6" },
      { variant: "pill", size: "default", className: "px-5" },
      { variant: "pillCream", size: "lg", className: "px-7" },
      { variant: "link", className: "h-12 px-0" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { Button, buttonVariants };
