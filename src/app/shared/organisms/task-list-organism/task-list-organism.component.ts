import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Task, ViewConfig } from 'src/app/models/task.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list-organism',
  templateUrl: './task-list-organism.component.html',
  styleUrls: ['./task-list-organism.component.css']
})
export class TaskListOrganismComponent implements OnInit {

  @Input() viewConfig!: ViewConfig;

  tasks: Task[] = [];
  taskForm!: FormGroup;
  isEditTask: boolean = false;
  taskToEdit!: number;
  @ViewChild('editInput') editInput!: ElementRef;
  currentUrl!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    this.currentUrl = this.router.url;

    this.taskForm = this.formBuilder.group({
      task: ['', Validators.required]
    });

    const storedTaskString = localStorage.getItem('mydayapp-angular');

    if (storedTaskString !== null) {
      const storedTasks = JSON.parse(storedTaskString);
      this.tasks = storedTasks;
      console.log('localStorage', this.tasks);
    }


  }

  onSubmit() {
    if (this.taskForm.valid) {
      //console.log(this.taskForm.value);
    }
  }

  saveNewTask(event: any): void {
    const inputValue = (event.target as HTMLInputElement).value.trim();
    // console.log('Event', event);
    // console.log('Value', inputValue);

    if (inputValue != '') {
      const idNumber: number = this.tasks.length > 0 ? parseInt(this.tasks[this.tasks.length - 1].id) + 1 : 1;
      const id: string = idNumber.toString();

      const task: Task = {
        id: id,
        title: inputValue,
        completed: false
      };

      this.tasks.push(task);
      //console.log('Task', task);

      this.clearInput(this.taskForm.get('task'));
      localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks));
    } else {
      alert('The task is empty, type your task, please');
    }
  }

  clearInput(abstractControl: AbstractControl | null): void {
    if (abstractControl != null) {
      abstractControl.setValue('');
    }
  }

  changeTaskState(event: any, task: Task): void {
    //console.log('event', event);
    //console.log('Task', task.completed);
    task.completed = !task.completed;
    //console.log('Change task state', task.completed);
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks));
  }

  changeToEdit(editInputIndex: number): void {
    this.isEditTask = true;
    this.taskToEdit = editInputIndex;

    setTimeout(() => {
      if (this.editInput) {
        console.log('this.editInput', this.editInput);
        this.editInput.nativeElement.focus();
      }
    });
  }

  saveEdit(event: any, editInputIndex: number): void {
    const inputValue = (event.target as HTMLInputElement).value.trim();

    if (inputValue != '') {
      this.tasks[editInputIndex].title = inputValue;
      localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks));
      this.isEditTask = false;
    } else {
      alert('The task is empty, type your task, please');
    }

  }

  cancelEdit(): void {
    this.isEditTask = false;
  }

  getPendingTasks(): Task[] {
    const pendingTasks: Task[] = [];
    this.tasks.forEach((task: Task) => {
      if (!task.completed) {
        pendingTasks.push(task);
      }
    });
    return pendingTasks;
  }

  getCompletedTasks(): Task[] {
    const completedTasks: Task[] = [];
    this.tasks.forEach((task: Task) => {
      if (task.completed) {
        completedTasks.push(task);
      }
    });
    return completedTasks;
  }

  deleteCompletedTasks(): void {
    const uncompletedTasks: Task[] = [];
    if (this.getCompletedTasks().length > 0) {
      this.tasks.map((task: Task) => {
        if (!task.completed) {
          uncompletedTasks.push(task);
        }
      });
      this.tasks = uncompletedTasks;
      localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks));
      console.log('tasks', this.tasks);
    }
  }

}
