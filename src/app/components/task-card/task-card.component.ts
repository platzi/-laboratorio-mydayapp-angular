import { Component, input } from '@angular/core';
import { appTask } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  task = input.required<appTask>();
}
