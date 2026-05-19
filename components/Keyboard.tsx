"use client";

import type { LetterState } from "@/lib/wordle-state";

const ROWS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

const stateClass: Record<LetterState, string> = {
  unused: "bg-[var(--key-bg)] text-[var(--key-fg)]",
  gray: "bg-[var(--absent)] text-white",
  yellow: "bg-[var(--present)] text-white",
  green: "bg-[var(--correct)] text-white",
};

type Props = {
  letterStates: Record<string, LetterState>;
  onKey: (k: string) => void;
};

export function Keyboard({ letterStates, onKey }: Props) {
  return (
    <div className="w-full max-w-[500px] mx-auto px-1 pb-2 select-none">
      {ROWS.map((row, ri) => (
        <div key={ri} className="flex justify-center gap-1 mb-1.5">
          {ri === 2 && (
            <button
              onClick={() => onKey("ENTER")}
              className="flex-[1.5] h-14 rounded-md font-bold text-xs uppercase bg-[var(--key-bg)] text-[var(--key-fg)] active:opacity-70"
            >
              Enter
            </button>
          )}
          {row.split("").map((ch) => {
            const s: LetterState = letterStates[ch] ?? "unused";
            return (
              <button
                key={ch}
                onClick={() => onKey(ch)}
                className={`flex-1 h-14 rounded-md font-bold uppercase text-base active:opacity-70 transition-colors ${stateClass[s]}`}
                style={{ minWidth: 24 }}
              >
                {ch}
              </button>
            );
          })}
          {ri === 2 && (
            <button
              onClick={() => onKey("BACKSPACE")}
              aria-label="Backspace"
              className="flex-[1.5] h-14 rounded-md font-bold bg-[var(--key-bg)] text-[var(--key-fg)] active:opacity-70 flex items-center justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z" fill="currentColor" />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
