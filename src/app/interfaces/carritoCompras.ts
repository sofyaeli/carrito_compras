export interface CarritoCompras {
  id_cliente: number | null;
  cliente?: string;
  subtotal: number;
  iva: number;
  total: number;
  estado: string;
  items: CarritoItem[];
}

export interface CarritoItem {
  id_producto: number;
  cantidad: number;
  subtotal: number;
  total: number;
  iva: number;
  producto?: string;
  imagen?: string;
}
