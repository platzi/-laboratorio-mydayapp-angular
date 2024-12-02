import { Component, OnInit } from '@angular/core';
import { ToDo } from 'src/app/models/to-do.model';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  toDos: ToDo[] = [
    // {
    //   id: Date.now().toString(),
    //   title: 'Start Angular Lab',
    //   completed: false,
    // },
  ];

  constructor(private toDoService: ToDoService) {
    const toDosInStorage = this.toDoService.getToDos();
    console.log('Trayendo de LS (constructor - home)');
    if(!toDosInStorage) {
      this.toDoService.setToDos(this.toDos);
      console.log('Guardando en LS (constructor - home)');
    }
  }

  ngOnInit() {
    // Suscríbete al observable para actualizar la vista automáticamente
    this.toDoService.toDos$.subscribe((nuevosToDos) => {
      this.toDos = nuevosToDos;
    });
    this.toDos = this.toDoService.getToDos();
    console.log('Trayendo de LS (onInit - home)');
  }
}
