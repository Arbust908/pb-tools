import { useEffect, useState } from 'react';

/**
 * Prevents hydration mismatch for Zustand stores with persistence
 * Use this for any component that reads from a persisted store on mount
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}