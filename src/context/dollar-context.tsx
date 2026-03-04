"use client";
import { createContext, useContext, ReactNode, useState } from "react"
import { DollarRate } from "@/types/dollar";

interface DollarContextType {
  selectedRateIndex: number;
  setSelectedRateIndex: (index: number) => void;
  rates: DollarRate[];
}
interface DollarProviderProps {
  rates: DollarRate[];
  children: ReactNode;
}

const DollarContext = createContext<DollarContextType | undefined>(undefined);

export function DollarProvider({ rates, children }: DollarProviderProps) {
  const [selectedRateIndex, setSelectedRateIndex] = useState<number>(0);

  return (
    <DollarContext.Provider value={{ selectedRateIndex, setSelectedRateIndex, rates }}>
      {children}
    </DollarContext.Provider>
  );
}

export function useDollarContext() {
  const context = useContext(DollarContext);
  if (!context) {
    throw new Error("useDollarContext must be used within a DollarProvider");
  }
  return context;
}