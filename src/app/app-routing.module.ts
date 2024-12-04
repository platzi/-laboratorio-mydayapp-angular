import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: 'all',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'pending',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'completed',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'all',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
