import { computed, effect, Injectable, signal } from '@angular/core';

import { Task } from '../models/task.model';
import { TaskFilter } from '../enums/TasksFilter.enum';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks = signal<Task[]>([]);
  filter = signal<TaskFilter>(TaskFilter.All);
  filteredTasks = computed(() => {
    const tasks = this.tasks();
    const filter = this.filter();

    switch (filter) {
      case TaskFilter.Completed:
        return tasks.filter((task) => task.completed);
      case TaskFilter.Pending:
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  });

  constructor() {
    const storage = localStorage.getItem('mydayapp-angular');
    if (storage) {
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackTasks();
  }

  private trackTasks() {
    effect(() => {
      const tasks = this.tasks();
      const tasksString = JSON.stringify(tasks);
      localStorage.setItem('mydayapp-angular', tasksString);
    });
  }

  addTask(value: string) {
    const newTask: Task = {
      id: Date.now(),
      title: value,
      completed: false,
    };
    this.tasks.update((prevState) => [...prevState, newTask]);
  }

  changeTaskStatus(index: number) {
    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if (position === index) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
    });
  }

  deleteTask(index: number) {
    this.tasks.update((prevState) => {
      return prevState.filter((_, position) => {
        if (position == index) return false;
        return true;
      });
    });
  }

  changeTaskTitle(index: number, value: string) {
    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: value,
          };
        }
        return task;
      });
    });
  }

  removeCompleted() {
    this.tasks.update((prevState) => {
      return prevState.filter((task) => !task.completed);
    });
  }
}
