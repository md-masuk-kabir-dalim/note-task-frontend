export default function ErrorMessage({
  message,
  variant = "form",
}: {
  message?: string;
  variant?: "form" | "glass";
}) {
  if (!message) return null;

  if (variant === "glass") {
    return (
      <p
        role="alert"
        className="mb-4 rounded-full bg-red-500/20 px-4 py-2 text-center text-sm text-red-100"
      >
        {message}
      </p>
    );
  }

  return (
    <div
      role="alert"
      className="mb-5 rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-[13px] text-red-700"
    >
      {message}
    </div>
  );
}
