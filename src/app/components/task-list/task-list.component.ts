import { AfterViewChecked, Component, inject } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  private taskService = inject(TaskService);
  tasks = this.taskService.filteredTasks;
  editingTask = -1;

  changeTaskStatus(index: number) {
    this.taskService.changeTaskStatus(index);
  }

  editTask(index: number) {
    this.editingTask = index;
  }

  cancelEdit() {
    this.editingTask = -1;
  }

  deleteTask(index: number) {
    this.taskService.deleteTask(index);
  }

  saveTask(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    this.editingTask = -1;

    if(value === '') return;
    this.taskService.changeTaskTitle(index, value);
  }
}
