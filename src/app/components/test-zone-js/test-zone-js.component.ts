import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-zone-js',
  templateUrl: './test-zone-js.component.html',
  styleUrls: ['./test-zone-js.component.css']
})
export class TestZoneJsComponent implements OnInit {
  message = 'Inicial';

  ngOnInit() {
    setTimeout(() => {
      this.message = 'Actualizado'; // Esto debe actualizar la vista automáticamente
    }, 2000);
  }
}