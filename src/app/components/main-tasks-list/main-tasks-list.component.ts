import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TareasStorageService } from 'src/app/services/tareas-storage.service';
import { Task } from 'src/app/types/tasks';
@Component({
  selector: 'app-main-tasks-list',
  templateUrl: './main-tasks-list.component.html',
  styleUrls: ['./main-tasks-list.component.css']
})
export class MainTasksListComponent {

  @Input() tasks:Task[]=[];
  @Output() refreshData = new EventEmitter<boolean>();
  constructor(private taskService:TareasStorageService){
  }
  public changeStatus(task:Task){
    task.completed= !task.completed;
    
  }
  onRefresh(event: boolean) {
    if (event) {
      this.refreshData.emit(true);
    }
  }

  

}
