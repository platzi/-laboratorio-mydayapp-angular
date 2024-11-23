import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { statusTask } from 'src/app/models/status-task.type';
import { StorageService } from 'src/app/services/storage.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private storage = inject(StorageService);
  private route = inject(ActivatedRoute);

  selectStatusTask: statusTask = 'all';

  tasks: Task[] = [];
  tasksBackground: Task[] = [];

  ngOnInit(): void {
    this.tasksBackground = this.storage.get();
    this.route.params.subscribe((p) => {
      this.selectStatusTask = p['filter'] || 'all';
      this.changeStatus();
    });
  }

  addTask(title: string) {
    this.tasksBackground = this.storage.get();
    const exist: Task[] = this.tasksBackground.filter(
      (task) => task.title === title
    );

    if (exist.length > 0) return;
    this.tasks = this.tasksBackground.concat({
      id: new Date().getTime(),
      title: title,
      completed: false,
    });
    this.storage.set(this.tasks);
    this.changeStatus();
  }

  changeStatus() {
    this.tasksBackground = this.storage.get();
    if (this.selectStatusTask == 'pending') {
      this.tasks = this.tasksBackground.filter((t) => !t.completed);
    } else if (this.selectStatusTask == 'completed') {
      this.tasks = this.tasksBackground.filter((t) => t.completed);
    } else this.tasks = this.tasksBackground;
  }

  toggleTaskEvent(i: number) {
    this.tasksBackground = this.storage.get();
    this.tasks = this.tasksBackground.map((t) => {
      if (t.id === i) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    this.storage.set(this.tasks);
    this.changeStatus();
  }

  clearTaskCompletedEvent(clear: boolean): void {
    this.tasks = this.tasksBackground.filter((t) => !t.completed);
    this.storage.set(this.tasks);
    this.changeStatus();
  }

  destroyTaskEvent(id: number) {
    this.tasksBackground = this.storage.get();
    this.tasks = this.tasksBackground.filter((t) => t.id != id);
    this.storage.set(this.tasks);
    this.changeStatus();
  }

  editTaskEvent(task: Task) {
    this.tasksBackground = this.storage.get();
    this.tasks = this.tasksBackground.map((t) => {
      if (t.id === task.id) {
        return {
          ...task,
        };
      } else return t;
    });
    this.storage.set(this.tasks);
    this.changeStatus();
  }
}
