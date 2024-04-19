import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task.model';
import { JotaService } from 'src/app/services/jota.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent {

  @Input() task !: Task;

  constructor(private jotaService: JotaService){}

  updateTask(taks:Task){this.jotaService.updateTask(taks)}
  deleteTask(taks:Task){this.jotaService.deleteTask(taks)}
  editingTask(taks:Task){this.jotaService.editingTask(taks)}
  editingTextTask(taks:Task,event:Event){
    const input = event.target as HTMLInputElement
    this.jotaService.editingTextTask(taks,input.value.trim())
  }
}
