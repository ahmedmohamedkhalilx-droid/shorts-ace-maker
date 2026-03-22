import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Eye,
  Users,
  TrendingUp,
  Clock,
  ThumbsUp,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const stats = [
  { label: "Monthly Views", value: "284,390", change: "+12.4%", up: true, icon: Eye },
  { label: "Subscribers", value: "18,742", change: "+348", up: true, icon: Users },
  { label: "Avg. CTR", value: "5.8%", change: "-0.3%", up: false, icon: TrendingUp },
  { label: "Avg. Watch Time", value: "4:32", change: "+18s", up: true, icon: Clock },
];

const recentVideos = [
  { title: "10 VS Code Extensions You Need", views: "42.1K", ctr: "7.2%", retention: "62%", status: "good" },
  { title: "Why I Switched to Linux", views: "28.4K", ctr: "5.1%", retention: "48%", status: "warning" },
  { title: "Build a REST API in 20 Min", views: "19.7K", ctr: "6.8%", retention: "55%", status: "good" },
  { title: "My Dev Setup Tour 2024", views: "15.2K", ctr: "3.9%", retention: "41%", status: "bad" },
  { title: "React vs Vue in 2024", views: "67.3K", ctr: "8.1%", retention: "58%", status: "good" },
];

const alerts = [
  { type: "warning", message: "CTR dropped below 5% on 2 recent videos — consider A/B testing thumbnails" },
  { type: "success", message: "Subscriber growth up 24% this week — keep the upload frequency!" },
];

export function DashboardView() {
  const channelHealth = 74;

  return (
    <div className="space-y-8">
      <div className="animate-fade-up">
        <h2 className="text-2xl font-bold">Channel Overview</h2>
        <p className="text-muted-foreground mt-1">Last 28 days performance</p>
      </div>

      {/* Alerts */}
      <div className="space-y-2 animate-fade-up stagger-1">
        {alerts.map((alert, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 p-3 rounded-lg text-sm ${
              alert.type === "warning"
                ? "bg-accent/20 text-accent-foreground"
                : "bg-success/10 text-foreground"
            }`}
          >
            {alert.type === "warning" ? (
              <AlertTriangle size={16} className="text-accent shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
            )}
            <p>{alert.message}</p>
          </div>
        ))}
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
                <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.up ? "text-success" : "text-destructive"}`}>
                  {stat.change}
                  {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                </span>
              </div>
              <p className="text-2xl font-bold tabular-nums">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Channel Health Score */}
      <Card className="animate-fade-up stagger-5">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <ThumbsUp size={18} className="text-primary" />
              Channel Health Score
            </CardTitle>
            <span className="text-sm font-bold text-primary tabular-nums">{channelHealth}/100</span>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={channelHealth} className="h-3" />
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-secondary rounded-lg">
              <p className="font-medium text-foreground">Upload Frequency</p>
              <p className="text-muted-foreground mt-0.5">Good — 3/week</p>
            </div>
            <div className="p-3 bg-secondary rounded-lg">
              <p className="font-medium text-foreground">Engagement</p>
              <p className="text-muted-foreground mt-0.5">Above avg — 8.3%</p>
            </div>
            <div className="p-3 bg-secondary rounded-lg">
              <p className="font-medium text-foreground">SEO</p>
              <p className="text-muted-foreground mt-0.5">Needs work — 58%</p>
            </div>
            <div className="p-3 bg-secondary rounded-lg">
              <p className="font-medium text-foreground">Thumbnails</p>
              <p className="text-muted-foreground mt-0.5">Strong — 82%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Videos */}
      <Card className="animate-fade-up stagger-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recent Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border">
                  <th className="text-left pb-2 font-medium">Title</th>
                  <th className="text-right pb-2 font-medium">Views</th>
                  <th className="text-right pb-2 font-medium">CTR</th>
                  <th className="text-right pb-2 font-medium">Retention</th>
                  <th className="text-right pb-2 font-medium">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentVideos.map((video) => (
                  <tr key={video.title} className="hover:bg-secondary/30 transition-colors">
                    <td className="py-3 font-medium">{video.title}</td>
                    <td className="py-3 text-right tabular-nums text-muted-foreground">{video.views}</td>
                    <td className="py-3 text-right tabular-nums text-muted-foreground">{video.ctr}</td>
                    <td className="py-3 text-right tabular-nums text-muted-foreground">{video.retention}</td>
                    <td className="py-3 text-right">
                      <span className={`inline-block h-2.5 w-2.5 rounded-full ${
                        video.status === "good" ? "bg-success" : video.status === "warning" ? "bg-accent" : "bg-destructive"
                      }`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
