"use client";

import { Card } from "@/components/ui/card";
import { useDollarContext } from "@/context/dollar-context";

export function DollarStats() {
  const { selectedRateIndex, rates } = useDollarContext();

  return (
    <>
      {rates.map((rate) => (
        <Card
          key={rate.casa}
          className={`transition duration-300 ease-in-out ring-0 ${
            rates.indexOf(rate) === selectedRateIndex
              ? "ring-4 ring-blue-500"
              : "ring-transparent"
          }`}
        >
          <h3 className="font-semibold">{rate.nombre}</h3>
          <div className="mt-2 flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Compra</p>
              <p className="text-lg font-bold">${rate.compra}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Venta</p>
              <p className="text-lg font-bold">${rate.venta}</p>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}
