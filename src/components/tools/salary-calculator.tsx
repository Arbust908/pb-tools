"use client";

import { useState, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { DollarRate } from "@/types/dollar";

type SalaryField = "hourly" | "daily" | "weekly" | "biweekly" | "monthly" | "annual";

interface SalaryValues {
  hourly: number;
  daily: number;
  weekly: number;
  biweekly: number;
  monthly: number;
  annual: number;
}

interface SalaryCalculatorProps {
  rates: DollarRate[];
}

/**
 * Convert any salary field value to an hourly rate,
 * then derive all other fields from that hourly base.
 */
function toHourly(field: SalaryField, value: number, hoursPerWeek: number): number {
  const hoursPerDay = hoursPerWeek / 5;
  switch (field) {
    case "hourly":
      return value;
    case "daily":
      return value / hoursPerDay;
    case "weekly":
      return value / hoursPerWeek;
    case "biweekly":
      return value / (hoursPerWeek * 2);
    case "monthly":
      return value / ((hoursPerWeek * 52) / 12);
    case "annual":
      return value / (hoursPerWeek * 52);
  }
}

function fromHourly(hourly: number, hoursPerWeek: number): SalaryValues {
  const hoursPerDay = hoursPerWeek / 5;
  return {
    hourly,
    daily: hourly * hoursPerDay,
    weekly: hourly * hoursPerWeek,
    biweekly: hourly * hoursPerWeek * 2,
    monthly: (hourly * hoursPerWeek * 52) / 12,
    annual: hourly * hoursPerWeek * 52,
  };
}

function formatValue(value: number): string {
  if (value === 0) return "";
  return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

const FIELD_LABELS: Record<SalaryField, string> = {
  hourly: "Hourly",
  daily: "Daily",
  weekly: "Weekly",
  biweekly: "Biweekly",
  monthly: "Monthly",
  annual: "Annual",
};

export function SalaryCalculator({ rates }: SalaryCalculatorProps) {
  const [sourceField, setSourceField] = useState<SalaryField>("hourly");
  const [sourceValue, setSourceValue] = useState<number>(0);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [selectedRateIndex, setSelectedRateIndex] = useState<number>(0);

  // Derive all USD values from the source field
  const usdValues = useMemo<SalaryValues>(() => {
    if (sourceValue === 0) {
      return { hourly: 0, daily: 0, weekly: 0, biweekly: 0, monthly: 0, annual: 0 };
    }
    const hourly = toHourly(sourceField, sourceValue, hoursPerWeek);
    return fromHourly(hourly, hoursPerWeek);
  }, [sourceField, sourceValue, hoursPerWeek]);

  // ARS values = USD values * selected rate's venta price
  const arsValues = useMemo<SalaryValues>(() => {
    const rate = rates[selectedRateIndex]?.venta ?? 0;
    return {
      hourly: usdValues.hourly * rate,
      daily: usdValues.daily * rate,
      weekly: usdValues.weekly * rate,
      biweekly: usdValues.biweekly * rate,
      monthly: usdValues.monthly * rate,
      annual: usdValues.annual * rate,
    };
  }, [usdValues, rates, selectedRateIndex]);

  const handleFieldChange = useCallback((field: SalaryField, raw: string) => {
    const parsed = parseFloat(raw.replace(/,/g, "")) || 0;
    setSourceField(field);
    setSourceValue(parsed);
  }, []);

  function handleHoursChange(raw: string) {
    const parsed = parseFloat(raw) || 0;
    setHoursPerWeek(parsed);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* USD Section */}
      <Card>
        <fieldset>
          <legend className="text-lg font-semibold mb-4">USD</legend>

          <div className="grid grid-cols-3 gap-4">
            {/* Row 1 */}
            <SalaryInput
              field="hourly"
              label={FIELD_LABELS.hourly}
              value={usdValues.hourly}
              sourceField={sourceField}
              sourceValue={sourceValue}
              onChange={handleFieldChange}
            />
            <SalaryInput
              field="daily"
              label={FIELD_LABELS.daily}
              value={usdValues.daily}
              sourceField={sourceField}
              sourceValue={sourceValue}
              onChange={handleFieldChange}
            />
            <SalaryInput
              field="monthly"
              label={FIELD_LABELS.monthly}
              value={usdValues.monthly}
              sourceField={sourceField}
              sourceValue={sourceValue}
              onChange={handleFieldChange}
            />

            {/* Row 2 */}
            <div className="space-y-1">
              <label
                htmlFor="hours-per-week-usd"
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
              >
                Hours/week
              </label>
              <Input
                id="hours-per-week-usd"
                type="number"
                min={1}
                max={168}
                value={hoursPerWeek || ""}
                onChange={(e) => handleHoursChange(e.target.value)}
                placeholder="40"
              />
            </div>
            <SalaryInput
              field="weekly"
              label={FIELD_LABELS.weekly}
              value={usdValues.weekly}
              sourceField={sourceField}
              sourceValue={sourceValue}
              onChange={handleFieldChange}
            />
            <SalaryInput
              field="biweekly"
              label={FIELD_LABELS.biweekly}
              value={usdValues.biweekly}
              sourceField={sourceField}
              sourceValue={sourceValue}
              onChange={handleFieldChange}
            />

            {/* Row 3 */}
            <SalaryInput
              field="annual"
              label={FIELD_LABELS.annual}
              value={usdValues.annual}
              sourceField={sourceField}
              sourceValue={sourceValue}
              onChange={handleFieldChange}
            />
          </div>
        </fieldset>
      </Card>

      {/* ARS Section */}
      <Card>
        <fieldset>
          <legend className="text-lg font-semibold mb-4">ARS</legend>

          {/* Rate selector */}
          {rates.length > 0 && (
            <div className="mb-4 space-y-1">
              <label
                htmlFor="ars-rate-select"
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
              >
                Exchange Rate
              </label>
              <Select
                id="ars-rate-select"
                value={selectedRateIndex}
                onChange={(e) => setSelectedRateIndex(Number(e.target.value))}
              >
                {rates.map((rate, i) => (
                  <option key={`${rate.casa}-${rate.nombre}`} value={i}>
                    {rate.nombre} | ${rate.venta.toFixed(2)}
                  </option>
                ))}
              </Select>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            {/* Row 1 */}
            <ReadonlyField label={FIELD_LABELS.hourly} value={arsValues.hourly} />
            <ReadonlyField label={FIELD_LABELS.daily} value={arsValues.daily} />
            <ReadonlyField label={FIELD_LABELS.monthly} value={arsValues.monthly} />

            {/* Row 2 */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Hours/week
              </label>
              <Input
                type="number"
                value={hoursPerWeek || ""}
                readOnly
                tabIndex={-1}
                className="cursor-default opacity-70"
              />
            </div>
            <ReadonlyField label={FIELD_LABELS.weekly} value={arsValues.weekly} />
            <ReadonlyField label={FIELD_LABELS.biweekly} value={arsValues.biweekly} />

            {/* Row 3 */}
            <ReadonlyField label={FIELD_LABELS.annual} value={arsValues.annual} />
          </div>
        </fieldset>
      </Card>
    </div>
  );
}

// --- Internal sub-components ---

interface SalaryInputProps {
  field: SalaryField;
  label: string;
  value: number;
  sourceField: SalaryField;
  sourceValue: number;
  onChange: (field: SalaryField, raw: string) => void;
}

/**
 * Editable USD input. Shows the computed value when not the active source,
 * shows the raw source value when it is the active field being edited.
 */
function SalaryInput({ field, label, value, sourceField, sourceValue, onChange }: SalaryInputProps) {
  // If this field is the source, show what the user typed; otherwise show the computed value
  const displayValue = sourceField === field
    ? (sourceValue === 0 ? "" : String(sourceValue))
    : formatValue(value);

  return (
    <div className="space-y-1">
      <label
        htmlFor={`usd-${field}`}
        className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
      >
        {label}
      </label>
      <Input
        id={`usd-${field}`}
        type="text"
        inputMode="decimal"
        value={displayValue}
        onChange={(e) => onChange(field, e.target.value)}
        placeholder="0"
      />
    </div>
  );
}

interface ReadonlyFieldProps {
  label: string;
  value: number;
}

function ReadonlyField({ label, value }: ReadonlyFieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </label>
      <Input
        type="text"
        value={formatValue(value)}
        readOnly
        tabIndex={-1}
        placeholder="0"
        className="cursor-default opacity-70"
      />
    </div>
  );
}
