import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Eye, TrendingUp, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface Competitor {
  name: string;
  subscribers: string;
  avgViews: string;
  uploadFreq: string;
  ctr: string;
  trend: "up" | "down" | "flat";
  insights: string[];
}

const competitors: Competitor[] = [
  {
    name: "CodeWithSarah",
    subscribers: "142K",
    avgViews: "89K",
    uploadFreq: "2/week",
    ctr: "8.4%",
    trend: "up",
    insights: [
      "Uses face + code combo thumbnails — try this format",
      "Titles always include a specific number ('7 tricks', '3 mistakes')",
      "Average video length 8–12 min — shorter than yours",
    ],
  },
  {
    name: "DevMasterclass",
    subscribers: "98K",
    avgViews: "45K",
    uploadFreq: "3/week",
    ctr: "5.9%",
    trend: "flat",
    insights: [
      "Higher upload frequency but lower per-video views",
      "Heavy use of Shorts to drive main channel traffic",
      "Descriptions are SEO-optimized with timestamps",
    ],
  },
  {
    name: "TechBrief",
    subscribers: "67K",
    avgViews: "112K",
    uploadFreq: "1/week",
    ctr: "9.1%",
    trend: "up",
    insights: [
      "Posts less but gets higher views — quality over quantity",
      "Thumbnail style: bold single word + clean background",
      "Strong community tab engagement between uploads",
    ],
  },
  {
    name: "BuildWithMe",
    subscribers: "31K",
    avgViews: "22K",
    uploadFreq: "4/week",
    ctr: "4.2%",
    trend: "down",
    insights: [
      "Burning out audience with too many uploads",
      "Inconsistent thumbnail style — no brand recognition",
      "Good example of what NOT to do with frequency",
    ],
  },
];

const yourStats = {
  subscribers: "18.7K",
  avgViews: "34.5K",
  uploadFreq: "3/week",
  ctr: "5.8%",
};

export function CompetitorView() {
  return (
    <div className="space-y-8">
      <div className="animate-fade-up">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Users size={24} className="text-primary" />
          Competitor Analysis
        </h2>
        <p className="text-muted-foreground mt-1">
          See how you compare and learn from top channels in your niche
        </p>
      </div>

      {/* Comparison table */}
      <Card className="animate-fade-up stagger-1 overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary text-xs text-muted-foreground">
                  <th className="text-left p-4 font-medium">Channel</th>
                  <th className="text-right p-4 font-medium">Subs</th>
                  <th className="text-right p-4 font-medium">Avg Views</th>
                  <th className="text-right p-4 font-medium">Uploads</th>
                  <th className="text-right p-4 font-medium">CTR</th>
                  <th className="text-right p-4 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {/* Your channel */}
                <tr className="bg-primary/5 font-medium">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[10px] font-bold">
                        YOU
                      </div>
                      <span>Your Channel</span>
                    </div>
                  </td>
                  <td className="p-4 text-right tabular-nums">{yourStats.subscribers}</td>
                  <td className="p-4 text-right tabular-nums">{yourStats.avgViews}</td>
                  <td className="p-4 text-right">{yourStats.uploadFreq}</td>
                  <td className="p-4 text-right tabular-nums">{yourStats.ctr}</td>
                  <td className="p-4 text-right">
                    <ArrowUpRight size={14} className="text-success inline" />
                  </td>
                </tr>
                {competitors.map((c) => (
                  <tr key={c.name} className="hover:bg-secondary/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center text-muted-foreground text-[10px] font-bold">
                          {c.name.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-medium">{c.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right tabular-nums text-muted-foreground">{c.subscribers}</td>
                    <td className="p-4 text-right tabular-nums text-muted-foreground">{c.avgViews}</td>
                    <td className="p-4 text-right text-muted-foreground">{c.uploadFreq}</td>
                    <td className="p-4 text-right tabular-nums text-muted-foreground">{c.ctr}</td>
                    <td className="p-4 text-right">
                      {c.trend === "up" && <ArrowUpRight size={14} className="text-success inline" />}
                      {c.trend === "down" && <ArrowDownRight size={14} className="text-destructive inline" />}
                      {c.trend === "flat" && <Minus size={14} className="text-muted-foreground inline" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Detailed insights per competitor */}
      <div className="space-y-3">
        {competitors.map((c, i) => (
          <Card key={c.name} className={`animate-fade-up stagger-${Math.min(i + 2, 6)} hover:shadow-md transition-shadow`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-[9px] font-bold text-muted-foreground">
                  {c.name.slice(0, 2).toUpperCase()}
                </div>
                {c.name}
                <span className="text-xs font-normal text-muted-foreground">· {c.subscribers} subs</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                What you can learn
              </p>
              <div className="space-y-1.5">
                {c.insights.map((insight, j) => (
                  <p key={j} className="text-xs text-muted-foreground bg-secondary/50 p-2.5 rounded-md">
                    💡 {insight}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
