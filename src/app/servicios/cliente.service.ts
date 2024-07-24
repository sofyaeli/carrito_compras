import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../interfaces/cliente';
import { Respuesta } from '../interfaces/respuesta';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  urlbase = 'http://epico.gob.ec/vehiculo/public/api/';
  private httpClient: HttpClient = inject(HttpClient);

  headerOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  crear(cliente: Cliente) {
    return this.httpClient.post<Respuesta>(
      this.urlbase + 'cliente/',
      cliente,
      this.headerOptions
    );
  }

  getCliente(email: string) {
    let options = { ...this.headerOptions, params: { email: email } };
    return this.httpClient.get<Respuesta>(
      this.urlbase + 'cliente/email/',
      options
    );
  }
}
