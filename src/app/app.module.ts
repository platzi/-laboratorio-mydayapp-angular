import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterTasksListComponent } from './components/footer-tasks-list/footer-tasks-list.component';
import { MainTasksListComponent } from './components/main-tasks-list/main-tasks-list.component';
import { TaskComponent } from './components/task/task.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterTasksListComponent,
    MainTasksListComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
