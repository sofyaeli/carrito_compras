import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loggedInSubject = new Subject<boolean>();

  loggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  oppenLogin() {
    this.loggedInSubject.next(false);
  }

  abrirModal() {
    this.loggedInSubject.next(false);
  }

  abrirSesion(cliente: Cliente) {
    const clienteString = JSON.stringify(cliente);
    sessionStorage.setItem('usuario', clienteString);
    this.loggedInSubject.next(true);
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.loggedInSubject.next(false);
  }

  estaLogueado() {
    let token = sessionStorage.getItem('usuario');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  getUsuario() {
    let usuarioString = sessionStorage.getItem('usuario');
    if (!usuarioString) {
      return null;
    }
    return JSON.parse(usuarioString);
  }
}
