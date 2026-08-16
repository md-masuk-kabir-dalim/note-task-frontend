import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Surface } from "@/components/layout/surface";

export function QuickLink({
  href,
  label,
  description,
  icon: Icon,
}: {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <Link href={href} className="group block">
      <Surface className="h-full transition duration-200 group-hover:-translate-y-0.5 group-hover:border-violet-200 group-hover:shadow-[0_16px_40px_rgba(26,11,58,0.08)]">
        <span className="flex size-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <Icon className="size-4" />
        </span>
        <p className="mt-4 text-sm font-medium">{label}</p>
        <p className="mt-1 text-[13px] leading-5 text-muted-foreground">{description}</p>
      </Surface>
    </Link>
  );
}
