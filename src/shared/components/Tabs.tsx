import { createContext, useContext, useId, useMemo } from 'react';
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context)
    throw new Error(
      'Tabs.List, Tabs.Trigger và Tabs.Panel phải nằm trong Tabs.Root.',
    );
  return context;
}

interface TabsRootProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
}

function TabsRoot({ value, onValueChange, children }: TabsRootProps) {
  const baseId = useId();
  const context = useMemo(
    () => ({ value, onValueChange, baseId }),
    [value, onValueChange, baseId],
  );
  return (
    <TabsContext.Provider value={context}>{children}</TabsContext.Provider>
  );
}

function TabsList({
  children,
  onKeyDown,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      role="tablist"
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (
          event.defaultPrevented ||
          !['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)
        )
          return;
        const tabs = Array.from(
          event.currentTarget.querySelectorAll<HTMLButtonElement>(
            '[role="tab"]:not(:disabled)',
          ),
        );
        const current = tabs.findIndex((tab) => tab === document.activeElement);
        if (!tabs.length || current < 0) return;
        event.preventDefault();
        const next =
          event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? tabs.length - 1
              : (current +
                  (event.key === 'ArrowRight' ? 1 : -1) +
                  tabs.length) %
                tabs.length;
        tabs[next]?.focus();
        tabs[next]?.click();
      }}
    >
      {children}
    </div>
  );
}

interface TabsTriggerProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'value'
> {
  value: string;
}

function TabsTrigger({ value, children, onClick, ...props }: TabsTriggerProps) {
  const context = useTabsContext();
  const selected = context.value === value;
  return (
    <button
      {...props}
      type="button"
      role="tab"
      id={`${context.baseId}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${context.baseId}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) context.onValueChange(value);
      }}
    >
      {children}
    </button>
  );
}

interface TabsPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

function TabsPanel({ value, children, ...props }: TabsPanelProps) {
  const context = useTabsContext();
  const selected = context.value === value;
  return (
    <div
      {...props}
      role="tabpanel"
      id={`${context.baseId}-panel-${value}`}
      aria-labelledby={`${context.baseId}-tab-${value}`}
      hidden={!selected}
    >
      {selected ? children : null}
    </div>
  );
}

// Compound Component: child components coordinate through the parent context.
export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Panel: TabsPanel,
};
