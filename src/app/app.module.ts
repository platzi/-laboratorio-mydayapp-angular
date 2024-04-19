import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CompletedComponent } from './components/pages/completed/completed.component';
import { PendingComponent } from './components/pages/pending/pending.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TaskComponent } from './components/task/task.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterLinkWithHref } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CompletedComponent,
    PendingComponent,
    HeaderComponent,
    FooterComponent,
    TaskComponent,
    TasksListComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLinkWithHref,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
