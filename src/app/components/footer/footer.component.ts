import { Component, OnInit } from '@angular/core';
import { TaskService } from '@app/services/task.service'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  constructor (private taskService: TaskService) { }
  taskList$ = this.taskService.taskList$;
  taskLength: number = 0
  taskLengthCompleted: number = 0
  ngOnInit() {
    this.taskList$.subscribe(taskList => {
      this.taskLength = taskList.filter(item => item.completed ===false).length
      this.taskLengthCompleted = taskList.filter(item => item.completed ===true).length
    })
  }

  clearCompleted(){
    this.taskService.clearCompleted()
  }

}