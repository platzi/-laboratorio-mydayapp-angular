import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddToDoComponent } from './components/add-to-do/add-to-do.component';
import { ToDoSummaryComponent } from './components/to-do-summary/to-do-summary.component';
import { provideRouter } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToDoListComponent,
    AddToDoComponent,
    ToDoSummaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent]
})
export class AppModule { }
