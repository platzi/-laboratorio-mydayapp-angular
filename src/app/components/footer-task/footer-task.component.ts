import { Component, effect, inject, signal } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-footer-task',
  standalone: true,
  imports: [],
  templateUrl: './footer-task.component.html',
  styleUrl: './footer-task.component.css'
})
export class FooterTaskComponent {
  private taskService = inject(TasksService);
  tasks = this.taskService.tasks;
  filter = this.taskService.filter;
  filteredTasks = this.taskService.filteredTasks;
  hiddlenButton = false;

  constructor() {
    effect(() => {
      this.changeButton();
    });
  }
  
  clearCompleted(){
    this.taskService.deleteAllTaskCompleted();
  }

  handleFilter(filter: 'all'| 'pending' | 'completed'){
    this.taskService.changeFilter(filter);
  }

  changeButton(){
    const tasks = this.tasks();
    const hasCompletedTasks = tasks.filter(tasks => tasks.completed).length;
    this.hiddlenButton = hasCompletedTasks !== 0 ? true : false;
  }
}
