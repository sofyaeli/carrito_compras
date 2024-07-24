import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../servicios/login.service';
import { CarritoDeComprasTemporalService } from '../servicios/carritoDeComprasTemporal.service';
import { CarritoCompras } from '../interfaces/carritoCompras';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Carrito_de_comprasService } from '../servicios/Carrito_de_compras.service';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.page.html',
  styleUrls: ['./carrito-compras.page.scss'],
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, IonicModule],
})
export class CarritoComprasPage {
  private CarritoDeComprasTemporalService: CarritoDeComprasTemporalService =
    inject(CarritoDeComprasTemporalService);
  private Carrito_de_comprasService: Carrito_de_comprasService = inject(
    Carrito_de_comprasService
  );

  private loggingService: LoginService = inject(LoginService);
  public carrito: CarritoCompras;
  alertButtons = [
    {
      text: 'Aceptar',
      role: 'Confirm',
      handler: () => {
        this.CarritoDeComprasTemporalService.clear();
        this.carrito = this.CarritoDeComprasTemporalService.carrito;
      },
    },
  ];

  constructor() {
    this.carrito = this.CarritoDeComprasTemporalService.carrito;
  }

  grabar() {
    if (!this.loggingService.estaLogueado()) {
      this.loggingService.abrirModal();
    }
    const usuario = this.loggingService.getUsuario();
    this.carrito.id_cliente = usuario.id;

    this.Carrito_de_comprasService.crearCarrito(this.carrito).subscribe(
      (data) => {
        if (data.codigo == '1') {
          this.setOpen(true);
          this.CarritoDeComprasTemporalService.clear();
        }
      }
    );
  }

  getdeshabilitarBtnGrabar() {
    return this.carrito?.items?.length === 0;
  }

  isAlertOpen = false;
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
