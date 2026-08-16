"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Input from "@/components/common/input";

export default function PasswordInput({
  value,
  onChange,
  title = "Password",
  required = true,
}: {
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  title?: string;
  required?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        label={title}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder="••••••••"
        required={required}
        className="pr-11"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 bottom-0 flex h-11 items-center text-muted-foreground hover:text-foreground sm:h-10"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
