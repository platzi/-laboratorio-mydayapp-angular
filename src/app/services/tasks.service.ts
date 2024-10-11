import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks = signal<Task[]>([
    {
      id: `1`,
      title: `Learn JavaScript`,
      completed: true,
      editing: false
    },{
      id: `2`,
      title: `Buy a unicorn`,
      completed: false,
      editing: false
    },{
      id: `3`,
      title: `Make dishes`,
      completed: false,
      editing: true
    }
  ]);

  constructor() { 
  }
}
