export const revalidate = 300; // Revalidate this route every 5 minutes

export async function GET() {
  const rates = await fetch('https://dolarapi.com/v1/dolares');
  const data = await rates.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}