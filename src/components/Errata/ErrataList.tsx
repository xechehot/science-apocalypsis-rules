import { gameRulesData } from '../../data/gameRules';
import { AlertTriangle, CheckCircle, FileText, User, Users, BookOpen, Puzzle, GraduationCap } from 'lucide-react';
import type { Erratum } from '../../types';

const itemTypeIcons: Record<Erratum['itemType'], typeof FileText> = {
  card: FileText,
  agent: User,
  faction: Users,
  rule: BookOpen,
  component: Puzzle,
  tutorial: GraduationCap
};

const itemTypeLabels: Record<Erratum['itemType'], string> = {
  card: 'Карта',
  agent: 'Агент',
  faction: 'Фракция',
  rule: 'Правила',
  component: 'Компонент',
  tutorial: 'Обучение'
};

function ErrataCard({ erratum }: { erratum: Erratum }) {
  const Icon = itemTypeIcons[erratum.itemType];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              erratum.affectsGameplay
                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            {erratum.number}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {erratum.title}
              </h3>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                  erratum.affectsGameplay
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                <Icon className="w-3 h-3" />
                {itemTypeLabels[erratum.itemType]}
              </span>
              {erratum.affectsGameplay && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                  <AlertTriangle className="w-3 h-3" />
                  Влияет на игру
                </span>
              )}
            </div>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium text-gray-700 dark:text-gray-300">Проблема:</span>{' '}
              {erratum.description}
            </p>

            <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-200 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  <span className="font-medium">Решение:</span> {erratum.solution}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ErrataList() {
  const gameplayAffecting = gameRulesData.errata.filter(e => e.affectsGameplay);
  const cosmetic = gameRulesData.errata.filter(e => !e.affectsGameplay);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <h2 className="font-medium text-amber-800 dark:text-amber-200 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Известные опечатки и исправления
        </h2>
        <p className="mt-2 text-sm text-amber-700 dark:text-amber-300">
          Этот список содержит известные ошибки в печатной версии правил и карт, обнаруженные авторами игры.
          Исправления, влияющие на геймплей, отмечены оранжевым цветом.
        </p>
      </div>

      {/* Gameplay-affecting errata */}
      {gameplayAffecting.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Влияющие на геймплей ({gameplayAffecting.length})
          </h3>
          <div className="space-y-3">
            {gameplayAffecting.map(erratum => (
              <ErrataCard key={erratum.id} erratum={erratum} />
            ))}
          </div>
        </div>
      )}

      {/* Cosmetic errata */}
      {cosmetic.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-500" />
            Косметические и опечатки ({cosmetic.length})
          </h3>
          <div className="space-y-3">
            {cosmetic.map(erratum => (
              <ErrataCard key={erratum.id} erratum={erratum} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
