# 67 Wordle

A Wordle viewer that automatically plays five guesses so the board's colored
tiles spell out **6 7** against today's real Wordle answer.

## What it does

- Fetches today's NYT Wordle answer based on your local date.
- Runs a solver that picks five valid 5-letter guesses whose tile colors,
  when stacked, form the digits 6 and 7 on the board.
- Animates the reveal row-by-row.
- Optional: append the real answer as an all-green sixth row.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- Deployed on Vercel (Fluid Compute)

## How the solver works

The 67 shape is encoded as a 5×5 boolean mask in [`lib/pattern.ts`](./lib/pattern.ts):

```
# # . # #     ##.##   →  digit 6 on the left
# . . . #     #...#      digit 7 on the right
# # # . #     ###.#
# . # . #     #.#.#
# # # . #     ###.#
```

For each row, [`lib/solver.ts`](./lib/solver.ts) scans the valid-guess list
for a word whose Wordle score against today's answer matches the row's mask:

1. **First pass — greens only.** A column marked `#` requires `guess[i] === answer[i]`;
   a column marked `.` requires the letter to not appear in the answer at all
   (so it scores gray).
2. **Second pass — greens or yellows** (when the "Yellows count" setting is on).
   `#` columns accept a green *or* a yellow (letter present elsewhere); `.` columns
   still must score gray. Used only when no greens-only word exists for that row.

Scoring lives in [`lib/wordle-state.ts`](./lib/wordle-state.ts) — a two-pass
green-then-yellow scorer with proper duplicate-letter accounting, matching
Wordle's own logic so what the solver predicts is exactly what the board renders.

## Today's word

`app/api/wordle/today/route.ts` proxies the public NYT endpoint
`https://www.nytimes.com/svc/wordle/v2/{YYYY-MM-DD}.json` (avoids CORS,
sets a sensible cache header) and falls back to a deterministic per-date
word from the bundled list if the upstream is unreachable.

## Word list

Bundles the list of valid Wordle guesses mirrored at
[tabatkins/wordle-list](https://github.com/tabatkins/wordle-list).
Every word the solver picks is one NYT Wordle will accept.

## Settings

| Toggle | Default | Behavior |
| --- | --- | --- |
| Dark theme | follows system | Light / dark palette. |
| Yellows count for 67 | on | Allow yellow tiles as "on" pixels of the 6/7 shape when no greens-only word fits a row. Greens are always preferred per row. |
| Show answer at end | off | After the five pattern guesses, play the real answer as a final all-green row. |

## Run locally

```bash
git clone https://github.com/shigeosapsycho/67wordle.git
cd 67wordle
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Configured for Vercel out of the box. Push to GitHub, import the repo at
[vercel.com/new](https://vercel.com/new), and deploy — no environment
variables required.

## File layout

```
app/
  api/wordle/today/route.ts   NYT proxy + bundled fallback
  layout.tsx, page.tsx         App shell + main game
  globals.css                  Tile / keyboard palette + animations
components/                    Header, Board, Tile, Row, modals, Toast
lib/
  pattern.ts                   PATTERN_67 mask
  solver.ts                    findGuessesFor67()
  wordle-state.ts              scoreGuess() (two-pass)
  word-lists.ts                Loads bundled JSON list
  date.ts                      Local-date + days-since-launch helpers
data/
  guesses.json                 Valid-guess wordlist
```

## Credits

- Wordle was created by Josh Wardle and is now owned and run by The New York
  Times. This project is a fan-made viewer; today's answer is fetched from
  NYT's own public endpoint at runtime.
- Valid-guess wordlist mirrored from
  [tabatkins/wordle-list](https://github.com/tabatkins/wordle-list).

## License

MIT.
