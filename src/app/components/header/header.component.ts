import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class HeaderComponent {
  private formBuilder = inject(FormBuilder);
  private todoService = inject(TodoService);

  public formTask = this.formBuilder.group({
    task: ['', Validators.required],
  });

  public addNewTask(): void {
    if (this.formTask.invalid) return;
    this.todoService.addNewTask(this.formTask.controls.task.value!.trim());
    this.formTask.reset();
  }
}
