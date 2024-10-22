import {
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { appTask } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  task = input.required<appTask>();
  editing = signal(false);
  inputBox = viewChild<ElementRef>('edit');
  updateTitle = output<string>();
  toggleStatus = output<void>();
  deleteTask = output<void>();

  enableEdit() {
    this.editing.set(true);
    if (this.inputBox()) {
      let editArea = this.inputBox()?.nativeElement as HTMLInputElement;
      setTimeout(() => {
        editArea.focus();
      }, 50);
    } else console.log('not present');
  }

  submitEdit(event: Event) {
    this.editing.set(false);
    const titleInput = (event.target as HTMLInputElement).value;
    this.updateTitle.emit(titleInput);
  }

  cancelEdit() {
    this.editing.set(false);
    if (this.inputBox()) {
      let editArea = this.inputBox()?.nativeElement as HTMLInputElement;
      editArea.value = this.task().title;
    }
  }
}
