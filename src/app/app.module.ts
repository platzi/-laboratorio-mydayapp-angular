
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingTasksComponent } from './pages/home/pending-tasks/pending-tasks.component';
import { CompleteTasksComponent } from './pages/home/complete-tasks/complete-tasks.component';
import { AllTasksComponent } from './pages/home/all-tasks/all-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    FooterComponent,
    PendingTasksComponent,
    CompleteTasksComponent,
    AllTasksComponent,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
