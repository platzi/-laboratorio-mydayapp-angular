import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ToDo } from 'src/app/models/to-do.model';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-to-do-summary',
  templateUrl: './to-do-summary.component.html',
  styleUrls: ['./to-do-summary.component.css']
})
export class ToDoSummaryComponent implements OnChanges {
  @Input() toDos!: ToDo[];
  pendingToDos!: number;

  constructor(private toDoService: ToDoService) { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    if (changes.hasOwnProperty('toDos')) {
      this.pendingToDos = this.getPendingCount(this.toDos);
      // console.log(this.pendingToDos);
    }
  }

  getPendingCount(toDos: ToDo[]): number {
    const filteredToDos = toDos.filter((toDo) => toDo.completed === false);
    return filteredToDos.length;
  }

  deleteCompletedToDos() {
    const updatedToDos = [...this.toDos].filter((toDo) => toDo.completed === false);
    this.toDoService.setToDos(updatedToDos);
  }
}
