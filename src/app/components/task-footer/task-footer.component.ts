import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { statusTask } from 'src/app/models/status-task.type';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-footer',
  standalone: true,
  imports: [AppRoutingModule, CommonModule],
  templateUrl: './task-footer.component.html',
})
export class TaskFooterComponent {
  tasks: Task[] = [];
  tasksLeft: number = 0;
  tasksDone: number = 0;

  @Input() set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.buildTaskInformation();
  }

  @Input() selectedTask: statusTask = 'all';

  @Output() clearTaskCompletedEvent = new EventEmitter<boolean>();

  buildTaskInformation(): void {
    this.tasksLeft = 0;
    this.tasksDone = 0;
    this.tasks.forEach((t) => {
      if (t.completed) this.tasksDone++;
      else this.tasksLeft++;
    });
  }

  clearTaskCompleted(): void {
    this.clearTaskCompletedEvent.emit(true);
  }
}
