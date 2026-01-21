import { useState, useEffect, type ReactNode } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CollapsibleProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  badge?: string;
  badgeColor?: string;
  icon?: ReactNode;
  className?: string;
  id?: string;
}

export function Collapsible({
  title,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  badge,
  badgeColor = 'bg-gray-500',
  icon,
  className = '',
  id
}: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  useEffect(() => {
    if (!isControlled && defaultOpen !== internalOpen && defaultOpen) {
      setInternalOpen(defaultOpen);
    }
  }, [defaultOpen]);

  const handleToggle = () => {
    const newOpen = !isOpen;
    if (isControlled) {
      onOpenChange?.(newOpen);
    } else {
      setInternalOpen(newOpen);
      onOpenChange?.(newOpen);
    }
  };

  return (
    <div id={id} className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden ${className}`}>
      <button
        onClick={handleToggle}
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
