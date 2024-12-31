import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TaskService } from '../shared/services/task/task.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  numberOfTasks: number;
  numberOfTasksCompleted: number;
  subscription: Subscription;
  status: string;


  constructor(private taskService: TaskService, private route: ActivatedRoute) {
    this.subscription = Subscription.EMPTY;
    this.numberOfTasks = 0;
    this.numberOfTasksCompleted = 0;
    this.status = '';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.status = paramMap.get('status') ?? this.status;
    });
  
    this.subscription = this.taskService.tasks$.subscribe(tasks => {
      this.numberOfTasks = tasks.filter(task => !task.completed).length;
      this.numberOfTasksCompleted = tasks.filter(task => task.completed).length;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clearCompletedTask() {
    this.taskService.clearCompletedTask();
  }

  isActive(item: string = ''): boolean {
    return this.status === item;
  }

}
