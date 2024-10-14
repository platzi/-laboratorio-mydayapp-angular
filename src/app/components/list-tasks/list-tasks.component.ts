import { Component, inject } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.css'
})
export class ListTasksComponent {
  private taskService = inject(TasksService);

  tasks = this.taskService.tasks;
  filteredTasks = this.taskService.filteredTasks;

  handleCompletedTask(index: number){
    this.taskService.changeCompletedTask(index);
  }

  editingTask(index: number, event: Event){
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index){
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        };
      })
    })
  }
  
  exitEditingTask(){
    this.tasks.update((tasks) => {
      return tasks.map((task) => {
        return {
          ...task,
          editing: false
        };
      })
    })
  }

  updateTextTask(event: Event, index: number){
    const newTask = (event.target as HTMLInputElement).value.trim();
    
    if(newTask !== ''){
      this.taskService.updateTask(newTask, index);
    }
  }
 
}