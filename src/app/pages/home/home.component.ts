import { Component, signal } from '@angular/core';
import { appTask } from '../../models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  tasksList = signal<appTask[]>([]);

  constructor() {}
}
