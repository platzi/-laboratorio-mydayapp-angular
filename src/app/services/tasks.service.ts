import { effect, inject, Injectable, Injector, Signal, signal, WritableSignal } from '@angular/core';
import { Task } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private localStorageKey: string = 'mydayapp-angular';
  private tasks: WritableSignal<Task[]> = signal<Task[]>([]);
  private injector = inject(Injector);
  constructor() { }

  addTask(title: string): void {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasks()));
  }

  getTasks(): Signal<Task[]> {
    const storedTasks = localStorage.getItem(this.localStorageKey);
    if(storedTasks) {
      this.tasks.set(JSON.parse(storedTasks));
    }

    return this.tasks;
  }

  updateTaskStatus(id: number, isChecked: boolean): void {
    this.tasks.update((prev: Task[]): Task[] => {
      return prev.map((task: Task) => {
        if(task.id === id) {
          return {
            ...task,
            completed: isChecked
          };
        }
        return task;
      });
    });
  };

  updateTaskTitle(task: Task, title: string): void {
    this.tasks.update((prev: Task[]): Task[] => {
      return prev.map((currentTask: Task) => {
        if(currentTask.id === task.id) {
          return {
            ...currentTask,
            title,
            editing: false
          }
        }
        return currentTask;
      });
    });
  }

  removeTask(id: number): void {
    this.tasks.update((prev: Task[]): Task[] => {
      return prev.filter((task: Task) => task.id !== id);
    });
  }

  enableEdit(id: number): void {
    this.tasks.update((prev: Task[]): Task[] => {
      return prev.map((task: Task) => {
        if(task.id === id) {
            return {
              ...task,
              editing: !task.editing
            };
        }
        return {
          ...task,
          editing: false
        };
      });
    });
  }

  clearCompleted(): void {
    this.tasks.update((prev: Task[]): Task[] => {
      return prev.filter((task: Task) => !task.completed);
    });
  }

  trackChanges(): void{
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
    }, {injector: this.injector});
  }
}

