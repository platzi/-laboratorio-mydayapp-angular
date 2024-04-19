import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Task } from '../model/task.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class JotaService {

  private tasks: Task[] = []
  private tasks$: Subject<Task[]>= new Subject()
  private storageService: StorageService

  constructor(){
    this.storageService = new StorageService
  }

  getJota(): Observable<Task[]>{
    return this.tasks$.asObservable()
  }
  initTasks(){
    if(localStorage.getItem('mydayapp-angular')){
      this.tasks = this.storageService.readStorage();
    } 
    this.saveTasks()
  }

  private saveTasks(){
    this.tasks$.next(this.tasks)
    this.storageService.save(this.tasks);
   
  }

  addTask(task: Task){
    this.tasks.push(task)
    this.saveTasks()
  }

  updateTask(task:Task){
    const completed = task.completed
    const index = this.tasks.findIndex(op => op.id == task.id);

    this.tasks[index].completed = !completed
    this.saveTasks()
  }
  deleteTask(task:Task){
    this.tasks = this.tasks.filter(op => op.id != task.id);
    this.saveTasks()
  }
  editingTask(task:Task){
    const index = this.tasks.findIndex(op => op.id == task.id);
    this.tasks.forEach((value,i)=>{
        (i===index) ? this.tasks[i].editing=true : this.tasks[i].editing=false
    })
    this.saveTasks()
  }
  editingTextTask(task:Task,text:string){
    const index = this.tasks.findIndex(op => op.id == task.id);
    this.tasks[index].title=text
    this.tasks[index].editing=false
    this.saveTasks()
  }
  tasksByFilter(filter:string): Task[]{
    if(filter=='pending'){
      return this.tasks.filter(task => !task.completed)
    }
    if(filter=='completed'){
      return this.tasks.filter(task => task.completed)
    }
    return this.tasks
  }

  clearCompleted(){
    this.tasks = this.tasks.filter(op => !op.completed);
    this.saveTasks()
  }

  getTaskCompleted(): Task[]{
    return this.tasks.filter(op => op.completed);
  }
  getClear(filter:string):boolean{
    let array = this.tasks.filter(op => op.completed);
    return array.length>0 && filter!='pending' ? true : false
  }
}