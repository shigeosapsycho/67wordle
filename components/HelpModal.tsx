"use client";

import { Modal } from "./Modal";

export function HelpModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="What is this?">
      <p className="mb-3">
        <span className="font-semibold">67 Wordle</span> takes today&apos;s real Wordle answer and auto-plays 5 guesses whose colored tiles draw the digits <span className="font-semibold">6 7</span> on the board.
      </p>
      <div className="mb-4 font-mono text-xs leading-tight grid grid-cols-5 gap-0.5 w-fit mx-auto">
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
      <ul className="list-disc pl-5 mb-4 space-y-1">
        <li>Today&apos;s answer is fetched from the public NYT endpoint based on your local date.</li>
        <li>Each row is a real, valid 5-letter English word.</li>
        <li>Some answers can&apos;t form a clean 67 with greens alone — toggle <span className="font-semibold">&ldquo;Yellows count&rdquo;</span> in settings to allow yellow tiles as part of the digits too.</li>
      </ul>
      <p className="text-xs opacity-70">
        Hit the star ★ in the header to replay the animation.
      </p>
    </Modal>
  );
}
