import { Collapsible } from '../common/Collapsible';
import { gameRulesData } from '../../data/gameRules';
import { Play, ShoppingCart, FileStack, Swords, ScrollText, Globe, Flag, AlertCircle, Coins, Users } from 'lucide-react';

const phaseIcons: Record<string, typeof Play> = {
  start: Play,
  purchase: ShoppingCart,
  tasks: FileStack,
  actions: Swords,
  resolution: ScrollText,
  world: Globe,
  end: Flag
};

const phaseColors: Record<string, string> = {
  start: 'bg-blue-500',
  purchase: 'bg-green-500',
  tasks: 'bg-yellow-500',
  actions: 'bg-orange-500',
  resolution: 'bg-red-500',
  world: 'bg-purple-500',
  end: 'bg-gray-500'
};

export function TurnPhases() {
  return (
    <div className="space-y-6">
      {/* Turn Structure Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          Структура раунда
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {gameRulesData.turnStructure.description}
        </p>

        {/* Visual Phase Flow */}
        <div className="mt-4 flex flex-wrap gap-2">
          {gameRulesData.turnStructure.phases.map((phase, index) => (
            <div key={phase.id} className="flex items-center">
              <div
                className={`px-3 py-1 rounded-full text-white text-sm font-medium ${phaseColors[phase.id]}`}
              >
                {phase.order}. {phase.name}
              </div>
              {index < gameRulesData.turnStructure.phases.length - 1 && (
                <span className="mx-1 text-gray-400">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dice Check Reference */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Быстрая справка: Проверки
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-700 dark:text-amber-300">
          <div>
            <p><strong>Успех:</strong> 5 или 6 на кубике</p>
            <p><strong>Критический успех:</strong> больше успехов, чем требуется</p>
          </div>
          <div>
            <p><strong>Модификаторы треков:</strong></p>
            <p>1-5 = +1 | 6-10 = +2 | 11+ = +3</p>
          </div>
        </div>
      </div>

      {/* Phase Details */}
      <div className="space-y-3">
        {gameRulesData.turnStructure.phases.map(phase => {
          const Icon = phaseIcons[phase.id] || Play;

          return (
            <Collapsible
              key={phase.id}
              title={`${phase.order}. ${phase.name}`}
              icon={<Icon className="w-5 h-5" />}
              badge={`${phase.actions.length} действий`}
              badgeColor={phaseColors[phase.id]}
              defaultOpen={phase.id === 'actions'}
            >
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  {phase.description}
                </p>

                {/* Actions */}
                <div className="space-y-3">
                  <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                    Действия:
                  </h5>
                  {phase.actions.map((action, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h6 className="font-medium text-gray-900 dark:text-white">
                          {action.name}
                        </h6>
                        <div className="flex gap-2 flex-shrink-0">
                          {action.cost && (
                            <span className="text-xs px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded flex items-center gap-1">
                              <Coins className="w-3 h-3" />
                              {action.cost}
                            </span>
                          )}
                          {action.limit && (
                            <span className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {action.limit}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {action.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Notes */}
                {phase.notes && phase.notes.length > 0 && (
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                    <h5 className="font-medium text-gray-900 dark:text-white text-sm mb-2">
                      Примечания:
                    </h5>
                    <ul className="space-y-1">
                      {phase.notes.map((note, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                        >
                          <span className="text-rose-500">•</span>
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
}
