export interface DollarRate {
  moneda: 'USD'; // May get extended in the future
  casa: string;
  nombre: string;
  compra: number;
  venta: number;
  fechaActualizacion: string;
}