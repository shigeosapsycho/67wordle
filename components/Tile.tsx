import type { Color } from "@/lib/wordle-state";

type Props = {
  letter: string;
  color: Color | "empty";
  state: "empty" | "filled" | "revealed";
  index: number;
  celebrate?: boolean;
};

const flipClass: Record<Color | "empty", string> = {
  empty: "",
  green: "tile-flip-green",
  yellow: "tile-flip-yellow",
  gray: "tile-flip-gray",
};

export function Tile({ letter, color, state, index, celebrate }: Props) {
  const isRevealed = state === "revealed";
  const isFilled = state === "filled";

  return (
    <div
      className={`relative w-full aspect-square ${isFilled ? "tile-pop" : ""} ${celebrate ? "tile-bounce" : ""}`}
      style={{ animationDelay: celebrate ? `${index * 100}ms` : undefined }}
    >
      <div
        className={`absolute inset-0 flex items-center justify-center select-none
          text-[clamp(1.5rem,7vw,2rem)] font-bold uppercase
          border-2
          ${isRevealed ? flipClass[color] : ""}
          ${!isRevealed && isFilled ? "border-[var(--tile-border-filled)]" : ""}
          ${!isRevealed && !isFilled ? "border-[var(--tile-border)]" : ""}
        `}
        style={{ animationDelay: isRevealed ? `${index * 100}ms` : undefined }}
      >
        {letter}
      </div>
    </div>
  );
}
