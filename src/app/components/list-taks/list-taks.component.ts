import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tarea } from 'src/app/interfaces/task.interface';
import { TaskListenerService } from '../../services/task-listener.service';

@Component({
  selector: 'app-list-taks',
  templateUrl: './list-taks.component.html',
  styleUrls: ['./list-taks.component.css'],
})
export class ListTaksComponent implements OnInit {
  public listTasks: Tarea[] = [];
  public isEdit: boolean = false;
  public idEdit: string = '';
  public valueTask: string = '';
  public path: string = '';

  constructor(
    private tasksListenerService: TaskListenerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.path = location.pathname;
    this.tasksListenerService.getListTasks().subscribe((resp: Tarea[]) => {
      this.listTasks = resp;
    });
  }

  cambiarEstadoTask(task: Tarea) {
    let taskTemp = { ...task };
    taskTemp.completed = taskTemp.completed ? false : true;
    let listTemp = [...this.listTasks];
    let index = listTemp.findIndex((element) => element.id === taskTemp.id);
    listTemp[index] = taskTemp;
    this.tasksListenerService.setListTaks(listTemp);
  }

  editarTask(task: Tarea) {
    this.isEdit = true;
    this.idEdit = task.id;
    this.valueTask = task.title;
  }

  actualizarTask(event: KeyboardEvent) {
    const code = event.code;
    if (code === 'Escape') {
      this.isEdit = false;
      this.idEdit = '';
      return;
    }
    if (code === 'Enter' && this.valueTask.length > 0) {
      let listTemp = [...this.listTasks];
      let index = listTemp.findIndex((element) => element.id === this.idEdit);
      listTemp[index].title = this.valueTask.trim();
      this.tasksListenerService.setListTaks(listTemp);
      this.isEdit = false;
      this.idEdit = '';
    }
  }

  eliminarTask(id: string) {
    let listTemp = [...this.listTasks];
    let index = listTemp.findIndex((element) => element.id === id);
    listTemp.splice(index, 1);
    this.tasksListenerService.setListTaks(listTemp);
  }
}
