import { Component, inject } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.css'
})
export class ListTasksComponent {
  private taskService = inject(TasksService);

  tasks = this.taskService.tasks;
  filteredTasks = this.taskService.filteredTasks;

  handleCompletedTask(index: number){
    this.taskService.changeCompletedTask(index);
  }
 
}