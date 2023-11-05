import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {

  allTask: Task[] = [];
  suscription !: Subscription;

  constructor(
    private taskService: TasksService
  ) { }

  ngOnInit(): void {
    this.taskService.initTasks();
    this.suscription = this.taskService.tasksList$.subscribe( tasks => {
      if(tasks){
        this.allTask = tasks;
      }
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

}
