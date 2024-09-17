import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { TaskTodo } from './../interfaces/task';

@Injectable({ providedIn: 'root' })
export class TodoService {
  #todos: WritableSignal<TaskTodo[]> = signal([]);

  public todos: Signal<TaskTodo[]> = computed(() => this.#todos());

  constructor() {}

  public addNewTask(titleTask: string) {
    console.log(titleTask);
    this.#todos.set([
      ...this.#todos(),
      {
        id: `${this.#todos().length + 1}`,
        completed: false,
        title: titleTask,
      },
    ]);
  }
}
