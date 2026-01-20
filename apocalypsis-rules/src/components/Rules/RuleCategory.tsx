import { useState } from 'react';
import { gameRulesData } from '../../data/gameRules';
import { RuleCard } from './RuleCard';
import { Collapsible } from '../common/Collapsible';
import { AlertTriangle } from 'lucide-react';
import type { RuleCategory as RuleCategoryType } from '../../types';

const categoryLabels: Record<RuleCategoryType, string> = {
  agents: 'Агенты',
  resources: 'Ресурсы',
  checks: 'Проверки',
  tasks: 'Задания',
  disasters: 'Бедствия',
  vatican: 'Ватикан',
  northKorea: 'Северная Корея',
  regions: 'Регионы',
  tracks: 'Треки',
  enhancements: 'Усиления',
  healing: 'Лечение',
  combat: 'Бой',
  endgame: 'Конец игры'
};

const categoryOrder: RuleCategoryType[] = [
  'agents',
  'checks',
  'tasks',
  'disasters',
  'vatican',
  'northKorea',
  'regions',
  'tracks',
  'enhancements',
  'healing',
  'endgame'
];

export function RulesSection() {
  const [activeCategory, setActiveCategory] = useState<RuleCategoryType | 'all' | 'exceptions'>('all');

  // Group rules by category
  const rulesByCategory = gameRulesData.rules.reduce((acc, rule) => {
    if (!acc[rule.category]) {
      acc[rule.category] = [];
    }
    acc[rule.category].push(rule);
    return acc;
  }, {} as Record<RuleCategoryType, typeof gameRulesData.rules>);

  const categories = categoryOrder.filter(cat => rulesByCategory[cat]?.length > 0);

  const filteredRules =
    activeCategory === 'all'
      ? gameRulesData.rules
      : activeCategory === 'exceptions'
      ? gameRulesData.rules.filter(r => r.isException || r.isImportant)
      : rulesByCategory[activeCategory] || [];

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-gray-900 dark:text-white mb-3">
          Фильтр по категории
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === 'all'
                ? 'bg-rose-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Все правила
          </button>
          <button
            onClick={() => setActiveCategory('exceptions')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
              activeCategory === 'exceptions'
                ? 'bg-red-500 text-white'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            Важное
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-rose-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Exceptions Alert */}
      {activeCategory === 'all' && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <h4 className="font-medium text-red-800 dark:text-red-200 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Ключевые исключения
          </h4>
          <ul className="mt-2 space-y-1">
            {gameRulesData.exceptions.filter(e => e.priority === 'high').map(exc => (
              <li key={exc.id} className="text-sm text-red-700 dark:text-red-300">
                <strong>{exc.rule}:</strong> {exc.exception}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Rules List */}
      {activeCategory === 'all' ? (
        // Show by category
        <div className="space-y-4">
          {categories.map(cat => (
            <Collapsible
              key={cat}
              title={categoryLabels[cat]}
              badge={`${rulesByCategory[cat].length}`}
              badgeColor="bg-gray-500"
              defaultOpen={cat === 'agents'}
            >
              <div className="space-y-3">
                {rulesByCategory[cat].map(rule => (
                  <RuleCard key={rule.id} rule={rule} />
                ))}
              </div>
            </Collapsible>
          ))}
        </div>
      ) : (
        // Show filtered rules
        <div className="space-y-3">
          {filteredRules.map(rule => (
            <RuleCard key={rule.id} rule={rule} />
          ))}
        </div>
      )}
    </div>
  );
}
