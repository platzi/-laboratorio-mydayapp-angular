import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-add-to-do',
  templateUrl: './add-to-do.component.html',
  styleUrls: ['./add-to-do.component.css']
})
export class AddToDoComponent {

  constructor (private toDoService: ToDoService) {

  }

  newToDoCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('^(?!\\s*$).+'),
  ]});

  addToDo() {
    if(this.newToDoCtrl.valid) {
      const newToDo = this.newToDoCtrl.value.trim();
      this.toDoService.addToDo(newToDo);
      this.newToDoCtrl.reset();
    }
  }

}
