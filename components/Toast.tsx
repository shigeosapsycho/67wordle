"use client";

export function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      className="fixed top-20 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-md font-semibold text-sm shadow-lg pointer-events-none"
      style={{ background: "var(--toast-bg)", color: "var(--toast-fg)" }}
    >
      {message}
    </div>
  );
}
