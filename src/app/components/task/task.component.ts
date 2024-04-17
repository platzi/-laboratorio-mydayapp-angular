import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TareasStorageService } from 'src/app/services/tareas-storage.service';
import { Task } from 'src/app/types/tasks';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  @Input() task: Task = { id: '', title: '', completed: false };
  public editing = false;

  @Output() tasksRefresh = new EventEmitter<boolean>();


constructor(private taskService: TareasStorageService){}

  
  public saveChanges(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (this.isValidTitle) {
        if (this.taskService.updateTarea(this.task)) {
          this.editing = false;
          this.tasksRefresh.emit(true);
        }
      }
    }
  }


  get isValidTitle() {
    return this.task.title && this.task.title.trim() != '';
  }

  public onDelete(){
    if (this.taskService.deleteTarea(this.task)) {
      this.tasksRefresh.emit(true);      
      console.log("se presiono eliminar");
    }
  }

  public changeStatus(){
    this.task.completed = !this.task?.completed;
    if (this.taskService.updateTarea(this.task)) {
      this.tasksRefresh.emit(true);      
    }
    
  }

  onEdit() {
    this.editing = !this.editing;
    }
}
