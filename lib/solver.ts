import { PATTERN_67, type Mask } from "./pattern";
import { scoreGuess } from "./wordle-state";

export type SolverResult = {
  guesses: (string | null)[];
  yellowsCount: boolean;
  allFound: boolean;
};

function rowMatches(guess: string, answer: string, mask: Mask, yellowsCount: boolean): boolean {
  const colors = scoreGuess(guess, answer);
  for (let i = 0; i < 5; i++) {
    if (mask[i]) {
      if (yellowsCount) {
        if (colors[i] === "gray") return false;
      } else {
        if (colors[i] !== "green") return false;
      }
    } else {
      if (colors[i] !== "gray") return false;
    }
  }
  return true;
}

export function findGuessesFor67(
  answer: string,
  guessList: readonly string[],
  yellowsCount: boolean,
): SolverResult {
  const a = answer.toLowerCase();
  const out: (string | null)[] = [];
  const used = new Set<string>();
  for (let row = 0; row < PATTERN_67.length; row++) {
    const mask = PATTERN_67[row];
    let pick: string | null = null;
    for (const w of guessList) {
      if (used.has(w)) continue;
      if (rowMatches(w, a, mask, yellowsCount)) {
        pick = w;
        break;
      }
    }
    if (pick) used.add(pick);
    out.push(pick);
  }
  return {
    guesses: out,
    yellowsCount,
    allFound: out.every((w) => w !== null),
  };
}
