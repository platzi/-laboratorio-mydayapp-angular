import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PendingTasksComponent } from './pages/home/pending-tasks/pending-tasks.component';
import { CompleteTasksComponent } from './pages/home/complete-tasks/complete-tasks.component';
import { AllTasksComponent } from './pages/home/all-tasks/all-tasks.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,

    children: [
      {
        path: '',

        component: AllTasksComponent, // child route component that the router renders
      },
      {
        path: 'pending',
        // child route path
        component: PendingTasksComponent, // child route component that the router renders
      },
      {
        path: 'completed',

        component: CompleteTasksComponent, // another child route component that the router renders
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
