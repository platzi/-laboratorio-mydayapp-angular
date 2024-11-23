import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TaskHeaderComponent } from "./components/task-header/task-header.component";
import { TaskFooterComponent } from "./components/task-footer/task-footer.component";
import { TaskListComponent } from "./components/task-list/task-list.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TaskHeaderComponent,
    TaskFooterComponent,
    TaskListComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
