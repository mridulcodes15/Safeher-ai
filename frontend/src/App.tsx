/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Dashboard from "./components/Dashboard";
import AuthGateway from "./components/AuthGateway";
import GuardianNetwork from "./components/GuardianNetwork";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<"dashboard" | "guardian">("dashboard");

  if (!isAuthenticated) {
    return <AuthGateway onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  if (currentView === "guardian") {
    return (
      <GuardianNetwork
        onBack={() => setCurrentView("dashboard")}
        onLock={() => {
          setIsAuthenticated(false);
          setCurrentView("dashboard");
        }}
      />
    );
  }

  return (
    <Dashboard
      onLock={() => {
        setIsAuthenticated(false);
        setCurrentView("dashboard");
      }}
      onNavigateToGuardian={() => setCurrentView("guardian")}
    />
  );
}

