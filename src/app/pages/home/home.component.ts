import { Component, computed, effect, inject, Injector, Input, OnInit, Signal, signal, WritableSignal, OnChanges } from '@angular/core';
import { Task } from '../../models/task.interface';
import { TaskComponent } from "../../components/task/task.component";
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    RouterLinkWithHref,
    TaskComponent,
    ReactiveFormsModule
  ],
  standalone: true,

})
export class HomeComponent implements OnInit, OnChanges {
  injector = inject(Injector);
  @Input() filter?: 'all' | 'completed' | 'pending';
  localStorageKey: string = 'mydayapp-angular';
  tasks: WritableSignal<Task[]> = signal<Task[]>([]);
  newTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required
    ]
  });
  completedCounter = computed(() => {
    return this.tasks().filter((task: Task) => task.completed).length;
  });

  filteredTasks: Signal<Task[]> = signal<Task[]>([]);
  
  constructor() { }

  ngOnInit(): void {
    const storedTasks = localStorage.getItem(this.localStorageKey);

    if(storedTasks) {
      this.tasks.set(JSON.parse(storedTasks));
    }
    this.trackChanges();
  }

  ngOnChanges(): void {
    this.filteredTasks = computed((): Task[] => {
      const tasks = this.tasks();
  
      if(this.filter === 'completed') {
        return tasks.filter((task: Task) => task.completed);
      }
  
      if(this.filter === 'pending') {
        return tasks.filter((task: Task) => !task.completed);
      }
  
      return tasks;
    });
  }

  addTodo():void {
    const value: string = this.newTaskControl.value;
    if(
      this.newTaskControl.valid && 
      value.trim() === ''
    ) {
      return;
    }

    this.addTask(value);
    this.newTaskControl.setValue('');
  }

  addTask(title: string): void {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasks()));
  }

  updateTaskStatus(id: number, isChecked: boolean): void {
    this.tasks.update((prev: Task[]): Task[] => {
      return prev.map((task: Task) => {
        if(task.id === id) {
          return {
            ...task,
            completed: isChecked
          };
        }
        return task;
      });
    });
  };

  enableEdit(id: number): void {
    this.tasks.update((prev: Task[]): Task[] => {
      return prev.map((task: Task) => {
        if(task.id === id) {
            return {
              ...task,
              editing: !task.editing
            };
        }
        return {
          ...task,
          editing: false
        };
      });
    });
  }

  updateTaskTitle(id: number, title: string): void {
    this.tasks.update((prev: Task[]): Task[] => {
      return prev.map((task: Task) => {
        if(task.id === id) {
          return {
            ...task,
            title,
            editing: false
          }
        }
        return task;
      });
    });
  }
  
  trackChanges(): void{
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
    }, {injector: this.injector});
  }

  clearCompleted(): void {
    this.tasks.update((prev: Task[]): Task[] => {
      return prev.filter((task: Task) => !task.completed);
    });
  }

  removeTask(id: number): void {
    this.tasks.update((prev: Task[]): Task[] => {
      return prev.filter((task: Task) => task.id !== id);
    });
  }
  
 /*  applyFilter(filter: 'all' | 'completed' | 'pending'): void {
    this.filter.set(filter);
  } */
}
