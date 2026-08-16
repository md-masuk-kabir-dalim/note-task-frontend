import { cn } from "@/lib/utils";

function BrandIcon({ inverted = false }: { inverted?: boolean }) {
  const paper = inverted ? "#3b1d73" : "#ffffff";
  const fold = inverted ? "#5b3d9e" : "#ddd6fe";
  const ink = inverted ? "#ffffff" : "#3b1d73";

  return (
    <svg viewBox="0 0 32 32" fill="none" className="size-8" aria-hidden>
      <rect width="32" height="32" rx="8" fill={inverted ? "#ffffff" : "#3b1d73"} />
      <path
        fill={paper}
        d="M10 7h9.2L22 10.8V24.2c0 .99-.8 1.8-1.8 1.8h-8.4c-.99 0-1.8-.81-1.8-1.8V8.8C10 7.81 10.81 7 11.8 7H10Z"
      />
      <path fill={fold} d="M19.2 7v3.4c0 .22.18.4.4.4H23" />
      <rect x="12.2" y="14.2" width="8.4" height="1.35" rx="0.67" fill={ink} opacity=".38" />
      <rect x="12.2" y="17.1" width="6.4" height="1.35" rx="0.67" fill={ink} opacity=".38" />
      <rect x="13.1" y="21.15" width="5.8" height="4.05" rx="1.05" fill={ink} />
      <path
        stroke={ink}
        strokeWidth="1.35"
        strokeLinecap="round"
        d="M14.45 21.15v-1.35a1.55 1.55 0 0 1 3.1 0v1.35"
      />
    </svg>
  );
}

export function BrandMark({
  inverted = false,
}: {
  inverted?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <BrandIcon inverted={inverted} />
      <span
        className={cn(
          "text-[15px] font-medium tracking-[-0.02em]",
          inverted ? "text-white" : "text-foreground"
        )}
      >
        SecureNotes
      </span>
    </span>
  );
}
