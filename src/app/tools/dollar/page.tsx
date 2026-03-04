import { DollarChange } from "@/components/tools/dollar-change";
import { DollarStats } from "@/components/tools/dollar-stats";
import { DollarProvider } from "@/context/dollar-context";
import { fetchDollarRates } from "@/lib/api/dollar";

export const revalidate = 300;

export default async function DollarPage() {
  const lastUpdated = new Date().toLocaleTimeString();
  const rates = await fetchDollarRates();

  return (
    <DollarProvider rates={rates}>
      <section className="grid gap-4 md:grid-cols-[repeat(auto-fit,280px)] px-4 py-6">
        <div className="col-span-full">
          <h1 className="text-2xl font-bold mb-4">Dollar a peso</h1>
          <p className="text-sm text-gray-500 mb-4">
            Last updated: {lastUpdated}
          </p>
        </div>
        <DollarStats />
        <DollarChange />
      </section>
    </DollarProvider>
  );
}
