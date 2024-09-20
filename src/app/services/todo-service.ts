import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
  effect,
} from '@angular/core';
import { TaskTodo } from './../interfaces/task';

@Injectable({ providedIn: 'root' })
export class TodoService {
  #todos: WritableSignal<TaskTodo[]> = signal([]);

  public todos: Signal<TaskTodo[]> = computed(() => this.#todos());


  public todosPending: Signal<TaskTodo[]> = computed(
    () => this.todos().filter((task) => !task.completed)
  );

  public todosCompleted: Signal<TaskTodo[]> = computed(
    () => this.todos().filter((task) => task.completed)
  );

  constructor() {
    this.getTodosLocalStorage();

    effect(() => {
      if (this.#todos().length > 0) {
        localStorage.setItem('mydayapp-angular', JSON.stringify(this.#todos()));
      }
    });
  }

  private getTodosLocalStorage() {
    if (!localStorage.getItem('mydayapp-angular')) return;

    const todosLocalStorage = JSON.parse(
      localStorage.getItem('mydayapp-angular')!
    ) as TaskTodo[];

    this.#todos.set(todosLocalStorage);
  }

  public addNewTask(titleTask: string) {
    this.#todos.set([
      ...this.#todos(),
      {
        id: `${this.#todos().length + 1}`,
        completed: false,
        title: titleTask,
        edit: false,
      },
    ]);
  }

  public removeTask(taskId: string) {
    const tasksWithoutRemoved: TaskTodo[] = this.#todos().filter(
      (task) => task.id != taskId
    );

    this.#todos.set(tasksWithoutRemoved);
  }

  public toogleTask(taskId: string) {
    const indexTask = this.#todos().findIndex((task) => task.id == taskId);

    const todos = [...this.#todos()];

    let taskUpdate = todos[indexTask];

    taskUpdate = {
      ...taskUpdate,
      completed: !taskUpdate.completed,
    };

    todos.splice(indexTask, 1, taskUpdate);

    this.#todos.set(todos);
  }

  public clearAllCompleteTasks() {
    const pendingTasks = this.#todos().filter((task) => !task.completed);
    this.#todos.set(pendingTasks);
  }

  public openEditModeByIdTask(taskId: string) {
    this.#todos.update((tasks) =>
      tasks.map((task) => ({ ...task, edit: false }))
    );

    const indexTask = this.#todos().findIndex((task) => task.id == taskId);

    const todos = [...this.#todos()];

    let taskUpdate = todos[indexTask];

    taskUpdate = {
      ...taskUpdate,
      edit: true,
    };

    todos.splice(indexTask, 1, taskUpdate);

    this.#todos.set(todos);
  }

  public closeEditModeByIdTask(taskId: string) {
    this.#todos.update((tasks) =>
      tasks.map((task) => ({ ...task, edit: false }))
    );
  }

  public editTaskTitle(taskId: string, title:string) {
    const indexTask = this.#todos().findIndex((task) => task.id == taskId);

    const todos = [...this.#todos()];

    let taskUpdate = todos[indexTask];

    taskUpdate = {
      ...taskUpdate,
      title:title,
      edit: false,
    };

    console.log(taskUpdate);

    todos.splice(indexTask, 1, taskUpdate);

    this.#todos.set(todos);
  }
}
