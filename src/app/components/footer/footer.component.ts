import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskFilter } from 'src/app/enums/TasksFilter.enum';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  private taskService = inject(TaskService);
  tasks = this.taskService.filteredTasks;
  filter = this.taskService.filter;
  completedAvailable = computed<boolean>(() => {
    const tasks = this.tasks();
    return tasks.some((task) => task.completed);
  });

  TaskFilter = TaskFilter;

  removeCompleted() {
    this.taskService.removeCompleted();
  }
}
