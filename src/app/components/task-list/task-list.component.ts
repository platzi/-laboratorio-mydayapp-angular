import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  @ViewChildren('inputEdit') inputEdit!: QueryList<
    ElementRef<HTMLInputElement>
  >;
  @Input() tasks: Task[] = [];

  @Output() toggleTaskEvent = new EventEmitter<number>();
  @Output() destroyTaskEvent = new EventEmitter<number>();
  @Output() editTaskEvent = new EventEmitter<Task>();
  taskEdit!: Task | null;

  constructor(private cdRef: ChangeDetectorRef) {}

  toggleTask(i: number) {
    this.toggleTaskEvent.emit(i);
  }

  destroyTask(id: number): void {
    this.destroyTaskEvent.emit(id);
  }

  editTask(task: Task, index: number): void {
    this.taskEdit = {
      id: task.id,
      title: task.title,
      completed: task.completed,
    };
    this.cdRef.detectChanges();
    this.inputEdit.toArray()[index].nativeElement.focus();
  }

  cancelEdit() {
    this.taskEdit = null;
  }

  confirmEdit(index: number) {
    if (this.inputEdit.toArray()[index].nativeElement.value) {
      this.editTaskEvent.emit({
        id: this.taskEdit?.id ?? 0,
        title: this.inputEdit.toArray()[index].nativeElement.value.trim(),
        completed: this.taskEdit?.completed ?? false,
      });
      this.cancelEdit();
    }
  }
}
