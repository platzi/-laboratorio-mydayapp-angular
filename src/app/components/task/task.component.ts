import { Component, Input, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { Task } from '../../models/task.interface';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  tasksService = inject(TasksService);
  @Input() task!: Task;

  changeStatus(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.tasksService.updateTaskStatus(this.task.id, checked);
  }

  changeTitle(event: Event): void {
    const title = (event.target as HTMLInputElement).value;
    this.tasksService.updateTaskTitle(this.task, title.trim());
    this.task.editing = false;
  }

  restoreTitle() {
    this.tasksService.updateTaskTitle(this.task, this.task.title);
  }

  remove() {
    this.tasksService.removeTask(this.task.id);
  }
}
