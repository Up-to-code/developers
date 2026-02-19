import { PanelRightOpen, Plus } from "lucide-react";

type ChatHeaderProps = {
  isSidebarOpen: boolean;
  onOpenSidebar: () => void;
  title: string;
  subtitle: string;
  onNewChat: () => void;
};

export function ChatHeader({
  isSidebarOpen,
  onOpenSidebar,
  title,
  subtitle,
  onNewChat,
}: ChatHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between px-3 md:px-10">
      <div className="flex min-w-0 items-center gap-2">
        {!isSidebarOpen ? (
          <button
            onClick={onOpenSidebar}
            className="hidden rounded-lg border border-[var(--border)] p-2 text-[var(--subtle)] transition-colors hover:bg-[var(--surface-soft)] md:block"
            aria-label="فتح الشريط الجانبي"
          >
            <PanelRightOpen className="h-4 w-4" />
          </button>
        ) : null}
        <div className="min-w-0">
          <p className="truncate text-sm font-black">{title}</p>
          <p className="truncate text-[10px] font-bold text-[var(--subtle)]">{subtitle}</p>
        </div>
      </div>

      <button
        onClick={onNewChat}
        className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-2 py-1 text-[10px] font-bold transition-colors hover:bg-[var(--surface-soft)]"
      >
        <Plus className="h-3 w-3" />
        جديد
      </button>
    </header>
  );
}
