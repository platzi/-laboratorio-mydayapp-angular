import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from './../../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  list = signal<Task[]>([]);
  taskFilter = computed(() => {
    const tasks = this.list();
    console.log(this.router.url);

    switch (this.router.url) {
      case '/pending':
        return tasks.filter((task) => !task.completed);
      case '/completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  });
  existCompleted = computed(() => {
    const tasks = this.list();
    return tasks.find((t) => t.completed);
  });
  constructor(private router: Router) {}
}
