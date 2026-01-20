import { useState } from 'react';
import { Check, Circle, Info, RotateCcw } from 'lucide-react';
import { gameRulesData } from '../../data/gameRules';

export function SetupWizard() {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (step: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(step)) {
        next.delete(step);
      } else {
        next.add(step);
      }
      return next;
    });
  };

  const resetAll = () => {
    setCompletedSteps(new Set());
  };

  const progress = Math.round((completedSteps.size / gameRulesData.setup.length) * 100);

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Прогресс подготовки
            </h3>
            <p className="text-sm text-gray-500">
              {completedSteps.size} из {gameRulesData.setup.length} шагов выполнено
            </p>
          </div>
          <button
            onClick={resetAll}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <RotateCcw className="w-4 h-4" />
            Сбросить
          </button>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-rose-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Initial Setup Info */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-800 dark:text-amber-200">
              Стартовые значения
            </h4>
            <ul className="mt-2 text-sm text-amber-700 dark:text-amber-300 space-y-1">
              <li>• <strong>Капитал:</strong> 5</li>
              <li>• <strong>Связи:</strong> 4</li>
              <li>• <strong>Авторитет:</strong> 1</li>
              <li>• <strong>Все треки:</strong> начинают с 4</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Setup Steps */}
      <div className="space-y-3">
        {gameRulesData.setup.map(step => {
          const isCompleted = completedSteps.has(step.step);

          return (
            <div
              key={step.step}
              className={`
                bg-white dark:bg-gray-800 rounded-lg border transition-all cursor-pointer
                ${
                  isCompleted
                    ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
              onClick={() => toggleStep(step.step)}
            >
              <div className="p-4 flex items-start gap-4">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors
                    ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Шаг {step.step}
                    </span>
                  </div>
                  <p
                    className={`mt-1 ${
                      isCompleted
                        ? 'text-gray-500 dark:text-gray-400'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {step.instruction}
                  </p>
                  {step.note && (
                    <p className="mt-2 text-sm text-amber-600 dark:text-amber-400 flex items-start gap-1">
                      <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {step.note}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Message */}
      {completedSteps.size === gameRulesData.setup.length && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
          <h4 className="font-semibold text-green-800 dark:text-green-200">
            Вы великолепны! Приступайте к игре!
          </h4>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            Все шаги подготовки выполнены
          </p>
        </div>
      )}
    </div>
  );
}
