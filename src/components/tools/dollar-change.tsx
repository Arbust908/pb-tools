"use client";

import { useEffect, useState } from "react";
import { Files } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDebounce } from "@/hooks/use-debounce";
import { useDollarContext } from "@/context/dollar-context";

type ConversionDirection = "ars-to-usd" | "usd-to-ars";

export function DollarChange() {
  const [amount, setAmount] = useState<number>(100);
  const { selectedRateIndex, setSelectedRateIndex, rates } = useDollarContext();
  const [direction, setDirection] = useState<ConversionDirection>("ars-to-usd");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const debouncedAmount = useDebounce(amount, 300);

  function handleDirectionSwitch() {
    setDirection((prev) =>
      prev === "ars-to-usd" ? "usd-to-ars" : "ars-to-usd",
    );
  }

  function handleRateChange(index: number) {
    setSelectedRateIndex(index);
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  useEffect(() => {
    if (rates.length === 0) return;
    const rate =
      rates[selectedRateIndex >= rates.length ? 0 : selectedRateIndex].venta;
    if (direction === "ars-to-usd") {
      setConvertedAmount(debouncedAmount / rate);
    } else {
      setConvertedAmount(debouncedAmount * rate);
    }
  }, [debouncedAmount, rates, selectedRateIndex, direction]);

  return (
    <Card className="w-full max-w-md mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Dollar Converter</h2>
        <Button variant="outline" size="sm" onClick={handleDirectionSwitch}>
          {direction === "ars-to-usd" ? "ARS → USD" : "USD → ARS"}
        </Button>
      </div>

      {rates.length > 0 && (
        <div className="space-y-1">
          <label
            htmlFor="rate-select"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Exchange Rate
          </label>
          <select
            id="rate-select"
            value={selectedRateIndex}
            onChange={(e) => handleRateChange(Number(e.target.value))}
            className="block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
          >
            {rates.map((rate) => (
              <option
                key={`${rate.casa}-${rate.nombre}`}
                value={rates.indexOf(rate)}
              >
                {rate.nombre} | ${rate.venta.toFixed(2)}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-1">
        <label
          htmlFor="amount"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Amount in {direction === "ars-to-usd" ? "ARS" : "USD"}
        </label>
        <input
          type="number"
          id="amount"
          value={amount || ""}
          onChange={(e) => {
            const value = parseFloat(e.target.value) || 0;
            setAmount(value);
          }}
          placeholder={`Enter amount in ${direction === "ars-to-usd" ? "ARS" : "USD"}`}
          className="block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
        />
      </div>

      {convertedAmount !== null && (
        <div className="flex flex-col gap-2">
          <label
            htmlFor="convertedAmount"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Converted Amount in {direction === "ars-to-usd" ? "USD" : "ARS"}
          </label>
            <Button
            size="lg"
            className="border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-gray-50 dark:bg-gray-800 group focus-within:ring-2 focus-within:ring-slate-950 justify-between px-2"
              onClick={() => copyToClipboard(convertedAmount.toFixed(2))}
              aria-label="Copy to clipboard"
            >
            <input
              type="text"
              id="convertedAmount"
              value={convertedAmount.toFixed(2)}
              readOnly
              className="w-full text-lg bg-transparent focus:outline-none"
            />
              <Files className="size-3" />
            </Button>
        </div>
      )}
    </Card>
  );
}
