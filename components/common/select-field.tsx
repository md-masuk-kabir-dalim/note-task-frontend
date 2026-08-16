import type { ChangeEventHandler, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function SelectField({
  label,
  name,
  value,
  onChange,
  children,
  required,
  className,
}: {
  label: string;
  name?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  children: SelectHTMLAttributes<HTMLSelectElement>["children"];
  required?: boolean;
  className?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="flex items-center text-[13px] font-medium">
        {label}
        {required ? <span className="ml-1 text-red-500">*</span> : null}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={cn(
          "h-11 w-full rounded-md border border-border bg-card px-3 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 sm:h-10 sm:text-sm",
          className
        )}
      >
        {children}
      </select>
    </div>
  );
}
