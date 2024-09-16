import { CommonModule } from '@angular/common';
import { Component, effect, inject, Injector, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TaskService } from '@shared/services/task/task.service';
import { FooterComponent } from '@todo/components/footer/footer.component';
import { HeaderComponent } from '@todo/components/header/header.component';
import { TaskComponent } from '@todo/components/task/task.component';

const TASK_KEY_LS = 'mydayapp-angular';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FooterComponent,
    HeaderComponent,
    TaskComponent,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  injector = inject(Injector);
  constructor(public taskService: TaskService, public router: Router) {}

  ngOnInit() {
    const task = localStorage.getItem(TASK_KEY_LS);
    if (task) {
      this.taskService.list.set(JSON.parse(task));
    }

    this.trackTasks();
  }

  private trackTasks() {
    effect(
      () => {
        const tasks = this.taskService.list();
        const taskSaved = tasks.map((task) => {
          return { ...task, editing: false };
        });
        localStorage.setItem(TASK_KEY_LS, JSON.stringify(taskSaved));
      },
      { injector: this.injector }
    );
  }
}
