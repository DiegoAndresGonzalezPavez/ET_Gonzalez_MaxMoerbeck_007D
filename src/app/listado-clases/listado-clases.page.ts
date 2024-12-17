import { Component, OnInit } from '@angular/core';
import { Clase } from 'src/interfaces/IClases';

@Component({
  selector: 'app-listado-clases',
  templateUrl: './listado-clases.page.html',
  styleUrls: ['./listado-clases.page.scss'],
})
export class ListadoClasesPage implements OnInit {
  clases: Clase[] = []; 

  constructor() { }

  ngOnInit() {
    this.clases = [
      {
        id: '1',
        nombreAsignatura: 'Matemáticas',
        periodoAcademico: '2023',
        sala: '101',
        profesor: 'Juan Pérez',
        correo: 'jperez@correo.com',
        rut: '12345678-9',
        codigoQR: 'abc123',
      },
      // Más clases aquí
    ];
  }

  verDetalleClase(clase: Clase) {
    console.log('Navegando al detalle de la clase:', clase);
  }
}

