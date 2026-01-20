import { useState, useMemo } from 'react';
import { gameRulesData } from '../../data/gameRules';
import type { GlossaryTerm } from '../../types';
import { Search, Coins, Brain, Users, Box, Cog, Map, Activity } from 'lucide-react';

const categoryLabels: Record<GlossaryTerm['category'], string> = {
  resource: 'Ресурсы',
  characteristic: 'Характеристики',
  class: 'Классы',
  component: 'Компоненты',
  mechanic: 'Механики',
  region: 'Регионы',
  status: 'Состояния'
};

const categoryIcons: Record<GlossaryTerm['category'], typeof Coins> = {
  resource: Coins,
  characteristic: Brain,
  class: Users,
  component: Box,
  mechanic: Cog,
  region: Map,
  status: Activity
};

const categoryColors: Record<GlossaryTerm['category'], string> = {
  resource: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  characteristic: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  class: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  component: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
  mechanic: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
  region: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
  status: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
};

export function GlossaryList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<GlossaryTerm['category'] | 'all'>('all');

  const filteredTerms = useMemo(() => {
    let terms = [...gameRulesData.glossary];

    // Filter by category
    if (activeCategory !== 'all') {
      terms = terms.filter(t => t.category === activeCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      terms = terms.filter(
        t =>
          t.term.toLowerCase().includes(query) ||
          t.definition.toLowerCase().includes(query)
      );
    }

    // Sort alphabetically
    return terms.sort((a, b) => a.term.localeCompare(b.term, 'ru'));
  }, [searchQuery, activeCategory]);

  // Get unique categories
  const categories = Array.from(
    new Set(gameRulesData.glossary.map(t => t.category))
  ) as GlossaryTerm['category'][];

  // Group terms by first letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, typeof filteredTerms> = {};
    filteredTerms.forEach(term => {
      const letter = term.term[0].toUpperCase();
      if (!groups[letter]) {
        groups[letter] = [];
      }
      groups[letter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  const letters = Object.keys(groupedTerms).sort((a, b) => a.localeCompare(b, 'ru'));

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск терминов..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        {/* Category Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Категории:</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-rose-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Все
            </button>
            {categories.map(cat => {
              const Icon = categoryIcons[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    activeCategory === cat
                      ? 'bg-rose-500 text-white'
                      : categoryColors[cat]
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {categoryLabels[cat]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Alphabet Quick Jump */}
      {letters.length > 5 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-1">
            {letters.map(letter => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-rose-100 dark:hover:bg-rose-900 hover:text-rose-700 dark:hover:text-rose-300 text-sm font-medium transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Terms List */}
      {filteredTerms.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Ничего не найдено
        </div>
      ) : (
        <div className="space-y-6">
          {letters.map(letter => (
            <div key={letter} id={`letter-${letter}`}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300">
                  {letter}
                </span>
              </h3>
              <div className="space-y-2">
                {groupedTerms[letter].map(term => {
                  const Icon = categoryIcons[term.category];
                  return (
                    <div
                      key={term.id}
                      id={term.id}
                      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${categoryColors[term.category]}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {term.term}
                            </h4>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[term.category]}`}>
                              {categoryLabels[term.category]}
                            </span>
                          </div>
                          <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">
                            {term.definition}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
