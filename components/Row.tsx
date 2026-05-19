import { Tile } from "./Tile";
import type { Color } from "@/lib/wordle-state";

type Props = {
  letters: string[];
  colors: (Color | "empty")[];
  state: "empty" | "filling" | "submitted";
  shake?: boolean;
};

export function Row({ letters, colors, state, shake }: Props) {
  return (
    <div className={`grid grid-cols-5 gap-1.5 w-full ${shake ? "row-shake" : ""}`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const letter = letters[i] ?? "";
        const tileState: "empty" | "filled" | "revealed" =
          state === "submitted" ? "revealed" : letter ? "filled" : "empty";
        return (
          <Tile
            key={i}
            letter={letter}
            color={colors[i] ?? "empty"}
            state={tileState}
            index={i}
          />
        );
      })}
    </div>
  );
}
