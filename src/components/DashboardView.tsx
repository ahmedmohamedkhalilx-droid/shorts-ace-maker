import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Eye,
  Users,
  TrendingUp,
  Clock,
  Target,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  { label: "Total Views", value: "12,847", change: "+18%", icon: Eye },
  { label: "Subscribers", value: "342", change: "+24", icon: Users },
  { label: "Engagement Rate", value: "8.3%", change: "+1.2%", icon: TrendingUp },
  { label: "Avg. Watch Time", value: "42s", change: "+6s", icon: Clock },
];

const recentShorts = [
  { title: "5 Hidden iPhone Features", views: "3.2K", status: "published" },
  { title: "Morning Routine Hacks", views: "1.8K", status: "published" },
  { title: "Budget Meal Prep #4", views: "892", status: "published" },
  { title: "React Tips for Beginners", views: "—", status: "scheduled" },
];

export function DashboardView() {
  const monetizationProgress = 34; // 342 / 1000 subs

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-up">
        <h2 className="text-2xl font-bold">Welcome back, Creator 👋</h2>
        <p className="text-muted-foreground mt-1">
          Here's how your Shorts are performing
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card
            key={stat.label}
            className={`animate-fade-up stagger-${i + 1} group hover:shadow-md transition-shadow duration-300`}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <stat.icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-xs font-medium text-success flex items-center gap-0.5">
                  {stat.change}
                  <ArrowUpRight size={12} />
                </span>
              </div>
              <p className="text-2xl font-bold tabular-nums">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monetization Progress */}
      <Card className="animate-fade-up stagger-5">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Target size={18} className="text-primary" />
              Monetization Progress
            </CardTitle>
            <span className="text-xs text-muted-foreground">342 / 1,000 subs</span>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={monetizationProgress} className="h-3" />
          <div className="flex justify-between mt-3 text-xs text-muted-foreground">
            <span>658 subscribers to go</span>
            <span className="font-medium text-primary">{monetizationProgress}%</span>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-secondary text-xs">
            <p className="font-semibold text-foreground">Requirements for YPP:</p>
            <ul className="mt-1.5 space-y-1 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                4,000 watch hours or 10M Shorts views ✓
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-glow" />
                1,000 subscribers — in progress
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Recent Shorts */}
      <Card className="animate-fade-up stagger-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recent Shorts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentShorts.map((short) => (
              <div
                key={short.title}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                    YT
                  </div>
                  <div>
                    <p className="text-sm font-medium">{short.title}</p>
                    <p className="text-xs text-muted-foreground">{short.views} views</p>
                  </div>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    short.status === "published"
                      ? "bg-success/10 text-success"
                      : "bg-accent/30 text-accent-foreground"
                  }`}
                >
                  {short.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
