import {
  LayoutDashboard,
  PlaySquare,
  Lightbulb,
  TrendingUp,
  Users,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type View = "dashboard" | "videos" | "suggestions" | "growth" | "competitors";

const navItems: { id: View; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "videos", label: "Video Analysis", icon: PlaySquare },
  { id: "suggestions", label: "Suggestions", icon: Lightbulb },
  { id: "growth", label: "Growth", icon: TrendingUp },
  { id: "competitors", label: "Competitors", icon: Users },
];

interface SidebarProps {
  activeView: View;
  onNavigate: (view: View) => void;
}

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-card rounded-lg p-2 shadow-lg active:scale-95 transition-transform"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-30 md:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

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
            <h1 className="text-base font-bold leading-tight">TubeMonitor</h1>
            <p className="text-xs text-muted-foreground">Channel Analytics</p>
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
          <p className="text-xs font-semibold text-foreground">Quick Tip</p>
          <p className="text-xs text-muted-foreground mt-1">
            Videos with custom thumbnails get 30% more clicks on average.
          </p>
        </div>
      </aside>
    </>
  );
}
