import { Injectable, signal } from '@angular/core';

import { Task } from '../models/Task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks = signal<Task[]>([]);

  constructor() {}

  addTask(value: string) {
    const newTask: Task = {
      id: Date.now().toString(),
      title: value,
      completed: false,
    };
    this.tasks.update((prevState) => [...prevState, newTask]);
  }
}
