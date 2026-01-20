import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navigation/Navbar';
import { CategoryTabs } from './components/Navigation/CategoryTabs';
import { GameOverview } from './components/Overview/GameOverview';
import { SetupWizard } from './components/Setup/SetupWizard';
import { TurnPhases } from './components/TurnReference/TurnPhases';
import { RulesSection } from './components/Rules/RuleCategory';
import { GlossaryList } from './components/Glossary/GlossaryList';
import type { TabId } from './types';

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <GameOverview />;
      case 'setup':
        return <SetupWizard />;
      case 'turn':
        return <TurnPhases />;
      case 'rules':
        return <RulesSection />;
      case 'glossary':
        return <GlossaryList />;
      default:
        return <GameOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {renderContent()}
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-4 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
          Помощник по правилам для настольной игры «Апокалипсис»
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
