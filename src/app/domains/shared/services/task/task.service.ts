import { Injectable, signal } from '@angular/core';
import { Task } from './../../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  list = signal<Task[]>([]);
  constructor() {}
}
