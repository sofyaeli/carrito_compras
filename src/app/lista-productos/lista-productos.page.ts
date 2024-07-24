import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Carrito_de_comprasService } from '../servicios/Carrito_de_compras.service';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenuButton,
  IonButtons,
  IonLabel,
  IonList,
  IonItem,
  IonThumbnail,
  IonBadge,
  IonIcon,
} from '@ionic/angular/standalone';
import { Productos } from '../interfaces/Productos';
import { RouterLink } from '@angular/router';
import { CarritoDeComprasTemporalService } from '../servicios/carritoDeComprasTemporal.service';
@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.page.html',
  styleUrls: ['./lista-productos.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonMenuButton,
    IonButtons,
    IonLabel,
    IonList,
    IonItem,
    IonThumbnail,
    RouterLink,
    IonBadge,
    IonIcon,
  ],
})
export class ListaProductosPage implements OnInit {
  private Carrito_de_comprasService = inject(Carrito_de_comprasService);
  listaProductos: Productos[] = [];
  private CarritoDeComprasTemporalService = inject(
    CarritoDeComprasTemporalService
  );

  ngOnInit(): void {
    this.consultarProductos();
  }

  consultarProductos() {
    this.Carrito_de_comprasService.todosProductos().subscribe((data) => {
      this.listaProductos = data.data;
    });
  }

  getNumeroItems() {
    return this.CarritoDeComprasTemporalService.getTotalItems();
  }
}
