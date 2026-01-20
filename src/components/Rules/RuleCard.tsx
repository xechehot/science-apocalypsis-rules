import { AlertTriangle, Info, FileText } from 'lucide-react';
import type { Rule } from '../../types';

interface RuleCardProps {
  rule: Rule;
}

export function RuleCard({ rule }: RuleCardProps) {
  return (
    <div
      id={rule.id}
      className={`
        bg-white dark:bg-gray-800 rounded-lg border p-4
        ${
          rule.isException
            ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10'
            : rule.isImportant
            ? 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/10'
            : 'border-gray-200 dark:border-gray-700'
        }
      `}
    >
      <div className="flex items-start gap-3">
        <div
          className={`
            p-2 rounded-lg flex-shrink-0
            ${
              rule.isException
                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                : rule.isImportant
                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }
          `}
        >
          {rule.isException ? (
            <AlertTriangle className="w-4 h-4" />
          ) : rule.isImportant ? (
            <Info className="w-4 h-4" />
          ) : (
            <FileText className="w-4 h-4" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-medium text-gray-900 dark:text-white">
              {rule.title}
            </h4>
            {rule.isException && (
              <span className="text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full">
                Исключение
              </span>
            )}
            {rule.isImportant && !rule.isException && (
              <span className="text-xs px-2 py-0.5 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full">
                Важно
              </span>
            )}
            {rule.pageReference && (
              <span className="text-xs text-gray-500">
                стр. {rule.pageReference}
              </span>
            )}
          </div>

          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
            {rule.content}
          </p>

          {rule.exceptions && rule.exceptions.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
              <h5 className="text-xs font-medium text-gray-500 uppercase mb-1">
                Исключения:
              </h5>
              <ul className="space-y-1">
                {rule.exceptions.map((exc, index) => (
                  <li key={index} className="text-sm text-red-600 dark:text-red-400">
                    • {exc}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
