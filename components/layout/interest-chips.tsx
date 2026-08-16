export function InterestChips({
  interests,
  empty = "—",
}: {
  interests?: string[];
  empty?: string;
}) {
  if (!interests?.length) {
    return <span className="text-muted-foreground">{empty}</span>;
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {interests.map((interest) => (
        <span
          key={interest}
          className="rounded-md bg-muted px-2 py-0.5 text-[12px] text-muted-foreground"
        >
          {interest}
        </span>
      ))}
    </div>
  );
}
