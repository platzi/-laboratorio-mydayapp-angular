import { Component, ElementRef, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToDo } from 'src/app/models/to-do.model';
import { ToDoService } from 'src/app/services/to-do.service';

enum FilterKeys {
  all = "all",
  pending = "pending",
  completed = "completed",
}

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnChanges {
  @Input() toDos!: ToDo[];
  toDosToShow: ToDo[] = [];
  @ViewChildren('editInput') editInputs!: QueryList<ElementRef<HTMLInputElement>>;
  filter!: string[];

  newToDoTitleCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('^(?!\\s*$).+'),
  ]});

  constructor(
    private toDoService: ToDoService,
    private route: ActivatedRoute
  ) {
    this.route.url.subscribe((segments) => {
      this.filter = segments.map((segment) => segment.path);
      console.log('Segmentos de ruta (constructor - list): ', this.filter);
    });
  }

  getToDosToShow(filter: FilterKeys) {
    const toDosMapper: Record<FilterKeys, () => void> = {
      all: () => this.toDosToShow = this.toDos,
      pending: () => this.toDosToShow = this.toDos.filter((toDo) => !toDo.completed),
      completed: () => this.toDosToShow = this.toDos.filter((toDo) => toDo.completed)
    };
    toDosMapper[filter]();
    console.log('ToDos a mostrar (onChanges) - list: ', toDosMapper[filter]());
  }

  ngOnInit() {
    console.log('Desde el onInit - list');
    // this.route.url.subscribe((segments) => {
    //   this.filter = segments.map((segment) => segment.path);
    // });
    // console.log('Segmentos', this.filter);
    // console.log('Filtro: ', this.filter[0]);
    // if(this.filter.length > 0) {
    //   // console.log('Filtro válido: ', Object.keys(FilterKeys).includes(this.filter[0]));
    //   const isValidFilter = Object.keys(FilterKeys).includes(this.filter[0]);
    //   if (isValidFilter) {
    //     this.getToDosToShow(this.filter[0] as FilterKeys);
    //   } else {
    //     console.error('Filtro no válido');
    //     this.getToDosToShow(FilterKeys.all);
    //   }
    // }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('toDos')) {
      this.toDosToShow = this.toDos;
      console.log('Desde el onChanges - list');
    }
    if(this.filter.length > 0) {
      // console.log('Filtro válido: ', Object.keys(FilterKeys).includes(this.filter[0]));
      const isValidFilter = Object.keys(FilterKeys).includes(this.filter[0]);
      if (isValidFilter) {
        this.getToDosToShow(this.filter[0] as FilterKeys);
      } else {
        console.error('Filtro no válido');
        this.getToDosToShow(FilterKeys.all);
      }
    }
  }

  updateToDoTitle(toDoId: string) {
    if (this.newToDoTitleCtrl.valid) {
      const newToDoTitle = this.newToDoTitleCtrl.value.trim();
      this.toDoService.updateToDoTitle(toDoId, newToDoTitle);
      this.toDosToShow = this.toDos.map((toDo) => {
        if (toDo.id === toDoId) {
          this.newToDoTitleCtrl.setValue('');
          return {
            ...toDo,
            editMode: false
          };
        }
        return toDo;
      });
    }
  }
  updateToDoState(toDoId: string) {
    this.toDoService.updateToDoState(toDoId);
  }

  enableEditMode(toDoId: string) {
    this.toDosToShow = this.toDos.map((toDo) => {
      if (toDo.id === toDoId && !toDo.completed) {
        this.newToDoTitleCtrl.setValue(toDo.title);
        return {
          ...toDo,
          editMode: true
        };
      }
      return {
        ...toDo,
        editMode: false
      }
    });
    console.log('Edit mode enabled - list');
    // Busca el input correspondiente y lo enfoca
    setTimeout(() => {
      // console.log('editInputs: ', this.editInputs);
      const inputToFocus = this.editInputs.find((ref, index) => {
        return this.toDosToShow[index].id === toDoId;
      });
      if (inputToFocus) {
        inputToFocus.nativeElement.focus();
      }
    }, 0);
  }
  disableEditMode(toDoId: string) {
    this.toDosToShow = this.toDos.map((toDo) => {
      if (toDo.id === toDoId) {
        this.newToDoTitleCtrl.setValue('');
        return {
          ...toDo,
          editMode: false
        };
      }
      return toDo
    });
    console.log('Edit mode disabled - list');
  }

  deleteToDo(toDoId: string) {
    this.toDoService.deleteToDo(toDoId);
  }
}
