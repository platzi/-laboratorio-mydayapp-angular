import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks = signal<Task[]>([
    {
      id: `1`,
      title: `Learn JavaScript`,
      completed: true,
      editing: false
    },{
      id: `2`,
      title: `Buy a unicorn`,
      completed: false,
      editing: false
    },{
      id: `3`,
      title: `Make dishes`,
      completed: false,
      editing: true
    }
  ]);

  constructor() { 
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
