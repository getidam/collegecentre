import React from "react";
import { RouterProvider, useRouterState } from "@/lib/router";
import { AppShell } from "@/components/app-shell";
import { HomeView } from "@/components/views/HomeView";
import { NotesView } from "@/components/views/NotesView";
import { NoteDetailView } from "@/components/views/NoteDetailView";
import { JobsView } from "@/components/views/JobsView";
import { AlertsView } from "@/components/views/AlertsView";
import { PlannerView } from "@/components/views/PlannerView";
import { CampusView } from "@/components/views/CampusView";

function AppContent() {
  const pathname = useRouterState((s) => s.location.pathname);

  const renderCurrentView = () => {
    if (pathname.startsWith("/notes/")) {
      const id = pathname.replace("/notes/", "").split("?")[0];
      return <NoteDetailView id={id} />;
    }
    if (pathname.startsWith("/notes")) {
      return <NotesView />;
    }
    if (pathname.startsWith("/jobs")) {
      return <JobsView />;
    }
    if (pathname.startsWith("/alerts")) {
      return <AlertsView />;
    }
    if (pathname.startsWith("/planner")) {
      return <PlannerView />;
    }
    if (pathname.startsWith("/campus")) {
      return <CampusView />;
    }
    return <HomeView />;
  };

  return <AppShell>{renderCurrentView()}</AppShell>;
}

export function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}

export default App;
