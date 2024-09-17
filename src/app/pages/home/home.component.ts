import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { TaskTodo } from 'src/app/interfaces/task';
import { TodoService } from 'src/app/services/todo-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',



})
export class HomeComponent implements OnInit {

  private todoService = inject(TodoService);

  public tasks: Signal<TaskTodo[]> = computed(()=> this.todoService.todos())

  constructor() { }

  ngOnInit(): void {

  }

}
