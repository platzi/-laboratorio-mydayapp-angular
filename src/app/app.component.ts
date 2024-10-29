import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
],
template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'Welcome to Todo App';
  tasks = [
    'Instalar Angualr CLI',
    'Crear un nuevo proyecto',
    'Crear un componente',
  ]
}
