import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw, Copy, Check, TrendingUp } from "lucide-react";

const niches = ["Tech", "Cooking", "Fitness", "Finance", "Gaming", "Lifestyle", "Education", "Comedy"];

const ideaBank: Record<string, string[]> = {
  Tech: [
    "5 Settings You're Not Using on Your Phone",
    "This AI Tool Replaces 10 Apps",
    "Why Your WiFi is Slow (and How to Fix It)",
    "Hidden Features in the Latest iOS Update",
    "I Tested the Cheapest Laptop on Amazon",
  ],
  Cooking: [
    "3 Meals Under $5 That Taste Amazing",
    "The Egg Trick That Changed My Mornings",
    "Restaurant Quality Pasta in 10 Minutes",
    "Stop Cutting Onions Like This",
    "One Pan Dinner You'll Make Every Week",
  ],
  Fitness: [
    "The Only 3 Exercises You Need",
    "I Did 100 Push-ups Daily for 30 Days",
    "Fix Your Posture in 60 Seconds",
    "Why Walking Burns More Fat Than Running",
    "Morning Stretch Routine (No Equipment)",
  ],
  Finance: [
    "The 50/30/20 Rule Explained in 30 Seconds",
    "3 Side Hustles That Actually Pay in 2024",
    "Why You're Saving Money Wrong",
    "This App Saved Me $200/Month",
    "Credit Score Myths Debunked",
  ],
  Gaming: [
    "Settings Pro Players Use That You Don't",
    "I Found the Rarest Item After 1000 Hours",
    "This Glitch Still Works in 2024",
    "5 Games You Can Finish in One Sitting",
    "The Controller Grip That Improved My Aim",
  ],
  Lifestyle: [
    "My Entire Morning Routine in 60 Seconds",
    "Room Makeover Under $50",
    "5 Habits That Changed My Life",
    "Things I Stopped Buying to Save Money",
    "Productivity Hack Nobody Talks About",
  ],
  Education: [
    "A History Fact That Sounds Fake But Isn't",
    "Learn Any Language in 3 Steps",
    "The Study Technique That Got Me A's",
    "Why Schools Don't Teach This",
    "Math Trick Your Teacher Never Showed You",
  ],
  Comedy: [
    "Things Only Introverts Understand",
    "When Your Alarm Goes Off vs When You Actually Get Up",
    "Types of People at the Gym",
    "Expectation vs Reality: Cooking Edition",
    "If Apps Were People",
  ],
};

export function IdeaGenerator() {
  const [selectedNiche, setSelectedNiche] = useState("Tech");
  const [ideas, setIdeas] = useState(ideaBank["Tech"]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const regenerate = () => {
    const shuffled = [...ideaBank[selectedNiche]].sort(() => Math.random() - 0.5);
    setIdeas(shuffled);
  };

  const selectNiche = (niche: string) => {
    setSelectedNiche(niche);
    setIdeas(ideaBank[niche]);
  };

  const copyIdea = (idea: string, idx: number) => {
    navigator.clipboard.writeText(idea);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <div className="space-y-8">
      <div className="animate-fade-up">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles size={24} className="text-accent" />
          Idea Generator
        </h2>
        <p className="text-muted-foreground mt-1">
          Get viral Short ideas tailored to your niche
        </p>
      </div>

      {/* Niche selector */}
      <div className="flex flex-wrap gap-2 animate-fade-up stagger-1">
        {niches.map((niche) => (
          <button
            key={niche}
            onClick={() => selectNiche(niche)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95 ${
              selectedNiche === niche
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "bg-card text-muted-foreground hover:bg-secondary border border-border"
            }`}
          >
            {niche}
          </button>
        ))}
      </div>

      {/* Ideas list */}
      <Card className="animate-fade-up stagger-2">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">
            <TrendingUp size={16} className="inline mr-2 text-primary" />
            Trending Ideas — {selectedNiche}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={regenerate} className="gap-1.5">
            <RefreshCw size={14} />
            Shuffle
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          {ideas.map((idea, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
            >
              <p className="text-sm font-medium pr-3">{idea}</p>
              <button
                onClick={() => copyIdea(idea, i)}
                className="shrink-0 h-8 w-8 rounded-md flex items-center justify-center hover:bg-card transition-colors active:scale-90"
              >
                {copiedIdx === i ? (
                  <Check size={14} className="text-success" />
                ) : (
                  <Copy size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                )}
              </button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
