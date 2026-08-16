import { getInitials } from "@/lib/format-date";
import { cn } from "@/lib/utils";

export function UserAvatar({
  name,
  size = "md",
  inverted = false,
}: {
  name?: string;
  size?: "sm" | "md" | "lg";
  inverted?: boolean;
}) {
  const sizes = {
    sm: "size-7 text-[10px]",
    md: "size-8 text-[11px]",
    lg: "size-11 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium",
        inverted ? "bg-white/20 text-white" : "bg-primary-soft text-primary",
        sizes[size]
      )}
    >
      {getInitials(name)}
    </span>
  );
}
