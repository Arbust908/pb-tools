import { DollarRate } from "@/types/dollar";

export async function fetchDollarRates(): Promise<DollarRate[]> {
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    const res = await fetch(`${base}/api/dolar`, {
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!res.ok) {
      throw new Error('Failed to fetch dollar rates');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching dollar rates:', error);
    throw error;
  }
}