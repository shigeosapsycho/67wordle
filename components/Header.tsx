"use client";

type Props = {
  onHelp: () => void;
  onSolve: () => void;
  onStats: () => void;
  onSettings: () => void;
};

function IconBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="p-2 rounded hover:opacity-70 active:opacity-50 text-[var(--fg)]"
    >
      {children}
    </button>
  );
}

export function Header({ onHelp, onSolve, onStats, onSettings }: Props) {
  return (
    <header className="border-b border-[var(--divider)] px-3 py-2 flex items-center justify-between">
      <div className="flex items-center gap-1">
        <IconBtn label="Help" onClick={onHelp}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </IconBtn>
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
        <span className="tabular-nums">67</span> Wordle
      </h1>
      <div className="flex items-center gap-1">
        <IconBtn label="Solve as 67" onClick={onSolve}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.39 7.36H22l-6.19 4.5L18.2 21 12 16.5 5.8 21l2.39-7.14L2 9.36h7.61z" />
          </svg>
        </IconBtn>
        <IconBtn label="Stats" onClick={onStats}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="6" y1="20" x2="6" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="18" y1="20" x2="18" y2="14" />
          </svg>
        </IconBtn>
        <IconBtn label="Settings" onClick={onSettings}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </IconBtn>
      </div>
    </header>
  );
}
