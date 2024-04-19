import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { PendingComponent } from './components/pages/pending/pending.component';
import { CompletedComponent } from './components/pages/completed/completed.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    //pathMatch: 'full',
    children:[
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'pending',
        component: PendingComponent
      },
      {
        path: 'completed',
        component: CompletedComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
