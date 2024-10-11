import { Component, inject } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.css'
})
export class ListTasksComponent {
  private taskService = inject(TasksService);

  tasks = this.taskService.tasks;
}
