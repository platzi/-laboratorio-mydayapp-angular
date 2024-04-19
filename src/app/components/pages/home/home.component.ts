import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task.model';
import { JotaService } from 'src/app/services/jota.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{

  allTask: Task[] = []

  constructor(private jotaService: JotaService){
  }
  ngOnInit() {
    this.jotaService.initTasks()
    this.allTask = this.jotaService.tasksByFilter('all')
  }
}
