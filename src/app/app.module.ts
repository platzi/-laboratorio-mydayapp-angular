import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './domains/shared/components/layout/layout.component';
import { FooterComponent } from './domains/todo/components/footer/footer.component';
import { HeaderComponent } from './domains/todo/components/header/header.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, HomeComponent,
        LayoutComponent,
        FooterComponent,
        HeaderComponent],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
