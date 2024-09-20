import { CommonModule } from '@angular/common';
import { Component, Signal, computed, inject, signal } from '@angular/core';
import { TaskTodo } from 'src/app/interfaces/task';
import { TodoService } from 'src/app/services/todo-service';

@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-tasks.component.html',

})
export class AllTasksComponent {

  private todoService = inject(TodoService);

  public inputEditValue = signal('');

  public tasks: Signal<TaskTodo[]> = computed(() => this.todoService.todos());

  public numberOftasksPending: Signal<number> = computed(
    () => this.todoService.todos().filter((task) => !task.completed).length
  );

  constructor() {}

  ngOnInit(): void {}

  public toogleTask(taskId: string): void {
    this.todoService.toogleTask(taskId);
  }

  public removeTask(taskId: string): void {
    this.todoService.removeTask(taskId);
  }

  public openEditMode(taskId: string) {
    this.todoService.openEditModeByIdTask(taskId);
  }

  public closeEditMode(taskId: string) {
    this.todoService.closeEditModeByIdTask(taskId);
  }

  public changeInputValue(event:Event){
    const newValue = (event.target as HTMLInputElement).value;

    this.inputEditValue.set(newValue);
  }

  public editTask(taskId: string) {

    this.todoService.editTaskTitle(taskId, this.inputEditValue().trim());
  }

}
