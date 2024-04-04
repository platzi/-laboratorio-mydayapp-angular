import { Component, Input } from '@angular/core';

import { TaskService } from '@app/services/task.service'
import { ITask } from '@app/models/Task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent {
  taskEditing = {
    id: 0,
    editing: false
  };
  constructor (private taskService: TaskService) { }

  taskList$ = this.taskService.taskList$;
  taskList: ITask[] = []

  @Input()
  set TaskList(value: ITask[]) {
    this.taskList = value;
  }
}