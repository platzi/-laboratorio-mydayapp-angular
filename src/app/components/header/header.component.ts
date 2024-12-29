import { Component, inject } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  taskService = inject(TaskService);

  newTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  triedIncorrectSaving = false;

  createTask() {
    this.newTaskControl.setValue(this.newTaskControl.value.trim());
    if(!this.newTaskControl.valid) {
      this.triedIncorrectSaving = true;
      return;
    }

    this.triedIncorrectSaving = false;
    this.taskService.addTask(this.newTaskControl.value);
    this.newTaskControl.setValue('');
  }

  cancelNew() {
    this.newTaskControl.setValue('');
    this.triedIncorrectSaving = false;
  }
}
