import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared/services/task/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  hasTasks: boolean;
  subscription: Subscription;

  constructor(private taskService: TaskService) {
    this.subscription = Subscription.EMPTY;
    this.hasTasks = false;
  }

  ngOnInit(): void {
    this.taskService.getLocalStorage();
    this.subscription = this.taskService.tasks$.subscribe(tasks => {
      this.hasTasks = tasks.length > 0;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
