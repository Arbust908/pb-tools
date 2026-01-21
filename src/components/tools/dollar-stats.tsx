import type { DollarRate } from "@/types/dollar";

interface DollarStatsProps {
  rates: DollarRate[];
}

export function DollarStats({ rates }: DollarStatsProps) {
  return (
    <>
      {rates.map((rate) => (
        <article key={rate.casa} className="rounded-lg border p-4">
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
        </article>
      ))}
    </>
  );
}
