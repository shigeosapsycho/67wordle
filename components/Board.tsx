import { Row } from "./Row";
import type { Color } from "@/lib/wordle-state";
import { WORDLE_ROWS } from "@/lib/pattern";

export type BoardRow = {
  letters: string[];
  colors: (Color | "empty")[];
  state: "empty" | "filling" | "submitted";
  celebrate?: boolean;
};

type Props = {
  rows: BoardRow[];
  currentRow: number;
  shakeRow: number | null;
};

export function Board({ rows, currentRow, shakeRow }: Props) {
  return (
    <div className="mx-auto grid grid-rows-6 gap-1.5 p-3 w-full max-w-[350px] aspect-[5/6]">
      {Array.from({ length: WORDLE_ROWS }).map((_, i) => {
        const row = rows[i] ?? { letters: [], colors: [], state: "empty" as const };
        return (
          <Row
            key={i}
            letters={row.letters}
            colors={row.colors}
            state={row.state}
            shake={shakeRow === i}
            celebrate={row.celebrate}
          />
        );
      })}
    </div>
  );
}
