import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/model/task.model';
import { JotaService } from 'src/app/services/jota.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
})
export class TasksListComponent implements OnInit,OnDestroy{

  suscription: Subscription = new Subscription;
  @Input() tasksList: Task[] = [];

  constructor(private jotaService: JotaService){
  }
  
  ngOnInit() {
    this.suscription=this.jotaService.getJota().subscribe(tasks =>{
      this.tasksList=tasks
    })
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe()
  }
}
