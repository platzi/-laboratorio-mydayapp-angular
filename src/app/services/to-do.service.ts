import { Injectable } from '@angular/core';
import { ToDo } from '../models/to-do.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private storageKey: string = 'mydayapp-angular';  
  
  // BehaviorSubject para almacenar y emitir los datos
  private toDosSubject = new BehaviorSubject<ToDo[]>(this.getToDos());

  // Observable al que los componentes pueden suscribirse
  toDos$ = this.toDosSubject.asObservable();
  
  constructor() { }

  setToDos(data: ToDo[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
    // Notifica a los suscriptores el nuevo estado
    this.toDosSubject.next(data);
    console.log('Notificando nuevo guardado de ToDos');
  }
  getToDos(): ToDo[] {
    const storage = localStorage.getItem(this.storageKey);
    return storage ? JSON.parse(storage) : null;
  }

  addToDo(toDoTitle: string): void {
    const toDos = [...this.getToDos()];
    const newToDo: ToDo = {
      id: Date.now().toString(),
      title: toDoTitle,
      completed: false,
      editMode: false,
    };

    toDos.push(newToDo);
    this.setToDos(toDos);
    // Notifica a los suscriptores el nuevo estado
    this.toDosSubject.next(toDos);
    console.log('Notificando nuevo ToDo agregado');
  }
  deleteToDo(toDoId: string): void {
    const toDos = [...this.getToDos()];
    const toDosUpdated = toDos.filter((toDo) => toDo.id !== toDoId);
    this.setToDos(toDosUpdated);
    // Notifica a los suscriptores el nuevo estado
    this.toDosSubject.next(toDosUpdated);
    console.log('Notificando ToDo eliminado');
  }

  updateToDoTitle(toDoId: string, newTitle: string) {
    const toDos = [...this.getToDos()];
    const toDosUpdated = toDos.map((toDo) => {
      if (toDo.id === toDoId) {
        return {
          ...toDo,
          title: newTitle
        };
      }
      return toDo;
    });

    this.setToDos(toDosUpdated);
    // Notifica a los suscriptores el nuevo estado
    this.toDosSubject.next(toDosUpdated);
    console.log('Notificando cambio de título');
  }
  updateToDoState(toDoId: string) {
    const toDos = [...this.getToDos()];
    const toDosUpdated = toDos.map((toDo) => {
      if (toDo.id === toDoId) {
        return {
          ...toDo,
          completed:!toDo.completed
        };
      }
      return toDo;
    });

    this.setToDos(toDosUpdated);
    // Notifica a los suscriptores el nuevo estado
    this.toDosSubject.next(toDosUpdated);
    console.log('Notificando cambio de estado');
  }
}
