import {
  LayoutDashboard,
  Lightbulb,
  Type,
  CheckSquare,
  CalendarDays,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type View = "dashboard" | "ideas" | "optimizer" | "checklist" | "calendar";

const navItems: { id: View; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "ideas", label: "Idea Generator", icon: Lightbulb },
  { id: "optimizer", label: "Title & Tags", icon: Type },
  { id: "checklist", label: "Upload Checklist", icon: CheckSquare },
  { id: "calendar", label: "Content Calendar", icon: CalendarDays },
];

interface SidebarProps {
  activeView: View;
  onNavigate: (view: View) => void;
}

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-card rounded-lg p-2 shadow-lg active:scale-95 transition-transform"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-30 md:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
            <Zap size={18} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight">ShortsFlow</h1>
            <p className="text-xs text-muted-foreground">YouTube Automation</p>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 active:scale-[0.97]",
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 m-3 rounded-lg bg-secondary">
          <p className="text-xs font-semibold text-foreground">Monetization Tip</p>
          <p className="text-xs text-muted-foreground mt-1">
            Post 1 Short daily for 90 days to maximize algorithm reach.
          </p>
        </div>
      </aside>
    </>
  );
}
