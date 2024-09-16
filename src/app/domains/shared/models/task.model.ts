export class Task {
  id: number;
  title: string;
  completed: boolean;
  editing: boolean;
  constructor() {
    this.id = null;
    this.title = null;
    this.completed = null;
    this.editing = null;
  }
}
