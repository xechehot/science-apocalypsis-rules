import { useState, type ReactNode } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CollapsibleProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  badge?: string;
  badgeColor?: string;
  icon?: ReactNode;
  className?: string;
}

export function Collapsible({
  title,
  children,
  defaultOpen = false,
  badge,
  badgeColor = 'bg-gray-500',
  icon,
  className = ''
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          {isOpen ? (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          )}
          {icon && <span className="text-gray-600 dark:text-gray-400">{icon}</span>}
          <span className="font-medium text-gray-900 dark:text-gray-100">{title}</span>
        </div>
        {badge && (
          <span className={`text-xs px-2 py-1 rounded-full text-white ${badgeColor}`}>
            {badge}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="p-4 bg-white dark:bg-gray-900">
          {children}
        </div>
      )}
    </div>
  );
}
