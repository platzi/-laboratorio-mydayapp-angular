import { Component, Signal, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from 'src/app/services/todo-service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  private todosSevice = inject(TodoService);

  public numberOftasksCompleted: Signal<number> = computed(() => this.todosSevice.todos().filter((task) => task.completed).length);


  public totalElementsPending = input.required<number>();

  public pluralItem = computed(() =>
    this.totalElementsPending() > 1 ? 'items' : 'item'
  );

  public clearAllTasks(): void {
    this.todosSevice.clearAllCompleteTasks();
  }
}
