import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { TodoService } from 'src/app/services/todo-service';

@Component({
  selector: 'app-complete-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './complete-tasks.component.html',
})
export class CompleteTasksComponent {


  private todosService = inject(TodoService);

  public inputEditValue = signal('');

  public todosCompleted = computed(() => this.todosService.todosCompleted());

  public toogleTask(taskId: string): void {
    this.todosService.toogleTask(taskId);
  }

  public removeTask(taskId: string): void {
    this.todosService.removeTask(taskId);
  }

  public openEditMode(taskId: string) {
    this.todosService.openEditModeByIdTask(taskId);
  }

  public closeEditMode(taskId: string) {
    this.todosService.closeEditModeByIdTask(taskId);
  }

  public changeInputValue(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;

    this.inputEditValue.set(newValue);
  }

  public editTask(taskId: string) {
    this.todosService.editTaskTitle(taskId, this.inputEditValue().trim());
  }

}
