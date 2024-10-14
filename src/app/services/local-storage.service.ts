import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  key: string = 'mydayapp-angular';

  constructor() { }

  setTasks(tasks: any){
    localStorage.setItem(this.key, JSON.stringify(tasks));
  }

  getItems(){
    return JSON.parse(localStorage.getItem(this.key)!);
  }

  clear(){
    localStorage.clear();
  }
}
