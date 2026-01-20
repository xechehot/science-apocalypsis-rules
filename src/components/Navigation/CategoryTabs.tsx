import { Info, Settings, RotateCw, BookText, Book, AlertTriangle } from 'lucide-react';
import type { TabId } from '../../types';

interface CategoryTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: typeof Info }[] = [
  { id: 'overview', label: 'Обзор', icon: Info },
  { id: 'setup', label: 'Подготовка', icon: Settings },
  { id: 'turn', label: 'Ход игры', icon: RotateCw },
  { id: 'rules', label: 'Правила', icon: BookText },
  { id: 'glossary', label: 'Глоссарий', icon: Book },
  { id: 'errata', label: 'Опечатки', icon: AlertTriangle }
];

export function CategoryTabs({ activeTab, onTabChange }: CategoryTabsProps) {
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-[73px] z-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide -mb-px">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 border-b-2 whitespace-nowrap transition-colors
                  ${
                    isActive
                      ? 'border-rose-500 text-rose-600 dark:text-rose-400'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
