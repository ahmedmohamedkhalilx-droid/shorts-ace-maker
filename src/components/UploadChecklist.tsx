import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Square, RotateCcw, PartyPopper } from "lucide-react";

interface CheckItem {
  id: string;
  label: string;
  description: string;
  checked: boolean;
}

const initialChecklist: CheckItem[] = [
  { id: "hook", label: "Strong hook in first 2 seconds", description: "Grab attention immediately with a question, statement, or visual", checked: false },
  { id: "vertical", label: "9:16 vertical format", description: "Film or crop to 1080x1920 resolution", checked: false },
  { id: "duration", label: "Under 60 seconds", description: "Shorts must be 60 seconds or less — aim for 15-30s", checked: false },
  { id: "captions", label: "Add captions/subtitles", description: "85% of viewers watch without sound — captions are essential", checked: false },
  { id: "title", label: "Optimized title (under 40 chars)", description: "Use numbers, power words, and be specific", checked: false },
  { id: "hashtags", label: "Include #Shorts hashtag", description: "Always include #Shorts plus 2-3 relevant hashtags", checked: false },
  { id: "thumbnail", label: "Custom thumbnail set", description: "Eye-catching thumbnail even though most viewers see autoplay", checked: false },
  { id: "description", label: "Description with keywords", description: "2-3 sentences with relevant keywords for discoverability", checked: false },
  { id: "cta", label: "Call-to-action included", description: "Ask viewers to subscribe, like, or comment", checked: false },
  { id: "music", label: "Trending audio (if applicable)", description: "Use popular sounds to boost algorithm reach", checked: false },
];

export function UploadChecklist() {
  const [items, setItems] = useState(initialChecklist);

  const toggle = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const reset = () => setItems(initialChecklist);

  const completed = items.filter((i) => i.checked).length;
  const total = items.length;
  const allDone = completed === total;

  return (
    <div className="space-y-8">
      <div className="animate-fade-up">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <CheckSquare size={24} className="text-success" />
          Upload Checklist
        </h2>
        <p className="text-muted-foreground mt-1">
          Make sure every Short is optimized before publishing
        </p>
      </div>

      {/* Progress bar */}
      <Card className="animate-fade-up stagger-1">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {allDone && <PartyPopper size={18} className="text-accent" />}
              <span className="text-sm font-semibold">
                {allDone ? "All set! Ready to publish 🎉" : `${completed} of ${total} completed`}
              </span>
            </div>
            <button
              onClick={reset}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          </div>
          <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${(completed / total) * 100}%`,
                backgroundColor: allDone ? "hsl(var(--success))" : "hsl(var(--primary))",
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Checklist */}
      <Card className="animate-fade-up stagger-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Pre-Publish Checks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors text-left active:scale-[0.99]"
            >
              {item.checked ? (
                <CheckSquare size={18} className="text-success mt-0.5 shrink-0" />
              ) : (
                <Square size={18} className="text-muted-foreground mt-0.5 shrink-0" />
              )}
              <div>
                <p className={`text-sm font-medium transition-colors ${item.checked ? "text-muted-foreground line-through" : ""}`}>
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
