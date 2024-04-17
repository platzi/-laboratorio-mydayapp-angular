import { Injectable } from '@angular/core';

import { Task, tasksStatusEnum } from '../types/tasks';

@Injectable({
  providedIn: 'root'
})
export class TareasStorageService {
  private key: string = 'mydayapp-angular';
  private _tasksList : Task[] = Array.from<Task>({length:0}); //tareas


  constructor() { }

  //obtener las listas 
  public getTaskList(){
    if (localStorage.getItem(this.key)){
      this._tasksList = JSON.parse(localStorage.getItem(this.key) ||'[]');           
    }
    return this._tasksList;
  }

  //guarda en storage
  private setTaskList(){
    localStorage.setItem(this.key,JSON.stringify(this._tasksList));
  }
  // si es valido el titulo
  private isTittleValid(task: Task) {
    return task.title.trim().length > 0;
  }
  

  //cuenta la cantidad de tareas  
  get countTasks() {
    return this.getTaskList().length;
  }

  //obtener el mayo id
  get biggerId(){
    if(!this.hasTasks){
      return 0;
    }

    const list = this.getTaskList().sort(
      (a:Task,b:Task)=> parseInt(a.id)-parseInt(b.id)
    );
    return parseInt(list[list.length -1].id);
  }

  //tareas pendientes
  public getPendingTasks() {
    return this.getTaskList().filter((t) => !t.completed);
  }
  //tareas completadas
  public getCompletedTasks(){
    return this.getTaskList().filter((t)=>t.completed);
  }
  //agregar tarea 
  public addTask(task :Task){
    if(this.isTittleValid(task)){
      task.title = task.title.trim();
      this._tasksList.push(task);
      this.setTaskList();
      return true;
    }
    return false;
  }
  public updateTarea(tarea: Task) {
    const index = this._tasksList.findIndex((t) => t.id === tarea.id);
    if (index !== -1) {
      tarea.title = tarea.title.trim();
      this._tasksList[index] = tarea;
      this.setTaskList();
      return true;
    }
    return false;
  }

  //eliminar tarea
  public deleteTarea(tarea :Task){
    const index = this._tasksList.findIndex((t)=>t.id === tarea.id);
    if (index !== -1) {
      this._tasksList.splice(index,1);
      this.setTaskList();
      return true;
    }
    return false;
  }
  //si existen tareas
  get hasTasks() {
    return this.getTaskList().length > 0;
  }
  //cuenta la tareas pendientes 
  get countPendientTasks() {
    return this.getTaskList().filter((t)=> !t.completed).length;
  }

  get countCompletedTasks(){    
    return this.getTaskList().filter((t)=>t.completed).length;
  }
  public clearCompletedTask(){
    this._tasksList= this.getTaskList().filter((t)=>!t.completed);
    this.setTaskList();
  }


}
