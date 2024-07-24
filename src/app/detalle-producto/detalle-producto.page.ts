import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Productos } from '../interfaces/Productos';
import { Carrito_de_comprasService } from '../servicios/Carrito_de_compras.service';
import { CarritoDeComprasTemporalService } from '../servicios/carritoDeComprasTemporal.service';
import { CarritoItem } from '../interfaces/carritoCompras';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class DetalleProductoPage {
  private Carrito_de_comprasService: Carrito_de_comprasService = inject(
    Carrito_de_comprasService
  );
  private activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private navCtrl: NavController = inject(NavController);

  producto: Productos | undefined;
  cantidad: number = 1;
  subtotal: number = 0;
  total: number = 0;
  iva: number = 0;

  private CarritoDeComprasTemporalService: CarritoDeComprasTemporalService =
    inject(CarritoDeComprasTemporalService);
  constructor() {
    this.activeRoute.params.subscribe((params) => {
      this.Carrito_de_comprasService.getProducto(
        params['id_producto']
      ).subscribe((data) => {
        this.producto = data.data;
        this.verificarItemCarrito();
      });
    });
  }

  verificarItemCarrito() {
    if (!this.producto) {
      return;
    }
    const item = this.CarritoDeComprasTemporalService.getItemProduct(
      this.producto?.id
    );

    if (!item) {
      this.cantidad = 1;
    } else {
      this.cantidad = item?.cantidad;
    }
    this.calcular();
  }

  sumar() {
    this.cantidad++;
    this.calcular();
  }
  restar() {
    if (this.cantidad - 1 == 0) {
      return;
    }
    this.cantidad--;
    this.calcular();
  }

  agregarCarrito() {
    if (!this.producto) {
      return;
    }
    this.calcular();
    let item: CarritoItem = {
      id_producto: this.producto?.id,
      cantidad: this.cantidad,
      subtotal: this.subtotal,
      total: this.total,
      iva: this.iva,
      producto: this.producto.nombre,
      imagen: this.producto?.imagen,
    };

    this.CarritoDeComprasTemporalService.agregarProducto(item);

    this.retroceder();
  }

  calcular() {
    if (!this.producto) {
      return;
    }
    this.subtotal = this.cantidad * this.producto?.price;
    this.iva = this.subtotal * 0.15;
    this.total = this.subtotal + this.iva;
  }

  retroceder() {
    this.navCtrl.back();
  }
}
