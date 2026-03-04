'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/stores/ui-store';
import { useHydration } from '@/hooks/use-hydration';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const isHydrated = useHydration();
  const { theme, setTheme } = useUIStore();
  
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes first
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      // Check system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);
  // Prevent hydration mismatch
  if (!isHydrated) {
    return <Button variant="ghost" disabled>Loading...</Button>;
  }



  const icons = {
    light: <Sun className="w-4 h-4" />,
    dark: <Moon className="w-4 h-4" />,
    system: <Monitor className="w-4 h-4" />,
  };

  return (
    <div className="flex gap-2">
      {(['light', 'dark', 'system'] as const).map((t) => (
        <Button
          key={t}
          variant={theme === t ? 'default' : 'outline'}
          onClick={() => setTheme(t)}
          className="flex items-center gap-2"
        >
          {icons[t]}
          <span className="sr-only">{t}</span>
        </Button>
      ))}
    </div>
  );
}