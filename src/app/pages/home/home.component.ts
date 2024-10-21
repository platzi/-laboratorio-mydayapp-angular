import { Component, signal } from '@angular/core';
import { appTask } from '../../models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  tasksList = signal<appTask[]>([]);

  constructor() {}

  addTask(event: Event) {
    const inputBox = event.target as HTMLInputElement;
    const taskTitle = inputBox.value.trim();
    inputBox.value = '';
    if (taskTitle != '') {
      const newTask: appTask = {
        id: Date.now().toString(),
        title: taskTitle,
        completed: false,
      };
      this.tasksList.update((list) => [...list, newTask]);
    }
  }
}
