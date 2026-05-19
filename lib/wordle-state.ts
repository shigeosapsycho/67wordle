export type Color = "green" | "yellow" | "gray";

export function scoreGuess(guess: string, answer: string): Color[] {
  const g = guess.toLowerCase();
  const a = answer.toLowerCase();
  const result: Color[] = ["gray", "gray", "gray", "gray", "gray"];
  const pool: (string | null)[] = a.split("");

  for (let i = 0; i < 5; i++) {
    if (g[i] === pool[i]) {
      result[i] = "green";
      pool[i] = null;
    }
  }
  for (let i = 0; i < 5; i++) {
    if (result[i] === "green") continue;
    const idx = pool.indexOf(g[i]);
    if (idx !== -1) {
      result[i] = "yellow";
      pool[idx] = null;
    }
  }
  return result;
}

export type LetterState = Color | "unused";

export function aggregateKeyboardState(
  guesses: string[],
  answer: string,
): Record<string, LetterState> {
  const out: Record<string, LetterState> = {};
  const rank: Record<Color, number> = { gray: 1, yellow: 2, green: 3 };
  for (const g of guesses) {
    const colors = scoreGuess(g, answer);
    for (let i = 0; i < 5; i++) {
      const ch = g[i].toLowerCase();
      const cur = out[ch];
      const next = colors[i];
      if (cur === undefined || cur === "unused" || rank[next] > rank[cur as Color]) {
        out[ch] = next;
      }
    }
  }
  return out;
}
