import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task.model';
import { JotaService } from 'src/app/services/jota.service';


@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
})
export class CompletedComponent implements OnInit{

  completedTask: Task[] = [];
  constructor(private jotaService: JotaService){
  }
  ngOnInit() {
    this.completedTask = this.jotaService.tasksByFilter('completed')
  }
}
