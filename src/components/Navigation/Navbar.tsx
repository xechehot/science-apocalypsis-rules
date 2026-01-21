import { BookOpen } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { QuickSearch } from '../Search/QuickSearch';
import type { SearchResult } from '../../types';

interface NavbarProps {
  onSearchResults?: (results: unknown[]) => void;
  onResultSelect?: (result: SearchResult) => void;
}

export function Navbar({ onSearchResults, onResultSelect }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-100 dark:bg-rose-900 rounded-lg">
              <BookOpen className="w-6 h-6 text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Научный Апокалипсис
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Помощник по правилам
              </p>
            </div>
          </div>

          <div className="flex-1 max-w-md">
            <QuickSearch onResultsChange={onSearchResults} onResultSelect={onResultSelect} />
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
