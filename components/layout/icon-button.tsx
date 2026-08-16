import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconButtonProps = {
  label: string;
  icon: LucideIcon;
  tone?: "neutral" | "danger";
  className?: string;
};

export function IconButton({
  label,
  icon: Icon,
  href,
  onClick,
  tone = "neutral",
  className,
}: IconButtonProps & ({ href: string; onClick?: never } | { href?: never; onClick: () => void })) {
  const styles = cn(
    "inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors sm:size-8",
    tone === "neutral" && "hover:bg-primary-soft hover:text-primary",
    tone === "danger" && "hover:bg-red-50 hover:text-red-600",
    className
  );

  if (href) {
    return (
      <Link href={href} aria-label={label} className={styles}>
        <Icon className="size-4" />
      </Link>
    );
  }

  return (
    <button type="button" aria-label={label} onClick={onClick} className={styles}>
      <Icon className="size-4" />
    </button>
  );
}
