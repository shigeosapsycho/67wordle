"use client";

import { Modal } from "./Modal";

export function HelpModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="What is this?">
      <p className="mb-4">
        <span className="font-semibold">67 Wordle </span> takes today&apos;s real
        Wordle answer and auto-plays five guesses whose colored tiles draw the
        digits <span className="font-semibold">6 7</span> across the board.
      </p>
      <div className="mb-4 flex justify-center">
        <div className="grid grid-cols-5 gap-0.5 font-mono text-xs leading-tight w-fit">
          {[
            [1,1,0,1,1],
            [1,0,0,0,1],
            [1,1,1,0,1],
            [1,0,1,0,1],
            [1,1,1,0,1],
          ].flat().map((v, i) => (
            <span key={i} className={`w-5 h-5 rounded-sm ${v ? "bg-[var(--correct)]" : "bg-[var(--tile-border)]"}`} />
          ))}
        </div>
      </div>
      <h3 className="font-bold uppercase text-xs tracking-wider mb-2">How it works</h3>
      <ul className="list-disc pl-5 mb-4 space-y-1">
        <li>Today&apos;s answer is fetched from the public NYT endpoint based on your local date.</li>
        <li>The solver scans the official Wordle valid-guess list and picks one real, enterable 5-letter word per row.</li>
        <li>Greens are always preferred. Yellows are allowed only when no greens-only word fits a row.</li>
        <li>Some days simply can&apos;t form a clean 67 — toggle <span className="font-semibold">&ldquo;Yellows count&rdquo;</span> in settings to allow yellow tiles as part of the digits.</li>
      </ul>
      <h3 className="font-bold uppercase text-xs tracking-wider mb-2">Controls</h3>
      <ul className="list-disc pl-5 mb-4 space-y-1">
        <li><span className="font-semibold">Lightbulb</span> — replay the animation.</li>
        <li><span className="font-semibold">Bar chart</span> — see today&apos;s date, Wordle number, answer, and solver mode.</li>
        <li><span className="font-semibold">Gear</span> — settings: dark theme, yellows toggle, show answer at end, instant vs typed animation.</li>
      </ul>
      <p className="text-xs opacity-70">
        Open source on{" "}
        <a
          href="https://github.com/shigeosapsycho/67wordle"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold hover:opacity-100 opacity-90"
        >
          GitHub
        </a>
        .
      </p>
    </Modal>
  );
}
