import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TaskService } from '@shared/services/task/task.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
})
export class FooterComponent {
  constructor(public taskService: TaskService) {}

  clearCompletedTask() {
    this.taskService.list.update((tasks) =>
      tasks.filter((task) => !task.completed)
    );
  }
}
