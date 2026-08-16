"use client";

import type { ChangeEventHandler, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = {
  label?: string;
  name?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  placeholder?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  className?: string;
};

export default function Input({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder,
  type = "text",
  className,
}: InputProps) {
  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={name} className="flex items-center text-[13px] font-medium">
          {label}
          {required ? <span className="ml-1 text-red-500">*</span> : null}
        </label>
      ) : null}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={cn(
          "h-11 w-full rounded-md border border-border bg-card px-3 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15 sm:h-10 sm:text-sm",
          className
        )}
      />
    </div>
  );
}
