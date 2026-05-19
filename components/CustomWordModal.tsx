"use client";

import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { isValidGuess } from "@/lib/word-lists";

type Props = {
  open: boolean;
  onClose: () => void;
  current: string | null;
  onApply: (word: string) => void;
  onClear: () => void;
};

export function CustomWordModal({ open, onClose, current, onApply, onClear }: Props) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setVal(current ?? "");
      setErr(null);
    }
  }, [open, current]);

  const submit = () => {
    const w = val.trim().toLowerCase();
    if (w.length !== 5) {
      setErr("Must be exactly 5 letters.");
      return;
    }
    if (!/^[a-z]{5}$/.test(w)) {
      setErr("Letters only.");
      return;
    }
    if (!isValidGuess(w)) {
      setErr("Not in the Wordle word list.");
      return;
    }
    onApply(w);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Custom word">
      <p className="mb-3 text-sm">
        Enter a 5-letter word and the board will solve the <span className="font-semibold">67</span> pattern against it.
        Word must be one Wordle accepts.
      </p>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={val}
          onChange={(e) => {
            setVal(e.target.value.slice(0, 5).toLowerCase());
            setErr(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          maxLength={5}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          className="w-full px-3 py-2 rounded-md border-2 border-[var(--tile-border)] bg-transparent text-[var(--fg)] uppercase tracking-[0.5em] text-center font-bold text-xl outline-none focus:border-[var(--tile-border-filled)]"
          placeholder="DUSTY"
        />
        {err && <div className="text-xs text-red-500 font-semibold">{err}</div>}
        <div className="flex gap-2 mt-2">
          <button
            onClick={submit}
            className="flex-1 py-2.5 rounded-md bg-[var(--correct)] text-white font-bold uppercase tracking-wider text-sm active:opacity-80"
          >
            Apply
          </button>
          {current && (
            <button
              onClick={() => {
                onClear();
                onClose();
              }}
              className="flex-1 py-2.5 rounded-md border-2 border-[var(--tile-border-filled)] text-[var(--fg)] font-bold uppercase tracking-wider text-sm active:opacity-70"
            >
              Use today
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
