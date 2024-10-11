import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ListTasksComponent } from 'src/app/components/list-tasks/list-tasks.component';
import { FooterTaskComponent } from 'src/app/components/footer-task/footer-task.component';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ListTasksComponent,
    FooterTaskComponent, 
    CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent{
  private taskServices = inject(TasksService);

  addTask(event: Event){
    const newTask = (event.target as HTMLInputElement).value.trim();
    
    if(newTask !== ''){
      this.taskServices.addTask(newTask);
    }
  }

}
