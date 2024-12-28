import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [FooterComponent, HeaderComponent, TaskListComponent],
})
export class HomeComponent {
  private taskService = inject(TaskService);
  tasks = this.taskService.tasks;

  constructor() {}
}
