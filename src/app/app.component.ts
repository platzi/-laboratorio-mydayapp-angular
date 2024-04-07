import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],  
  template: "<router-outlet/>"
})
export class AppComponent {
  title = 'todoApp';
  welcome = "Bienvenido a la aplicación de Angular";
  tasks = [
    "Instalar Angular",
    "Crear proyecto",
    "Crear component",
    "Crear servicio"
  ]
}
