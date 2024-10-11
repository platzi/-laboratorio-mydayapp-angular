import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ListTasksComponent } from 'src/app/components/list-tasks/list-tasks.component';
import { FooterTaskComponent } from 'src/app/components/footer-task/footer-task.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ListTasksComponent,
    FooterTaskComponent, 
    CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent{


}
