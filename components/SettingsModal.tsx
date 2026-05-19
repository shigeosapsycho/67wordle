"use client";

import { Modal } from "./Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  dark: boolean;
  setDark: (v: boolean) => void;
  yellowsCount: boolean;
  setYellowsCount: (v: boolean) => void;
  revealAnswer: boolean;
  setRevealAnswer: (v: boolean) => void;
  instantAnimation: boolean;
  setInstantAnimation: (v: boolean) => void;
};

function Toggle({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description?: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start justify-between py-3 border-b border-[var(--divider)] cursor-pointer">
      <div className="pr-4">
        <div className="font-semibold">{label}</div>
        {description && <div className="text-xs opacity-70 mt-0.5">{description}</div>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative w-12 h-7 rounded-full transition-colors flex-shrink-0 ${value ? "bg-[var(--correct)]" : "bg-[var(--absent)]"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white transition-transform ${value ? "translate-x-5" : ""}`}
        />
      </button>
    </label>
  );
}

export function SettingsModal({
  open, onClose, dark, setDark, yellowsCount, setYellowsCount, revealAnswer, setRevealAnswer,
  instantAnimation, setInstantAnimation,
}: Props) {
  return (
    <Modal open={open} onClose={onClose} title="Settings">
      <Toggle label="Dark theme" value={dark} onChange={setDark} />
      <Toggle label="Yellow tiles toggle" value={yellowsCount} onChange={setYellowsCount} />
      <Toggle label="Show answer at end" value={revealAnswer} onChange={setRevealAnswer} />
      <Toggle label="Instant animation" value={instantAnimation} onChange={setInstantAnimation} />
    </Modal>
  );
}
