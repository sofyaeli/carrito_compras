import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'principal',
    loadComponent: () =>
      import('./principal/principal.page').then((m) => m.PrincipalPage),
  },
  {
    path: 'lista-productos',
    loadComponent: () =>
      import('./lista-productos/lista-productos.page').then(
        (m) => m.ListaProductosPage
      ),
  },
  {
    path: 'detalle-producto/:id_producto',
    loadComponent: () =>
      import('./detalle-producto/detalle-producto.page').then(
        (m) => m.DetalleProductoPage
      ),
  },
  {
    path: 'carrito-compras',
    loadComponent: () =>
      import('./carrito-compras/carrito-compras.page').then(
        (m) => m.CarritoComprasPage
      ),
  },
  {
    path: 'cliente',
    loadComponent: () => import('./cliente/cliente.page').then( m => m.ClientePage)
  },
];
