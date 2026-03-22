import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Type, Hash, Wand2, Copy, Check, AlertCircle } from "lucide-react";

const hashtagSuggestions: Record<string, string[]> = {
  tech: ["#tech", "#shorts", "#techtok", "#gadgets", "#tipsandtricks", "#iphone", "#android", "#ai"],
  cooking: ["#shorts", "#cooking", "#recipe", "#foodie", "#easyrecipe", "#mealprep", "#quickmeals"],
  fitness: ["#shorts", "#fitness", "#workout", "#gym", "#exercise", "#health", "#motivation"],
  general: ["#shorts", "#viral", "#trending", "#fyp", "#youtubeshorts", "#explore"],
};

const titleTips = [
  { rule: "Start with a number", example: "5 Things…", good: true },
  { rule: "Keep under 40 characters", example: "Short titles get more clicks", good: true },
  { rule: "Use power words", example: "Hidden, Secret, Hack, Trick", good: true },
  { rule: "Avoid clickbait", example: "Delivers on the promise", good: true },
  { rule: "Don't use ALL CAPS", example: "Looks spammy", good: false },
];

export function TitleOptimizer() {
  const [title, setTitle] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const titleLength = title.length;
  const isGoodLength = titleLength > 0 && titleLength <= 40;
  const hasNumber = /\d/.test(title);
  const score = Math.min(100, (isGoodLength ? 40 : titleLength > 40 ? 10 : 0) + (hasNumber ? 30 : 0) + (titleLength > 5 ? 30 : 0));

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const copyAll = () => {
    const text = `${title}\n\n${selectedTags.join(" ")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-8">
      <div className="animate-fade-up">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Type size={24} className="text-primary" />
          Title & Tag Optimizer
        </h2>
        <p className="text-muted-foreground mt-1">
          Craft click-worthy titles and pick the right hashtags
        </p>
      </div>

      {/* Title Input */}
      <Card className="animate-fade-up stagger-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Your Title</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Input
              placeholder="e.g. 5 Hidden iPhone Features You Need"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="pr-16 h-12 text-base"
              maxLength={70}
            />
            <span
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium tabular-nums ${
                titleLength > 40 ? "text-destructive" : "text-muted-foreground"
              }`}
            >
              {titleLength}/40
            </span>
          </div>

          {/* Score */}
          {title.length > 0 && (
            <div className="flex items-center gap-4 animate-scale-in">
              <div className="relative h-14 w-14">
                <svg className="h-14 w-14 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke={score >= 70 ? "hsl(var(--success))" : score >= 40 ? "hsl(var(--accent))" : "hsl(var(--destructive))"}
                    strokeWidth="3"
                    strokeDasharray={`${score} ${100 - score}`}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold tabular-nums">
                  {score}
                </span>
              </div>
              <div className="text-sm">
                <p className="font-medium">
                  {score >= 70 ? "Great title!" : score >= 40 ? "Getting there" : "Needs work"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {!hasNumber && "Try starting with a number. "}
                  {titleLength > 40 && "Shorten it a bit. "}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Title Tips */}
      <Card className="animate-fade-up stagger-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Wand2 size={16} className="text-accent" />
            Title Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {titleTips.map((tip) => (
              <div key={tip.rule} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-secondary/50 transition-colors">
                {tip.good ? (
                  <Check size={16} className="text-success mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle size={16} className="text-destructive mt-0.5 shrink-0" />
                )}
                <div>
                  <p className="text-sm font-medium">{tip.rule}</p>
                  <p className="text-xs text-muted-foreground">{tip.example}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hashtag Picker */}
      <Card className="animate-fade-up stagger-3">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Hash size={16} className="text-primary" />
            Hashtag Picker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(hashtagSuggestions).map(([category, tags]) => (
            <div key={category}>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 active:scale-95 ${
                      selectedTags.includes(tag)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {selectedTags.length > 0 && (
            <div className="pt-3 border-t border-border animate-scale-in">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-muted-foreground">
                  {selectedTags.length} tags selected
                </p>
                <Button variant="ghost" size="sm" onClick={copyAll} className="gap-1.5 h-8">
                  {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy All"}
                </Button>
              </div>
              <p className="text-sm bg-secondary p-3 rounded-lg break-all">
                {selectedTags.join(" ")}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
