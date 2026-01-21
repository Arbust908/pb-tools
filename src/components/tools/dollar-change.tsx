"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useDebounce } from "@/hooks/use-debounce";
import type { DollarRate } from "@/types/dollar";

type ConversionDirection = "ars-to-usd" | "usd-to-ars";

interface DollarChangeProps {
  rates: DollarRate[];
}

export function DollarChange({ rates: initialRates }: DollarChangeProps) {
  const [amount, setAmount] = useState<number>(0);
  const [selectedRateIndex, setSelectedRateIndex] = useState<number>(0);
  const [direction, setDirection] = useState<ConversionDirection>("ars-to-usd");
  const [loading, setLoading] = useState(false);
  const [rates, setRates] = useState<DollarRate[]>(initialRates);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const debouncedAmount = useDebounce(amount, 300);

  async function handleRefreshRates() {
    setLoading(true);
    try {
      const res = await fetch("/api/dolar", { next: { revalidate: 0 } });
      if (!res.ok) throw new Error("Failed to fetch");
      const newRates = await res.json();
      setRates(newRates);
      if (newRates.length > 0 && selectedRateIndex >= newRates.length) {
        setSelectedRateIndex(0);
      }
    } catch (error) {
      console.error("Failed to refresh rates:", error);
    } finally {
      setLoading(false);
    }
  }

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
            className="text-sm font-medium text-gray-700"
          >
            Exchange Rate
          </label>
          <select
            id="rate-select"
            value={selectedRateIndex}
            onChange={(e) => handleRateChange(Number(e.target.value))}
            className="block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
          >
            {rates.map((rate) => (
              <option
                key={`${rate.casa}-${rate.nombre}`}
                value={rates.indexOf(rate)}
              >
                {rate.nombre} ({rate.casa}) - {rate.venta.toFixed(2)}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="amount" className="text-sm font-medium text-gray-700">
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
          className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <Button
        onClick={handleRefreshRates}
        disabled={loading}
        className="w-full"
      >
        {loading ? <LoadingSpinner /> : "Refresh Rates"}
      </Button>

      {convertedAmount !== null && (
        <div className="space-y-1">
          <label
            htmlFor="convertedAmount"
            className="text-sm font-medium text-gray-700"
          >
            Converted Amount in {direction === "ars-to-usd" ? "USD" : "ARS"}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="convertedAmount"
              value={convertedAmount.toFixed(2)}
              readOnly
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
            />
            <Button
              variant="secondary"
              size="icon"
              onClick={() => copyToClipboard(convertedAmount.toFixed(2))}
              aria-label="Copy to clipboard"
            >
              ⎘
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
