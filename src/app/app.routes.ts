import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./domains/home/pages/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
];
