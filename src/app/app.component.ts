import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormsModule } from '@angular/forms';
import { LoginService } from './servicios/login.service';
import { NavController } from '@ionic/angular';
import { ClienteService } from './servicios/cliente.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, FormsModule, CommonModule],
})
export class AppComponent {
  private loginService: LoginService = inject(LoginService);
  abrirModal: boolean = false;
  private ClienteService: ClienteService = inject(ClienteService);
  private navCtrl: NavController = inject(NavController);
  sessionIniciada: boolean = false;

  constructor() {
    this.sessionIniciada = this.loginService.estaLogueado();
    this.loginService.loggedIn().subscribe((resp) => {
      if (!resp) {
        this.abrirModal = true;
        this.sessionIniciada = false;
      } else {
        this.abrirModal = false;
        this.sessionIniciada = true;
      }
    });
  }

  @ViewChild(IonModal) modal: IonModal | undefined;

  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  email: string = '';
  password: string = '';

  cancel() {
    this.abrirModal = false;
  }

  confirm() {}

  registrate() {
    this.abrirModal = false;
    this.navCtrl.navigateForward('/cliente');
  }

  onWillDismiss(event: Event) {
    this.cancel();
  }

  iniciarSesion() {
    this.ClienteService.getCliente(this.email).subscribe((data) => {
      if (data.data) {
        if (this.password == data.data.password) {
          this.loginService.abrirSesion(data.data);
        } else {
          console.log('password incorrecto');
        }
      }
    });
  }
  abrirModalIniciodeSesion() {
    this.abrirModal = true;
  }

  cerrarSesion() {
    this.loginService.cerrarSesion();
  }
}
