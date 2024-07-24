import { Injectable } from '@angular/core';
import { CarritoCompras, CarritoItem } from '../interfaces/carritoCompras';

@Injectable({
  providedIn: 'root',
})
export class CarritoDeComprasTemporalService {
  carrito: CarritoCompras = {
    id_cliente: null,
    subtotal: 0,
    iva: 0,
    total: 0,
    estado: 'A',
    items: [],
  };

  constructor() {}

  agregarProducto(item: CarritoItem) {
    let itemSelect = this.carrito.items.find(
      (elemento) => elemento.id_producto === item.id_producto
    );

    if (!itemSelect) {
      this.carrito.items.push(item);
    } else {
      itemSelect.cantidad = item.cantidad;
    }

    this.calcular();
  }

  getItemProduct(id_producto: number) {
    const item = this.carrito.items.find(
      (item) => item.id_producto === id_producto
    );
    return item;
  }

  calcular() {
    this.carrito.iva = 0;
    this.carrito.subtotal = 0;
    this.carrito.total = 0;
    this.carrito.items.forEach((item) => {
      this.carrito.iva += item.iva;
      this.carrito.subtotal += item.subtotal;
      this.carrito.total += item.total;
    });
  }

  getTotalItems() {
    return this.carrito.items.length;
  }

  clear() {
    this.carrito = {
      id_cliente: null,
      subtotal: 0,
      iva: 0,
      total: 0,
      estado: 'A',
      items: [],
    };
  }
}
