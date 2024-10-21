import { Component, computed, effect, signal } from '@angular/core';
import { appTask } from '../../models/task.model';
import { TaskCardComponent } from 'src/app/components/task-card/task-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [TaskCardComponent],
})
export class HomeComponent {
  tasksList = signal<appTask[]>(this.retrieveLocalStorage());
  countPendingTasks = computed(() => {
    const pending = this.tasksList().filter((task) => !task.completed);
    return pending.length;
  });

  retrieveLocalStorage(): appTask[] {
    const stored = localStorage.getItem('mydayapp-angular');
    if (stored) {
      return JSON.parse(stored) as appTask[];
    } else return [];
  }

  constructor() {
    effect(() => {
      const tasks = this.tasksList();
      localStorage.setItem('mydayapp-angular', JSON.stringify(tasks));
    });
  }

  addTask(event: Event) {
    const inputBox = event.target as HTMLInputElement;
    const taskTitle = inputBox.value.trim();
    inputBox.value = '';
    if (taskTitle != '') {
      const newTask: appTask = {
        id: Date.now().toString(),
        title: taskTitle,
        completed: false,
      };
      this.tasksList.update((list) => [...list, newTask]);
    }
  }

  clearCompleted() {
    this.tasksList.update((taskList) => {
      return taskList.filter((task) => !task.completed);
    });
  }
}
