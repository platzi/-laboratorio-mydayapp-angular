import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.interface';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() updateStatus = new EventEmitter<boolean>();
  @Output() updateTitle = new EventEmitter<string>();
  @Output() removeTask = new EventEmitter<number>();

  changeStatus(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.updateStatus.emit(checked);
  }

  changeTitle(event: Event): void {
    const title = (event.target as HTMLInputElement).value;
    this.updateTitle.emit(title.trim());
    this.task.editing = false;
  }

  restoreTitle() {
    this.task.editing = false;
    this.updateTitle.emit(this.task.title);
  }

  remove() {
    console.log('remove');
    this.removeTask.emit(this.task.id);
  }
}
