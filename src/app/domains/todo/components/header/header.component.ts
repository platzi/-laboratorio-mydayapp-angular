import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '@shared/models';
import { TaskService } from '@shared/services/task/task.service';

@Component({
  selector: 'app-header',
  imports: [ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
})
export class HeaderComponent {
  newTaskCtrl = new FormControl('', { validators: [Validators.required] });
  constructor(public taskService: TaskService) {}
  addTask() {
    const value = this.newTaskCtrl.value.trim();

    if (!value) {
      return;
    }
    const newTask = new Task();
    newTask.id = Date.now();
    newTask.completed = false;
    newTask.title = value;

    this.taskService.list.update((tasks) => [...tasks, newTask]);
    this.newTaskCtrl.setValue(null);
  }
}
