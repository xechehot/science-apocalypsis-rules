import { useState, useRef, useEffect } from 'react';
import { Search, X, FileText, Book, Settings2, RotateCw, AlertTriangle, Lightbulb } from 'lucide-react';
import { useSearch } from '../../hooks/useSearch';
import type { SearchResult } from '../../types';

const typeIcons: Record<SearchResult['type'], typeof FileText> = {
  rule: FileText,
  glossary: Book,
  setup: Settings2,
  phase: RotateCw,
  exception: AlertTriangle,
  tip: Lightbulb
};

const typeLabels: Record<SearchResult['type'], string> = {
  rule: 'Правило',
  glossary: 'Термин',
  setup: 'Подготовка',
  phase: 'Фаза',
  exception: 'Исключение',
  tip: 'Совет'
};

interface QuickSearchProps {
  onResultsChange?: (results: SearchResult[]) => void;
  onResultSelect?: (result: SearchResult) => void;
}

export function QuickSearch({ onResultsChange, onResultSelect }: QuickSearchProps) {
  const { query, setQuery, results } = useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onResultsChange?.(results);
  }, [results, onResultsChange]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (result: SearchResult) => {
    onResultSelect?.(result);
    setIsOpen(false);
    setQuery('');
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Поиск по правилам..."
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-9 pr-9 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {results.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Ничего не найдено
            </div>
          ) : (
            <ul>
              {results.slice(0, 10).map(result => {
                const Icon = typeIcons[result.type];
                return (
                  <li key={`${result.type}-${result.id}`}>
                    <button
                      onClick={() => handleResultClick(result)}
                      className="w-full p-3 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-left border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <Icon className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {highlightMatch(result.title, query)}
                          </span>
                          <span className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                            {typeLabels[result.type]}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {highlightMatch(result.content, query)}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
              {results.length > 10 && (
                <li className="p-2 text-center text-sm text-gray-500 bg-gray-50 dark:bg-gray-700">
                  +{results.length - 10} ещё результатов
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
