import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TaskService } from '@app/services/task.service'
import { ITask } from '@app/models/Task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  taskLength = 0
  currentList = this.taskService.currentList;
  taskList: ITask[] = [];
  currentRoute: string = '';
  filterTaskList$!: any;

  constructor (private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.taskService.taskList$.subscribe(data => {
      this.taskLength = data.length
      this.taskList = data
    })
    this.filterTaskList$ = this.route.url.subscribe(url => {
      if (url.length === 0) {
        this.currentRoute = 'all';
      } else {
        this.currentRoute = url[0].path;
      }
      this.filterTasks(this.currentRoute);
    });
  }

  ngOnDestroy() {
    this.filterTaskList$.unsubscribe();
  }

  filterTasks(filter: string) {
    switch (filter) {
      case 'all':
        this.taskList;
        break;
      case 'pending':
        this.taskList = this.currentList.filter(task => task.completed === false)
        break;
      case 'completed':
        this.taskList = this.currentList.filter(task => task.completed === true)
        break;
      default:
        this.taskList;
        break;
    }
  }
}
