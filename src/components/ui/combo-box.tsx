import * as React from "react";
import {
  Combobox as ComboboxPrimitive,
  ComboboxInput as ComboboxPrimitiveInput,
  ComboboxOption as ComboboxPrimitiveOption,
  ComboboxOptions as ComboboxPrimitiveOptions,
} from "@headlessui/react";

import { cn } from "@/lib/utils";

const Combobox = ComboboxPrimitive;

const ComboboxInput = ComboboxPrimitiveInput;

const ComboboxOptions = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitiveOptions>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitiveOptions>
>(({ className, anchor = "bottom", transition = true, ...props }, ref) => (
  <ComboboxPrimitiveOptions
    ref={ref}
    anchor={anchor}
    transition={transition}
    className={cn(
      "w-[var(--input-width)] origin-top rounded-md border bg-popover px-1 py-2 text-popover-foreground shadow-md outline-none transition duration-200 ease-out [--anchor-gap:0.25rem] empty:invisible data-[closed]:scale-95 data-[closed]:opacity-0",
      className,
    )}
    {...props}
  />
));
ComboboxOptions.displayName = ComboboxPrimitiveOptions.displayName;

const ComboboxOption = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitiveOption>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitiveOption>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitiveOption
    ref={ref}
    className={cn(
      "rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[focus]:bg-accent data-[selected]:font-semibold data-[selected]:text-accent-foreground data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  />
));
ComboboxOption.displayName = ComboboxPrimitiveOption.displayName;

export { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption };
