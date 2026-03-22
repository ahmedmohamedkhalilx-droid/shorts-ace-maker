import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Eye, ThumbsUp, Target } from "lucide-react";

const weeklyData = [
  { week: "W1", views: 42300, subs: 78 },
  { week: "W2", views: 51200, subs: 92 },
  { week: "W3", views: 38700, subs: 64 },
  { week: "W4", views: 67100, subs: 114 },
  { week: "W5", views: 58400, subs: 98 },
  { week: "W6", views: 72600, subs: 132 },
  { week: "W7", views: 64200, subs: 108 },
  { week: "W8", views: 81300, subs: 148 },
];

const maxViews = Math.max(...weeklyData.map((d) => d.views));
const maxSubs = Math.max(...weeklyData.map((d) => d.subs));

const milestones = [
  { target: "1,000 subs", current: "18,742", reached: true },
  { target: "10,000 subs", current: "18,742", reached: true },
  { target: "25,000 subs", current: "18,742", reached: false, progress: 75 },
  { target: "50,000 subs", current: "18,742", reached: false, progress: 37 },
  { target: "100,000 subs", current: "18,742", reached: false, progress: 19 },
];

const topPerformers = [
  { title: "React vs Vue in 2024", views: "67.3K", growth: "+412 subs" },
  { title: "10 VS Code Extensions You Need", views: "42.1K", growth: "+289 subs" },
  { title: "Why I Switched to Linux", views: "28.4K", growth: "+176 subs" },
];

export function GrowthView() {
  return (
    <div className="space-y-8">
      <div className="animate-fade-up">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp size={24} className="text-success" />
          Growth Analytics
        </h2>
        <p className="text-muted-foreground mt-1">
          Track your channel's growth trajectory
        </p>
      </div>

      {/* Views chart (simple bar) */}
      <Card className="animate-fade-up stagger-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Eye size={16} className="text-primary" />
            Weekly Views
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-40">
            {weeklyData.map((d) => (
              <div key={d.week} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-muted-foreground tabular-nums">
                  {(d.views / 1000).toFixed(0)}K
                </span>
                <div
                  className="w-full rounded-t-md bg-primary/20 hover:bg-primary/40 transition-colors relative group"
                  style={{ height: `${(d.views / maxViews) * 100}%` }}
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-t-md bg-primary transition-all duration-500"
                    style={{ height: `${(d.views / maxViews) * 70}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground font-medium">{d.week}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subscriber chart */}
      <Card className="animate-fade-up stagger-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Users size={16} className="text-success" />
            Weekly New Subscribers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-32">
            {weeklyData.map((d) => (
              <div key={d.week} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-muted-foreground tabular-nums">+{d.subs}</span>
                <div
                  className="w-full rounded-t-md bg-success transition-all duration-500 hover:bg-success/80"
                  style={{ height: `${(d.subs / maxSubs) * 100}%` }}
                />
                <span className="text-[10px] text-muted-foreground font-medium">{d.week}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card className="animate-fade-up stagger-3">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Target size={16} className="text-accent" />
            Subscriber Milestones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {milestones.map((m) => (
            <div key={m.target} className="flex items-center gap-3">
              <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                m.reached ? "bg-success text-success-foreground" : "bg-secondary text-muted-foreground"
              }`}>
                {m.reached ? "✓" : ""}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-medium ${m.reached ? "text-muted-foreground line-through" : ""}`}>
                    {m.target}
                  </span>
                  {!m.reached && m.progress && (
                    <span className="text-xs text-muted-foreground tabular-nums">{m.progress}%</span>
                  )}
                </div>
                {!m.reached && m.progress && (
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary/60 rounded-full" style={{ width: `${m.progress}%` }} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top growth drivers */}
      <Card className="animate-fade-up stagger-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <ThumbsUp size={16} className="text-primary" />
            Top Growth Drivers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {topPerformers.map((v, i) => (
            <div key={v.title} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-muted-foreground w-5">#{i + 1}</span>
                <div>
                  <p className="text-sm font-medium">{v.title}</p>
                  <p className="text-xs text-muted-foreground">{v.views} views</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-success">{v.growth}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
