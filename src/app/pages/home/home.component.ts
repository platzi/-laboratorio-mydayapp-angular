import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { task } from '../shared/models/task';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  tasks!: task[];
  newTaskCtrl = new FormControl('',{
    validators: Validators.required
  });
  updateTaskF = new FormControl();
  @Input() filter?: string;
  flagHaveCompleted = false;


  constructor(private _router: ActivatedRoute) {
    this._router.queryParamMap.subscribe((p:any) =>{
      this.filter = p['params'].filter;
      this.loadTasks(this.filter != undefined ? this.filter : '');
    })
   }

  ngOnInit(): void {
    // const storage = localStorage.getItem('mydayapp-angular');
    // storage !== null ? this.tasks= JSON.parse(storage) : this.tasks = [];
  }

  saveLocalStoge(){
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks))
  }

  toggleOnChange(){
    const input = this.newTaskCtrl.value?.trim();
    if(input !== undefined && input != ''){
      this.addNewTask(input);
    }
    this.saveLocalStoge()
  }
  
  toggleCheckBox(index: number){
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveLocalStoge();
    // this.loadTasks(this.filter != undefined ? this.filter : '');
    this.chagenFlagCompleted(this.tasks.filter((task) => task.completed == true).length > 0 );
  }

  toggleDblClick(index: number){
    this.tasks[index].editing = !this.tasks[index].editing;
  }

  addNewTask(_task: string){
    const taskN: task = {
      id: new Date().toLocaleString(),
      title: _task,
      completed: false,
      editing:false
    }

    this.tasks.push(taskN);
    this.newTaskCtrl.reset();
  }

  updateTask(index: number, event: Event){
    const input = (event.target as HTMLInputElement).value.trim();
    if(input != undefined && input !== this.tasks[index].title ){
      this.tasks[index].title = input;
      this.tasks[index].editing = false;
    }
    this.saveLocalStoge();
  }

  escUpdateTask(index: number, event: Event){
    this.tasks[index].editing = false;
  }

  deleteTask(index: number){
    this.tasks = this.tasks.splice(index);
    this.saveLocalStoge();
  }

  clearCompleted(){
    this.tasks = this.tasks.filter((task) => task.completed == false)
    this.saveLocalStoge();
    this.chagenFlagCompleted(false);
  }

  loadTasks(filter: string){
    const storage = localStorage.getItem('mydayapp-angular');
    storage !== null ? this.tasks= JSON.parse(storage) : this.tasks = []; 
    if(filter != ''){
      this.tasks = this.tasks.filter((task) => filter === 'pending' ? task.completed == false : task.completed == true);
    }
    this.chagenFlagCompleted(this.tasks.filter((task) => task.completed == true).length > 0 );
  }

  chagenFlagCompleted(bol: boolean){
    this.flagHaveCompleted = bol;
  }
}


