import { Component, OnInit } from '@angular/core';
import { JotaService } from 'src/app/services/jota.service';
import { Task } from 'src/app/model/task.model';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
})
export class PendingComponent implements OnInit {
  
  pendingTask: Task[] = []

  constructor(private jotaService: JotaService){
  }
  ngOnInit() {
    this.pendingTask = this.jotaService.tasksByFilter('pending')
  }
}
