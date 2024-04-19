import { Component } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import { JotaService } from 'src/app/services/jota.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  constructor(private jotaService: JotaService,private router: Router){
  }
  newTaskControl = new FormControl('',{
    nonNullable:true,
    validators: [
      Validators.required,
    ]
  })

  changeEnter(){
    if(this.newTaskControl.valid){
      const value = this.newTaskControl.value.trim()
      if(value!==''){
        this.addTask(value)
        this.newTaskControl.setValue('')
        this.router.navigate([''])
      }
    }
  }
  addTask(title:string){
    const newTask = {
      id: Date.now(),
      title,
      completed:false
    }
    this.jotaService.addTask(newTask)
  }
}
