import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { DashboardView } from "@/components/DashboardView";
import { IdeaGenerator } from "@/components/IdeaGenerator";
import { TitleOptimizer } from "@/components/TitleOptimizer";
import { UploadChecklist } from "@/components/UploadChecklist";
import { ContentCalendar } from "@/components/ContentCalendar";

type View = "dashboard" | "ideas" | "optimizer" | "checklist" | "calendar";

const Index = () => {
  const [activeView, setActiveView] = useState<View>("dashboard");

  const renderView = () => {
    switch (activeView) {
      case "dashboard": return <DashboardView />;
      case "ideas": return <IdeaGenerator />;
      case "optimizer": return <TitleOptimizer />;
      case "checklist": return <UploadChecklist />;
      case "calendar": return <ContentCalendar />;
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
