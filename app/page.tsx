"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { Board, type BoardRow } from "@/components/Board";
import { HelpModal } from "@/components/HelpModal";
import { SettingsModal } from "@/components/SettingsModal";
import { Modal } from "@/components/Modal";
import { Toast } from "@/components/Toast";
import { scoreGuess } from "@/lib/wordle-state";
import { findGuessesFor67 } from "@/lib/solver";
import { GUESS_LIST } from "@/lib/word-lists";
import { localDateISO } from "@/lib/date";
import { WORDLE_ROWS, WORD_LEN } from "@/lib/pattern";

const emptyRow = (): BoardRow => ({ letters: [], colors: [], state: "empty" });
const emptyBoard = (): BoardRow[] => Array.from({ length: WORDLE_ROWS }, emptyRow);

const REVEAL_MS = 1700;
const ROW_STAGGER_MS = 1200;

type ApiResponse = {
  solution: string;
  daysSinceLaunch: number;
  date: string;
  source: "nyt" | "fallback";
};

export default function Page() {
  const [today, setToday] = useState<ApiResponse | null>(null);
  const [loadErr, setLoadErr] = useState<string | null>(null);

  const [rows, setRows] = useState<BoardRow[]>(emptyBoard);
  const [toast, setToast] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);
  const [solverFoundAll, setSolverFoundAll] = useState(true);

  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [dark, setDark] = useState(false);
  const [yellowsCount, setYellowsCount] = useState(true);
  const [revealAnswer, setRevealAnswer] = useState(false);

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const runIdRef = useRef(0);

  const showToast = useCallback((msg: string, ms = 1800) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), ms);
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const prefers =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(stored ? stored === "dark" : prefers);
      const yc = localStorage.getItem("yellowsCount");
      setYellowsCount(yc === null ? true : yc === "1");
      setRevealAnswer(localStorage.getItem("revealAnswer") === "1");
    } catch {}
    try {
      setShowHelp(!localStorage.getItem("seenHelp"));
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch {}
  }, [dark]);
  useEffect(() => {
    try { localStorage.setItem("yellowsCount", yellowsCount ? "1" : "0"); } catch {}
  }, [yellowsCount]);
  useEffect(() => {
    try { localStorage.setItem("revealAnswer", revealAnswer ? "1" : "0"); } catch {}
  }, [revealAnswer]);

  useEffect(() => {
    const date = localDateISO();
    fetch(`/api/wordle/today?date=${date}`)
      .then((r) => r.json() as Promise<ApiResponse>)
      .then((d) => setToday(d))
      .catch(() => setLoadErr("Could not load today's word."));
  }, []);

  const clearAnimTimers = useCallback(() => {
    for (const t of animTimers.current) clearTimeout(t);
    animTimers.current = [];
  }, []);

  const runSolution = useCallback(
    (answer: string, useYellows: boolean, showAnswer: boolean) => {
      runIdRef.current += 1;
      const myRun = runIdRef.current;
      clearAnimTimers();

      const result = findGuessesFor67(answer, GUESS_LIST, useYellows);
      setSolverFoundAll(result.allFound);

      if (!result.allFound) {
        showToast(
          useYellows
            ? "Can't form a 67 for today's word."
            : "No greens-only 67 — try enabling yellows in settings.",
          3500,
        );
      }

      setRows(emptyBoard());
      setAnimating(true);

      const sequence: (string | null)[] = result.guesses.slice();
      if (showAnswer) sequence.push(answer);

      let delay = 250;
      sequence.forEach((g, i) => {
        const t = setTimeout(() => {
          if (runIdRef.current !== myRun) return;
          setRows((prev) => {
            const next = prev.slice();
            if (g) {
              next[i] = {
                letters: g.split(""),
                colors: scoreGuess(g, answer),
                state: "submitted",
              };
            }
            return next;
          });
        }, delay);
        animTimers.current.push(t);
        delay += ROW_STAGGER_MS;
      });

      const done = setTimeout(() => {
        if (runIdRef.current !== myRun) return;
        setAnimating(false);
      }, delay + REVEAL_MS);
      animTimers.current.push(done);
    },
    [clearAnimTimers, showToast],
  );

  useEffect(() => {
    if (!today) return;
    runSolution(today.solution, yellowsCount, revealAnswer);
    return () => {
      clearAnimTimers();
    };
  }, [today, yellowsCount, revealAnswer, runSolution, clearAnimTimers]);

  const replay = useCallback(() => {
    if (!today) return;
    runSolution(today.solution, yellowsCount, revealAnswer);
  }, [today, yellowsCount, revealAnswer, runSolution]);

  const onHelpClose = useCallback(() => {
    setShowHelp(false);
    try { localStorage.setItem("seenHelp", "1"); } catch {}
  }, []);

  return (
    <>
      <Header
        onHelp={() => setShowHelp(true)}
        onSolve={replay}
        onStats={() => setShowInfo(true)}
        onSettings={() => setShowSettings(true)}
      />
      <main className="flex-1 flex flex-col items-center gap-4 py-4 px-2">
        <div className="text-xs uppercase tracking-widest opacity-60 text-center w-full">
          {today ? `Wordle #${today.daysSinceLaunch} · ${today.date}` : ""}
        </div>
        <div className="w-full flex-1 flex items-center justify-center">
          {loadErr ? (
            <div className="text-center text-sm opacity-80 p-6">{loadErr}</div>
          ) : !today ? (
            <div className="text-center text-sm opacity-60 p-6">Loading today&apos;s Wordle…</div>
          ) : (
            <Board rows={rows} currentRow={WORDLE_ROWS} shakeRow={null} />
          )}
        </div>
        <div className="w-full max-w-[420px] px-3">
          <button
            onClick={replay}
            disabled={!today || animating}
            className="w-full py-3 rounded-md bg-[var(--correct)] text-white font-bold uppercase tracking-wider text-sm active:opacity-80 disabled:opacity-40"
          >
            {animating ? "Solving…" : "Replay 67"}
          </button>
          {today && !solverFoundAll && !yellowsCount && (
            <button
              onClick={() => setYellowsCount(true)}
              className="mt-3 w-full py-2 rounded-md border border-[var(--present)] text-[var(--fg)] font-semibold text-xs uppercase tracking-wider active:opacity-70"
            >
              Allow yellow tiles
            </button>
          )}
        </div>
      </main>
      <footer className="py-3 text-center text-xs opacity-60">
        Made with <span aria-label="love" className="text-red-500">♥</span> by Beu
      </footer>
      <Toast message={toast} />
      <HelpModal open={showHelp} onClose={onHelpClose} />
      <SettingsModal
        open={showSettings}
        onClose={() => setShowSettings(false)}
        dark={dark}
        setDark={setDark}
        yellowsCount={yellowsCount}
        setYellowsCount={setYellowsCount}
        revealAnswer={revealAnswer}
        setRevealAnswer={setRevealAnswer}
      />
      <Modal open={showInfo} onClose={() => setShowInfo(false)} title="Today">
        {today && (
          <div className="space-y-2">
            <div>
              <span className="opacity-60">Date: </span>
              <span className="font-semibold">{today.date}</span>
            </div>
            <div>
              <span className="opacity-60">Wordle #</span>
              <span className="font-semibold">{today.daysSinceLaunch}</span>
            </div>
            <div>
              <span className="opacity-60">Source: </span>
              <span className="font-semibold">{today.source === "nyt" ? "NYT" : "Fallback"}</span>
            </div>
            <div className="pt-2">
              <span className="opacity-60">Answer: </span>
              <span className="font-bold uppercase">{today.solution}</span>
            </div>
            <div className="pt-2">
              <span className="opacity-60">Mode: </span>
              <span className="font-semibold">{yellowsCount ? "Greens + Yellows" : "Greens only"}</span>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
