import { SalaryCalculator } from "@/components/tools/salary-calculator";
import { fetchDollarRates } from "@/lib/api/dollar";

export const revalidate = 300;

export default async function SalaryCalculatorPage() {
  const rates = await fetchDollarRates();

  return (
    <section className="px-4 py-6 max-w-5xl font-mono">
      <h1 className="text-2xl font-bold mb-4">Salary Calculator</h1>
      <SalaryCalculator rates={rates} />
    </section>
  );
}
