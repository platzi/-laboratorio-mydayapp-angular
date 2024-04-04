import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ITask } from '@app/models/Task.model';
import { TaskService } from '@app/services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent {
  constructor(private taskService: TaskService) {}

  @Input() task!: ITask;
  @ViewChild('taskInput') taskInput!: ElementRef;

  taskControl = new FormControl('', Validators.required);
  editing = false;

  activeEdit() {
    this.editing = true;
    setTimeout(() => {
      this.taskInput.nativeElement.focus();
      const title = this.taskControl.value;
      if (title) {
        this.taskInput.nativeElement.setSelectionRange(
          title.length,
          title.length
        );
      }
    }, 0);
  }

  checked() {
    this.task.completed = !this.task.completed;
    this.taskService.update(this.task.id, this.task);
  }

  closeEdit() {
    this.editing = false;
  }

  updateTask() {
    if (this.taskControl.valid && this.taskControl.value) {
      this.task.title = this.taskControl.value.trim();
      this.taskService.update(this.task.id, this.task);
      this.closeEdit();
    }
  }

  deleteTask() {
    this.taskService.delete(this.task.id);
  }
}
