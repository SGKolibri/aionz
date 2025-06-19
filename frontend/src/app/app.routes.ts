import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/pages/home-page/home-page').then(
        (m) => m.HomePage
      ),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./features/product/pages/product-page/product-page').then(
        (m) => m.ProductPage
      ),
  },
];
