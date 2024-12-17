import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ClaseService } from '../services/clase.service';
import { IAsignatura } from 'src/interfaces/IAsignatura';

@Component({
  selector: 'app-crear-clase',
  templateUrl: './crear-clase.page.html',
  styleUrls: ['./crear-clase.page.scss'],
})
export class CrearClasePage implements OnInit {
  crearClaseForm: FormGroup;
  asignaturas: IAsignatura[] = [];

  constructor(
    private fb: FormBuilder,
    private claseService: ClaseService,
    private navCtrl: NavController
  ) {
    this.crearClaseForm = this.fb.group({
      nombreClase: ['', Validators.required],
      fechaClase: ['', Validators.required],
      asignatura: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Aquí puedes cargar las asignaturas si es necesario.
  }

  crearClase() {
    if (this.crearClaseForm.valid) {
      const nuevaClase = this.crearClaseForm.value;
      console.log('Datos de la nueva clase:', nuevaClase);

      this.claseService.postClase(nuevaClase).subscribe(
        (response: any) => {
          console.log('Clase creada exitosamente', response);
          this.navCtrl.navigateBack('/listado-clases');
        },
        (error: any) => {
          console.error('Error al crear clase', error);
        }
      );
    }
  }
}
