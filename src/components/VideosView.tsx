import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PlaySquare,
  Eye,
  ThumbsUp,
  MessageSquare,
  Clock,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface VideoData {
  id: string;
  title: string;
  published: string;
  views: string;
  likes: string;
  comments: string;
  watchTime: string;
  ctr: number;
  retention: number;
  impressions: string;
  issues: string[];
  strengths: string[];
}

const videos: VideoData[] = [
  {
    id: "1", title: "10 VS Code Extensions You Need in 2024", published: "3 days ago",
    views: "42,100", likes: "2,847", comments: "312", watchTime: "5:12",
    ctr: 7.2, retention: 62, impressions: "584K",
    issues: ["Description could use more keywords", "No end screen card detected"],
    strengths: ["Strong hook — 89% stayed past 30s", "Thumbnail CTR above channel average", "High comment engagement"],
  },
  {
    id: "2", title: "Why I Switched to Linux Full Time", published: "1 week ago",
    views: "28,400", likes: "1,923", comments: "487", watchTime: "6:45",
    ctr: 5.1, retention: 48, impressions: "556K",
    issues: ["Retention drops at 2:30 — consider tightening intro", "CTR below channel avg (6.1%)", "Title doesn't include searchable keywords"],
    strengths: ["High comment-to-view ratio", "Strong like ratio"],
  },
  {
    id: "3", title: "Build a REST API in 20 Minutes", published: "2 weeks ago",
    views: "19,700", likes: "1,456", comments: "198", watchTime: "8:20",
    ctr: 6.8, retention: 55, impressions: "289K",
    issues: ["Video longer than optimal (20 min) — consider splitting", "Tags missing trending keywords"],
    strengths: ["Excellent retention for tutorial length", "Good keyword in title", "Consistent watch time"],
  },
  {
    id: "4", title: "My Dev Setup Tour 2024", published: "3 weeks ago",
    views: "15,200", likes: "890", comments: "142", watchTime: "3:48",
    ctr: 3.9, retention: 41, impressions: "389K",
    issues: ["Low CTR — thumbnail may not stand out", "Retention below 50% — viewers leaving early", "Generic title — add specifics (e.g. 'M3 MacBook Pro')"],
    strengths: ["Good engagement in comments"],
  },
];

export function VideosView() {
  const [expandedId, setExpandedId] = useState<string | null>("1");

  return (
    <div className="space-y-8">
      <div className="animate-fade-up">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <PlaySquare size={24} className="text-primary" />
          Video Analysis
        </h2>
        <p className="text-muted-foreground mt-1">
          Deep dive into each video's performance
        </p>
      </div>

      <div className="space-y-3">
        {videos.map((video, i) => {
          const expanded = expandedId === video.id;
          return (
            <Card key={video.id} className={`animate-fade-up stagger-${i + 1} transition-shadow hover:shadow-md`}>
              <button
                onClick={() => setExpandedId(expanded ? null : video.id)}
                className="w-full text-left"
              >
                <CardHeader className="pb-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <CardTitle className="text-base leading-snug">{video.title}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">Published {video.published}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                      <span className="hidden sm:flex items-center gap-1"><Eye size={12} /> {video.views}</span>
                      <span className={`font-medium ${video.ctr >= 6 ? "text-success" : video.ctr >= 4.5 ? "text-accent-foreground" : "text-destructive"}`}>
                        {video.ctr}% CTR
                      </span>
                      {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>
                </CardHeader>
              </button>

              {expanded && (
                <CardContent className="pt-4 animate-scale-in">
                  {/* Metrics row */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
                    {[
                      { icon: Eye, label: "Views", value: video.views },
                      { icon: ThumbsUp, label: "Likes", value: video.likes },
                      { icon: MessageSquare, label: "Comments", value: video.comments },
                      { icon: Clock, label: "Avg. Watch", value: video.watchTime },
                      { icon: TrendingUp, label: "Impressions", value: video.impressions },
                    ].map((m) => (
                      <div key={m.label} className="p-3 bg-secondary rounded-lg">
                        <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                          <m.icon size={12} />
                          <span className="text-[10px] font-medium uppercase tracking-wider">{m.label}</span>
                        </div>
                        <p className="text-sm font-bold tabular-nums">{m.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Retention bar */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-medium">Audience Retention</span>
                      <span className={`font-bold tabular-nums ${video.retention >= 55 ? "text-success" : video.retention >= 45 ? "text-accent-foreground" : "text-destructive"}`}>
                        {video.retention}%
                      </span>
                    </div>
                    <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${video.retention}%`,
                          backgroundColor: video.retention >= 55
                            ? "hsl(var(--success))"
                            : video.retention >= 45
                            ? "hsl(var(--accent))"
                            : "hsl(var(--destructive))",
                        }}
                      />
                    </div>
                  </div>

                  {/* Issues & Strengths */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-destructive mb-2 flex items-center gap-1.5">
                        <AlertCircle size={12} /> Issues to Fix
                      </p>
                      <div className="space-y-1.5">
                        {video.issues.map((issue, j) => (
                          <p key={j} className="text-xs text-muted-foreground bg-destructive/5 p-2.5 rounded-md">
                            {issue}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-success mb-2 flex items-center gap-1.5">
                        <CheckCircle2 size={12} /> Strengths
                      </p>
                      <div className="space-y-1.5">
                        {video.strengths.map((s, j) => (
                          <p key={j} className="text-xs text-muted-foreground bg-success/5 p-2.5 rounded-md">
                            {s}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
