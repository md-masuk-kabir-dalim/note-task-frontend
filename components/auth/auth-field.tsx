"use client";

import type { ChangeEventHandler, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AuthField({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  icon,
  trailing,
  className,
}: {
  name?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  required?: boolean;
  icon?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}) {
  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={cn(
          "h-12 w-full rounded-full border border-white/25 bg-white/12 px-5 text-base text-white outline-none placeholder:text-white/70 focus:border-white/50 sm:text-sm",
          (icon || trailing) && "pr-12",
          className
        )}
      />
      {trailing ? (
        <span className="absolute inset-y-0 right-2 flex items-center">{trailing}</span>
      ) : icon ? (
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/75">
          {icon}
        </span>
      ) : null}
    </div>
  );
}
