import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { TaskService } from 'src/app/services/task.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    taskInput!: FormGroup
    listAlone: boolean = true

    constructor(private builder: FormBuilder, private task:TaskService) {
        this.taskInput = builder.group({
            task: ['',Validators.required]
        })
    }

    ngOnInit() {
        let local = window.localStorage.getItem('mydayapp-angular')
        if (local) {
            console.log(local)
            local = JSON.parse(local)
            console.log(local)
            this.task.localTasks = local!
        }
        this.task.listAlone.subscribe({
            next: (element:boolean) => {
                this.listAlone = element
            }
        })
    }

    onSubmit(){
        const sendElement = this.taskInput.get('task')?.value
        if (sendElement !== '') this.task.newTask = sendElement
    }

    onSend(e:KeyboardEvent){
        if (e.key === 'Enter'){
            this.onSubmit()
            this.taskInput.reset()
        }
    }

}
