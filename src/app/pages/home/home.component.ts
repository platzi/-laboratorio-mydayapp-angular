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
  countCompletedTasks = computed(
    () => this.tasksList().length - this.countPendingTasks(),
  );

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

  editTask(taskId: string, newTitle: string) {
    newTitle = newTitle.trim();
    if (newTitle != '') {
      this.tasksList.update((list) =>
        list.map((task) => {
          if (task.id == taskId) return { ...task, title: newTitle };
          else return task;
        }),
      );
    }
  }

  toggleCompleted(taskId: string) {
    this.tasksList.update((list) =>
      list.map((task) => {
        if (task.id == taskId) return { ...task, completed: !task.completed };
        else return task;
      }),
    );
  }

  deleteTask(taskId: string) {
    this.tasksList.update((list) => list.filter((task) => task.id != taskId));
  }

  clearCompleted() {
    this.tasksList.update((taskList) => {
      return taskList.filter((task) => !task.completed);
    });
  }
}
