import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { DashboardView } from "@/components/DashboardView";
import { VideosView } from "@/components/VideosView";
import { SuggestionsView } from "@/components/SuggestionsView";
import { GrowthView } from "@/components/GrowthView";
import { CompetitorView } from "@/components/CompetitorView";

type View = "dashboard" | "videos" | "suggestions" | "growth" | "competitors";

const Index = () => {
  const [activeView, setActiveView] = useState<View>("dashboard");

  const renderView = () => {
    switch (activeView) {
      case "dashboard": return <DashboardView />;
      case "videos": return <VideosView />;
      case "suggestions": return <SuggestionsView />;
      case "growth": return <GrowthView />;
      case "competitors": return <CompetitorView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-6 md:p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default Index;
