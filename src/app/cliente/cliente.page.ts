import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ClienteService } from '../servicios/cliente.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Cliente } from '../interfaces/cliente';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class ClientePage {
  protected formBuilder: FormBuilder = inject(FormBuilder);
  private clienteService: ClienteService = inject(ClienteService);
  private loginService: LoginService = inject(LoginService);
  private navCtrl = inject(NavController);
  alertButtons = ['OK'];

  formDatos = this.formBuilder.group({
    nombre: [null, [Validators.required]],
    apellido: [null, [Validators.required]],
    password: [null, [Validators.required]],
    email: [null, [Validators.required]],
  });

  grabar() {
    if (!this.formDatos.valid) {
      return;
    }
    let cliente: Cliente = {
      ...this.formDatos.value,
    };
    this.clienteService
      .crear({
        ...this.formDatos.value,
      })
      .subscribe((data) => {
        if (data.codigo == '1') {
          cliente.id = data.data.id;
          this.loginService.abrirSesion(cliente);
          this.setOpen(true);

          this.navCtrl.back();
        }
      });
  }

  IsAlertOpen = false;
  setOpen(isOpen: boolean) {
    this.IsAlertOpen = isOpen;
  }
}
