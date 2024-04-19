import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task.model';
import { JotaService } from 'src/app/services/jota.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit, OnDestroy{
  tasksJota: Task[]
  filter: string
  suscription: Subscription = new Subscription;
  clear: boolean = false
  showFooter:boolean = false
  item:number = 0

  constructor(private jotaService: JotaService, private router: Router){
    this.tasksJota = []
    this.filter = 'all'
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe()
  }
  ngOnInit() {
    this.suscription=this.jotaService.getJota().subscribe(taks =>{
      this.showFooter=false
      if(taks.length>0){
        this.showFooter=true
        this.item=taks.length
        this.clear=this.jotaService.getClear(this.filter)
      }
    })
  }

  changeFilter(filter:string){
    this.filter=filter
    this.item = this.jotaService.tasksByFilter(this.filter).length
    this.clear=this.jotaService.getClear(this.filter)
  }
  clearCompleted(){
    this.jotaService.clearCompleted()
    this.router.navigate([''])
  }
}
