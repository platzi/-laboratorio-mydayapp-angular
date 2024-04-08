import { Component, Injector, OnChanges, OnInit, SimpleChanges, effect, inject, signal } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  private tasksServcie = inject(TasksService);
  tasks = signal<Task[]>([]);

  titleControl = new FormControl("", {
    nonNullable: false,
    validators: [Validators.required]
  })

  injector = inject(Injector);

  constructor() { }

  ngOnInit(): void {
    const st = localStorage.getItem("mydayapp-angular");

    if(st) {
      const tasks = JSON.parse(st);
      this.tasks.set(tasks);
    }

    this.trackTasks()
  }

  trackTasks() {
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem("mydayapp-angular", JSON.stringify(tasks));
    }, {injector: this.injector})
  }

  add(): void {
    if(this.titleControl.valid) {
      const title =  this.titleControl.value?.trim() || "";
      if(title !== "") {
        this.setTask(title);
        this.titleControl.setValue("")
      }
    }
  }

  setTask(title: string): void {
    const newTask: Task = {
      id: Date.now().toString(),
      title: title,
      completed: false
    }

    this.tasks.update((prev) => [newTask, ...prev]);
  }

}
