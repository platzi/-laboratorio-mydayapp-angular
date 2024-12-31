import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private tasksList: Array<Task>;
  private tasks = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasks.asObservable();

  constructor() {
    this.tasksList = [];
  }

  addTask( taskName:string ) {
    
    let task = {
      id: this.tasksList.length + 1,
      title: taskName,
      completed: false
    } as Task;

    this.tasksList.push(task);
    this.tasks.next(this.tasksList);
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasksList));
  }

  editTask(task: Task) {
    let index = this.tasksList.findIndex((obj => obj.id === task.id));
    this.tasksList[index] = {
      id: task.id,
      title: task.title,
      completed: task.completed
    };
    this.tasks.next(this.tasksList);
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasksList));
  }

  deleteTask(task: Task) {
    let index = this.tasksList.findIndex((obj => obj.id === task.id));
    this.tasksList.splice(index, 1);
    this.tasks.next(this.tasksList);
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasksList));
  }

  filterTasks(completed?:boolean) {
    if(typeof completed !== 'undefined') {
      this.tasks.next(this.tasksList.filter((task => task.completed === completed)));
    } 
    else {
      this.tasks.next(this.tasksList);
    }
  }
  
  getLocalStorage() {
    var values = localStorage.getItem("mydayapp-angular");
    if(values) {
      this.tasksList = JSON.parse(values);
    }
    this.tasks.next(this.tasksList);
  }
  
  clearCompletedTask() {
    this.tasksList= this.tasksList.filter((obj => obj.completed === false));
    this.tasks.next(this.tasksList);
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasksList));
  }
}