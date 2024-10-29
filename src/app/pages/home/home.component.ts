import { Component, computed, effect, inject, Injector, Input, OnInit, Signal, signal, WritableSignal, OnChanges } from '@angular/core';
import { Task } from '../../models/task.interface';
import { TaskComponent } from "../../components/task/task.component";
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
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
  tasksService = inject(TasksService);
  tasks: Signal<Task[]> = signal<Task[]>([]);
  @Input() filter?: 'all' | 'completed' | 'pending';
  
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
    this.tasks = this.tasksService.getTasks();
    this.tasksService.trackChanges();
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

    this.tasksService.addTask(value);
    this.newTaskControl.setValue('');
  }

  updateTaskStatus(id: number, isChecked: boolean): void {
    this.tasksService.updateTaskStatus(id, isChecked);
  };

  enableEdit(id: number): void {
    this.tasksService.enableEdit(id);
  }
  
  clearCompleted(): void {
    this.tasksService.clearCompleted();
  }
  
 /*  applyFilter(filter: 'all' | 'completed' | 'pending'): void {
    this.filter.set(filter);
  } */
}
