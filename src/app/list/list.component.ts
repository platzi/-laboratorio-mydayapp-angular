import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { TaskService } from '../shared/services/task/task.service';
import { Task } from '../shared/models/task.model';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  tasksList: Array<Task>;
  subscription: Subscription;
  
  constructor(private taskService: TaskService, private route: ActivatedRoute) {
    this.subscription = Subscription.EMPTY;
    this.tasksList = [];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const status = paramMap.get('status');
      switch (status) {
        case 'pending':
          this.taskService.filterTasks(false);
          break;
        case 'completed':
          this.taskService.filterTasks(true);
          break;
        default:
          this.taskService.filterTasks();
          break;
      }
    });
  
    this.subscription = this.taskService.tasks$.subscribe(tasks => {
      this.tasksList = tasks;
    });
  }

  completedTask(task: Task) {
    task.completed = !task.completed;
    this.taskService.editTask(task);
  }

  editingTask(task: Task): void {
    const element = document.getElementById(task.id.toString());
    if (!element) return;
  
    element.classList.add('editing');
  
    setTimeout(() => {
      const input = document.getElementById(`input${task.id}`);
      if (input) {
        input.focus();
        input.setAttribute('value', task.title);
      }
    }, 0);
  }

  updateTask(event: Event, task: Task): void {
    const inputElement = event.target as HTMLInputElement;
    const taskTitle = inputElement.value.trim();
  
    if (taskTitle) {
      task.title = taskTitle;
      this.taskService.editTask(task);
  
      document.getElementById(task.id.toString())?.classList.remove('editing');
    }
  }

  cancelTask(task: Task) {
    let element = document.getElementById(task.id.toString());
    element?.classList.remove('editing');
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task);
  }
}
