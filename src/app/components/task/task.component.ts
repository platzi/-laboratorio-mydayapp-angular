import { Component, effect, inject, Input } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  private taskService = inject(TasksService);

  @Input() task!: Task;
  @Input() index!: number;

  handleEditingTask(){
    this.taskService.editingTask(this.index);
  }

  handleCompletedTask(){
    this.taskService.changeCompletedTask(this.index);
  }

  handleUpdateTextTask(event: Event){
    this.taskService.updateTextTask(event, this.index);
  }

  handleExitEditingTask(){
    this.taskService.exitEditingTask();
  }

  handleDeleteTask(){
    this.taskService.deleteTask(this.index);
  }

}