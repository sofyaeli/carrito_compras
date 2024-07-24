import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Productos } from '../interfaces/Productos';
import { Respuesta } from '../interfaces/respuesta';
import { CarritoCompras } from '../interfaces/carritoCompras';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class Carrito_de_comprasService {
  urlbase = 'http://epico.gob.ec/vehiculo/public/api/';
  private httpClient: HttpClient = inject(HttpClient);

  headerOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  todosProductos() {
    return this.httpClient.get<RespuestaProductos>(
      this.urlbase + 'producto/all/'
    );
  }

  getProducto(id: number) {
    return this.httpClient.get<RespuestaProducto>(
      this.urlbase + 'producto/' + id
    );
  }

  crearCarrito(carrito: CarritoCompras) {
    return this.httpClient.post<RespuestaProductoNuevo>(
      this.urlbase + 'carrito/',
      carrito,
      this.headerOptions
    );
  }
}

export interface RespuestaProductos extends Respuesta {
  data: Productos[];
}

export interface RespuestaProducto extends Respuesta {
  data: Productos;
}

export interface RespuestaProductoNuevo extends Respuesta {
  data: number;
}
