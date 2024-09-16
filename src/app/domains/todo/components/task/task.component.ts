import { Component, Input } from '@angular/core';
import { Task } from '@shared/models';
import { TaskService } from '@shared/services/task/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  standalone: true,
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task: Task;
  @Input() index: number;

  constructor(public taskService: TaskService) {}

  removeTask(index: number) {
    this.taskService.list.update((tasks) =>
      tasks.filter((_, i) => i !== index)
    );
  }

  markAsCompleted(index: number) {
    this.taskService.list.update((task) =>
      task.map((t, i) => {
        if (i === index) {
          return { ...t, completed: !t.completed };
        }
        return t;
      })
    );
  }

  editing(index: number) {
    this.taskService.list.update((tasks) =>
      tasks.map((task, i) => {
        if (i === index) {
          return { ...task, editing: !task.editing };
        }
        return { ...task, editing: false };
      })
    );
  }

  updateTask(event: Event, task: Task, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    this.taskService.list.update((tasks) =>
      tasks.map((task, i) => {
        if (i === index) {
          return { ...task, editing: false, title: value };
        }
        return { ...task, editing: false };
      })
    );
  }
}
