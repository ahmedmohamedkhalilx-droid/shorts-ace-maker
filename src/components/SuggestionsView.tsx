import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Lightbulb,
  Image,
  Type,
  Tag,
  Clock,
  BarChart3,
  Megaphone,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

interface Suggestion {
  id: string;
  category: string;
  icon: React.ElementType;
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  impact: string;
  completed: boolean;
}

const initialSuggestions: Suggestion[] = [
  {
    id: "1", category: "Thumbnails", icon: Image, priority: "high",
    title: "A/B test thumbnails on your low-CTR videos",
    description: "Your last 2 videos had CTR below 5%. Try bolder text, closer face shots, or contrasting colors. YouTube now supports thumbnail testing natively.",
    impact: "Could increase CTR by 1.5–3%",
    completed: false,
  },
  {
    id: "2", category: "Titles", icon: Type, priority: "high",
    title: "Add searchable keywords to video titles",
    description: "'My Dev Setup Tour 2024' is too generic. Try 'My $5,000 Dev Setup Tour (M3 MacBook Pro + 4K Monitor)' — specific, searchable, curiosity-driven.",
    impact: "Better search ranking + higher CTR",
    completed: false,
  },
  {
    id: "3", category: "Retention", icon: Clock, priority: "high",
    title: "Shorten your intros to under 15 seconds",
    description: "Analytics show a 18% drop-off in the first 30 seconds on average. Get to the value faster — tease the best part first, then deliver.",
    impact: "Could improve retention by 8–12%",
    completed: false,
  },
  {
    id: "4", category: "SEO", icon: Tag, priority: "medium",
    title: "Optimize descriptions with timestamps + keywords",
    description: "3 of your last 5 videos have short descriptions. Add timestamps, relevant keywords, and links. YouTube uses descriptions for search ranking.",
    impact: "Improves discoverability in search",
    completed: false,
  },
  {
    id: "5", category: "Upload Schedule", icon: BarChart3, priority: "medium",
    title: "Post on Tuesday & Thursday between 2–4 PM",
    description: "Your audience is most active Tue–Thu afternoons (EST). Shifting from your current random schedule could boost initial impressions by 20%+.",
    impact: "Higher first-48-hour performance",
    completed: false,
  },
  {
    id: "6", category: "Engagement", icon: Megaphone, priority: "medium",
    title: "Pin a question as first comment on every video",
    description: "Videos with pinned questions get 2.4x more comments on average. Ask something specific, not generic ('What's YOUR favorite extension?').",
    impact: "Boosts engagement rate + algorithm signal",
    completed: false,
  },
  {
    id: "7", category: "Content", icon: Zap, priority: "low",
    title: "Create a Shorts version of your top performer",
    description: "'React vs Vue in 2024' got 67K views. Clip the best 45 seconds as a Short — it could pull new subscribers to your main content.",
    impact: "Cross-format audience growth",
    completed: false,
  },
];

const priorityColors = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-accent/20 text-accent-foreground border-accent/30",
  low: "bg-secondary text-muted-foreground border-border",
};

export function SuggestionsView() {
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const toggle = (id: string) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  const completed = suggestions.filter((s) => s.completed).length;
  const total = suggestions.length;

  return (
    <div className="space-y-8">
      <div className="animate-fade-up">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Lightbulb size={24} className="text-accent" />
          Improvement Suggestions
        </h2>
        <p className="text-muted-foreground mt-1">
          Actionable tips based on your channel data — {completed}/{total} completed
        </p>
      </div>

      {/* Progress */}
      <Card className="animate-fade-up stagger-1">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Optimization Progress</span>
            <span className="text-xs text-primary font-bold tabular-nums">{Math.round((completed / total) * 100)}%</span>
          </div>
          <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(completed / total) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Suggestions */}
      <div className="space-y-3">
        {suggestions
          .sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1))
          .map((s, i) => (
          <Card
            key={s.id}
            className={`animate-fade-up stagger-${Math.min(i + 1, 6)} transition-all duration-300 ${s.completed ? "opacity-60" : "hover:shadow-md"}`}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggle(s.id)}
                  className="mt-0.5 shrink-0 active:scale-90 transition-transform"
                >
                  {s.completed ? (
                    <CheckCircle2 size={20} className="text-success" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30 hover:border-primary transition-colors" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${priorityColors[s.priority]}`}>
                      {s.priority}
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <s.icon size={10} />
                      {s.category}
                    </span>
                  </div>
                  <p className={`text-sm font-semibold ${s.completed ? "line-through text-muted-foreground" : ""}`}>
                    {s.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {s.description}
                  </p>
                  <p className="text-xs font-medium text-primary mt-2 flex items-center gap-1">
                    <ArrowRight size={10} />
                    {s.impact}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
