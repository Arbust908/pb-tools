import { DollarRate } from "@/types/dollar";

export async function fetchDollarRates(): Promise<DollarRate[]> {
  try {
    const res = await fetch('https://dolarapi.com/v1/dolares', {
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