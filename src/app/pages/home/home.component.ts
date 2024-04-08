import { Component, Injector, OnChanges, OnInit, SimpleChanges, effect, inject, signal } from '@angular/core';
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

  trackTasks(): void {
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem("mydayapp-angular", JSON.stringify(tasks));
    }, {injector: this.injector})
  }

  addTask(): void {
    if(this.titleControl.valid) {
      const title =  this.formatTask(this.titleControl.value)
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

  toggleCompleted(index: number): void {
    this.tasks.update( (tasks: Task[]) => {
      return tasks.map((item, i) => {
        if(index == i) {
          return {
            ...item,
            completed: !item.completed
          }
        }

        return item
      })
    })
  }

  editingMode(index: number): void {
    if(this.tasks()[index].completed) return;

    this.tasks.update( (tasks: Task[]) => {
      return tasks.map((item, i) => {
        if(index == i) {
          return {
            ...item,
            editing: true,
          }
        }

        return {
          ...item,
          editing: false
        }
      })
    })
  }

  updateTask(e: Event, index: number): void {
    const inputElement = e.target as HTMLInputElement;
    const newTitle = this.formatTask(inputElement.value);

    if(newTitle !== "") {
      this.tasks.update( (tasks: Task[]) => {
        return tasks.map((item, i) => {
          if(index == i) {
            return {
              ...item,
              editing: false,
              title: newTitle
            }
          }
  
          return item
        })
      })
    }

  }

  formatTask(title: string | null): string {
    return title?.trim() || "";
  }

  exitEditingMode() {
    this.tasks.update( (tasks: Task[]) => {
      return tasks.map((item, i) => {
        return {
          ...item,
          editing: false
        }
      })
    })
  }

  exam() {
    console.log(1);
  }

}
