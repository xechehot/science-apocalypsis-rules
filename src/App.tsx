import { useState, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navigation/Navbar';
import { CategoryTabs } from './components/Navigation/CategoryTabs';
import { GameOverview } from './components/Overview/GameOverview';
import { SetupWizard } from './components/Setup/SetupWizard';
import { TurnPhases } from './components/TurnReference/TurnPhases';
import { RulesSection } from './components/Rules/RuleCategory';
import { GlossaryList } from './components/Glossary/GlossaryList';
import { ErrataList } from './components/Errata/ErrataList';
import type { TabId, SearchResult } from './types';

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [scrollTargetId, setScrollTargetId] = useState<string | null>(null);

  const handleSearchResultSelect = useCallback((result: SearchResult) => {
    // Map search result type to tab
    const typeToTab: Record<SearchResult['type'], TabId> = {
      rule: 'rules',
      glossary: 'glossary',
      setup: 'setup',
      phase: 'turn',
      exception: 'rules',
      tip: 'overview'
    };

    const targetTab = typeToTab[result.type];
    setActiveTab(targetTab);
    setScrollTargetId(result.id);
  }, []);

  const handleScrollComplete = useCallback(() => {
    setScrollTargetId(null);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <GameOverview />;
      case 'setup':
        return <SetupWizard />;
      case 'turn':
        return <TurnPhases />;
      case 'rules':
        return <RulesSection scrollTargetId={scrollTargetId} onScrollComplete={handleScrollComplete} />;
      case 'glossary':
        return <GlossaryList />;
      case 'errata':
        return <ErrataList />;
      default:
        return <GameOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar onResultSelect={handleSearchResultSelect} />
      <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {renderContent()}
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-4 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500 space-y-2">
          <p>Помощник по правилам для настольной игры «Научный Апокалипсис»</p>
          <p>
            Неофициальное приложение, создано фан сообществом by xechehot
          </p>
          <p className="space-x-4">
            <a href="https://scientificapocalypse.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 dark:hover:text-gray-300 underline">
              Официальный сайт игры
            </a>
            <span>•</span>
            <a href="https://github.com/xechehot/science-apocalypsis-rules" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 dark:hover:text-gray-300 underline">
              GitHub
            </a>
          </p>
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
