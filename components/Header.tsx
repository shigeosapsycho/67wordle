"use client";

type Props = {
  onHelp: () => void;
  onSolve: () => void;
  onStats: () => void;
  onSettings: () => void;
  onCustom: () => void;
  customActive?: boolean;
};

function IconBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="p-2 rounded-full hover:opacity-70 active:opacity-50 text-[var(--fg)]"
    >
      {children}
    </button>
  );
}

export function Header({ onHelp, onSolve, onStats, onSettings, onCustom, customActive }: Props) {
  return (
    <header className="border-b border-[var(--divider)] px-3 py-2 grid grid-cols-[1fr_auto_1fr] items-center">
      <div />
      <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-center">
        <span className="tabular-nums">67</span> Wordle
      </h1>
      <div className="flex items-center gap-0.5 justify-end">
        <IconBtn label="Replay 67" onClick={onSolve}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18h6" />
            <path d="M10 22h4" />
            <path d="M12 2a7 7 0 0 0-4 12.7c.7.5 1 1.3 1 2.1V18h6v-1.2c0-.8.3-1.6 1-2.1A7 7 0 0 0 12 2z" />
          </svg>
        </IconBtn>
        <IconBtn label="Info" onClick={onStats}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="6" y1="20" x2="6" y2="12" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="18" y1="20" x2="18" y2="9" />
          </svg>
        </IconBtn>
        <IconBtn label="Help" onClick={onHelp}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.5 9a2.5 2.5 0 0 1 4.9.5c0 1.5-2.4 2.2-2.4 3.5" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </IconBtn>
        <IconBtn label="Custom word" onClick={onCustom}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            {customActive && <circle cx="20" cy="5" r="3" fill="var(--correct)" stroke="none" />}
          </svg>
        </IconBtn>
        <IconBtn label="Settings" onClick={onSettings}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </IconBtn>
      </div>
    </header>
  );
}
