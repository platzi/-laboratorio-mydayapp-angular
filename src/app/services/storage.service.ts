import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private key: string = 'mydayapp-angular';

  constructor() {}

  get(): Task[] {
    const tasks = localStorage.getItem(this.key);
    return tasks ? JSON.parse(tasks) : [];
  }

  set(tasks: Task[]): void {
    localStorage.setItem(this.key, JSON.stringify(tasks));
  }
}
