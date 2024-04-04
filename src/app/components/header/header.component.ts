import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { TaskService } from '@app/services/task.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(private taskService: TaskService) {}
  @ViewChild('taskInput') taskInput!: ElementRef;

  taskControl = new FormControl('', Validators.required);
  taskList$ = this.taskService.taskList$;

  ngOnInit() {
    setTimeout(() => {
      this.taskInput.nativeElement.focus();
    }, 0);
  }

  createTask() {
    if (this.taskControl.valid && this.taskControl.value) {
      this.taskService.create(this.taskControl.value.trim());
      this.taskControl.setValue('');
    }
  }
}
