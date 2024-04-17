import { Component, EventEmitter, Input, Output } from '@angular/core';
import{ TareasStorageService} from 'src/app/services/tareas-storage.service';

@Component({
  selector: 'app-footer-tasks-list',
  templateUrl: './footer-tasks-list.component.html',
  styleUrls: ['./footer-tasks-list.component.css']
})
export class FooterTasksListComponent {
  
  @Input() public tasksCount: number = 0;
  
  @Input() public completedTasksCount: number = 0;
  
  @Output() refresList = new EventEmitter<boolean>();

  constructor(private tareasStorageService :TareasStorageService){}    
  
  clearCompletedTask(){
    this.tareasStorageService.clearCompletedTask();
    this.refresList.emit(true);
  }

}
