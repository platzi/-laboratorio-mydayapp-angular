import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITask } from '@app/models/Task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskListSource = new BehaviorSubject<ITask[]>([]);
  key = "mydayapp-angular-solution"
  currentList!: ITask[];
  taskList$ = this.taskListSource.asObservable()

  constructor () {
    const storedList = localStorage.getItem(this.key);
    if (storedList && storedList.length > 0) {
      this.taskListSource.next(JSON.parse(storedList));
    }
    this.taskList$.subscribe(v=>this.currentList=v);
  }

  saveStorage(currentList: ITask[]){
    localStorage.setItem(this.key, JSON.stringify(currentList));
  }

  create(title: string) {
    const task: ITask = {
      id: this.currentList.length,
      title,
      completed: false
    };
    if(title){
      this.currentList.push(task);
      this.taskListSource.next(this.currentList);
      this.saveStorage(this.currentList);
    }
  }

  update(id: number, task: ITask) {
    this.currentList.map(item=>{
      if(item.id==id){
        item=task
      }
    })
    this.taskListSource.next(this.currentList);
    this.saveStorage(this.currentList);
  }

  delete(id: number) {
    this.currentList=this.currentList.filter((item)=>item.id!==id);
    this.taskListSource.next(this.currentList);
    this.saveStorage(this.currentList);
  }

  clearCompleted(){
    this.currentList=this.currentList.filter((item)=>item.completed===false);
    this.taskListSource.next(this.currentList);
    this.saveStorage(this.currentList);
  }

}