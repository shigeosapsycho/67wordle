import guesses from "@/data/guesses.json";

export const GUESS_LIST: readonly string[] = guesses as string[];

export function isValidGuess(word: string): boolean {
  return GUESS_LIST.includes(word.toLowerCase());
}

export function fallbackWordForDate(dateISO: string): string {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < dateISO.length; i++) {
    h ^= dateISO.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return GUESS_LIST[h % GUESS_LIST.length];
}
