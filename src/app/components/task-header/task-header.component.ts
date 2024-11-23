import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-task-header',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-header.component.html',
})
export class TaskHeaderComponent implements OnInit{
  public formItems!: FormGroup;

  @Output() addTaskEvent = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formItems = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  addTask() {
    if (this.formItems.get('title')?.value) {
      this.addTaskEvent.emit(this.formItems.get('title')?.value);
      this.formItems.patchValue({ title: '' });
    }
  }
}
