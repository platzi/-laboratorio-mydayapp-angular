import { Component } from '@angular/core';
import { TaskService } from '../shared/services/task/task.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  taskName: string;
  constructor(private taskService: TaskService) {
    this.taskName = '';
  } 

  addTask() {
    if (this.taskName.trim()) {
      this.taskService.addTask(this.taskName.trim());
      this.taskName = '';
    }
  }

}
