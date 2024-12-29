import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskService } from 'src/app/services/task.service';
import { TaskFilter } from 'src/app/enums/TasksFilter.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [FooterComponent, HeaderComponent, TaskListComponent],
})
export class HomeComponent implements OnChanges {
  @Input() filter!: string;
  private taskService = inject(TaskService);
  tasks = this.taskService.tasks;
  tasksFilter = this.taskService.filter;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const filter = changes['filter'] as SimpleChange;
    if (filter) {
      const filterValue = '' + filter.currentValue?.toString();
      let taskFilter: TaskFilter;
      switch (filterValue.toLowerCase()) {
        case TaskFilter.Pending:
          taskFilter = TaskFilter.Pending;
          break;
        case TaskFilter.Completed:
          taskFilter = TaskFilter.Completed;
          break;
        default:
          taskFilter = TaskFilter.All;
          break;
      }
      console.log('changing filter to ' + taskFilter);
      this.tasksFilter.set(taskFilter);
    }
  }
}
