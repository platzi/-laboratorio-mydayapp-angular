import { computed, effect, inject, Injectable, Injector, signal } from '@angular/core';
import { Task } from '../models/task';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private storageService = inject(LocalStorageService);
  private injector = inject(Injector);

  tasks = signal<Task[]>([]);
  filter = signal('all');

  filteredTasks = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();

    if(filter === 'pending'){
      return tasks.filter(tasks => !tasks.completed);
    }
    if(filter === 'completed'){
      return tasks.filter(tasks => tasks.completed);
    }
    return tasks;
  });
  
  constructor() { 
    const storage = this.storageService.getItems();

    if (storage) {
      const tasks = storage;
      this.tasks.set(tasks);
    }

    this.trackTacks();
  }

  changeFilter(filter: 'all'| 'pending' | 'completed'){
    this.filter.set(filter);
  }

  trackTacks(){
    effect(() => {
      const tasks = this.tasks();
      this.storageService.setTasks(tasks);
    }, {injector: this.injector});
  }

  addTask(text: string){
    const newTask: Task = {
      id: Date.now().toString(),
      title: text,
      completed: false,
      editing: false
    };

    this.tasks.set([...this.tasks(), newTask]);
  }

  changeCompletedTask(index: number){
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if(index === position){
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task
      })
    })
  }

  updateTask(text: string, index: number){
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if(index === position){
          return {
            ...task,
            title: text,
            editing: false
          }
        }
        return task
      })
    })
  }

  deleteTask(index: number){
    this.tasks.update((tasks) => 
      tasks.filter((task, position) => position !== index)
    )
  }
  
  deleteAllTaskCompleted(){
    this.tasks.update((tasks) => 
    tasks.filter((task, position) => !task.completed))
  }

}
